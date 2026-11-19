import React, { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_FRAMES = 80;

export default function EvolutionScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const animFrameId = useRef(null);
  const lastDrawnIndex = useRef(-1);

  // Preload all 80 frames
  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/evolution-frames/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1) {
          drawFrame(0);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw pure frame on canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const screenRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (screenRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
    lastDrawnIndex.current = index;
  }, []);

  // Frame scrubbing with dedicated scroll track
  useEffect(() => {
    const handleScroll = () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

      animFrameId.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        
        // When container's top reaches 0, frames start scrubbing
        const scrolled = -rect.top;

        if (totalScrollable <= 0) return;

        // Scrub 80 frames across the first 86% of the container distance
        const scrubRange = totalScrollable * 0.86;
        const progress = Math.min(Math.max(scrolled / scrubRange, 0), 1);
        
        const frameIndex = Math.min(
          Math.floor(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        if (frameIndex !== lastDrawnIndex.current) {
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      drawFrame(lastDrawnIndex.current >= 0 ? lastDrawnIndex.current : 0);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [drawFrame]);

  return (
    <div
      id="evolution"
      ref={containerRef}
      className="relative h-[185vh] w-full bg-black select-none"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Minimal loading indicator */}
        {loadedCount < 5 && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white gap-2 z-20">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin"></div>
            <p className="text-xs font-bold text-slate-300">Loading frames...</p>
          </div>
        )}
      </div>
    </div>
  );
}
