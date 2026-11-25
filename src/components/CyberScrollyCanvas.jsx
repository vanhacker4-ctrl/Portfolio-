import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 75;
const KEY_FRAMES = [0, 12, 24, 36, 48, 60, 74];

export default function CyberScrollyCanvas({
  revealActive = true,
  suppressPreloader = false,
  onLoaded,
}) {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);

  const scrollTargetRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const currentFrameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const introRef = useRef({ active: false, startTime: 0, progress: 0 });
  const hasNotifiedLoadedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const gradCacheRef = useRef({
    key: '',
    radialGrad: null,
    linearGrad: null,
  });
  const dirtyRef = useRef(true);
  const isReducedMotionRef = useRef(false);
  const isCoarsePointerRef = useRef(false);
  const isLowEndRef = useRef(false);

  // Subtle ambient obsidian light particles
  const particlesRef = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isCoarsePointerRef.current = window.matchMedia('(pointer: coarse)').matches;
      const cores = navigator.hardwareConcurrency || 8;
      const mem = navigator.deviceMemory || 8;
      isLowEndRef.current = cores <= 4 || mem <= 4 || Boolean(navigator.connection?.saveData);
    }

    const count = isReducedMotionRef.current ? 0 : isLowEndRef.current ? 10 : 18;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.7,
        speedX: (Math.random() - 0.5) * 0.00025,
        speedY: (Math.random() - 0.5) * 0.00035 - 0.0001,
        color: Math.random() > 0.35 ? '#00F5FF' : '#10B981',
        alpha: Math.random() * 0.35 + 0.1,
      });
    }
    particlesRef.current = particles;
  }, []);

  const triggerReady = useCallback(() => {
    setIsReady(true);
    if (!hasNotifiedLoadedRef.current) {
      hasNotifiedLoadedRef.current = true;
      if (onLoaded) onLoaded();
    }
  }, [onLoaded]);

  // Start the 3D camera zoom-in right when the hero reveal becomes active
  useEffect(() => {
    if (revealActive && isReady && !introRef.current.active) {
      introRef.current.active = true;
      introRef.current.startTime = performance.now();
      dirtyRef.current = true;
    }
  }, [revealActive, isReady]);

  // Track document scroll progress directly without triggering React parent re-renders
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollTargetRef.current =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      dirtyRef.current = true;
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Progressive throttled preloader (key frames first, concurrency=4) so startup never floods network
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = imgs;

    const safetyTimer = setTimeout(() => {
      if (!cancelled) triggerReady();
    }, 1200);

    const saveData = Boolean(typeof navigator !== 'undefined' && navigator.connection?.saveData);
    const queue = saveData
      ? [...KEY_FRAMES]
      : [
          ...KEY_FRAMES,
          ...Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
            (i) => !KEY_FRAMES.includes(i)
          ),
        ];

    let cursor = 0;
    const CONCURRENCY = saveData ? 2 : 4;

    const loadNext = () => {
      if (cancelled || cursor >= queue.length) return;
      const idx = queue[cursor++];
      const img = new Image();
      img.decoding = 'async';
      const paddedIndex = String(idx).padStart(2, '0');
      const webpUrl = `/glass/webp/frame_${paddedIndex}_delay-0.067s.webp`;
      const pngUrl = `/glass/frame_${paddedIndex}_delay-0.067s.png`;
      let usedFallback = false;

      if (idx === 0) {
        img.fetchPriority = 'high';
      }

      const finish = () => {
        if (cancelled) return;
        count++;
        setLoadedCount(count);
        dirtyRef.current = true;
        if (idx === 0 || count >= queue.length) {
          clearTimeout(safetyTimer);
          triggerReady();
        }
        loadNext();
      };

      const onLoad = () => {
        if (cancelled) return;
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {}).finally(finish);
        } else {
          finish();
        }
      };

      const onError = () => {
        if (cancelled) return;
        if (!usedFallback) {
          usedFallback = true;
          img.src = pngUrl;
          return;
        }
        finish();
      };

      img.onload = onLoad;
      img.onerror = onError;
      img.src = webpUrl;
      imgs[idx] = img;
    };

    // Start frame 0 immediately so poster/canvas paints ASAP, then stagger remaining workers
    loadNext();
    const startTimer = setTimeout(() => {
      for (let w = 1; w < CONCURRENCY; w++) {
        loadNext();
      }
    }, 60);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(safetyTimer);
    };
  }, [triggerReady]);

  // Unmount preloader smoothly after fade-out transition
  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => setHidePreloader(true), 750);
    return () => clearTimeout(timer);
  }, [isReady]);

  // Smooth mouse parallax (desktop fine-pointer only)
  useEffect(() => {
    if (isCoarsePointerRef.current || isReducedMotionRef.current) return;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - cx) / cx;
      mouseRef.current.targetY = (e.clientY - cy) / cy;
      dirtyRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas resize & DPR management + stable single render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      const maxDpr = isLowEndRef.current ? 1.25 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      sizeRef.current = { w, h, dpr };
      gradCacheRef.current.key = '';
      dirtyRef.current = true;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let isRunning = true;

    const render = () => {
      if (!isRunning || document.hidden) {
        animationFrameRef.current = null;
        return;
      }

      const reduced = isReducedMotionRef.current;
      const particles = particlesRef.current;
      const scrollTarget = scrollTargetRef.current;

      // Smooth lerp mouse & scroll progress
      if (reduced) {
        smoothScrollRef.current = scrollTarget;
        mouseRef.current.x = 0;
        mouseRef.current.y = 0;
      } else {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.045;
        smoothScrollRef.current += (scrollTarget - smoothScrollRef.current) * 0.14;
      }

      const scrollProgress = smoothScrollRef.current;

      // Intro 3D camera zoom-in progress (0 -> 1 over 1800ms with easeOutQuart)
      let introT = reduced ? 1 : 0;
      let introActive = false;
      if (!reduced && introRef.current.active) {
        const elapsed = performance.now() - introRef.current.startTime;
        const raw = Math.min(1, Math.max(0, elapsed / 1800));
        introT = 1 - Math.pow(1 - raw, 4);
        introRef.current.progress = introT;
        introActive = raw < 1;
      }

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)))
      );

      if (reduced) {
        currentFrameRef.current = targetFrame;
      } else {
        currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.14;
      }

      const frameSettled =
        Math.abs(targetFrame - currentFrameRef.current) < 0.02 &&
        Math.abs(scrollTarget - scrollProgress) < 0.0005;
      const mouseSettled =
        Math.abs(mouseRef.current.targetX - mouseRef.current.x) < 0.001 &&
        Math.abs(mouseRef.current.targetY - mouseRef.current.y) < 0.001;

      const needsDraw =
        dirtyRef.current || introActive || !frameSettled || !mouseSettled || particles.length > 0;

      if (needsDraw) {
        dirtyRef.current = false;

        // Apply subtle 3D camera perspective + mouse tilt to stage wrapper
        if (stageRef.current && !reduced) {
          const tiltX = -mouseRef.current.y * 1.15;
          const tiltY = mouseRef.current.x * 1.15;
          const introPitch = (1 - introT) * 2.5;
          const stageScale = 1.03 + introT * 0.02;
          stageRef.current.style.transform = `perspective(1400px) rotateX(${(tiltX + introPitch).toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${stageScale.toFixed(4)}, ${stageScale.toFixed(4)}, 1)`;
        }

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );

        let img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
            const prev = imagesRef.current[frameIndex - delta];
            if (prev && prev.complete && prev.naturalWidth > 0) {
              img = prev;
              break;
            }
            const next = imagesRef.current[frameIndex + delta];
            if (next && next.complete && next.naturalWidth > 0) {
              img = next;
              break;
            }
          }
        }

        const { w, h } = sizeRef.current;
        ctx.fillStyle = '#060b0e';
        ctx.fillRect(0, 0, w, h);

        if (img && img.complete && img.naturalWidth > 0) {
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const screenRatio = w / h;
          let drawW, drawH, drawX, drawY;

          const zoom = 1.0 + introT * 0.05 + scrollProgress * 0.08;

          if (screenRatio > imgRatio) {
            drawW = w * zoom;
            drawH = (w / imgRatio) * zoom;
          } else {
            drawH = h * zoom;
            drawW = h * imgRatio * zoom;
          }

          const offsetX = mouseRef.current.x * 12;
          const offsetY = mouseRef.current.y * 9;

          drawX = (w - drawW) / 2 + offsetX;
          drawY = (h - drawH) / 2 + offsetY;

          ctx.globalAlpha = 0.72 + introT * 0.28;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1;
        }

        // Quantize vignette buckets to reuse gradient instances instead of allocating every frame
        const heroFactor = Math.min(1, Math.max(0, scrollProgress * 4));
        const heroBucket = Math.round(heroFactor * 25);
        const introBucket = Math.round(introT * 25);
        const cacheKey = `${w}x${h}|${heroBucket}|${introBucket}`;

        if (gradCacheRef.current.key !== cacheKey) {
          const hVal = heroBucket / 25;
          const iVal = introBucket / 25;
          const introDarkness = 1 - iVal;

          const radialGrad = ctx.createRadialGradient(
            w / 2,
            h / 2,
            Math.min(w, h) * (0.28 + iVal * 0.14),
            w / 2,
            h / 2,
            Math.max(w, h) * 0.9
          );
          const centerAlpha = Math.min(0.45, 0.03 + 0.13 * hVal + introDarkness * 0.22);
          const midAlpha = Math.min(0.55, 0.1 + 0.18 * hVal + introDarkness * 0.22);
          const edgeAlpha = Math.min(0.68, 0.22 + 0.22 * hVal + introDarkness * 0.2);

          radialGrad.addColorStop(0, `rgba(6, 11, 14, ${centerAlpha.toFixed(2)})`);
          radialGrad.addColorStop(0.7, `rgba(6, 11, 14, ${midAlpha.toFixed(2)})`);
          radialGrad.addColorStop(1, `rgba(6, 11, 14, ${edgeAlpha.toFixed(2)})`);

          const topAlpha = 0.16 + 0.14 * hVal;
          const middleLinearAlpha = 0.04 + 0.1 * hVal;
          const bottomAlpha = 0.18 + 0.18 * hVal;

          const linearGrad = ctx.createLinearGradient(0, 0, 0, h);
          linearGrad.addColorStop(0, `rgba(6, 11, 14, ${topAlpha.toFixed(2)})`);
          linearGrad.addColorStop(0.35, `rgba(6, 11, 14, ${middleLinearAlpha.toFixed(2)})`);
          linearGrad.addColorStop(0.7, `rgba(6, 11, 14, ${middleLinearAlpha.toFixed(2)})`);
          linearGrad.addColorStop(1, `rgba(6, 11, 14, ${bottomAlpha.toFixed(2)})`);

          gradCacheRef.current = { key: cacheKey, radialGrad, linearGrad };
        }

        ctx.fillStyle = gradCacheRef.current.radialGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = gradCacheRef.current.linearGrad;
        ctx.fillRect(0, 0, w, h);

        // Subtle floating ambient particles (batch alpha resets cleanly without save/restore per dot)
        if (particles.length > 0) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = 1;
            else if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y = 1;
            else if (p.y > 1) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * introT;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      if (introActive || !frameSettled || !mouseSettled || particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        animationFrameRef.current = null;
      }
    };

    const scheduleWake = () => {
      if (isRunning && !document.hidden && !animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        dirtyRef.current = true;
        scheduleWake();
      }
    };

    window.addEventListener('scroll', scheduleWake, { passive: true });
    window.addEventListener('mousemove', scheduleWake, { passive: true });
    window.addEventListener('resize', scheduleWake, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', scheduleWake);
      window.removeEventListener('mousemove', scheduleWake);
      window.removeEventListener('resize', scheduleWake);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060b0e]">
      <div
        ref={stageRef}
        className="w-full h-full will-change-transform origin-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* Smooth Cinematic Preloader Fade-Out (suppressed when IntroSplash is active) */}
      {!hidePreloader && !suppressPreloader && (
        <div
          className={`absolute inset-0 bg-[#060b0e] flex flex-col items-center justify-center z-50 transition-opacity duration-700 ease-out ${
            isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          <div className="w-64 text-center">
            <div className="text-xs font-mono tracking-widest text-zinc-400 mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>INITIALIZING SCENE</span>
            </div>
            <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-150"
                style={{ width: `${Math.min(100, (loadedCount / TOTAL_FRAMES) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-zinc-500">
              {Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100))}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
