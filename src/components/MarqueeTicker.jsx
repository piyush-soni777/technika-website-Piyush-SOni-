import React from 'react';
import { Sparkles, Zap, Flame, Trophy, Star } from 'lucide-react';

export default function MarqueeTicker() {
  const tickerItems = [
    { text: "TECHNIKA 6.0", highlight: true, icon: "⚡" },
    { text: "AVINYĀ : HARMONY THROUGH INNOVATION", highlight: false, icon: "✦" },
    { text: "MULTIVERSE : HACK THE FUTURE", highlight: true, icon: "🚀" },
    { text: "20TH & 21ST NOVEMBER 2026", highlight: false, icon: "📅" },
    { text: "ARKA JAIN UNIVERSITY, JAMSHEDPUR", highlight: false, icon: "🏛️" },
    { text: "45+ COMPETITIONS & ARENAS", highlight: true, icon: "🏆" },
    { text: "ROBO WARS • BGMI • WEB WIZARD", highlight: false, icon: "⚔️" },
    { text: "MR & MISS TECHNIKA CROWNS", highlight: true, icon: "👑" },
    { text: "CAMPUS LENS MEDIA VAULT LIVE", highlight: false, icon: "📸" },
    { text: "SCHOOL OF ENGINEERING & IT", highlight: false, icon: "✦" },
  ];

  return (
    <div className="relative w-full bg-[#FFD600] border-y-3 border-black py-2 sm:py-2.5 overflow-hidden select-none pointer-events-none shadow-[0px_4px_0px_0px_#000]">
      {/* Infinite Left-to-Right Moving Ribbon */}
      <div className="animate-marquee-l2r flex items-center">
        {/* First Loop */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop1-${idx}`} className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">{item.icon}</span>
              <span
                className={`text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap ${
                  item.highlight
                    ? 'bg-black text-[#FFD600] px-2.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_#000]'
                    : 'text-black'
                }`}
              >
                {item.text}
              </span>
              <span className="text-black text-xs font-black">★</span>
            </div>
          ))}
        </div>

        {/* Duplicate Loop for Seamless Infinite Scroll */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <div key={`loop2-${idx}`} className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">{item.icon}</span>
              <span
                className={`text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap ${
                  item.highlight
                    ? 'bg-black text-[#FFD600] px-2.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_#000]'
                    : 'text-black'
                }`}
              >
                {item.text}
              </span>
              <span className="text-black text-xs font-black">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
