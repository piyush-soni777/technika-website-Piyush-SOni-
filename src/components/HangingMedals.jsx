import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playRopePullSound, playRopeStretchCreak, playRopeSnapSound, playChimeSound } from '../utils/soundEffects';

function SingleHangingMedal({
  imgSrc,
  altText,
  sizeClass,
  ropeColor,
  baseLengthDesktop,
  baseLengthMobile,
  anchorOffsetX,
  anchorOffsetXMobile,
  phaseOffset,
  confettiColors,
  zIndex
}) {
  const trophyRef = useRef(null);
  const ropePathRef = useRef(null);
  const ropeBorderRef = useRef(null);
  const ropeShadowPathRef = useRef(null);

  // Position and Angle state
  const posRef = useRef({ x: 0, y: baseLengthDesktop });
  const targetDragPosRef = useRef({ x: 0, y: baseLengthDesktop });
  const currentAngleRef = useRef(0);

  // Free Pendulum Physics (polar coordinates)
  const thetaRef = useRef(0);
  const omegaRef = useRef(0);
  const rRef = useRef(baseLengthDesktop);
  const rVelRef = useRef(0);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const maxPullDistRef = useRef(0);
  const lastSoundPullDistRef = useRef(0);

  const animFrameRef = useRef(null);

  // Responsive anchor offset (Desktop preserves exact anchorOffsetX, Mobile uses safe offset)
  const [effectiveAnchorX, setEffectiveAnchorX] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 640 && anchorOffsetXMobile !== undefined
      ? anchorOffsetXMobile
      : anchorOffsetX
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setEffectiveAnchorX(isMobile && anchorOffsetXMobile !== undefined ? anchorOffsetXMobile : anchorOffsetX);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [anchorOffsetX, anchorOffsetXMobile]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const baseLength = isMobile ? baseLengthMobile : baseLengthDesktop;
    rRef.current = baseLength;
    posRef.current = { x: 0, y: baseLength };
    targetDragPosRef.current = { x: 0, y: baseLength };

    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const isMobileNow = window.innerWidth < 640;
      const targetRestLength = isMobileNow ? baseLengthMobile : baseLengthDesktop;

      let currentX = 0;
      let currentY = targetRestLength;
      let angleDeg = 0;

      if (isDraggingRef.current) {
        // Smooth LERP follow with rock-solid hold
        const followSpeed = 1 - Math.exp(-dt * 26);
        posRef.current.x += (targetDragPosRef.current.x - posRef.current.x) * followSpeed;
        posRef.current.y += (targetDragPosRef.current.y - posRef.current.y) * followSpeed;

        currentX = posRef.current.x;
        currentY = posRef.current.y;

        // Decay mouse velocity
        mouseVelRef.current.x *= Math.pow(0.78, dt * 60);
        mouseVelRef.current.y *= Math.pow(0.78, dt * 60);

        const ropeAngle = Math.atan2(currentX, Math.max(currentY, 20)) * (180 / Math.PI);
        const handInertiaTilt = -mouseVelRef.current.x * 0.035;
        const targetAngle = ropeAngle * 0.85 + handInertiaTilt;

        currentAngleRef.current += (targetAngle - currentAngleRef.current) * Math.min(1, dt * 14);
        angleDeg = Math.max(-55, Math.min(55, currentAngleRef.current));

        thetaRef.current = Math.atan2(currentX, Math.max(currentY, 20));
        rRef.current = Math.hypot(currentX, currentY);
      } else {
        // Continuous Gentle & Silky Idle Sway (Slightly slower, relaxing natural pace)
        const idleFreq = 0.0028; // ~2.24s relaxing natural cycle
        const idleAmp = 0.11; // ~6.3 deg swing (~14 deg total arc)
        const idleTarget = Math.sin(now * idleFreq + phaseOffset) * idleAmp;

        // Smooth harmonic tracking with gentle damping
        const disp = thetaRef.current - idleTarget;
        const angularAccel = -disp * 16 - omegaRef.current * 4.4;
        omegaRef.current += angularAccel * dt;
        thetaRef.current += omegaRef.current * dt;

        // Radial bungee bounce along rope axis
        const stretch = rRef.current - targetRestLength;
        const radialAccel = -stretch * 135 + (rRef.current * (omegaRef.current * omegaRef.current) * 0.35);
        rVelRef.current += radialAccel * dt;
        rVelRef.current *= Math.pow(0.94, dt * 60);
        rRef.current += rVelRef.current * dt;

        if (rRef.current < 35) {
          rRef.current = 35;
          rVelRef.current = 0;
        }

        currentX = Math.sin(thetaRef.current) * rRef.current;
        currentY = Math.cos(thetaRef.current) * rRef.current;
        posRef.current = { x: currentX, y: currentY };

        const targetAngle = (thetaRef.current * 180 / Math.PI) * 0.85 + (omegaRef.current * 1.5);
        currentAngleRef.current += (targetAngle - currentAngleRef.current) * Math.min(1, dt * 14);
        angleDeg = currentAngleRef.current;
      }

      // Update DOM transform directly
      if (trophyRef.current) {
        trophyRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, 0) rotate(${angleDeg}deg)`;
      }

      // Dynamic Braided Rope Curve
      if (ropePathRef.current && ropeShadowPathRef.current && ropeBorderRef.current) {
        const curveInertia = isDraggingRef.current ? -mouseVelRef.current.x * 0.008 : -omegaRef.current * 4.5;
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
  }, [baseLengthDesktop, baseLengthMobile, phaseOffset]);

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
    const newTargetY = Math.max(30, dragStartRef.current.startY + dy);

    targetDragPosRef.current = {
      x: newTargetX,
      y: newTargetY
    };

    const isMobile = window.innerWidth < 640;
    const baseLen = isMobile ? baseLengthMobile : baseLengthDesktop;
    const pullDist = Math.hypot(newTargetX, newTargetY - baseLen);
    if (pullDist > maxPullDistRef.current) {
      maxPullDistRef.current = pullDist;
    }

    // Dynamic tactile rope creak as user drags/pulls
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
    const medalType = altText.toLowerCase().includes('gold') ? 'gold' : altText.toLowerCase().includes('silver') ? 'silver' : 'bronze';
    playChimeSound(medalType);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore
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

    const rawOmega = vTangent / Math.max(currentR, 30);
    omegaRef.current = Math.max(-10, Math.min(10, rawOmega));
    rVelRef.current = Math.max(-300, Math.min(300, vRadial * 0.4));

    if (maxPullDistRef.current > 65 || Math.hypot(vx, vy) > 600) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xOrigin = (rect.left + rect.width / 2) / window.innerWidth;
      const yOrigin = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 55,
        spread: 80,
        origin: { 
          x: Math.max(0.1, Math.min(0.9, xOrigin)), 
          y: Math.max(0.1, Math.min(0.9, yOrigin)) 
        },
        colors: confettiColors
      });
    }
  };

  return (
    <div
      className="absolute top-0 select-none pointer-events-none"
      style={{
        left: `${effectiveAnchorX}px`,
        width: 0,
        height: 0,
        zIndex
      }}
    >
      {/* Ceiling eyelet attachment ring */}
      <div className="absolute top-0 -left-2 w-4 h-3 bg-black rounded-b-sm border border-black flex items-center justify-center pointer-events-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] border border-black shadow-inner" />
      </div>

      {/* Dynamic Ribbon/Rope SVG */}
      <svg
        className="absolute top-0 left-0 overflow-visible pointer-events-none"
        style={{ width: 1, height: 1 }}
      >
        <path
          ref={ropeShadowPathRef}
          d="M 0 0 Q 0 50 0 100"
          fill="none"
          stroke="rgba(0,0,0,0.22)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          ref={ropeBorderRef}
          d="M 0 0 Q 0 50 0 100"
          fill="none"
          stroke="#000000"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          ref={ropePathRef}
          d="M 0 0 Q 0 50 0 100"
          fill="none"
          stroke={ropeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 2.5"
        />
      </svg>

      {/* Hanging Medal Entity */}
      <div
        ref={trophyRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(0px, ${baseLengthDesktop}px, 0) translate(-50%, 0) rotate(0deg)`,
          transformOrigin: '50% 0%',
          touchAction: 'none'
        }}
        className="absolute top-0 left-0 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        {/* Top Suspension Knot / Brass Ring */}
        <div className="w-4 h-4 -mt-2 bg-[#D97706] rounded-full border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#78350F]" />
        </div>

        {/* Clean Cutout Medal Asset */}
        <div className="relative">
          <img
            src={imgSrc}
            alt={altText}
            draggable={false}
            className={`${sizeClass} max-w-none h-auto drop-shadow-[0_14px_18px_rgba(0,0,0,0.4)] select-none pointer-events-none`}
          />
        </div>
      </div>
    </div>
  );
}

