import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 75;

export default function CyberScrollyCanvas({
  scrollProgress = 0,
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

  const currentFrameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const introRef = useRef({ active: false, startTime: 0, progress: 0 });
  const hasNotifiedLoadedRef = useRef(false);
  const animationFrameRef = useRef(null);

  // Subtle ambient obsidian light particles
  const particlesRef = useRef([]);

  useEffect(() => {
    const count = 22;
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
    }
  }, [revealActive, isReady]);

  // Progressive throttled preloader (key frames first, concurrency=4) so startup never floods 55MB at once
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = imgs;

    const safetyTimer = setTimeout(() => {
      if (!cancelled) triggerReady();
    }, 1200);

    // Prioritize key milestones first (0, 12, 24, 36, 48, 60, 74), then fill remaining frames
    const priorityIndices = [0, 12, 24, 36, 48, 60, 74];
    const queue = [
      ...priorityIndices,
      ...Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
        (i) => !priorityIndices.includes(i)
      ),
    ];

    let cursor = 0;
    const CONCURRENCY = 4;

    const loadNext = () => {
      if (cancelled || cursor >= queue.length) return;
      const idx = queue[cursor++];
      const img = new Image();
      const paddedIndex = String(idx).padStart(2, '0');

      const onDone = () => {
        if (cancelled) return;
        count++;
        setLoadedCount(count);
        if (idx === 0 || count >= TOTAL_FRAMES) {
          clearTimeout(safetyTimer);
          triggerReady();
        }
        loadNext();
      };

      img.onload = onDone;
      img.onerror = onDone;
      img.src = `/glass/frame_${paddedIndex}_delay-0.067s.png`;
      imgs[idx] = img;
    };

    const startTimer = setTimeout(() => {
      for (let w = 0; w < CONCURRENCY; w++) {
        loadNext();
      }
    }, 150);

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

  // Smooth mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - cx) / cx;
      mouseRef.current.targetY = (e.clientY - cy) / cy;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth lerp mouse parallax
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.045;

    // Intro 3D camera zoom-in progress (0 -> 1 over 1800ms with easeOutQuart)
    let introT = 0;
    if (introRef.current.active) {
      const elapsed = performance.now() - introRef.current.startTime;
      const raw = Math.min(1, Math.max(0, elapsed / 1800));
      introT = 1 - Math.pow(1 - raw, 4);
      introRef.current.progress = introT;
    }

    // Apply subtle 3D camera perspective + mouse tilt to stage wrapper
    if (stageRef.current) {
      const tiltX = -mouseRef.current.y * 1.15;
      const tiltY = mouseRef.current.x * 1.15;
      // Start slightly pitched & zoomed out in 3D space, smoothly pushing forward
      const introPitch = (1 - introT) * 2.5;
      const stageScale = 1.03 + introT * 0.02;
      stageRef.current.style.transform = `perspective(1400px) rotateX(${(tiltX + introPitch).toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg) scale3d(${stageScale.toFixed(4)}, ${stageScale.toFixed(4)}, 1)`;
    }

    // Target frame based on scroll progress (0 to 1 mapped to 0 to 74)
    const targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)))
    );

    // Ultra-smooth lerping
    currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.12;
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = w / h;
      let drawW, drawH, drawX, drawY;

      // Smooth 3D camera push-in on reveal (1.00 -> 1.05) + scroll zoom
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

      // Clear, vivid exposure across all scroll positions
      ctx.globalAlpha = 0.72 + introT * 0.28;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.globalAlpha = 1;
    }

    // Subtle atmospheric contrast veil (keeps background clearly visible on every section)
    const heroFactor = Math.min(1, Math.max(0, scrollProgress * 4));
    const introDarkness = 1 - introT;

    // Gentle radial edge vignette without darkening the artwork
    const radialGrad = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * (0.28 + introT * 0.14),
      w / 2,
      h / 2,
      Math.max(w, h) * 0.9
    );
    const centerAlpha = Math.min(0.45, 0.03 + 0.13 * heroFactor + introDarkness * 0.22);
    const midAlpha = Math.min(0.55, 0.10 + 0.18 * heroFactor + introDarkness * 0.22);
    const edgeAlpha = Math.min(0.68, 0.22 + 0.22 * heroFactor + introDarkness * 0.20);

    radialGrad.addColorStop(0, `rgba(6, 11, 14, ${centerAlpha.toFixed(2)})`);
    radialGrad.addColorStop(0.7, `rgba(6, 11, 14, ${midAlpha.toFixed(2)})`);
    radialGrad.addColorStop(1, `rgba(6, 11, 14, ${edgeAlpha.toFixed(2)})`);

    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, w, h);

    // Light top-bottom contrast tint for crisp typography legibility
    const topAlpha = 0.16 + 0.14 * heroFactor;
    const middleLinearAlpha = 0.04 + 0.10 * heroFactor;
    const bottomAlpha = 0.18 + 0.18 * heroFactor;

    const linearGrad = ctx.createLinearGradient(0, 0, 0, h);
    linearGrad.addColorStop(0, `rgba(6, 11, 14, ${topAlpha.toFixed(2)})`);
    linearGrad.addColorStop(0.35, `rgba(6, 11, 14, ${middleLinearAlpha.toFixed(2)})`);
    linearGrad.addColorStop(0.7, `rgba(6, 11, 14, ${middleLinearAlpha.toFixed(2)})`);
    linearGrad.addColorStop(1, `rgba(6, 11, 14, ${bottomAlpha.toFixed(2)})`);

    ctx.fillStyle = linearGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle floating ambient particles
    const particles = particlesRef.current;
    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;

      const px = p.x * w;
      const py = p.y * h;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha * introT;
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();

    animationFrameRef.current = requestAnimationFrame(render);
  }, [scrollProgress]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

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
