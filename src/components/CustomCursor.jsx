import React, { useEffect, useRef, useState } from 'react';
import { cyberAudio } from '../utils/cyberAudio';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringShapeRef = useRef(null);
  const spotlightRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hudLabel, setHudLabel] = useState('');
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'pointer' | 'text' | 'action'
  const [isClicking, setIsClicking] = useState(false);

  // Mutable animation state (runs purely in rAF for 60-120 FPS zero-lag tracking)
  const stateRef = useRef({
    mouse: { x: -200, y: -200 },
    ring: { x: -200, y: -200 },
    spotlight: { x: -200, y: -200 },
    magneticTarget: null, // { x, y } when hovering interactive element
    velocity: { x: 0, y: 0 },
    isVisible: false,
    isHovering: false,
    isClicking: false,
    mode: 'default',
    label: '',
    trail: [],
    ripples: [],
  });

  useEffect(() => {
    // Skip on coarse-pointer / touch devices or reduced-motion preference
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;
    let animId = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      canvas.width = Math.round(viewW * dpr);
      canvas.height = Math.round(viewH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const wakeRender = () => {
      if (!animId && !document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      const state = stateRef.current;
      const prevX = state.mouse.x < 0 ? e.clientX : state.mouse.x;
      const prevY = state.mouse.y < 0 ? e.clientY : state.mouse.y;

      state.velocity.x = e.clientX - prevX;
      state.velocity.y = e.clientY - prevY;
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;

      if (!state.isVisible) {
        // Snap immediately on first entry to avoid flying in from (-200, -200)
        state.ring.x = e.clientX;
        state.ring.y = e.clientY;
        state.spotlight.x = e.clientX;
        state.spotlight.y = e.clientY;
        state.isVisible = true;
      }

      // Clean minimal fluid trail points
      state.trail.unshift({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });
      if (state.trail.length > 14) state.trail.pop();

      wakeRender();

      // Detect interactive hover target & magnetic pull center
      const target = e.target;
      if (!target) return;

      const actionEl = target.closest('[data-cursor]');
      const customLabel = actionEl?.getAttribute('data-cursor') || '';
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
      const clickableEl =
        actionEl ||
        target.closest('button') ||
        target.closest('a') ||
        (target.getAttribute('role') === 'button' ? target : null) ||
        (target.classList?.contains('cursor-pointer') ? target : null);

      let newMode = 'default';
      let newLabel = '';

      if (customLabel) {
        newMode = 'action';
        newLabel = customLabel;
      } else if (isInput) {
        newMode = 'text';
      } else if (clickableEl) {
        newMode = 'pointer';
      }

      // Subtle magnetic pull only for compact interactive elements (< 220px wide)
      if (clickableEl && newMode !== 'text') {
        const rect = clickableEl.getBoundingClientRect();
        if (rect.width < 240 && rect.height < 100) {
          state.magneticTarget = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        } else {
          state.magneticTarget = null;
        }
      } else {
        state.magneticTarget = null;
      }

      if (state.mode !== newMode || state.label !== newLabel) {
        state.mode = newMode;
        state.label = newLabel;
        state.isHovering = newMode !== 'default';
        setCursorMode(newMode);
        setHudLabel(newLabel);
      }
    };

    const handleMouseDown = (e) => {
      const state = stateRef.current;
      state.isClicking = true;
      setIsClicking(true);

      // Single sleek obsidian cyan ripple
      state.ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 44,
        alpha: 0.65,
      });

      wakeRender();
      cyberAudio.playClick();
    };

    const handleMouseUp = () => {
      stateRef.current.isClicking = false;
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      stateRef.current.isVisible = false;
      stateRef.current.magneticTarget = null;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      wakeRender();
    };

    const handleMouseEnter = () => {
      stateRef.current.isVisible = true;
      wakeRender();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) wakeRender();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    function render() {
      animId = 0;
      if (document.hidden) return;
      const state = stateRef.current;
      const { mouse, ring, spotlight, isVisible, isHovering, magneticTarget } = state;

      // Smooth magnetic interpolation target: blend cursor pos + 25% toward element center
      const targetX = magneticTarget
        ? mouse.x + (magneticTarget.x - mouse.x) * 0.25
        : mouse.x;
      const targetY = magneticTarget
        ? mouse.y + (magneticTarget.y - mouse.y) * 0.25
        : mouse.y;

      const ringLerp = isHovering ? 0.22 : 0.16;
      ring.x += (targetX - ring.x) * ringLerp;
      ring.y += (targetY - ring.y) * ringLerp;

      const spotlightLerp = 0.08;
      spotlight.x += (mouse.x - spotlight.x) * spotlightLerp;
      spotlight.y += (mouse.y - spotlight.y) * spotlightLerp;

      // Velocity-based fluid stretch along motion vector
      const dx = targetX - ring.x;
      const dy = targetY - ring.y;
      const speed = Math.min(18, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);
      const stretchX = isHovering ? 1 : 1 + speed * 0.012;
      const stretchY = isHovering ? 1 : 1 - speed * 0.006;

      // Update DOM cursor elements (GPU accelerated)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        dotRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
        ringRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (ringShapeRef.current) {
        ringShapeRef.current.style.transform = `rotate(${angle}rad) scale(${stretchX}, ${stretchY})`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlight.x}px, ${spotlight.y}px, 0)`;
        spotlightRef.current.style.opacity = isVisible ? '1' : '0';
      }

      // Render smooth minimal quadratic trail & click ripple on canvas
      ctx.clearRect(0, 0, viewW, viewH);

      if (isVisible) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // 1. Clean fluid Bezier ribbon trail
        if (state.trail.length > 2) {
          for (let i = 0; i < state.trail.length - 1; i++) {
            const p0 = state.trail[i];
            const p1 = state.trail[i + 1];
            p0.life -= 0.065;

            const progress = 1 - i / state.trail.length;
            const alpha = Math.max(0, progress * p0.life * 0.35);

            if (alpha > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
              ctx.lineWidth = Math.max(0.5, progress * 2.2);
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          }
          state.trail = state.trail.filter((p) => p.life > 0.05);
        } else if (state.trail.length > 0) {
          state.trail[0].life -= 0.1;
          if (state.trail[0].life <= 0.05) state.trail.length = 0;
        }

        // 2. Refined single obsidian ripple on click
        for (let i = state.ripples.length - 1; i >= 0; i--) {
          const rp = state.ripples[i];
          rp.radius += (rp.maxRadius - rp.radius) * 0.16;
          rp.alpha *= 0.89;

          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 245, 255, ${Math.max(0, rp.alpha)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (rp.alpha < 0.02 || rp.radius >= rp.maxRadius - 0.5) {
            state.ripples.splice(i, 1);
          }
        }

        ctx.restore();
      } else {
        state.trail.length = 0;
        state.ripples.length = 0;
      }

      const ringSettled = Math.hypot(targetX - ring.x, targetY - ring.y) < 0.2;
      const spotSettled = Math.hypot(mouse.x - spotlight.x, mouse.y - spotlight.y) < 0.5;
      const canvasActive = state.trail.length > 0 || state.ripples.length > 0;

      if (canvasActive || (isVisible && (!ringSettled || !spotSettled))) {
        animId = requestAnimationFrame(render);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 1. Subtle Obsidian Cyan/Emerald Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300 opacity-0"
        style={{ width: '580px', height: '580px' }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.065)_0%,rgba(16,185,129,0.025)_38%,transparent_70%)]" />
      </div>

      {/* 2. Canvas: Silky Fluid Trail & Click Ripple */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997] will-change-transform"
      />

      {/* 3. Smooth Magnetic Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-200 opacity-0"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ease-out ${
            isClicking
              ? 'scale-75'
              : cursorMode === 'pointer' || cursorMode === 'action'
              ? 'w-12 h-12 scale-105'
              : cursorMode === 'text'
              ? 'w-5 h-8 scale-95'
              : 'w-8 h-8 scale-100'
          }`}
        >
          {cursorMode !== 'text' ? (
            <div
              ref={ringShapeRef}
              className={`absolute inset-0 rounded-full border transition-all duration-300 will-change-transform ${
                cursorMode === 'pointer' || cursorMode === 'action'
                  ? 'border-cyan-400/75 bg-cyan-400/[0.07] shadow-[0_0_20px_rgba(0,245,255,0.28)]'
                  : 'border-cyan-400/35 bg-transparent'
              }`}
            />
          ) : (
            <div className="w-[2px] h-6 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F5FF] animate-pulse" />
          )}

          {/* Refined Obsidian Micro-Pill Label */}
          {hudLabel && (
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-[#060b0e]/90 backdrop-blur-md border border-cyan-400/40 text-[9px] font-mono tracking-widest text-cyan-300 shadow-[0_4px_12px_rgba(0,0,0,0.6)] animate-fadeIn">
              {hudLabel}
            </div>
          )}
        </div>
      </div>

      {/* 4. Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-150 opacity-0"
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            cursorMode === 'pointer' || cursorMode === 'action'
              ? 'w-1.5 h-1.5 bg-white shadow-[0_0_10px_#00F5FF,0_0_18px_#00F5FF] scale-110'
              : cursorMode === 'text'
              ? 'w-1 h-1 bg-cyan-400 opacity-0'
              : 'w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_#00F5FF]'
          }`}
        />
      </div>
    </>
  );
}
