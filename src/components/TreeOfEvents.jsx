import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Mic, 
  Music, 
  Sparkles, 
  Camera, 
  Star, 
  Layers, 
  ExternalLink, 
  ChevronRight,
  Eye,
  Award,
  Crown
} from 'lucide-react';
import { HIGHLIGHTED_TREE_EVENTS } from '../data/eventsData';

const HANGING_PHOTO_EVENTS = [
  {
    id: "bgmi-leaf",
    eventId: "bgmi",
    title: "BGMI Arena",
    category: "E-Sports",
    prize: "Gold Medals 🥇",
    top: "22%",
    left: "11%",
    mobileTop: "22%",
    mobileLeft: "24%",
    mobileVisible: true,
    image: "/E-sports/images (4).jpg",
    badge: "Battle Royale 🎮",
    animClass: "hanging-frame-1",
    swayDelay: "0s",
    tagGradient: "bg-[#FF5722] text-white border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-black bg-[#FFD600] border border-black font-black"
  },
  {
    id: "singing-leaf",
    eventId: "solo-singing",
    title: "Solo Singing",
    category: "Cultural Vocals",
    prize: "Gold Medal 🥇",
    top: "43%",
    left: "15%",
    mobileVisible: false,
    image: "/concert/images (6).jpg",
    badge: "Melodic 🎙️",
    animClass: "hanging-frame-2",
    swayDelay: "0.8s",
    tagGradient: "bg-[#7C3AED] text-white border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-black bg-[#00F5A0] border border-black font-black"
  },
  {
    id: "robowars-leaf",
    eventId: "robo-wars",
    title: "Robo Wars",
    category: "Combat Robotics",
    prize: "50kg Trophy ⚔️",
    top: "13%",
    left: "24.5%",
    mobileTop: "18%",
    mobileLeft: "76%",
    mobileVisible: true,
    image: "/robo war pic/images.jpg",
    badge: "50kg Combat ⚔️",
    animClass: "hanging-frame-1",
    swayDelay: "1.4s",
    tagGradient: "bg-[#FFD600] text-black border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-white bg-[#FF5722] border border-black font-black"
  },
  {
    id: "rampwalk-leaf",
    eventId: "solo-ramp-walk",
    title: "Ramp Walk",
    category: "Runway & Glamour",
    prize: "Crown Titles 👑",
    top: "48%",
    left: "27.5%",
    mobileTop: "52%",
    mobileLeft: "76%",
    mobileVisible: true,
    image: "/concert/images (2).jpg",
    objectPosition: "center 15%",
    badge: "Runway Glam 👑",
    animClass: "hanging-frame-3",
    swayDelay: "2.2s",
    tagGradient: "bg-[#E11D48] text-white border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-black bg-[#FFD600] border border-black font-black"
  },
  {
    id: "tug-of-war-leaf",
    eventId: "tug-of-war",
    title: "Tug of War",
    category: "Team Athletics",
    prize: "Champions Trophy ⚔️",
    top: "18%",
    left: "44.5%",
    mobileVisible: false,
    image: "/runway/images (1).jpg",
    badge: "Tug of War ⚡",
    animClass: "hanging-frame-2",
    swayDelay: "2.8s",
    tagGradient: "bg-[#00F5A0] text-black border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-white bg-[#7C3AED] border border-black font-black"
  },
  {
    id: "dance-leaf",
    eventId: "solo-dance",
    title: "Solo Dance",
    category: "Stage Expression",
    prize: "Gold Medal 🥇",
    top: "39%",
    left: "38.5%",
    mobileVisible: false,
    image: "/concert/images.jpg",
    badge: "Prismatic 💃",
    animClass: "hanging-frame-1",
    swayDelay: "0.5s",
    tagGradient: "bg-[#FF5722] text-white border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-black bg-[#00F5A0] border border-black font-black"
  },
  {
    id: "photography-leaf",
    eventId: "photography",
    title: "Photography",
    category: "Creative Arts",
    prize: "Gold Medal 🥇",
    top: "27%",
    left: "58.5%",
    mobileVisible: false,
    image: "/concert/images (1).jpg",
    objectPosition: "center 12%",
    badge: "Visual Lens 📷",
    animClass: "hanging-frame-3",
    swayDelay: "1.8s",
    tagGradient: "bg-[#0EA5E9] text-white border border-black",
    cardGlow: "border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-black bg-[#FFD600] border border-black font-black"
  },
  {
    id: "webwizard-leaf",
    eventId: "web-wizard",
    title: "Web Wizard",
    category: "Flagship Hackathon",
    prize: "Grand Gold 🏆",
    top: "48%",
    left: "55.5%",
    mobileTop: "52%",
    mobileLeft: "24%",
    mobileVisible: true,
    image: "/hackathon/images.jpg",
    badge: "Web Wizard 🌟",
    animClass: "hanging-frame-2",
    swayDelay: "1.1s",
    tagGradient: "bg-[#FFD600] text-black border-2 border-black font-black",
    cardGlow: "border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
    prizeTag: "text-white bg-black border border-black font-black"
  }
];

