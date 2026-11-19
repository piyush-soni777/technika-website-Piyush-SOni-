export const TECHNIKA_DETAILS = {
  edition: "6.0",
  title: "TECHNIKA 6.0",
  theme: "AVINYĀ",
  tagline: "Achieving Harmony Through Innovation",
  subTheme: "Multiverse : Hack The Future",
  dates: "20th & 21st November, 2026",
  venue: "ARKA JAIN University, Mohanpur, Gamharia, Jamshedpur, Jharkhand",
  host: "School of Engineering & IT",
  accreditation: "NAAC Grade 'A' Accredited University | Institution's Innovation Council",
  registrationFee: "₹100 per student (applicable for all events)",
  portalUrl: "technika2026.online",
  instagram: "@technika_aju",
  email: "technika@arkajainuniversity.ac.in",
  prizes: {
    winners: "Gold Medal + Winner's Certificate",
    runnersUp: "Silver Medal + Certificate of Achievement",
    specialTitles: "Miss Technika & Mr. Technika Trophy + Certificate",
    groupEvents: "Grand Trophy + Certificates"
  }
};

export const HIGHLIGHTED_TREE_EVENTS = [
  {
    id: "web-wizard",
    title: "Web Wizard",
    category: "Technical",
    teamSize: "Max 2 Members",
    timeLimit: "1.5 Hours",
    hangingIcon: "star",
    badge: "Flagship Event ⭐",
    desc: "Build a responsive, awe-inspiring website based on the Technika 6.0 theme using React, Tailwind or vanilla tech.",
    prize: "Gold Medal + Champion Certificate",
    color: "from-amber-500 to-yellow-600",
    bgTint: "bg-amber-50 border-amber-200"
  },
  {
    id: "robo-wars",
    title: "Robo Wars",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "15-20 Mins",
    hangingIcon: "trophy",
    badge: "Combat Arena ⚔️",
    desc: "Heavyweight combat robot clash! Push opposing robots out of the circular arena or flip them over.",
    prize: "Gold Medal + Champion Trophy",
    color: "from-red-500 to-rose-600",
    bgTint: "bg-rose-50 border-rose-200"
  },
  {
    id: "solo-dance",
    title: "Solo Dance",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "3-5 Mins",
    hangingIcon: "masks",
    badge: "Prismatic Beats 💃",
    desc: "Showcase pure expression, footwork and rhythm in any dance genre on the grand Technika stage.",
    prize: "Gold Medal + Certificate",
    color: "from-purple-500 to-indigo-600",
    bgTint: "bg-purple-50 border-purple-200"
  },
  {
    id: "solo-singing",
    title: "Solo Singing",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "3-5 Mins",
    hangingIcon: "mic",
    badge: "Melodic Mosaic 🎙️",
    desc: "Mesmerize the audience with vocal clarity, pitch accuracy and emotional cadence in Hindi or English.",
    prize: "Gold Medal + Certificate",
    color: "from-blue-500 to-cyan-600",
    bgTint: "bg-blue-50 border-blue-200"
  },
  {
    id: "tug-of-war",
    title: "Tug of War",
    category: "Cultural",
    teamSize: "Max 5 Members",
    timeLimit: "60-90 Seconds",
    hangingIcon: "trophy",
    badge: "Tug of War ⚡",
    desc: "Classic test of raw power, grip, and team synergy. Knockout bracket format on the campus athletic grounds.",
    prize: "Gold Medal + Certificate",
    color: "from-emerald-500 to-teal-600",
    bgTint: "bg-emerald-50 border-emerald-200"
  },
  {
    id: "bgmi",
    title: "BGMI Tournament",
    category: "Creative",
    teamSize: "4 Squad",
    timeLimit: "Erangel Custom",
    hangingIcon: "calendar",
    badge: "Battle Royale 🎮",
    desc: "Survive and conquer Erangel! Tactical coordination, squad synergy and chicken dinner showdown.",
    prize: "Gold Medals + Certificates",
    color: "from-orange-500 to-amber-600",
    bgTint: "bg-orange-50 border-orange-200"
  },
  {
    id: "photography",
    title: "Photography",
    category: "Creative",
    teamSize: "Max 2 Members",
    timeLimit: "Campus Hunt",
    hangingIcon: "camera",
    badge: "Visual Lens 📷",
    desc: "Capture authentic candid moments, emotion and architecture within the lush ARKA JAIN University campus.",
    prize: "Gold Medal + Certificate",
    color: "from-sky-500 to-blue-600",
    bgTint: "bg-sky-50 border-sky-200"
  }
];

