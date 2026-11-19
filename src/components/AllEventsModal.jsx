import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Laptop,
  Music,
  Gamepad2
} from 'lucide-react';
import { ALL_EVENTS } from '../data/eventsData';

export default function AllEventsModal({ isOpen, onClose, preselectedEventId, onSelectForRegistration }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState(preselectedEventId || null);

  // Sync preselected
  React.useEffect(() => {
    if (preselectedEventId) {
      setExpandedEventId(preselectedEventId);
    }
  }, [preselectedEventId]);

  // Categories
  const categories = ['All', 'Technical', 'Cultural', 'Creative'];

  // Filtered list
  const filteredEvents = useMemo(() => {
    return ALL_EVENTS.filter((evt) => {
      const matchesCategory = activeCategory === 'All' || evt.category === activeCategory;
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F2] rounded-2xl shadow-[8px_8px_0px_0px_#000] border-4 border-black flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b-3 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#00F5A0] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black text-xl">
              45
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-black">
                  Technika 6.0 Event Catalog
                </h3>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-[#FFD600] text-black border border-black shadow-[1px_1px_0px_0px_#000]">
                  Official Brochure
                </span>
              </div>
              <p className="text-xs text-slate-700 font-bold">
                Detailed rules, team requirements & schedules directly from ARKA JAIN University
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FF5722] hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer font-black"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-6 bg-white border-b-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search event, game, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-2 border-black text-xs sm:text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-black hover:text-rose-600 font-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? ALL_EVENTS.length
                  : ALL_EVENTS.filter((e) => e.category === cat).length;
              const isSelected = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border-2 border-black ${
                    isSelected
                      ? 'bg-[#FF5722] text-white shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0px_0px_#000]'
                  }`}
                >
                  {cat === 'Technical' && <Laptop className="w-3.5 h-3.5" />}
                  {cat === 'Cultural' && <Music className="w-3.5 h-3.5" />}
                  {cat === 'Creative' && <Gamepad2 className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded bg-black text-white font-mono"
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Event List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <BookOpen className="w-12 h-12 text-black mx-auto mb-3" />
              <p className="text-base font-black text-black">No events matched your search.</p>
              <p className="text-xs text-slate-600 font-bold mt-1">Try another keyword or category.</p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isExpanded = expandedEventId === evt.id;
              const isFlagship = evt.id === 'web-wizard';

              return (
                <div
                  key={evt.id}
                  className={`rounded-xl transition-all duration-200 border-2 border-black ${
                    isExpanded
                      ? 'bg-white shadow-[4px_4px_0px_0px_#000]'
                      : 'bg-white hover:bg-slate-50 shadow-[2px_2px_0px_0px_#000]'
                  }`}
                >
                  {/* Card Header (Click to expand) */}
                  <div
                    onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm shrink-0 shadow-[1px_1px_0px_0px_#000] ${
                          evt.category === 'Technical'
                            ? 'bg-[#00F5A0] text-black'
                            : evt.category === 'Cultural'
                            ? 'bg-[#7C3AED] text-white'
                            : 'bg-[#FF5722] text-white'
                        }`}
                      >
                        {evt.title.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-black truncate">
                            {evt.title}
                          </h4>
                          {isFlagship && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase tracking-wider">
                              ⭐ Web Wizard Flagship
                            </span>
                          )}
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-black border border-black">
                            {evt.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-bold truncate mt-0.5">
                          {evt.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-3 text-xs font-black text-slate-700">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-black" />
                          {evt.teamSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-black" />
                          {evt.timeLimit}
                        </span>
                      </div>
                      <span className="text-xs font-black text-black bg-[#CCFF00] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                        {isExpanded ? 'Hide' : 'Details'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content View */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t-2 border-black">
                      <p className="text-sm text-black font-semibold leading-relaxed mb-4">
                        {evt.desc}
                      </p>

                      {/* Details Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-slate-100 border-2 border-black text-xs">
                          <span className="text-slate-600 font-bold uppercase block mb-0.5">Team Format</span>
                          <span className="font-black text-black">{evt.teamSize}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-100 border-2 border-black text-xs">
                          <span className="text-slate-600 font-bold uppercase block mb-0.5">Time Allotment</span>
                          <span className="font-black text-black">{evt.timeLimit}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#CCFF00]/30 border-2 border-black text-xs">
                          <span className="text-slate-600 font-bold uppercase block mb-0.5">Registration Fee</span>
                          <span className="font-black text-black">{evt.fee} per student</span>
                        </div>
                      </div>

                      {/* Rules & Guidelines */}
                      <div className="mb-5">
                        <h5 className="text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-black" />
                          Official Rules & Judgement Criteria
                        </h5>
                        <ul className="space-y-1.5">
                          {evt.rules.map((rule, idx) => (
                            <li key={idx} className="text-xs text-black font-bold flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Rulebook Footer Badge */}
                      <div className="flex items-center justify-between pt-3 border-t-2 border-black">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Official Technika 6.0 Rulebook
                        </span>
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#00F5A0] text-black border border-black shadow-[1px_1px_0px_0px_#000]">
                          Verified Arena ✓
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t-3 border-black flex flex-wrap items-center justify-between text-xs text-black font-bold">
          <span>Showing {filteredEvents.length} of {ALL_EVENTS.length} total events</span>
          <span>ARKA JAIN University • Technika 6.0</span>
        </div>
      </div>
    </div>
  );
}
