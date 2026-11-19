import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playRopePullSound, playRopeStretchCreak, playRopeSnapSound, playChimeSound } from '../utils/soundEffects';

export default function HangingTrophy() {
  const containerRef = useRef(null);
  const trophyRef = useRef(null);
  const ropeSvgRef = useRef(null);
  const ropePathRef = useRef(null);
  const ropeBorderRef = useRef(null);
  const ropeShadowPathRef = useRef(null);

  // Position and Angle state (Interpolated for butter-smooth 60/120fps)
  const posRef = useRef({ x: 0, y: 105 });
  const targetDragPosRef = useRef({ x: 0, y: 105 });
  const currentAngleRef = useRef(0);

  // Free Pendulum Physics (polar coordinates)
  const thetaRef = useRef(0);
  const omegaRef = useRef(0);
  const rRef = useRef(105);
  const rVelRef = useRef(0);

  // Dragging and velocity state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const maxPullDistRef = useRef(0);
  const lastSoundPullDistRef = useRef(0);

  const animFrameRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const baseLength = isMobile ? 80 : 105;
    rRef.current = baseLength;
    posRef.current = { x: 0, y: baseLength };
    targetDragPosRef.current = { x: 0, y: baseLength };

    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const isMobileNow = window.innerWidth < 640;
      const targetRestLength = isMobileNow ? 80 : 105;

      let currentX = 0;
      let currentY = targetRestLength;
      let angleDeg = 0;

      if (isDraggingRef.current) {
        // --- DRAGGING STATE (Smooth LERP follow with rock-solid hold) ---
        const followSpeed = 1 - Math.exp(-dt * 26);
        posRef.current.x += (targetDragPosRef.current.x - posRef.current.x) * followSpeed;
        posRef.current.y += (targetDragPosRef.current.y - posRef.current.y) * followSpeed;

        currentX = posRef.current.x;
        currentY = posRef.current.y;

        // Decay mouse velocity each frame so holding still is 100% calm
        mouseVelRef.current.x *= Math.pow(0.78, dt * 60);
        mouseVelRef.current.y *= Math.pow(0.78, dt * 60);

        // Rope angle with subtle hand inertia tilt
        const ropeAngle = Math.atan2(currentX, Math.max(currentY, 25)) * (180 / Math.PI);
        const handInertiaTilt = -mouseVelRef.current.x * 0.035;
        const targetAngle = ropeAngle * 0.85 + handInertiaTilt;

        // Smooth angle interpolation
        currentAngleRef.current += (targetAngle - currentAngleRef.current) * Math.min(1, dt * 14);
        angleDeg = Math.max(-55, Math.min(55, currentAngleRef.current));

        thetaRef.current = Math.atan2(currentX, Math.max(currentY, 25));
        rRef.current = Math.hypot(currentX, currentY);
      } else {
        // Continuous Gentle & Silky Idle Sway (Slightly slower, relaxing natural pace)
        const idleFreq = 0.0025; // ~2.5s relaxing grand cycle
        const idleAmp = 0.095; // ~5.4 deg swing (~12 deg total arc)
        const idleTarget = Math.sin(now * idleFreq) * idleAmp;

        // Smooth harmonic tracking with gentle damping
        const disp = thetaRef.current - idleTarget;
        const angularAccel = -disp * 15 - omegaRef.current * 4.2;
        omegaRef.current += angularAccel * dt;
        thetaRef.current += omegaRef.current * dt;

        // Radial bungee bounce along rope axis
        const stretch = rRef.current - targetRestLength;
        const radialAccel = -stretch * 135 + (rRef.current * (omegaRef.current * omegaRef.current) * 0.35);
        rVelRef.current += radialAccel * dt;
        rVelRef.current *= Math.pow(0.94, dt * 60);
        rRef.current += rVelRef.current * dt;

        if (rRef.current < 40) {
          rRef.current = 40;
          rVelRef.current = 0;
        }

        currentX = Math.sin(thetaRef.current) * rRef.current;
        currentY = Math.cos(thetaRef.current) * rRef.current;
        posRef.current = { x: currentX, y: currentY };

        const targetAngle = (thetaRef.current * 180 / Math.PI) * 0.85 + (omegaRef.current * 1.5);
        currentAngleRef.current += (targetAngle - currentAngleRef.current) * Math.min(1, dt * 14);
        angleDeg = currentAngleRef.current;
      }

      // Update Trophy DOM transform directly
      if (trophyRef.current) {
        trophyRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, 0) rotate(${angleDeg}deg)`;
      }

      // Dynamic Braided Rope Curve
      if (ropePathRef.current && ropeShadowPathRef.current && ropeBorderRef.current) {
        const curveInertia = isDraggingRef.current ? -mouseVelRef.current.x * 0.008 : -omegaRef.current * 5.0;
        const midX = currentX * 0.5 + curveInertia;
        const midY = currentY * 0.5;
        const d = `M 0 0 Q ${midX} ${midY} ${currentX} ${currentY}`;
        ropePathRef.current.setAttribute('d', d);
        ropeBorderRef.current.setAttribute('d', d);
        ropeShadowPathRef.current.setAttribute('d', d);
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    lastSoundPullDistRef.current = 0;
    playRopePullSound();

    const clientX = e.clientX;
    const clientY = e.clientY;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startX: posRef.current.x,
      startY: posRef.current.y
    };

    targetDragPosRef.current = {
      x: posRef.current.x,
      y: posRef.current.y
    };

    lastMousePosRef.current = {
      x: clientX,
      y: clientY,
      time: performance.now()
    };

    mouseVelRef.current = { x: 0, y: 0 };
    omegaRef.current = 0;
    rVelRef.current = 0;
    maxPullDistRef.current = 0;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(0.001, (now - lastMousePosRef.current.time) / 1000);

    const clientX = e.clientX;
    const clientY = e.clientY;

    const vx = (clientX - lastMousePosRef.current.x) / dt;
    const vy = (clientY - lastMousePosRef.current.y) / dt;
    mouseVelRef.current = {
      x: vx * 0.35 + mouseVelRef.current.x * 0.65,
      y: vy * 0.35 + mouseVelRef.current.y * 0.65
    };

    lastMousePosRef.current = { x: clientX, y: clientY, time: now };

    const dx = clientX - dragStartRef.current.mouseX;
    const dy = clientY - dragStartRef.current.mouseY;

    const newTargetX = dragStartRef.current.startX + dx;
    const newTargetY = Math.max(35, dragStartRef.current.startY + dy);

    targetDragPosRef.current = {
      x: newTargetX,
      y: newTargetY
    };

    const isMobile = window.innerWidth < 640;
    const baseLen = isMobile ? 80 : 105;
    const pullDist = Math.hypot(newTargetX, newTargetY - baseLen);
    if (pullDist > maxPullDistRef.current) {
      maxPullDistRef.current = pullDist;
    }

    // Dynamic tactile rope creak as user pulls down
    if (Math.abs(pullDist - lastSoundPullDistRef.current) > 18) {
      lastSoundPullDistRef.current = pullDist;
      playRopeStretchCreak(Math.min(1, pullDist / 140));
    }
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (maxPullDistRef.current > 30) {
      playRopeSnapSound();
    }
    playChimeSound('gold');

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if already released
    }

    const currentX = posRef.current.x;
    const currentY = posRef.current.y;
    const currentR = Math.hypot(currentX, currentY);
    const currentTheta = Math.atan2(currentX, Math.max(currentY, 20));

    const vx = mouseVelRef.current.x;
    const vy = mouseVelRef.current.y;
    const vTangent = vx * Math.cos(currentTheta) - vy * Math.sin(currentTheta);
    const vRadial = vx * Math.sin(currentTheta) + vy * Math.cos(currentTheta);

    thetaRef.current = currentTheta;
    rRef.current = currentR;

    const rawOmega = vTangent / Math.max(currentR, 40);
    omegaRef.current = Math.max(-10, Math.min(10, rawOmega));
    rVelRef.current = Math.max(-300, Math.min(300, vRadial * 0.4));

    if (maxPullDistRef.current > 75 || Math.hypot(vx, vy) > 650) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xOrigin = (rect.left + rect.width / 2) / window.innerWidth;
      const yOrigin = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 75,
        spread: 90,
        origin: { 
          x: Math.max(0.1, Math.min(0.9, xOrigin)), 
          y: Math.max(0.1, Math.min(0.9, yOrigin)) 
        },
        colors: ['#FFD700', '#FFA500', '#FFE600', '#FFFFFF', '#F59E0B']
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 right-10 sm:right-16 md:right-24 lg:right-32 xl:right-36 z-30 select-none pointer-events-none"
      style={{ width: 0, height: 0 }}
    >
      {/* Heavy Neo-Brutalist Ceiling Bracket */}
      <div className="absolute top-0 -left-7 w-14 h-4.5 bg-black border-2 border-black rounded-b-md shadow-[3px_3px_0px_0px_#FFD600] flex items-center justify-center pointer-events-auto cursor-default">
        {/* Metallic Screw Accents */}
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-black -ml-6" />
        <div className="w-3 h-3 rounded-full bg-[#FFD700] border-2 border-black shadow-inner flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-black" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-black -mr-6" />
      </div>

      {/* Dynamic Hemp Rope SVG */}
      <svg 
        ref={ropeSvgRef}
        className="absolute top-0 left-0 overflow-visible pointer-events-none"
        style={{ width: 1, height: 1 }}
      >
        {/* Rope drop shadow */}
        <path
          ref={ropeShadowPathRef}
          d="M 0 0 Q 0 52 0 105"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Outer thick black border */}
        <path
          ref={ropeBorderRef}
          d="M 0 0 Q 0 52 0 105"
          fill="none"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Inner Braided Hemp Rope Texture */}
        <path
          ref={ropePathRef}
          d="M 0 0 Q 0 52 0 105"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 3.5"
        />
      </svg>

      {/* Hanging Trophy Entity */}
      <div
        ref={trophyRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: 'translate3d(0px, 105px, 0) translate(-50%, 0) rotate(0deg)',
          transformOrigin: '50% 0%',
          touchAction: 'none'
        }}
        className="absolute top-0 left-0 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        {/* Brass Hanging Ring at Top of Trophy */}
        <div className="w-6 h-6 -mt-3 bg-[#D97706] rounded-full border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#78350F] border border-black" />
        </div>

        {/* Original #1 Golden Trophy - Prominent & Framed */}
        <div className="relative">
          <img
            src="/trophy-gold-1.png?v=3"
            alt="Technika 1st Place Golden Trophy"
            draggable={false}
            className="w-24 sm:w-44 md:w-56 lg:w-64 xl:w-72 max-w-none h-auto drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