export default function TreeOfEvents({ onOpenEvents, onSelectEvent }) {
  const handleOpenDetailed = (eventId) => {
    onSelectEvent(eventId);
    onOpenEvents();
  };

  return (
    <div id="events-tree" className="relative w-full h-screen min-h-[680px] overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Pure CSS Media Query: Guarantees 100% untouched desktop coordinates */}
      <style>{`
        .tree-hanging-leaf {
          top: var(--m-top);
          left: var(--m-left);
        }
        @media (min-width: 640px) {
          .tree-hanging-leaf {
            top: var(--d-top) !important;
            left: var(--d-left) !important;
          }
        }
      `}</style>

      {/* FULL-SCREEN MAJESTIC TREE BACKGROUND */}
      <img
        src="/tree-pic.png"
        alt="Technika 6.0 Living Tree of Events"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Soft Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/10 pointer-events-none z-10"></div>

      {/* 
        ATTRACTIVE PHOTO FRAMES HANGING FROM TREE LEAVES
        Each item has a leaf pin, hanging twine, polaroid frame, real photo & gentle breeze sway!
      */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {HANGING_PHOTO_EVENTS.map((item) => (
          <div
            key={item.id}
            style={{ 
              '--d-top': item.top,
              '--d-left': item.left,
              '--m-top': item.mobileTop || item.top,
              '--m-left': item.mobileLeft || item.left,
              animationDelay: item.swayDelay
            }}
            className={`tree-hanging-leaf absolute -translate-x-1/2 -translate-y-3 pointer-events-auto group ${item.animClass} ${item.mobileVisible ? 'block' : 'hidden sm:block'}`}
          >
            {/* Tree Branch Anchor: Leaf Pin Knot + Hanging Twine String */}
            <div className="flex flex-col items-center">
              {/* Branch Leaf Pin Knot */}
              <div className="w-4 h-4 rounded-full bg-[#00F5A0] border-2 border-black text-[10px] flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                🍃
              </div>

              {/* Hanging String with crisp dark line */}
              <div className="w-[2px] h-6 sm:h-8 bg-black"></div>

              {/* Small Hook */}
              <div className="w-2 h-2 rounded-full border-2 border-black bg-[#FFD600] -mt-0.5 mb-0.5"></div>
            </div>

            {/* Neo-Brutalist Polaroid Hanging Photo Frame */}
            <div
              onClick={() => handleOpenDetailed(item.eventId)}
              className={`relative w-26 sm:w-30 md:w-34 bg-white p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer group-hover:rotate-0 ${item.cardGlow}`}
            >
              {/* Photo Frame Header Tag */}
              <div className="flex items-center justify-between mb-1 px-0.5">
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${item.tagGradient} shadow-none truncate`}>
                  {item.badge}
                </span>
                <span className="text-[9px] text-black font-black">★</span>
              </div>

              {/* Real Event Photo Thumbnail */}
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border-2 border-black bg-slate-900 mb-1.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: item.objectPosition || 'center center' }}
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1">
                  <Eye className="w-4 h-4 text-[#00F5A0] mb-0.5" />
                  <span className="text-[8px] font-black uppercase tracking-wider bg-[#00F5A0] text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                    View Rules
                  </span>
                </div>
              </div>

              {/* Title & Category text */}
              <div className="text-center px-0.5">
                <h4 className="text-[10px] sm:text-xs font-black text-black truncate leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className={`text-[7.5px] sm:text-[8px] font-bold px-1.5 py-0.2 rounded ${item.prizeTag} truncate`}>
                    {item.prize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Right-Side Neo-Brutalist Registry Showcase (Open Sky Area) */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex justify-end pointer-events-none mb-auto pt-10 sm:pt-16 md:pt-20">
        <div className="flex flex-col items-end gap-2.5 w-full sm:w-80 md:w-84">
          {/* Tap Guide Badge directly above the card */}
          <div className="hidden sm:inline-flex items-center gap-2 bg-[#FFD600] text-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] text-xs font-black pointer-events-auto">
            <span>⚡</span>
            <span>Tap hanging card to view rules & prizes</span>
          </div>

          {/* Explore 3 Dimensions Card */}
          <div className="w-full bg-white rounded-2xl p-3.5 sm:p-5 border-3 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] text-black pointer-events-auto">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] font-black tracking-wider uppercase text-black flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-black" />
                Event Universe
              </span>
              <span className="text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-lg bg-[#FFD600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000]">
                45 Events
              </span>
            </div>

            <h3 className="text-xs sm:text-base font-black text-black leading-snug mb-1">
              Explore 3 Dimensions
            </h3>

            <p className="hidden sm:block text-[11px] text-slate-700 mb-3 font-bold leading-relaxed">
              Explore <span className="font-black bg-[#00F5A0] px-1 border border-black">45 Flagship Arenas</span> across technical, cultural & sports domains.
            </p>

            <div className="hidden sm:block space-y-2 mb-4 text-[11px] font-black">
              <div className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-[#00F5A0]/25 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <span className="flex items-center gap-1.5">💻 <span className="text-black">Technical Domain</span></span>
                <span className="bg-black text-[#00F5A0] px-1.5 py-0.5 rounded text-[9.5px]">20 Events</span>
              </div>
              <div className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-[#7C3AED]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <span className="flex items-center gap-1.5">🎭 <span className="text-black">Cultural Arena</span></span>
                <span className="bg-[#7C3AED] text-white px-1.5 py-0.5 rounded text-[9.5px]">15 Events</span>
              </div>
              <div className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-[#FF5722]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <span className="flex items-center gap-1.5">🎨 <span className="text-black">Creative & E-Sports</span></span>
                <span className="bg-[#FF5722] text-white px-1.5 py-0.5 rounded text-[9.5px]">10 Events</span>
              </div>
            </div>

            <button
              onClick={onOpenEvents}
              className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-black text-[11px] sm:text-xs uppercase tracking-wider border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span>View All 45 Events & Rulebook</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Strip with Spotlight Quick Pills */}
      <footer className="relative z-20 pb-5 px-4 sm:px-8 w-full">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 overflow-x-auto py-1">
          {HIGHLIGHTED_TREE_EVENTS.map((evt) => (
            <button
              key={evt.id}
              onClick={() => handleOpenDetailed(evt.id)}
              className="bg-white hover:bg-[#FFD600] px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-left shrink-0 transition-all cursor-pointer flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <div>
                <span className="text-xs font-black text-black block truncate">
                  {evt.title}
                </span>
                <span className="text-[9px] font-extrabold text-black/70">
                  {evt.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}