export const ALL_EVENTS = [
  // TECHNICAL EVENTS (20)
  {
    id: "web-wizard",
    title: "Web Wizard",
    category: "Technical",
    teamSize: "Max 2 Members",
    timeLimit: "1.5 Hours",
    fee: "₹100",
    desc: "Build a responsive, modern website based on the Technika 6.0 theme. Use modern frameworks like React, Tailwind, Bootstrap, etc.",
    rules: [
      "Use of frontend frameworks allowed (React, Bootstrap, Tailwind, etc.)",
      "Backend optional unless specified",
      "Judgement: UI/UX Design (30%), Core Functionality (30%), Creativity & Innovation (20%), Backend & API (10%), Deployment & Demo (10%)",
      "Time Limit: 1.5 Hours strictly followed"
    ]
  },
  {
    id: "code-buster",
    title: "Code Busters",
    category: "Technical",
    teamSize: "2 Members",
    timeLimit: "3 Rounds (2 Days)",
    fee: "₹100",
    desc: "Three-round frontend coding and problem-solving adventure. Round 1 MCQ, Round 2 replicate HTML/CSS web design (70% match), Round 3 real campus problem-solving demo.",
    rules: [
      "Round 1: 30 MCQs in 15 mins (min 12 marks to qualify)",
      "Round 2: HTML/CSS replica matching 70% of sample layout",
      "Round 3: Problem solving prototype for campus issues",
      "No phones or internet in first two rounds"
    ]
  },
  {
    id: "red-tech",
    title: "Red Tech",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "Exhibition",
    fee: "₹100",
    desc: "Design and present a tech-based hardware prototype. Microcontrollers like Arduino and Raspberry Pi permitted.",
    rules: [
      "Submit block diagram and operational workflow",
      "Working demo preferred",
      "Evaluated on innovation, engineering design, and utility"
    ]
  },
  {
    id: "cyber-shield",
    title: "Cyber Shield",
    category: "Technical",
    teamSize: "2 Members",
    timeLimit: "Timed CTF",
    fee: "₹100",
    desc: "Capture The Flag (CTF) challenges spanning cryptography, web application security, digital forensics, reverse engineering, and network security.",
    rules: [
      "Multiple challenge tiers, each containing an encrypted flag",
      "Scoring based on accuracy, time taken, and challenge difficulty",
      "Live leaderboard ranking determines final winners"
    ]
  },
  {
    id: "app-attack",
    title: "App Attack",
    category: "Technical",
    teamSize: "Max 4 Members",
    timeLimit: "Demo Round",
    fee: "₹100",
    desc: "Develop a mobile app prototype (Android/iOS, Flutter, React Native). Solve real problem statement with sleek UI.",
    rules: [
      "Cross-platform tools and native frameworks allowed",
      "Showcase functional prototype",
      "Evaluated on Innovation (25%), UI/UX (25%), Functionality (25%), Relevance (15%), Presentation (10%)"
    ]
  },
  {
    id: "data-dash",
    title: "Data Dash",
    category: "Technical",
    teamSize: "2-3 Members",
    timeLimit: "Hands-on",
    fee: "₹100",
    desc: "Solve a dataset-based problem using machine learning algorithms and statistical data visualization in Python or R.",
    rules: [
      "Python, R, and open-source ML packages allowed",
      "Output must include clean model and insightful charts",
      "Judged on model precision, visualization, and actionable insights"
    ]
  },
  {
    id: "design-dash",
    title: "Design Dash",
    category: "Technical",
    teamSize: "Individual",
    timeLimit: "Live Challenge",
    fee: "₹100",
    desc: "Create a user interface design based on a problem statement using Figma, Adobe XD, or Canva without pre-built templates.",
    rules: [
      "No templates allowed; design from scratch",
      "Participants must present rationale behind design decisions",
      "Evaluated on design aesthetics, micro-interactions, and usability"
    ]
  },
  {
    id: "robo-wars",
    title: "Robo Wars",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "15-20 Mins per Match",
    fee: "₹100",
    desc: "Battle in a hazard arena! Push the opponent robot out of the circular ring or flip it over in full-contact robotics.",
    rules: [
      "Robot must fit in 50x50x50 cm box at start",
      "Max weight 50 KG, powered electrically only (<= 24V DC)",
      "2 timeouts of 2 mins each allowed per team",
      "Knockout matches leading to Grand Championship"
    ]
  },
  {
    id: "robo-race",
    title: "Robo Race",
    category: "Technical",
    teamSize: "2-3 Members",
    timeLimit: "Time Trial",
    fee: "₹100",
    desc: "Navigate a rugged obstacle course (switch bridge, speed breakers, marble pit, slippery path, rotating disc, sand) in record time.",
    rules: [
      "Max dimensions: 25 x 20 x 15 cm, max weight: 3 kg",
      "Max voltage 20V DC, electrically powered only",
      "Judged on minimum track completion time and checkpoints cleared"
    ]
  },
  {
    id: "robo-pick-place",
    title: "Robo Pick & Place",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "Timed Task",
    fee: "₹100",
    desc: "Pick up wooden cubes (3.5 cm with hook) and accurately place them onto target destinations through obstacle track.",
    rules: [
      "Max dimension: 30x30x30 cm, max weight: 5 kg",
      "No Lego kits allowed; custom fabrication only",
      "Scored on speed, precision placement, and checkpoints"
    ]
  },
  {
    id: "intelliquest",
    title: "Intelliquest",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "2 Hours Prep + 8 Mins Demo",
    fee: "₹100",
    desc: "Develop an innovative, practical technical solution to a surprise problem statement provided at the beginning.",
    rules: [
      "2 hours brainstorming and solution document preparation",
      "Submit brief report in PPT/PDF format",
      "8-minute presentation followed by Q&A with panel"
    ]
  },
  {
    id: "brainstorm-battle",
    title: "Brainstorm Battle",
    category: "Technical",
    teamSize: "Individual",
    timeLimit: "3 Rounds",
    fee: "₹100",
    desc: "High-voltage quiz testing science, engineering, laws, traditions, and general knowledge under intense time pressure.",
    rules: [
      "Preliminary Lap: 10 questions, 30s per question",
      "Semi-Final: Audio-visual clips, 60s clips",
      "Final: Rapid fire round, 5 seconds per question (+10 / -5)"
    ]
  },
  {
    id: "circuit-crafter",
    title: "Circuit Crafter",
    category: "Technical",
    teamSize: "1-3 Members",
    timeLimit: "2.5 Hours",
    fee: "₹100",
    desc: "Assemble, debug, and demonstrate a working breadboard electronic circuit (e.g. automatic street light, alarm, audio amplifier, motion detector).",
    rules: [
      "Basic electronic components provided",
      "No pre-built modules allowed",
      "2.5 hours assembly + 5 minutes demonstration"
    ]
  },
  {
    id: "electrofix-challenge",
    title: "Electrofix Challenge",
    category: "Technical",
    teamSize: "1-3 Members",
    timeLimit: "2 Hours",
    fee: "₹100",
    desc: "Troubleshoot and repair deliberately faulty circuits containing incorrect wiring, damaged components, or logical faults.",
    rules: [
      "Inspect, identify faults, repair and restore proper function",
      "Judged on identification accuracy (40%), correctness (40%), and time efficiency (20%)"
    ]
  },
  {
    id: "junkyard-wars",
    title: "Junkyard Wars",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "Hands-on",
    fee: "₹100",
    desc: "Transform scrap and waste materials into functional engineering models based on surprise problem statement.",
    rules: [
      "Bring scrap materials and basic hand tools",
      "Model must be functional with mechanical mobility",
      "Judged on ingenuity, mobility, and execution"
    ]
  },
  {
    id: "ai-quizathon",
    title: "AI Quizathon",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "2 Hours Total",
    fee: "₹100",
    desc: "Test your mastery over Artificial Intelligence, Machine Learning algorithms, mathematical foundations, and real-world AI applications.",
    rules: [
      "Round 1: Objective MCQs on AI/ML basics (30 mins)",
      "Round 2: Case scenario and algorithm selection (30 mins)",
      "Round 3: Rapid fire round (+10 / -5 marks, 5-10s per question)"
    ]
  },
  {
    id: "eco-ai-challenge",
    title: "Eco AI Challenge",
    category: "Technical",
    teamSize: "1-4 Members",
    timeLimit: "1.5 Hours Dev + 5 Mins Demo",
    fee: "₹100",
    desc: "Leverage AI and data science to tackle environmental sustainability problems (air quality prediction, waste sorting, energy optimization).",
    rules: [
      "Pre-cleaned datasets provided or case studies",
      "Build model and interpret practical ecological impact",
      "Judged on impact (30%), technical rigor (25%), innovation (20%)"
    ]
  },
  {
    id: "project-model-exhibition",
    title: "Project Model Exhibition",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "Full Day Expo",
    fee: "₹100",
    desc: "Showcase working or demonstrative science, society, and engineering models. One page abstract and visual chart required.",
    rules: [
      "Display in exhibition hall with detailed charts & working principles",
      "Round 1: Display evaluation (3 hrs)",
      "Round 2: In-depth technical viva by expert panel (2 hrs)"
    ]
  },
  {
    id: "coding-ladder",
    title: "Coding Ladder",
    category: "Technical",
    teamSize: "Individual",
    timeLimit: "2 Rounds",
    fee: "₹100",
    desc: "LeetCode style DSA coding challenge in C, C++, Java, or Python. Climb the ladder from Easy to Hard test cases.",
    rules: [
      "No AI assistance (ChatGPT, GitHub Copilot strictly forbidden)",
      "Round 1: 1 Easy + 1 Medium problem",
      "Round 2: 1 Hard problem out of 3 choices"
    ]
  },
  {
    id: "load-bridging",
    title: "Load Bridging",
    category: "Technical",
    teamSize: "2-4 Members",
    timeLimit: "2 Days (Build + Load Test)",
    fee: "₹100",
    desc: "Construct a lightweight bridge using only 150-200 ice cream sticks and Fevicol glue that withstands maximum compressive load.",
    rules: [
      "Day 1: 3 hours bridge fabrication",
      "Day 2: Gradual load application until structural failure",
      "Highest load-to-weight ratio wins the event"
    ]
  },

  // CULTURAL EVENTS (15)
  {
    id: "group-ramp-walk",
    title: "Group Ramp Walk",
    category: "Cultural",
    teamSize: "4-8 Members",
    timeLimit: "5-8 Mins",
    fee: "₹100",
    desc: "Theme: 'Elements & Cosmos' (Fire, Water, Earth, Air, Deep Blues, Starry prints). Stunning stage presence, attitude, and costume synchronization.",
    rules: [
      "Qualifying Round: 5 minutes ramp walk matching theme",
      "Final Round: 8 minutes walk + Q&A round for top teams",
      "Judged on costumes, posture, theme adherence, and attitude"
    ]
  },
  {
    id: "solo-ramp-walk",
    title: "Solo Ramp Walk",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "3-5 Mins",
    fee: "₹100",
    desc: "Theme: 'Metamorphosis: Zero-Waste Couture'. Repurposed denim, plastic, and sustainable high-fashion walk.",
    rules: [
      "Showcase zero-waste sustainable clothing",
      "Round 1 qualifying walk (3 mins), Round 2 final walk + Q&A (5 mins)",
      "Judged on outfit creativity, poise, walking stance, and confidence"
    ]
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    category: "Cultural",
    teamSize: "Max 5 Members",
    timeLimit: "Multi-Round Clues",
    fee: "₹100",
    desc: "Exclusively open for Non-AJU students! Solve cryptic clues scattered across the sprawling university campus to uncover the long-lost treasure.",
    rules: [
      "3 knockout elimination rounds of escalating clue difficulty",
      "First team to crack and verify the clue advances",
      "Timed race to the final hidden vault"
    ]
  },
  {
    id: "tug-of-war",
    title: "Tug of War",
    category: "Cultural",
    teamSize: "Max 5 Members",
    timeLimit: "60-90 Seconds",
    fee: "₹100",
    desc: "Classic test of raw power, grip, and team synergy. Knockout bracket format on the campus athletic grounds.",
    rules: [
      "No gloves or anchoring allowed around the rope ends",
      "Whistle start; team pulling red mark across center wins",
      "Round 1: 60s, Final: 90s"
    ]
  },
  {
    id: "sudoku",
    title: "Sudoku Masters",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "Timed PC Test",
    fee: "₹100",
    desc: "High-speed 9x9 matrix numeric puzzle solving on PC. Accuracy, strategic elimination, and deduction.",
    rules: [
      "Up to 3 hints allowed (-5 penalty per hint)",
      "+5 points for every correct cell value",
      "Fastest completion breaks any point ties"
    ]
  },
  {
    id: "fire-free-cooking",
    title: "Fire Free Cooking",
    category: "Cultural",
    teamSize: "2-4 Members",
    timeLimit: "1 Hour",
    fee: "₹100",
    desc: "Healthy, gourmet culinary creations prepared strictly without heating or fuel. Prepare 3 items including 1 beverage.",
    rules: [
      "1 hour preparation; cutting on spot",
      "Vegetarian ingredients only (bread, veggies, fruits, sauces, milk, herbs)",
      "Evaluated on taste balance, hygiene, plating, and beverage quality"
    ]
  },
  {
    id: "solo-singing",
    title: "Solo Singing",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "2-5 Mins",
    fee: "₹100",
    desc: "Theme: 'Melodic Mosaic: A Celebration of Diverse Voices'. Sing in Hindi or English with your own instruments or backing tracks.",
    rules: [
      "Qualifying: 2-3 mins, Final: 4-5 mins",
      "Bring own musical instruments or tracks",
      "Judged on pitch accuracy, rhythm, vocal clarity, and emotional connect"
    ]
  },
  {
    id: "solo-dance",
    title: "Solo Dance",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "3-5 Mins",
    fee: "₹100",
    desc: "Theme: 'Prismatic Beats: The Spectrum of Dance'. Open to classical, contemporary, hip-hop, street, or folk forms.",
    rules: [
      "Submit audio track 1 day prior",
      "Usage of self-arranged props permitted",
      "Evaluated on choreography, footwork, facial expression, and stage dynamism"
    ]
  },
  {
    id: "group-singing",
    title: "Group Singing",
    category: "Cultural",
    teamSize: "2-6 Members",
    timeLimit: "3-5 Mins",
    fee: "₹100",
    desc: "Harmonious choir, acoustic band, or medley performance celebrating musical unity and diverse vocals.",
    rules: [
      "Qualifying 2-3 mins, Final 4-5 mins",
      "Judged on vocal harmony, coordination, musical arrangement, and stage impact"
    ]
  },
  {
    id: "group-dance",
    title: "Group Dance",
    category: "Cultural",
    teamSize: "5-10 Members",
    timeLimit: "3-5 Mins",
    fee: "₹100",
    desc: "Synchronized group performance with electrifying energy, formations, transitions, and theatrical storytelling.",
    rules: [
      "Submit music track 1 day in advance",
      "Proper costumes and creative choreography required",
      "Evaluated on synchronization, stage coverage, expressions, and rhythm"
    ]
  },
  {
    id: "rap",
    title: "Rap Battle",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "2-5 Mins",
    fee: "₹100",
    desc: "Theme: 'Voices of the Future: Rhythm, Reality & Revolution'. Express original rhymes, punchlines, flow, and cadence.",
    rules: [
      "Qualifying: 2-3 mins, Final: 4-5 mins",
      "Judged on lyrical depth, meter, rhythm, delivery, and crowd connect"
    ]
  },
  {
    id: "beat-boxing",
    title: "Beat Boxing",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "2-5 Mins",
    fee: "₹100",
    desc: "Acoustic percussion, basslines, scratching, and sound effects using only the human mouth, lips, and throat.",
    rules: [
      "Strictly no external instruments or sound effects allowed",
      "Judged on rhythm, tempo consistency, sound variety, and technical difficulty"
    ]
  },
  {
    id: "poetry",
    title: "Poetry Recitation",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "4-6 Mins",
    fee: "₹100",
    desc: "Recite poignant verses in Hindi or English (Heritage, Patriotic, Moral themes). Memory, vocal inflection, and poise.",
    rules: [
      "Time limit: 4 to 6 minutes (deductions for time deviations)",
      "No reading allowed; must be recited from memory",
      "Judged on diction, emotional cadence, voice modulation, and approach"
    ]
  },
  {
    id: "story-telling",
    title: "Story Telling",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "3-5 Mins",
    fee: "₹100",
    desc: "Captivate the room with an original narrative, vocal textures, expressions, and dramatic body language in Hindi or English.",
    rules: [
      "Story must have clear beginning, climax, and meaningful resolution",
      "Must be delivered from memory (reading prohibited)",
      "Judged on voice modulation, storytelling flair, and message clarity"
    ]
  },
  {
    id: "art-attack",
    title: "Art Attack",
    category: "Cultural",
    teamSize: "Individual",
    timeLimit: "Live Painting",
    fee: "₹100",
    desc: "Merge ancient Indian tribal art forms (Mandala, Warli, Gond Art) with futuristic sci-fi innovation on canvas.",
    rules: [
      "Bring own canvas, acrylics/watercolors, brushes, and tools",
      "Finished canvas will be retained for exhibition",
      "Judged on precision linework, cultural authenticity, and futuristic vision"
    ]
  },

  // CREATIVE EVENTS (10)
  {
    id: "poster-presentation",
    title: "Poster Presentation",
    category: "Creative",
    teamSize: "Max 2 Members",
    timeLimit: "2 Hours",
    fee: "₹100",
    desc: "Design and present an educational, visually stunning poster based on the Technika 6.0 AVINYĀ theme.",
    rules: [
      "Bring your own chart sheet, pens, markers, and adhesives",
      "No electronic gadgets permitted during poster drawing",
      "Evaluated on creative layout, clarity of technical message, and aesthetics"
    ]
  },
  {
    id: "face-painting",
    title: "Face Painting",
    category: "Creative",
    teamSize: "Max 2 Members",
    timeLimit: "60 Mins",
    fee: "₹100",
    desc: "Transform facial canvas with intricate sci-fi, robotic, or nature harmony motifs aligned with Technika 6.0 theme.",
    rules: [
      "Bring skin-safe cosmetic colors, brushes, and glitters",
      "Time limit 60 minutes strictly enforced",
      "Judged on neatness, thematic resonance, and artistic detailing"
    ]
  },
  {
    id: "pot-painting",
    title: "Pot Painting",
    category: "Creative",
    teamSize: "Individual",
    timeLimit: "1 Hour",
    fee: "₹100",
    desc: "Paint traditional cultural motifs and contemporary patterns on an eco-friendly terracotta clay pot (up to 12 inches).",
    rules: [
      "Bring terracotta clay pot (<= 12 inch height, <= 10 inch dia)",
      "Acrylic or poster colors allowed (no spray paint or pre-made stickers)",
      "Judged on brushwork finishing, color harmony, and theme adherence"
    ]
  },
  {
    id: "photography",
    title: "Photography",
    category: "Creative",
    teamSize: "Max 2 Members",
    timeLimit: "Campus Hours",
    fee: "₹100",
    desc: "Document the atmosphere, candid emotions, and key architectural moments within ARKA JAIN University campus.",
    rules: [
      "Captured on smartphone camera within university premises",
      "Submit up to 3 best JPEG photos (5 MB to 20 MB each)",
      "Strictly no external digital edits, AI retouching, or filters"
    ]
  },
  {
    id: "green-earth-challenge",
    title: "Green Earth Challenge",
    category: "Creative",
    teamSize: "1-3 Members",
    timeLimit: "Campus Craft",
    fee: "₹100",
    desc: "Best Out of Waste! Craft sustainable functional products or eco-friendly models exclusively from discarded items.",
    rules: [
      "Must bring own recyclable and waste materials",
      "Assemble on campus during allotted window (no pre-made models)",
      "Judged on eco impact (20%), practical utility (15%), and creativity (25%)"
    ]
  },
  {
    id: "cricket",
    title: "Gully Cricket League",
    category: "Creative",
    teamSize: "8 Members (Min 2 Girls)",
    timeLimit: "5 Overs per Side",
    fee: "₹100",
    desc: "High-octane short-pitch tennis ball cricket tournament! 5 overs per inning, 1 over reserved for female bowlers.",
    rules: [
      "Cosco tennis ball, short-pitch league format",
      "One drop one hand catch is out",
      "Strict umpire authority with tournament knockout rounds"
    ]
  },
  {
    id: "need-for-speed",
    title: "Need for Speed",
    category: "Creative",
    teamSize: "Individual",
    timeLimit: "Knockout Circuit",
    fee: "₹100",
    desc: "Virtual racing championship! All contenders pilot the iconic BMW M3 GTR with Nitrous & Collision enabled.",
    rules: [
      "Common car for fair play: BMW M3 GTR (Nitrous ON, Collision ON)",
      "Keyboard provided or bring your own controller",
      "Fastest lap and circuit timing advances to Sprint Finals"
    ]
  },
  {
    id: "bgmi",
    title: "BGMI Battlegrounds",
    category: "Creative",
    teamSize: "4 Squad",
    timeLimit: "Custom Room",
    fee: "₹100",
    desc: "Squad survival battle on Erangel! Compete against top collegiate teams in an in-person, networked arena.",
    rules: [
      "Bring own mobile phone/tablet and earphones (mandatory)",
      "Erangel map custom room; squad mode",
      "Strict anti-hack inspection; fair sportsmanship enforced"
    ]
  },
  {
    id: "free-fire",
    title: "Free Fire Clash",
    category: "Creative",
    teamSize: "Max 4 Members",
    timeLimit: "Custom Room",
    fee: "₹100",
    desc: "Fast-paced tactical battle royale! Join custom tournament rooms, secure elimination points, and clinch the Booyah.",
    rules: [
      "Squad mode with registered Free Fire accounts",
      "Points based on match placement and total kill count",
      "Zero tolerance for third-party scripts or exploits"
    ]
  },
  {
    id: "technical-debate",
    title: "Technical Debate",
    category: "Creative",
    teamSize: "Individual",
    timeLimit: "3 Mins Opening + 2 Mins Rebuttal",
    fee: "₹100",
    desc: "Argue cutting-edge tech dilemmas (AI ethics, space colonization, quantum privacy) in Hindi or English.",
    rules: [
      "Topic and stance (For/Against) assigned on the spot with 10 mins prep",
      "Round 1: 3-minute opening argument with technical evidence",
      "Round 2: 2-minute sharp rebuttal and counterpoint defense",
      "Judged on reasoning (30%), technical grasp (20%), and delivery (15%)"
    ]
  }
];