export default function HangingMedals() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-8 sm:left-14 md:left-20 lg:left-28 xl:left-36 z-30 select-none pointer-events-none"
      style={{ width: 0, height: 0 }}
    >
      {/* Heavy Neo-Brutalist 3-Podium Ceiling Mount */}
      <div className="absolute top-0 -left-7 sm:-left-20 w-28 sm:w-40 h-4 bg-black border-2 border-black rounded-b-md shadow-[3px_3px_0px_0px_#FFD600] flex items-center justify-between px-2 sm:px-3 pointer-events-auto cursor-default">
        {/* Screw accents on mounting plate */}
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-black" />
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[7.5px] sm:text-[8px] font-black tracking-widest text-[#FFD700] uppercase">HONOURS</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-black" />
      </div>

      {/* 2nd Place Silver Medal (Left, Slightly Higher) */}
      <SingleHangingMedal
        imgSrc="/medal-silver.png?v=4"
        altText="2nd Place Silver Medal"
        sizeClass="w-14 sm:w-20 md:w-24"
        ropeColor="#94A3B8"
        baseLengthDesktop={85}
        baseLengthMobile={70}
        anchorOffsetX={-36}
        anchorOffsetXMobile={-20}
        phaseOffset={1.2}
        confettiColors={['#94A3B8', '#CBD5E1', '#E2E8F0', '#38BDF8', '#FFFFFF']}
        zIndex={10}
      />

      {/* 1st Place Gold Medal (Center, Front & Prominent) */}
      <SingleHangingMedal
        imgSrc="/medal-gold.png?v=4"
        altText="1st Place Gold Medal"
        sizeClass="w-16 sm:w-24 md:w-28"
        ropeColor="#F59E0B"
        baseLengthDesktop={120}
        baseLengthMobile={95}
        anchorOffsetX={0}
        anchorOffsetXMobile={0}
        phaseOffset={0}
        confettiColors={['#FFD700', '#FFA500', '#FCD34D', '#FFFBEB', '#F59E0B']}
        zIndex={20}
      />

      {/* 3rd Place Bronze Medal (Right, Balanced) */}
      <SingleHangingMedal
        imgSrc="/medal-bronze.png?v=4"
        altText="3rd Place Bronze Medal"
        sizeClass="w-14 sm:w-20 md:w-24"
        ropeColor="#D97706"
        baseLengthDesktop={95}
        baseLengthMobile={78}
        anchorOffsetX={36}
        anchorOffsetXMobile={20}
        phaseOffset={2.4}
        confettiColors={['#CD7F32', '#B45309', '#D97706', '#F59E0B', '#FFF']}
        zIndex={15}
      />
    </div>
  );
}
