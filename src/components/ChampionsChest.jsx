import React from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playConfettiPopSound } from '../utils/soundEffects';
import { TECHNIKA_DETAILS } from '../data/eventsData';
import HangingTrophy from './HangingTrophy';
import HangingMedals from './HangingMedals';
import CrestWatermark from './CrestWatermark';

export default function ChampionsChest() {
  const triggerConfetti = (type) => {
    playConfettiPopSound();
    if (type === 'gold') {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FFFBEB']
      });
    } else if (type === 'silver') {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#94A3B8', '#CBD5E1', '#E2E8F0', '#38BDF8']
      });
    } else if (type === 'crown') {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C026D3', '#A855F7', '#9333EA', '#F472B6']
      });
    } else {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#10B981', '#14B8A6', '#059669', '#34D399']
      });
    }
  };

  const awards = [
    {
      type: "gold",
      title: "Event Champions",
      subtitle: "For Winners of Every Event",
      badge: "1st Place 🥇",
      icon: Medal,
      reward: "Gold Medal + Winner's Certificate",
      iconBg: "bg-[#FFD600] text-black",
      cardBg: "bg-white border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      badgeStyle: "bg-[#FFD600] text-black border-2 border-black font-black",
      dividerColor: "border-black",
      perks: [
        "Handcrafted Pure Gold Medal",
        "Official Winner's Certificate",
        "Department Trophy Points"
      ]
    },
    {
      type: "silver",
      title: "Runners-Up",
      subtitle: "For 2nd Place Across All Events",
      badge: "2nd Place 🥈",
      icon: Award,
      reward: "Silver Medal + Achievement Certificate",
      iconBg: "bg-slate-200 text-black",
      cardBg: "bg-white border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      badgeStyle: "bg-slate-200 text-black border-2 border-black font-black",
      dividerColor: "border-black",
      perks: [
        "Silver Medal of Distinction",
        "Certificate of Achievement",
        "Official Academic Credit"
      ]
    },
    {
      type: "crown",
      title: "Mr. & Miss Technika",
      subtitle: "The Most Prestigious Titles",
      badge: "Grand Crown 👑",
      icon: Crown,
      reward: "Bespoke Crown Trophy + Sashes",
      iconBg: "bg-[#7C3AED] text-white",
      cardBg: "bg-white border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      badgeStyle: "bg-[#7C3AED] text-white border-2 border-black font-black",
      dividerColor: "border-black",
      perks: [
        "Coronation Trophy & Sashes",
        "Grand Fest Star Titles",
        "University Media Spotlight"
      ]
    },
    {
      type: "trophy",
      title: "Group Champions",
      subtitle: "Squad, Dance, Music & Sports",
      badge: "Team Glory 🏆",
      icon: Trophy,
      reward: "Grand Trophy + Individual Passes",
      iconBg: "bg-[#00F5A0] text-black",
      cardBg: "bg-white border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      badgeStyle: "bg-[#00F5A0] text-black border-2 border-black font-black",
      dividerColor: "border-black",
      perks: [
        "2.5ft Giant Rolling Trophy",
        "Individual Squad Certificates",
        "Departmental Pride Shield"
      ]
    }
  ];

  return (
    <div id="champions" className="relative w-full h-full flex flex-col justify-center py-4 sm:py-8 bg-[#FEF08A] overflow-hidden select-none">
      {/* Defined Neo-Brutalist Black Dots Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.45] z-0"
        style={{
          backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Hanging Physics Trophy in Top-Right Ceiling */}
      <HangingTrophy />

      {/* Hanging Physics 1st, 2nd, 3rd Medals in Top-Left Ceiling */}
      <HangingMedals />

      {/* Grand Institutional University Crest & Accolades Watermark */}
      <CrestWatermark />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6 mt-2 sm:mt-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black bg-[#7C3AED] text-white border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] mb-2 sm:mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#FFD600]" />
            <span><span className="hidden sm:inline">Official </span>Honours & Accolades • AVINYĀ 6.0</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" />
          </div>

          <h2 className="text-2xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            The Champion's Chest <span className="inline-block bg-[#FF5722] text-white px-2.5 sm:px-3 py-0.5 sm:py-1 border-2 sm:border-3 border-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] -rotate-1">AWARDS 🏆</span>
          </h2>

          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm font-bold text-slate-700 max-w-2xl mx-auto px-2">
            Gold medals, silver medals, championship trophies and NAAC Grade 'A' university credentials awaiting the most innovative minds across 45 competitions.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="mt-2.5 sm:mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-black">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>🥇 45+ Gold Medals</span>
            </span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>🥈 45+ Silver Medals</span>
            </span>
            <span className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] items-center gap-1.5">
              <span>👑 2 Crown Titles</span>
            </span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>🏆 10+ Rolling Trophies</span>
            </span>
          </div>
        </div>

        {/* 4 Cards Grid (Swipeable Carousel on Mobile, 4-Col Grid on Desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-2 px-2 no-scrollbar sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 mb-2 sm:mb-6">
          {awards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => triggerConfetti(item.type)}
                className={`relative rounded-2xl p-4 sm:p-5 ${item.cardBg} transition-all duration-200 flex flex-col justify-between cursor-pointer group w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none`}
                title="Tap card to celebrate!"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.iconBg} border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-200`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                    </div>
                    <span className={`text-[9.5px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg ${item.badgeStyle} shadow-[1px_1px_0px_0px_#000]`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-black text-black mb-0.5 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10.5px] sm:text-[11px] text-slate-700 font-bold mb-2.5 sm:mb-3">
                    {item.subtitle}
                  </p>

                  {/* Winner Perks Checklist */}
                  <div className="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-3 bg-slate-50 rounded-xl p-2 sm:p-2.5 border-2 border-black">
                    {item.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-black text-slate-900">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Honor Strip */}
                <div className={`pt-2 sm:pt-2.5 border-t-2 ${item.dividerColor} flex items-center justify-between`}>
                  <div>
                    <span className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-slate-600 block">
                      Award Honor
                    </span>
                    <p className="text-[11.5px] sm:text-[13px] font-black text-black leading-snug truncate">
                      {item.reward}
                    </p>
                  </div>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ✨
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 text-[9.5px] font-black text-black/60 mb-2">
          <span>👈 Swipe awards 👉</span>
        </div>

        {/* Institutional Guarantee Note */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white p-0.5 sm:p-1 border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] flex items-center justify-center shrink-0 overflow-hidden">
            <img src="/aju-logo.jpg" alt="ARKA JAIN University" className="w-full h-full object-contain" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
            Honors authenticated by <span className="font-black text-black underline decoration-[#CCFF00] decoration-2">ARKA JAIN University</span> (NAAC Grade 'A') and Institution's Innovation Council (IIC).
          </p>
        </div>
      </div>
    </div>
  );
}
