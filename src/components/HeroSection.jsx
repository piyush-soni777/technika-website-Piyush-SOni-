import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowDown, 
  Award, 
  Compass, 
  Ticket, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  Flame,
  Radio
} from 'lucide-react';
import { TECHNIKA_DETAILS } from '../data/eventsData';

export default function HeroSection({ onOpenEvents }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-11-20T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 sm:pt-36 md:pt-40 pb-6 select-none">
      {/* Background Hero Video with Ambient Sci-Fi Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.20] sm:scale-[1.25] origin-[42%_42%] filter brightness-105 contrast-110 saturate-115"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle cinematic gradient so video is vivid, punchy & clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none"></div>

        {/* Ambient Aurora Glow Orbs */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-emerald-400/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-amber-400/20 blur-[100px] pointer-events-none"></div>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Top Floating Handcrafted Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest rotate-[-1deg]">
            <img src="/aju-logo.jpg" alt="AJU" className="w-4 h-4 rounded-full object-contain bg-white p-0.5" />
            <span>ARKA JAIN University · NAAC Grade 'A'</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#00F5A0] text-black border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <Zap className="w-3.5 h-3.5 text-black" />
            Annual Fest 2026
          </span>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#FFD600] text-black border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Web Wizard Edition
          </span>
        </div>

        {/* Main Title Heading: CRAFTED BURNING MULTIVERSE 6.0 LOCKUP */}
        <div className="relative inline-block mb-3 sm:mb-4">
          {/* Top Vintage Charred Stamp */}
          <div className="inline-flex items-center gap-2 bg-[#FFD600] text-black text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000] -rotate-1 mb-2.5 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>AVINYĀ PRESENTS · HACK THE FUTURE</span>
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>

          {/* Giant Hand-Crafted Burning MULTIVERSE 6.0 Lockup */}
          <div className="relative flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-1">
            {/* Crafted Parchment Block for MULTIVERSE */}
            <div className="relative bg-[#EFE3C3] text-[#2A1810] px-4 sm:px-8 py-2 sm:py-3.5 rounded-2xl border-4 sm:border-5 border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-transform">
              {/* Burnt Flame Badge on Corner */}
              <div className="absolute -top-3 -left-3 w-7 h-7 bg-[#FF5722] border-2 border-black rounded-lg rotate-12 flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_#000]">
                🔥
              </div>

              <h1 className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none font-serif">
                MULTIVERSE
              </h1>

              {/* Burning Ember Bottom Accent Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#FF5722] via-[#FFD600] to-[#FF5722] mt-1.5 border border-black rounded-full"></div>
            </div>

            {/* 6.0 Burnt Tangerine Craft Sticker */}
            <div className="bg-[#FF5722] text-white px-4 sm:px-7 py-2 sm:py-3 rounded-2xl border-4 sm:border-5 border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] rotate-[3deg] hover:rotate-0 transition-transform flex flex-col items-center justify-center">
              <span className="text-[9px] sm:text-[11px] font-black tracking-widest uppercase text-[#FFD600] leading-none mb-0.5">
                EDITION
              </span>
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none drop-shadow-sm font-sans">
                6.0
              </span>
            </div>
          </div>

          {/* Sleek Sub-Heading: TECHNIKA Directly Underneath */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] text-xs sm:text-sm font-black text-slate-900 -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-base sm:text-lg font-black text-[#2A1810] tracking-tight">
                TECHNIKA 2026
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                ARKA JAIN University
              </span>
              <span className="px-2 py-0.5 rounded bg-[#00F5A0] text-black text-[10px] font-black uppercase tracking-wider border border-black shadow-[1px_1px_0px_0px_#000]">
                Live Fest
              </span>
            </div>
          </div>
        </div>

        {/* Original Bespoke Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-bold leading-relaxed text-slate-900 mb-3 sm:mb-4 px-2">
          Where human creativity fuses with{' '}
          <span className="bg-[#00F5A0] text-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1 font-black">
            future intelligence
          </span>. 45+ electrifying arenas across AI, robotics, competitive coding, gaming, music & runway culture. Innovate. Disrupt. Claim the championship.
        </p>

        {/* AVINYĀ Theme Handcrafted Pill Banner */}
        <div className="max-w-2xl mx-auto mb-3.5">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm font-black text-slate-900">
            <span className="text-[#7C3AED] tracking-wide font-black">
              AVINYĀ <span className="text-[11px] font-semibold text-slate-500">(अविन्या)</span>
            </span>
            <span className="text-slate-400">|</span>
            <span>Achieving Harmony Through Innovation</span>
            <span className="px-2 py-0.5 bg-[#FF5722] text-white rounded text-[10px] font-black uppercase tracking-wider border border-black">
              Multiverse
            </span>
          </div>
        </div>

        {/* Campus Venue (Clickable Google Maps) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-black uppercase mb-4 sm:mb-5">
          <a
            href="https://maps.google.com/?q=ARKA+JAIN+University+Jamshedpur"
            target="_blank"
            rel="noopener noreferrer"
            title="Open ARKA JAIN University on Google Maps"
            className="bg-white border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] px-4 py-2 flex items-center gap-2 text-slate-900 hover:bg-slate-50 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#7C3AED]" />
            <span>ARKA JAIN UNIVERSITY, JAMSHEDPUR ↗</span>
          </a>
        </div>

        {/* Festival Quick Accolades Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-slate-700">
          <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>₹1,50,000+ Prize Chest</span>
          </span>
          <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Certificates</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Inter-College Showdown</span>
          </span>
        </div>

        {/* Scroll Down Prompt */}
        <div className="mt-3.5 inline-flex flex-col items-center animate-bounce">
          <span className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">
            Scroll to uncover festival evolution
          </span>
          <a
            href="#evolution"
            className="p-1.5 rounded-full bg-white text-emerald-700 shadow-md border border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}