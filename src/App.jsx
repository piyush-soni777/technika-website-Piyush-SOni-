import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EvolutionScroll from './components/EvolutionScroll';
import TreeOfEvents from './components/TreeOfEvents';
import GallerySection from './components/GallerySection';
import ChampionsChest from './components/ChampionsChest';
import CampusLens from './components/CampusLens';
import Footer from './components/Footer';
import AllEventsModal from './components/AllEventsModal';
import AdminPortalModal from './components/AdminPortalModal';
import MarqueeTicker from './components/MarqueeTicker';

export default function App() {
  const [allEventsModalOpen, setAllEventsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState('Web Wizard');

  const handleSelectEventFromTree = (eventId) => {
    setSelectedEventForModal(eventId);
  };

  const handleSelectForRegistration = (eventTitle) => {
    setSelectedEventForRegistration(eventTitle);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] relative">
      {/* Top Navigation */}
      <Navbar
        onOpenEvents={() => {
          setSelectedEventForModal(null);
          setAllEventsModalOpen(true);
        }}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <div className="relative w-full">
        {/* PLATE 1: HERO SECTION (Sticky Base Plate) */}
        <section className="sticky top-0 z-10 w-full h-screen">
          <HeroSection
            onOpenEvents={() => {
              setSelectedEventForModal(null);
              setAllEventsModalOpen(true);
            }}
          />
        </section>

        {/* PLATE 2: EVOLUTION SCROLL (Slides OVER Hero, scrubs 80 frames cleanly) */}
        <section className="relative z-20 w-full shadow-[0_-35px_80px_rgba(0,0,0,0.75)] rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-black">
          <EvolutionScroll />
        </section>

        {/* STANDALONE TICKER LINE: DIRECTLY BETWEEN SECTION 2 & SECTION 3 */}
        <div className="relative z-25 w-full bg-slate-950 border-y-2 border-emerald-400/50 shadow-2xl">
          <MarqueeTicker />
        </div>

        {/* PLATE 3: LIVING TREE OF EVENTS (Snappy 1-2 scroll viewing time) */}
        <section className="sticky top-0 z-30 w-full h-[135vh] shadow-[0_-35px_80px_rgba(0,0,0,0.55)] rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-[#FAF7F2] border-t-4 border-white">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <TreeOfEvents
              onOpenEvents={() => {
                setSelectedEventForModal(null);
                setAllEventsModalOpen(true);
              }}
              onSelectEvent={handleSelectEventFromTree}
            />
          </div>
        </section>

        {/* PLATE 3.5: PARCHMENT MEMORIES GALLERY (Layer 1: Photo Section) */}
        <section className="relative z-35 w-full shadow-[0_-35px_80px_rgba(0,0,0,0.7)] rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-[#EFE3C3] border-t-4 border-black overflow-hidden">
          <GallerySection />
        </section>

        {/* PLATE 4: CHAMPION'S CHEST (Flat Top Edge, No Corner Cut) */}
        <section className="sticky top-0 z-40 w-full h-[130vh] bg-[#FAF7F2]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">
            <ChampionsChest />
          </div>
        </section>

        {/* PLATE 5: CAMPUS LENS CROWDSOURCED PRESS VAULT + NATURAL FOOTER (Slides OVER Champions Chest) */}
        <section className="relative z-50 w-full min-h-screen shadow-[0_-35px_80px_rgba(0,0,0,0.45)] rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-[#FFE4E8] border-t-4 border-black overflow-hidden">
          <CampusLens />
          {/* Footer sits at the natural bottom of the page */}
          <Footer onOpenAdmin={() => setAdminModalOpen(true)} />
        </section>
      </div>

      {/* Modals & Fullscreen Overlays */}
      <AllEventsModal
        isOpen={allEventsModalOpen}
        onClose={() => setAllEventsModalOpen(false)}
        preselectedEventId={selectedEventForModal}
        onSelectForRegistration={handleSelectForRegistration}
      />

      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}