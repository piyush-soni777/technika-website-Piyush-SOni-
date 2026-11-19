import React, { useState, useEffect, useRef } from 'react';
import { 
  Ticket, 
  Sparkles, 
  QrCode, 
  Download, 
  CheckCircle, 
  Users, 
  AlertCircle, 
  Printer, 
  Share2, 
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { ALL_EVENTS, TECHNIKA_DETAILS } from '../data/eventsData';

export default function RegistrationEngine({ preselectedEventTitle }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    enrollmentNo: '',
    selectedEvent: preselectedEventTitle || 'Web Wizard',
    teamMemberName: '',
  });

  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const ticketRef = useRef(null);

  // Sync preselected event if passed from modal
  useEffect(() => {
    if (preselectedEventTitle) {
      setFormData((prev) => ({ ...prev, selectedEvent: preselectedEventTitle }));
    }
  }, [preselectedEventTitle]);

  // Selected event object
  const currentEvent = ALL_EVENTS.find((e) => e.title === formData.selectedEvent) || ALL_EVENTS[0];
  const isTeamEvent = currentEvent?.teamSize?.toLowerCase().includes('member') && !currentEvent?.teamSize?.toLowerCase().includes('individual');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate Unique Ticket Code
      const eventCode = currentEvent.id.substring(0, 3).toUpperCase();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `TK6-${eventCode}-${randomNum}`;

      // Payload for QR Code
      const qrPayload = JSON.stringify({
        id: ticketId,
        name: formData.fullName,
        college: formData.college,
        event: formData.selectedEvent,
        fee: "PAID - ₹100",
        fest: "TECHNIKA 6.0 AVINYĀ",
        dates: "20-21 Nov 2026"
      });

      // Generate dynamic QR image
      const qrDataUrl = await QRCode.toDataURL(qrPayload, {
        width: 180,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });

      const newTicket = {
        ...formData,
        ticketId,
        dateIssued: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        timestamp: new Date().toISOString()
      };

      setQrCodeUrl(qrDataUrl);
      setGeneratedTicket(newTicket);

      // Save to localStorage for Admin Portal access
      const existing = JSON.parse(localStorage.getItem('technika_registrations') || '[]');
      existing.unshift(newTicket);
      localStorage.setItem('technika_registrations', JSON.stringify(existing));

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (err) {
      console.error('Registration generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="register" className="relative pt-16 sm:pt-20 pb-14 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#7C3AED] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] mb-3">
            <Ticket className="w-4 h-4 text-[#FFD600]" />
            Official Event Registration • 2026
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            Claim Your Pass <span className="inline-block bg-[#FF5722] text-white px-3 py-0.5 border-3 border-black shadow-[3px_3px_0px_0px_#000] -rotate-1">₹100 PASS 🎟️</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-bold text-slate-700">
            Flat ₹100 per student registration applicable across all 45 events. Fill the form to instantly generate your verified digital pass with scanable QR.
          </p>
        </div>

        {/* Live Slot Urgency Ticker */}
        <div className="max-w-3xl mx-auto mb-8 p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-black text-black">
            <Flame className="w-4 h-4 text-[#FF5722] animate-bounce" />
            <span>LIVE AVAILABILITY TRACKER:</span>
          </div>
          <div className="flex items-center gap-2.5 font-black text-black">
            <span className="bg-[#FFD600] px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_0px_#000]">
              Web Wizard: <strong className="text-rose-700">7 spots left</strong>
            </span>
            <span className="bg-[#00F5A0] px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_0px_#000]">
              Robo Wars: <strong className="text-rose-700">4 spots left</strong>
            </span>
            <span className="bg-[#FF5722] text-white px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_0px_#000] hidden sm:inline">
              BGMI: <strong>2 squads left</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Registration Form (Left Column) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border-3 border-black shadow-[6px_6px_0px_0px_#000]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
              <div>
                <h3 className="text-xl font-black text-black">
                  Participant Registration Form
                </h3>
                <p className="text-xs text-slate-700 font-bold mt-0.5">
                  Valid for 20th & 21st November 2026 at ARKA JAIN University
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Entry Fee</span>
                <span className="text-lg font-black bg-[#00F5A0] px-2 py-0.5 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-block">₹100</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Piyush Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ARKA JAIN University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="piyush@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    Student ID / Enrollment No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AJU/24/ENG/019"
                    value={formData.enrollmentNo}
                    onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black mb-1.5 uppercase">
                    Select Event (45 Competitions) *
                  </label>
                  <select
                    value={formData.selectedEvent}
                    onChange={(e) => setFormData({ ...formData, selectedEvent: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {ALL_EVENTS.map((evt) => (
                      <option key={evt.id} value={evt.title}>
                        {evt.title} ({evt.category}) - {evt.teamSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional Team Partner field if team event */}
              {isTeamEvent && (
                <div className="p-3.5 rounded-xl bg-[#CCFF00]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <label className="block text-xs font-black text-black mb-1.5 flex items-center gap-1.5 uppercase">
                    <Users className="w-3.5 h-3.5 text-black" />
                    Team Partner / Member 2 Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Partner Name (or squad leader note)"
                    value={formData.teamMemberName}
                    onChange={(e) => setFormData({ ...formData, teamMemberName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white border-2 border-black text-sm font-bold text-black placeholder-slate-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-black font-extrabold mt-1">
                    Format: {currentEvent.teamSize} • Time: {currentEvent.timeLimit}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-black uppercase tracking-wider text-sm sm:text-base border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>{loading ? 'Generating Pass...' : 'Generate Verified Pass & QR • ₹100'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-700 font-bold pt-1">
                <span>🔒 Spot registration also available on campus</span>
                <span>Carry valid college ID card</span>
              </div>
            </form>
          </div>

          {/* Generated Digital Pass (Right Column) */}
          <div className="lg:col-span-5">
            {generatedTicket ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                {/* Visual Pass Card */}
                <div
                  ref={ticketRef}
                  className="relative rounded-2xl p-6 bg-white text-black border-3 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden"
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-black tracking-widest bg-[#7C3AED] text-white px-2 py-0.5 rounded border border-black uppercase inline-block mb-1">
                        OFFICIAL PARTICIPANT PASS
                      </span>
                      <h4 className="text-2xl font-black tracking-tight text-black">
                        TECHNIKA <span className="text-[#FF5722]">6.0</span>
                      </h4>
                      <p className="text-[11px] text-slate-700 font-extrabold">
                        AVINYĀ • ARKA JAIN University
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] overflow-hidden">
                      <img src="/aju-logo.jpg" alt="ARKA JAIN University" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  {/* Pass Body Info */}
                  <div className="space-y-3 mb-5">
                    <div>
                      <span className="text-[10px] uppercase font-black text-slate-500 block">
                        Participant Name
                      </span>
                      <p className="text-xl font-black text-black">
                        {generatedTicket.fullName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-500 block">
                          Registered Event
                        </span>
                        <p className="text-sm font-black text-black bg-[#FFD600] px-1.5 py-0.5 rounded border border-black truncate">
                          {generatedTicket.selectedEvent}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-500 block">
                          Institution
                        </span>
                        <p className="text-sm font-bold text-black truncate">
                          {generatedTicket.college}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-500 block">
                          Enrollment / ID
                        </span>
                        <p className="text-xs font-mono font-bold text-black">
                          {generatedTicket.enrollmentNo}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-500 block">
                          Dates
                        </span>
                        <p className="text-xs font-black text-black">
                          20-21 Nov 2026
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code and Ticket ID Cutout Footer */}
                  <div className="pt-4 border-t-2 border-dashed border-black flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-black tracking-wider text-slate-600 block">
                        Ticket Verification Code
                      </span>
                      <span className="text-sm font-mono font-black text-black tracking-widest">
                        {generatedTicket.ticketId}
                      </span>
                      <span className="text-[10px] text-black block mt-1 font-black bg-[#00F5A0] px-2 py-0.5 rounded border border-black w-fit">
                        ✓ VERIFIED & PAID (₹100)
                      </span>
                    </div>

                    {qrCodeUrl && (
                      <div className="p-1 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] shrink-0">
                        <img
                          src={qrCodeUrl}
                          alt="Ticket QR Code"
                          className="w-20 h-20 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Pass Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Pass (PDF)</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(generatedTicket.ticketId);
                      alert(`Ticket ID copied: ${generatedTicket.ticketId}`);
                    }}
                    className="p-3.5 rounded-xl bg-white border-2 border-black hover:bg-slate-100 text-black font-black text-xs shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                    title="Copy Ticket ID"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Placeholder Pass Mockup */
              <div className="h-full min-h-[380px] rounded-2xl p-8 border-3 border-dashed border-black bg-white flex flex-col items-center justify-center text-center shadow-[6px_6px_0px_0px_#000]">
                <div className="w-16 h-16 rounded-2xl bg-[#00F5A0] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-black mb-4">
                  <Ticket className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-lg font-black text-black mb-1">
                  Your Digital Pass Will Appear Here
                </h4>
                <p className="text-xs font-bold text-slate-700 max-w-xs leading-relaxed mb-4">
                  Fill in your participant details on the left and submit to instantly render your official Technika 6.0 QR ticket.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-[#FFD600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  Instant QR Admit Card
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
