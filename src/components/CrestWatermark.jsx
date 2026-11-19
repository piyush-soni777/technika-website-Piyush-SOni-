import React from 'react';

export default function CrestWatermark() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center">
      {/* Crisp Neo-Brutalist Dot Matrix Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.6px, transparent 1.6px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* FULL VISIBILITY COLOR CREST (Grand Institutional University Emblem) */}
      <div className="relative w-[750px] sm:w-[950px] md:w-[1100px] lg:w-[1250px] xl:w-[1350px] h-[750px] sm:h-[950px] md:h-[1100px] lg:h-[1250px] xl:h-[1350px] flex items-center justify-center opacity-90 sm:opacity-95 md:opacity-100">
        
        {/* Rotating Outer Typography & Golden Sunburst Ring */}
        <div className="absolute inset-0 animate-[spin_240s_linear_infinite]">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              {/* Circular Path for Top & Bottom Curved Text */}
              <path
                id="crestTextPathTop"
                d="M 120 500 A 380 380 0 1 1 880 500"
                fill="none"
              />
              <path
                id="crestTextPathBottom"
                d="M 880 500 A 380 380 0 1 1 120 500"
                fill="none"
              />

              {/* Rich Golden Metallic Gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              {/* Royal Ribbon Red Gradient */}
              <linearGradient id="royalRedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
            </defs>

            {/* Outer Serrated Sunburst Star Points */}
            <circle
              cx="500"
              cy="500"
              r="485"
              fill="none"
              stroke="#D97706"
              strokeWidth="4"
              strokeDasharray="14 8"
            />

            {/* Thick Golden Circular Ring */}
            <circle
              cx="500"
              cy="500"
              r="465"
              fill="#FFFBEB"
              stroke="#000000"
              strokeWidth="7"
            />

            {/* Inner Border of Typography Track */}
            <circle
              cx="500"
              cy="500"
              r="440"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />

            {/* Bold Outer Circular Accolade Text in Full Color */}
            <text className="text-[23px] font-black uppercase tracking-[10px] fill-black">
              <textPath href="#crestTextPathTop" startOffset="50%" textAnchor="middle">
                ★ ARKA JAIN UNIVERSITY ★ NAAC GRADE 'A' ★ AVINYĀ
              </textPath>
            </text>
            <text className="text-[23px] font-black uppercase tracking-[10px] fill-black">
              <textPath href="#crestTextPathBottom" startOffset="50%" textAnchor="middle">
                ★ TECHNIKA 6.0 ★ OFFICIAL HONOURS & AWARDS ★ 2026
              </textPath>
            </text>

            {/* Inner Concentric Rings */}
            <circle
              cx="500"
              cy="500"
              r="305"
              fill="#FEF3C7"
              stroke="#000000"
              strokeWidth="5"
            />
            <circle
              cx="500"
              cy="500"
              r="285"
              fill="none"
              stroke="#D97706"
              strokeWidth="3.5"
              strokeDasharray="8 6"
            />
            <circle
              cx="500"
              cy="500"
              r="268"
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Static Center Core: Full-Color Laurels, Ribbon & Official University Logo */}
        <div className="relative w-[380px] sm:w-[480px] md:w-[560px] h-[380px] sm:h-[480px] md:h-[560px] flex items-center justify-center">
          <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full fill-none">
            {/* Classical Laurel Wreath Left Wing in Full Golden Radiance */}
            <path
              d="M 140 360 C 90 290, 90 190, 160 110 C 165 135, 145 175, 175 200 C 150 225, 145 275, 190 320 Z"
              fill="url(#goldGradient)"
              stroke="#000000"
              strokeWidth="3.5"
            />
            {/* Classical Laurel Wreath Right Wing */}
            <path
              d="M 360 360 C 410 290, 410 190, 340 110 C 335 135, 355 175, 325 200 C 350 225, 355 275, 310 320 Z"
              fill="url(#goldGradient)"
              stroke="#000000"
              strokeWidth="3.5"
            />
            
            {/* Center Royal Ribbon Banner Arc */}
            <path
              d="M 130 390 Q 250 430 370 390 L 358 424 Q 250 464 142 424 Z"
              fill="url(#royalRedGradient)"
              stroke="#000000"
              strokeWidth="3.5"
            />
            <text 
              x="250" 
              y="420" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              className="text-[14px] font-black uppercase tracking-[4px]"
              stroke="#000000"
              strokeWidth="0.8"
            >
              EXCELLENCE • VIRTUE
            </text>

            {/* 3 Golden Victory Stars At Top Center */}
            <g stroke="#000000" strokeWidth="2.5">
              <polygon points="250,68 256,86 275,86 260,98 265,116 250,104 235,116 240,98 225,86 244,86" fill="#FFD700" />
              <polygon points="210,83 215,98 230,98 218,108 222,123 210,113 198,123 202,108 190,98 205,98" fill="#F59E0B" transform="scale(0.85) translate(28, 12)" />
              <polygon points="290,83 295,98 310,98 298,108 302,123 290,113 278,123 282,108 270,98 285,98" fill="#F59E0B" transform="scale(0.85) translate(40, 12)" />
            </g>
          </svg>

          {/* Official ARKA JAIN University Logo at the Dead Center in 100% Full Color */}
          <div className="w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 rounded-full bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center p-3 overflow-hidden">
            <img
              src="/aju-logo-transparent.png"
              alt="ARKA JAIN University Full Color Emblem"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
