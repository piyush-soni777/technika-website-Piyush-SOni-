import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Ticket, Compass, ShieldCheck, Menu, X, Camera } from 'lucide-react';
import { TECHNIKA_DETAILS } from '../data/eventsData';
import { playNavClickSound } from '../utils/soundEffects';

export default function Navbar({ onOpenEvents, onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Countdown calculation to Nov 20, 2026
    const target = new Date('2026-11-20T09:00:00+05:30').getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[15] transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-md py-2.5 sm:py-3 border-b-2 border-black'
          : 'bg-white/35 backdrop-blur-md py-3 sm:py-4 border-b border-black/10 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Theme */}
        <a 
          href="#hero" 
          onClick={() => playNavClickSound('bubble')}
          className="flex items-center gap-3 group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px] rounded-xl bg-white p-1 border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/aju-logo.jpg"
              alt="ARKA JAIN University"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900 uppercase">
                TECHNIKA <span className="bg-[#FF5722] text-white px-1.5 py-0.2 rounded border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] -rotate-2 inline-block">6.0</span>
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#00F5A0] text-black border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] uppercase">
                AVINYĀ
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-600 hidden sm:block">
              School of Engineering & IT • ARKA JAIN University
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-800">
          <a 
            href="#hero" 
            onClick={() => playNavClickSound('bubble')}
            className="hover:text-black hover:underline underline-offset-4 transition-colors"
          >
            Home
          </a>
          <a 
            href="#evolution" 
            onClick={() => playNavClickSound('bubble')}
            className="hover:text-black hover:underline underline-offset-4 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFE600] border border-black animate-pulse"></span>
            Evolution
          </a>
          <a 
            href="#events-tree" 
            onClick={() => playNavClickSound('bubble')}
            className="hover:text-black hover:underline underline-offset-4 transition-colors"
          >
            Tree
          </a>
          <a 
            href="#gallery" 
            onClick={() => playNavClickSound('bubble')}
            className="hover:text-black hover:underline underline-offset-4 transition-colors flex items-center gap-1"
          >
            <span>Gallery</span>
            <span className="text-[9px] bg-[#FF5722] text-white px-1 rounded font-black">NEW</span>
          </a>
          <a 
            href="#champions" 
            onClick={() => playNavClickSound('bubble')}
            className="hover:text-black hover:underline underline-offset-4 transition-colors"
          >
            Prizes
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              playNavClickSound('action');
              onOpenEvents();
            }}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-white text-black border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-black" />
            All 45 Events
          </button>

          <a
            href="#campus-lens"
            onClick={() => playNavClickSound('action')}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#FF5722] text-white border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-white" />
            Upload Lens 📸
          </a>

          {/* Admin Coordinator shortcut */}
          <button
            onClick={() => {
              playNavClickSound('action');
              onOpenAdmin();
            }}
            title="Coordinator Admin Panel"
            className="px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
            <span>Admin</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              playNavClickSound('bubble');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl">
          <a
            href="#hero"
            onClick={() => {
              playNavClickSound('bubble');
              setMobileMenuOpen(false);
            }}
            className="block text-slate-800 font-semibold"
          >
            Home
          </a>
          <a
            href="#evolution"
            onClick={() => {
              playNavClickSound('bubble');
              setMobileMenuOpen(false);
            }}
            className="block text-slate-800 font-semibold"
          >
            Evolution (1.0 to 6.0)
          </a>
          <a
            href="#events-tree"
            onClick={() => {
              playNavClickSound('bubble');
              setMobileMenuOpen(false);
            }}
            className="block text-slate-800 font-semibold"
          >
            Tree of Events
          </a>
          <a
            href="#champions"
            onClick={() => {
              playNavClickSound('bubble');
              setMobileMenuOpen(false);
            }}
            className="block text-slate-800 font-semibold"
          >
            Champion's Chest
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                playNavClickSound('action');
                setMobileMenuOpen(false);
                onOpenEvents();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-center text-sm border border-emerald-200"
            >
              Explore All 45 Events
            </button>
            <a
              href="#campus-lens"
              onClick={() => {
                playNavClickSound('action');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#00F5A0] text-black font-black text-center text-sm border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              Upload Lens 📸
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
