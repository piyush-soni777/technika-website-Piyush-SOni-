import React from 'react';
import { Mail, Globe, MapPin, Heart, ShieldCheck, Award, Sparkles, Code2, Phone } from 'lucide-react';
import { TECHNIKA_DETAILS } from '../data/eventsData';

const InstagramIcon = () => (
  <svg className="w-4 h-4 text-pink-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M12.031 2C6.504 2 2 6.504 2 12.031a9.97 9.97 0 0 0 1.547 5.344L2 22l4.773-1.523a9.99 9.99 0 0 0 5.258 1.554h.004c5.523 0 10.027-4.504 10.027-10.031 0-2.679-1.043-5.2-2.937-7.094A9.957 9.957 0 0 0 12.031 2zm5.82 14.398c-.246.688-1.426 1.332-1.996 1.41-.543.075-1.223.11-3.664-.902-3.117-1.293-5.121-4.457-5.277-4.664-.152-.207-1.266-1.684-1.266-3.219 0-1.535.805-2.289 1.09-2.586.285-.297.625-.371.832-.371.207 0 .414.004.594.012.195.008.453-.074.707.535.262.625.895 2.18.973 2.336.078.156.133.344.023.555-.105.211-.156.344-.312.527-.156.184-.332.41-.473.551-.156.156-.32.324-.137.637.184.312.816 1.348 1.754 2.184 1.203 1.07 2.215 1.402 2.527 1.559.313.156.496.133.68-.078.188-.211.785-.914.996-1.227.211-.312.422-.262.707-.156.289.105 1.824.86 2.137 1.016.312.156.52.234.598.367.078.133.078.773-.168 1.461z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.64 1.64 0 1 0-.01 3.28 1.64 1.64 0 0 0 .01-3.28z" />
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="relative bg-black text-white pt-16 pb-12 overflow-hidden border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Branding & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_#FF5722] overflow-hidden">
                <img src="/aju-logo.jpg" alt="ARKA JAIN University" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-black text-2xl text-white tracking-tight">
                  TECHNIKA <span className="bg-[#FF5722] text-white px-2 py-0.5 rounded ml-0.5 border border-black shadow-[1.5px_1.5px_0px_0px_#fff] -rotate-2 inline-block">6.0</span>
                </span>
                <span className="block text-[11px] font-black uppercase text-[#00F5A0]">
                  AVINYĀ : Harmony Through Innovation
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-bold leading-relaxed">
              The annual flagship techno-cultural symposium organized by the School of Engineering & IT at ARKA JAIN University.
            </p>

            <div className="flex items-center gap-2 text-xs font-black text-black bg-[#FFD600] px-3.5 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#fff] w-fit">
              <Award className="w-4 h-4 text-black stroke-[2.5]" />
              <span>NAAC Grade 'A' Accredited</span>
            </div>
          </div>

          {/* Column 2: Event Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#00F5A0] uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded border border-neutral-700 w-fit">
              Fest Navigation
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-300">
              <li>
                <a href="#hero" className="hover:text-[#00F5A0] transition-colors">
                  → Home & Live Countdown
                </a>
              </li>
              <li>
                <a href="#evolution" className="hover:text-[#00F5A0] transition-colors">
                  → Evolution Scrollytelling (1.0 to 6.0)
                </a>
              </li>
              <li>
                <a href="#events-tree" className="hover:text-[#00F5A0] transition-colors">
                  → Living Tree of Events (45 Competitions)
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#00F5A0] transition-colors flex items-center gap-1.5">
                  → Hall of Memories (Parchment Gallery)
                </a>
              </li>
              <li>
                <a href="#champions" className="hover:text-[#00F5A0] transition-colors">
                  → Champion's Chest & Medals
                </a>
              </li>
              <li>
                <a href="#campus-lens" className="hover:text-[#00F5A0] transition-colors">
                  → Campus Lens Media Drop 📸
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Official Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#FF6B8B] uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded border border-neutral-700 w-fit">
              Official Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-bold">
              <li className="flex items-center gap-2">
                <InstagramIcon />
                <a
                  href="https://instagram.com/technika_aju"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @technika_aju
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <a
                  href="mailto:technika@arkajainuniversity.ac.in"
                  className="hover:text-white transition-colors truncate"
                >
                  technika@arkajainuniversity.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="text-white font-black underline decoration-[#FFE600]">
                  technika2026.online
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Campus Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded border border-neutral-700 w-fit">
              Campus Venue
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-300 font-bold leading-relaxed">
              <MapPin className="w-4 h-4 text-[#FF6B8B] shrink-0 mt-0.5" />
              <span>
                ARKA JAIN University, Opp. Kerala Public School, Mohanpur, Gamharia, Dist. Seraikela Kharsawan, Jharkhand - 832108.
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs font-black text-black bg-white hover:bg-[#00F5A0] px-3.5 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#FF5722] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>Coordinator Access Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* CREATOR & DEVELOPER SPOTLIGHT (Piyush Soni) */}
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-neutral-950 border-3 border-neutral-800 shadow-[6px_6px_0px_0px_#FF5722] relative overflow-hidden">
          {/* Ambient ambient glow in corners */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#FF5722]/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#00F5A0]/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF5722] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_#000] -rotate-1">
                <Code2 className="w-3.5 h-3.5 text-[#FFD600]" />
                <span>Website Architect & Lead Developer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex flex-wrap items-center gap-2.5">
                <span>Crafted by</span>
                <span className="bg-[#FFE600] text-black px-3 py-0.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#fff]">
                  Piyush Soni
                </span>
                <span className="text-xs font-bold text-neutral-400 font-sans">
                  • Web Wizard Edition
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-bold max-w-xl leading-relaxed">
                Designed & built from scratch for <span className="text-[#00F5A0] font-black">Technika 6.0</span>. Interactive scrollytelling, live pass generator & responsive universe.
              </p>
            </div>

            {/* Social & Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
              {/* WhatsApp */}
              <a
                href="https://wa.me/917004111404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#25D366] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon />
                <span>+91 7004111404</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/piyush_soni777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <InstagramIcon />
                <span>@piyush_soni777</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/piyush-soni777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LinkedInIcon />
                <span>piyush-soni777</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t-2 border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-bold">
          <p>
            © 2026 TECHNIKA 6.0 : AVINYĀ • ARKA JAIN University. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span>Built with passion by</span>
            <a
              href="https://instagram.com/piyush_soni777"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#FFE600] font-black underline decoration-[#FFE600] underline-offset-2 transition-colors"
            >
              Piyush Soni
            </a>
            <span className="text-neutral-600">|</span>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded border border-black font-black text-[11px]">
              WEB WIZARD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
