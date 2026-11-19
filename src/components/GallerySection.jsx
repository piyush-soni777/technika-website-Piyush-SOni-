import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  X, 
  Calendar, 
  Tag, 
  Flame, 
  Heart, 
  Award, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Film
} from 'lucide-react';

const GALLERY_MEMORIES = [
  // 1. ROBOTICS (Robo Wars Arena - 6 Photos, robo-1 is featured in "All")
  {
    id: "robo-1",
    title: "Robo Wars Metal Clash",
    edition: "Technika 5.0",
    year: "2024",
    category: "Robotics",
    featuredInAll: true,
    image: "/robo war pic/images.jpg",
    caption: "Flame-spitting battlebots clashing in the high-voltage steel cage ⚔️🔥",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "robo-2",
    title: "Saw-Blade Spinner Bots",
    edition: "Technika 5.0",
    year: "2024",
    category: "Robotics",
    featuredInAll: false,
    image: "/robo war pic/images (1).jpg",
    caption: "High-RPM diamond cutter discs engineered for heavy armor tearing ⚙️",
    tilt: "rotate-1",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "robo-3",
    title: "Arena Wedge Clash",
    edition: "Technika 4.0",
    year: "2023",
    category: "Robotics",
    featuredInAll: false,
    image: "/robo war pic/images (2).jpg",
    caption: "Low-ground wedge flippers launching rivals against the steel perimeter 💥",
    tilt: "-rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "robo-4",
    title: "Heavyweight Armor Showdown",
    edition: "Technika 5.0",
    year: "2024",
    category: "Robotics",
    featuredInAll: false,
    image: "/robo war pic/images (3).jpg",
    caption: "Custom CNC machined chassis built to withstand 1000kg impact shock 🤖",
    tilt: "rotate-2",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "robo-5",
    title: "Pneumatic Lifter Arena Duel",
    edition: "Technika 4.0",
    year: "2023",
    category: "Robotics",
    featuredInAll: false,
    image: "/robo war pic/images (4).jpg",
    caption: "High-pressure pneumatic jaws locking horns in sudden death elimination ⚡",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "robo-6",
    title: "Deathmatch Sparks Flying",
    edition: "Technika 5.0",
    year: "2024",
    category: "Robotics",
    featuredInAll: false,
    image: "/robo war pic/images (5).jpg",
    caption: "Titanium sparks flying under arena stadium floodlights in grand finals 🏆",
    tilt: "rotate-1",
    tagBg: "bg-[#FFD600] text-black font-black"
  },

  // 2. CONCERTS (Live Performances - 6 Photos, concert-4 is featured in "All")
  {
    id: "concert-1",
    title: "Star Night Euphoria",
    edition: "Technika 4.0",
    year: "2023",
    category: "Concerts",
    featuredInAll: false,
    image: "/concert/images (6).jpg",
    caption: "Celebrity artist lighting up the main fest stage with 10,000+ fans roaring 🎙️✨",
    tilt: "rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "concert-2",
    title: "Nritya Natraj Symphony",
    edition: "Technika 5.0",
    year: "2024",
    category: "Concerts",
    featuredInAll: false,
    image: "/concert/images.jpg",
    caption: "Classical Odissi duet captivating the grand university auditorium 🪕",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "concert-3",
    title: "Glamour Night Spotlight",
    edition: "Technika 5.0",
    year: "2024",
    category: "Concerts",
    featuredInAll: false,
    image: "/concert/images (1).jpg",
    caption: "Haute couture evening spotlight performance & student ovations 🌟",
    tilt: "rotate-2",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "concert-4",
    title: "Aarambh '26 Fusion Stage",
    edition: "Technika 5.0",
    year: "2024",
    category: "Concerts",
    featuredInAll: true,
    image: "/concert/images (2).jpg",
    caption: "Royal ethnic ramp walk & musical showcase at ARKA JAIN University 👑",
    tilt: "-rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "concert-5",
    title: "Cyber Neon Electronic Night",
    edition: "Technika 4.0",
    year: "2023",
    category: "Concerts",
    featuredInAll: false,
    image: "/concert/images (3).jpg",
    caption: "Futuristic cyberpunk synthwave soundscape & laser light show ⚡",
    tilt: "rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "concert-6",
    title: "Durga Mahotsav Theatrics",
    edition: "Technika 3.0",
    year: "2022",
    category: "Concerts",
    featuredInAll: false,
    image: "/concert/images (4).jpg",
    caption: "High-octane mythological drama with live percussion & fire glow 🎭🔥",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },

  // 3. HACKATHONS (Hack Horizon & Web Wizard - 6 Photos, hackathon-2 is featured in "All")
  {
    id: "hackathon-1",
    title: "Web Wizard 24H Sprint",
    edition: "Technika 5.0",
    year: "2024",
    category: "Hackathons",
    featuredInAll: false,
    image: "/hackathon/images.jpg",
    caption: "24-Hour continuous coding marathon inside the university computer center 💻⚡",
    tilt: "-rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "hackathon-2",
    title: "Hack Horizon Core Crew",
    edition: "Technika 5.0",
    year: "2024",
    category: "Hackathons",
    featuredInAll: true,
    image: "/hackathon/images (2).jpg",
    caption: "Student leads & faculty coordinators steering the 48-hour innovation hack 🤝",
    tilt: "rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "hackathon-3",
    title: "Leadership & Jury Inception",
    edition: "Technika 4.0",
    year: "2023",
    category: "Hackathons",
    featuredInAll: false,
    image: "/hackathon/images (3).jpg",
    caption: "University Vice-Chancellor, Deans & Industry Judges inaugurating the sprint 🏆",
    tilt: "-rotate-2",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "hackathon-4",
    title: "Women in Tech Dev Sprint",
    edition: "Technika 5.0",
    year: "2024",
    category: "Hackathons",
    featuredInAll: false,
    image: "/hackathon/images (4).jpg",
    caption: "All-women development squad building breakthrough full-stack AI solutions 🚀",
    tilt: "rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "hackathon-5",
    title: "Campus Registration Rush",
    edition: "Technika 4.0",
    year: "2023",
    category: "Hackathons",
    featuredInAll: false,
    image: "/hackathon/images (5).jpg",
    caption: "Hundreds of inter-college engineering teams queuing for verification badges 🎫",
    tilt: "-rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "hackathon-6",
    title: "Hackathon Blueprint Dossier",
    edition: "Technika 5.0",
    year: "2024",
    category: "Hackathons",
    featuredInAll: false,
    image: "/hackathon/z.jpg",
    caption: "Faculty dignitaries reviewing project domains & innovation problem statements 📖",
    tilt: "rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },

  // 4. RUNWAY (Campus Arena & Red Carpet - 6 Photos, runway-1 is featured in "All")
  {
    id: "runway-1",
    title: "Campus Red Carpet Parade",
    edition: "Technika 4.0",
    year: "2023",
    category: "Runway",
    featuredInAll: true,
    image: "/runway/images (2).jpg",
    caption: "Grand ceremonial guard of honor & red-carpet campus march at ARKA JAIN University 🎖️",
    tilt: "rotate-2",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "runway-2",
    title: "Annual Fest Torch Relay",
    edition: "Technika 5.0",
    year: "2024",
    category: "Runway",
    featuredInAll: false,
    image: "/runway/images.jpg",
    caption: "Flame-lit celebratory athletic torch run kicking off fest week 🏃🔥",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "runway-3",
    title: "Inter-Department Tug of War",
    edition: "Technika 4.0",
    year: "2023",
    category: "Runway",
    featuredInAll: false,
    image: "/runway/images (1).jpg",
    caption: "High-adrenaline battle of pure grit, teamwork & campus cheering 🪢⚡",
    tilt: "rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "runway-4",
    title: "Runbhoomi Women's League",
    edition: "Technika 5.0",
    year: "2024",
    category: "Runway",
    featuredInAll: false,
    image: "/runway/images (3).jpg",
    caption: "Fierce penalty kick showdown in the annual inter-college championship ⚽",
    tilt: "-rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "runway-5",
    title: "Techbeast Basketball Duel",
    edition: "Technika 4.0",
    year: "2023",
    category: "Runway",
    featuredInAll: false,
    image: "/runway/images (4).jpg",
    caption: "Fast break buzzer beater layup under the outdoor campus hoops 🏀",
    tilt: "rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "runway-6",
    title: "Championship Court Huddle",
    edition: "Technika 5.0",
    year: "2024",
    category: "Runway",
    featuredInAll: false,
    image: "/runway/images (5).jpg",
    caption: "Tactical timeout strategy & free-throw clutch execution in finals 🏆",
    tilt: "-rotate-2",
    tagBg: "bg-[#FFD600] text-black font-black"
  },

  // 5. E-SPORTS (Gaming & Chess Championship - 6 Photos, esports-1 is featured in "All")
  {
    id: "esports-1",
    title: "BGMI Champions Coronation",
    edition: "Technika 5.0",
    year: "2024",
    category: "E-Sports",
    featuredInAll: true,
    image: "/E-sports/images (4).jpg",
    caption: "Grand champions hoisting the BGMI Battle trophy with AJU Engineering faculty 🏆🔥",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "esports-2",
    title: "4Wings BGMI Battle Series",
    edition: "Technika 6.0",
    year: "2026",
    category: "E-Sports",
    featuredInAll: false,
    image: "/E-sports/images (6).jpg",
    caption: "Official campus gaming tournament partnership with ARKA JAIN University 🎮⚡",
    tilt: "rotate-1",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "esports-3",
    title: "Jharkhand Open Rapid Chess",
    edition: "Technika 5.0",
    year: "2024",
    category: "E-Sports",
    featuredInAll: false,
    image: "/E-sports/images.jpg",
    caption: "5th State Open Chess championship with giant outdoor pieces at AJU Campus ♟️",
    tilt: "-rotate-1",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "esports-4",
    title: "Technika 6.0 Space Station",
    edition: "Technika 6.0",
    year: "2026",
    category: "E-Sports",
    featuredInAll: false,
    image: "/E-sports/images (1).jpg",
    caption: "Interactive tech photo booth & sci-fi arena setup by students 🚀🤖",
    tilt: "rotate-2",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "esports-5",
    title: "College Esports Unleashed",
    edition: "Technika 5.0",
    year: "2024",
    category: "E-Sports",
    featuredInAll: false,
    image: "/E-sports/images (2).jpg",
    caption: "Monster Energy x Nodwin Gaming ₹10,000 inter-college classic showdown ⚡",
    tilt: "-rotate-2",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "esports-6",
    title: "BGMI Solo Elimination Arena",
    edition: "Technika 4.0",
    year: "2023",
    category: "E-Sports",
    featuredInAll: false,
    image: "/E-sports/images (3).jpg",
    caption: "High-stakes lone wolf squad survival matches with ₹12,000 prize pool 🎯",
    tilt: "rotate-1",
    tagBg: "bg-[#FF5722] text-white"
  },

  // 6. CULTURE (Campus Heritage, Arts & Celebrations - 6 Curated Photos, culture-1 is featured in "All")
  {
    id: "culture-1",
    title: "Nritya Natraj Symphony",
    edition: "Technika 5.0",
    year: "2024",
    category: "Culture",
    featuredInAll: true,
    image: "/concert/images.jpg",
    caption: "Classical Odissi & Kathak duet captivating the university cultural auditorium 🪕💃",
    tilt: "rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "culture-2",
    title: "Durga Mahotsav Theatrics",
    edition: "Technika 4.0",
    year: "2023",
    category: "Culture",
    featuredInAll: false,
    image: "/concert/images (4).jpg",
    caption: "High-octane mythological drama with live percussion & fire glow 🎭🔥",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
  {
    id: "culture-3",
    title: "Aarambh Ethnic Heritage",
    edition: "Technika 5.0",
    year: "2024",
    category: "Culture",
    featuredInAll: false,
    image: "/concert/images (2).jpg",
    caption: "Traditional ethnic attire and royal cultural celebration at ARKA JAIN University 👑",
    tilt: "rotate-2",
    tagBg: "bg-[#00F5A0] text-black font-black"
  },
  {
    id: "culture-4",
    title: "Tricolor Guard of Honor",
    edition: "Technika 4.0",
    year: "2023",
    category: "Culture",
    featuredInAll: false,
    image: "/runway/images (2).jpg",
    caption: "Grand ceremonial guard of honor & red-carpet march past ARKA JAIN University 🇮🇳",
    tilt: "-rotate-1",
    tagBg: "bg-[#FFD600] text-black font-black"
  },
  {
    id: "culture-5",
    title: "Technika Creativity Booth",
    edition: "Technika 6.0",
    year: "2026",
    category: "Culture",
    featuredInAll: false,
    image: "/E-sports/images (1).jpg",
    caption: "Handcrafted festive installations & creative photo corner designed by students 🎨",
    tilt: "rotate-1",
    tagBg: "bg-[#7C3AED] text-white"
  },
  {
    id: "culture-6",
    title: "University Cultural Inception",
    edition: "Technika 5.0",
    year: "2024",
    category: "Culture",
    featuredInAll: false,
    image: "/hackathon/images (3).jpg",
    caption: "Vice-Chancellor, faculty leadership & student union inaugurating campus fest week 🌟",
    tilt: "-rotate-2",
    tagBg: "bg-[#FF5722] text-white"
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ['All', 'Robotics', 'Concerts', 'Hackathons', 'Runway', 'E-Sports', 'Culture'];

  // "All" shows exactly 6 curated highlight photos (1 from each main category)
  const filteredMemories = activeCategory === 'All' 
    ? GALLERY_MEMORIES.filter((m) => m.featuredInAll)
    : GALLERY_MEMORIES.filter((m) => m.category === activeCategory);

  return (
    <div id="gallery" className="relative w-full min-h-screen pt-24 sm:pt-32 md:pt-36 pb-0 text-slate-900 select-none bg-transparent rounded-t-[2.5rem] sm:rounded-t-[4rem]">
      {/* FULL-SCREEN BURNT PARCHMENT PAPER BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[4rem]">
        <img
          src="/gallery-parchment.jpg"
          alt="Burnt Parchment Background"
          className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
        />
        {/* Deep Charred Burnt Edges Vignette for authentic full-screen edge-to-edge scroll feel */}
        <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(42,24,16,0.65),inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none rounded-t-[2.5rem] sm:rounded-t-[4rem]"></div>
        {/* Soft warmth overlay to blend seamlessly */}
        <div className="absolute inset-0 bg-[#EFE3C3]/15 mix-blend-multiply pointer-events-none rounded-t-[2.5rem] sm:rounded-t-[4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Section Over Golden Scroll */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Washi-Tape Stamp Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black bg-[#FF5722] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] -rotate-1 mb-3 sm:mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>THE CHRONICLES OF TECHNIKA · 2021-2026</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" />
          </div>

          {/* Main Heading with Golden Glitter Border on Box AND Text Letters */}
          <div>
            <div className="relative inline-block mt-1 sm:mt-2 mb-2">
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2A1810] tracking-tight uppercase leading-none font-serif px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-2xl border-2 sm:border-3 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.55),inset_0_0_15px_rgba(255,215,0,0.2),3px_3px_0px_0px_#2A1810] bg-[#FAF7F2]/85 backdrop-blur-xs select-none"
                style={{
                  WebkitTextStroke: '1.2px #FFD700',
                  textShadow: '0 0 2px #FFF59D, 0 0 8px rgba(255, 215, 0, 0.8), 0 0 18px rgba(255, 180, 0, 0.5)'
                }}
              >
                Hall of Memories
              </h2>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 text-base sm:text-xl font-bold text-[#4E342E] max-w-xl mx-auto font-hand leading-relaxed">
            "Every spark ignited, every beat conquered — relive the iconic moments of past Technika editions framed in timeless parchment."
          </p>

          {/* Category Filter Pills (Handcrafted Neo-Brutalist) */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-black ${
                    isSelected
                      ? 'bg-[#FF5722] text-white shadow-[3px_3px_0px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-black hover:bg-slate-100 shadow-[1.5px_1.5px_0px_0px_#000]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* PHOTO FRAMES SCRAPBOOK GRID - Shifted down for perfect spacing below the header */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {filteredMemories.map((item, idx) => {
            const swayClass = `hanging-frame-${(idx % 3) + 1}`;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`group relative flex flex-col items-center cursor-pointer hover:z-20 ${swayClass}`}
              >
              {/* Vintage Scrapbook Washi-Tape at Top Center */}
              <div className="w-20 h-5 bg-[#FFD600] border border-black shadow-[1.5px_1.5px_0px_0px_#000] -mb-2.5 z-20 -rotate-2 flex items-center justify-center text-[9px] font-black uppercase tracking-widest text-black">
                {item.year}
              </div>

              {/* THE BURNT FLORAL FRAME CONTAINER */}
              <div className="relative aspect-square w-full max-w-[320px] shadow-[6px_8px_20px_rgba(0,0,0,0.45)] group-hover:shadow-[10px_14px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-300 mt-1">
                {/* Real Fest Event Photo Cutout */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute top-[8.5%] left-[8%] w-[84%] h-[83%] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark hover overlay with eye button */}
                <div className="absolute top-[8.5%] left-[8%] w-[84%] h-[83%] rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 z-10">
                  <Maximize2 className="w-6 h-6 text-[#FFD600] drop-shadow mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black px-2.5 py-1 rounded border border-white">
                    Inspect Memory
                  </span>
                </div>

                {/* The Transparent Burnt Floral Frame Overlay on Top */}
                <img
                  src="/photo-frame.png"
                  alt="Burnt Floral Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md z-15"
                />
              </div>

              {/* Handwritten Scrapbook Label Under Frame */}
              <div className="mt-3 text-center px-2">
                <div className="inline-flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000] ${item.tagBg}`}>
                    {item.edition}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-[#2A1810]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5D4037] font-bold font-hand text-sm sm:text-base leading-tight">
                  {item.caption}
                </p>
              </div>
            </div>
          );
        })}
        </div>

        {/* Bottom Parchment Authenticity Stamp */}
        <div className="pt-6 pb-12 sm:pb-16 border-t-2 border-[#8D6E63]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] p-1 overflow-hidden flex items-center justify-center shrink-0">
              <img src="/aju-logo.jpg" alt="ARKA JAIN University" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs font-black text-[#2A1810] block">
                Preserved in University Cultural Archives
              </span>
              <span className="text-[10px] font-bold text-[#5D4037]">
                Official Technika 1.0 to 5.0 Visual Retrospective • ARKA JAIN University
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] text-xs font-black text-black">
            <span>📷 100+ More Photos in Archive Vault</span>
          </div>
        </div>
      </div>

      {/* BURNT PAPER CUT-OFF SECTION DIVIDER (Layer 2: Edge photo) */}
      <div className="relative w-full z-36 pointer-events-none -mb-6 sm:-mb-10 leading-none">
        <img
          src="/gallery-bottom-edge.png"
          alt="Burnt Paper Cut-Off Edge"
          className="w-full h-16 sm:h-24 md:h-28 object-fill drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* LIGHTBOX FULLSCREEN PREVIEW MODAL */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#EFE3C3] rounded-3xl border-4 border-black shadow-[10px_10px_0px_0px_#000] p-5 sm:p-7 overflow-hidden"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white hover:bg-[#FF5722] hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-colors cursor-pointer font-black"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Frame & Photo in Lightbox */}
            <div className="relative aspect-square w-full max-w-[400px] mx-auto mb-4 shadow-2xl">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="absolute top-[8.5%] left-[8%] w-[84%] h-[83%] object-cover rounded-2xl"
              />
              <img
                src="/photo-frame.png"
                alt="Burnt Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-lg z-10"
              />
            </div>

            {/* Lightbox Details */}
            <div className="text-center px-2">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded border border-black ${selectedPhoto.tagBg}`}>
                  {selectedPhoto.edition} ({selectedPhoto.year})
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-black text-white">
                  {selectedPhoto.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#2A1810] mb-1">
                {selectedPhoto.title}
              </h3>
              <p className="text-base sm:text-lg font-bold text-[#5D4037] font-hand max-w-md mx-auto">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
