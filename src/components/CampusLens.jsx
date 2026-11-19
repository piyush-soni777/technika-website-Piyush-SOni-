import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon, 
  Tag, 
  Award, 
  User, 
  Building2, 
  FileText, 
  AtSign, 
  Eye, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCameraShutterSound, playConfettiPopSound } from '../utils/soundEffects';

const PHOTO_CATEGORIES = [
  { id: 'Robo Wars', name: 'Robo Wars ⚔️', color: 'bg-[#FF5722] text-white' },
  { id: 'Concerts & Stage', name: 'Concerts & Stage 🎙️', color: 'bg-[#7C3AED] text-white' },
  { id: 'Runway & Glamour', name: 'Runway & Glamour 👑', color: 'bg-[#E11D48] text-white' },
  { id: 'Campus Life & Sports', name: 'Sports & Tug of War ⚡', color: 'bg-[#00F5A0] text-black font-black' },
  { id: 'Hackathon & Tech', name: 'Hackathon & Tech 💻', color: 'bg-[#FFD600] text-black font-black' },
  { id: 'Campus Candids', name: 'Campus Candids ✨', color: 'bg-[#0EA5E9] text-white' },
];

const DEFAULT_PREVIEW_IMAGE = "/concert/images (1).jpg";

export default function CampusLens() {
  const [formData, setFormData] = useState({
    studentName: '',
    enrollmentNo: '',
    collegeDept: 'School of Engineering & IT',
    category: 'Concerts & Stage',
    caption: '',
    credit: '',
    imageBase64: '',
    fileName: '',
    fileSize: ''
  });

  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PREVIEW_IMAGE);
  const [isCustomUploaded, setIsCustomUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(null);
  const fileInputRef = useRef(null);

  // Handle Image File Selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      alert('File size exceeds 12MB. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result;
      setPreviewUrl(b64);
      setIsCustomUploaded(true);
      playCameraShutterSound();
      setFormData((prev) => ({
        ...prev,
        imageBase64: b64,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit to Python FastAPI backend (with bulletproof localStorage fallback)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentName.trim() || !formData.enrollmentNo.trim()) {
      alert('Please enter your Name and Enrollment / Roll Number.');
      return;
    }

    if (!formData.imageBase64 && !isCustomUploaded) {
      alert('Please upload a photo from your device.');
      return;
    }

    setSubmitting(true);

    const submissionId = `LENS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const uploadDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newRecord = {
      id: Date.now(),
      submission_id: submissionId,
      student_name: formData.studentName,
      enrollment_no: formData.enrollmentNo,
      college_dept: formData.collegeDept,
      category: formData.category,
      caption: formData.caption || 'Campus Fest Moment',
      credit: formData.credit || `@${formData.studentName.toLowerCase().replace(/\s+/g, '')}`,
      image_url: previewUrl,
      upload_date: uploadDate,
      status: 'Shortlisted for Press'
    };

    try {
      // 1. Attempt POST to FastAPI Python backend
      const response = await fetch('http://127.0.0.1:8000/api/photos/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.studentName,
          enrollment_no: formData.enrollmentNo,
          college_dept: formData.collegeDept,
          category: formData.category,
          caption: formData.caption,
          credit: formData.credit,
          image_base64: formData.imageBase64 || previewUrl
        })
      });

      if (response.ok) {
        const resData = await response.json();
        newRecord.submission_id = resData.submission_id || submissionId;
        newRecord.image_url = resData.image_url || previewUrl;
      }
    } catch (err) {
      console.log('FastAPI server running in standalone mode; synced to local vault state.');
    }

    // 2. Always persist to localStorage for instant Admin Portal sync
    const localExisting = JSON.parse(localStorage.getItem('technika_campus_photos') || '[]');
    localExisting.unshift(newRecord);
    localStorage.setItem('technika_campus_photos', JSON.stringify(localExisting));

    setSubmitting(false);
    setSuccessModal(newRecord);
    playCameraShutterSound();

    // Celebration confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FFD600', '#FF5722', '#00F5A0', '#7C3AED']
    });
    playConfettiPopSound();
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      enrollmentNo: '',
      collegeDept: 'School of Engineering & IT',
      category: 'Concerts & Stage',
      caption: '',
      credit: '',
      imageBase64: '',
      fileName: '',
      fileSize: ''
    });
    setPreviewUrl(DEFAULT_PREVIEW_IMAGE);
    setIsCustomUploaded(false);
    setSuccessModal(null);
  };

  return (
    <div id="campus-lens" className="relative w-full pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 bg-[#FFE4E8] text-black select-none">
      {/* Background Dots Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.6px, transparent 1.6px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 mt-2 sm:mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black bg-[#FF5722] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] mb-3">
            <Camera className="w-4 h-4 text-[#FFD600]" />
            <span>CROWDSOURCED PRESS VAULT • TECHNIKA 6.0</span>
            <Sparkles className="w-4 h-4 text-[#FFD600]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Campus Lens <span className="inline-block bg-[#FFD600] text-black px-3.5 py-1 border-3 border-black shadow-[4px_4px_0px_0px_#000] -rotate-1">MEDIA DROP 📸</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-bold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Every camera tells a story! Upload your best clicks from Robo Wars, concerts, runway walks, and campus battles directly to the official university archives for the annual magazine, press coverage, and university website spotlight.
          </p>

          {/* Quick Pillars Ribbon */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-black">
            <span className="px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>📰 Annual Magazine Consideration</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>⚡ Fast-Track PR Cell Access</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>🎖️ Official Photographer Bylines</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
              <span>🗄️ Central University Press Vault</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Upload Form Console (7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_0px_#000]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-black">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#00F5A0] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Upload className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black leading-none">Deposit Fest Clicks</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ARKA JAIN University Media Portal</span>
                </div>
              </div>
              <span className="text-[10px] font-black bg-[#7C3AED] text-white px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                Step 1 of 1
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Student Name & Roll No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider mb-1 text-black flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#FF5722]" />
                    Photographer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Piyush Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm font-bold bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider mb-1 text-black flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
                    Enrollment / Roll No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AJU/24/BCA/042"
                    value={formData.enrollmentNo}
                    onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm font-bold bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Department / College */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider mb-1 text-black flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                  Department / School
                </label>
                <select
                  value={formData.collegeDept}
                  onChange={(e) => setFormData({ ...formData, collegeDept: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm font-bold bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all cursor-pointer"
                >
                  <option value="School of Engineering & IT">School of Engineering & IT (AJU)</option>
                  <option value="Dept of Computer Applications">Dept of Computer Applications (BCA/MCA)</option>
                  <option value="School of Commerce & Management">School of Commerce & Management (BBA/MBA)</option>
                  <option value="School of Health & Allied Sciences">School of Health & Allied Sciences (Pharmacy)</option>
                  <option value="School of Humanities & Law">School of Humanities & Law</option>
                  <option value="Visiting University / College">Visiting University / Guest College</option>
                </select>
              </div>

              {/* Row 3: Event Category Selection */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider mb-2 text-black flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#FFD600]" />
                  Select Fest Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PHOTO_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`px-3 py-2 rounded-xl text-[11px] font-black transition-all cursor-pointer border-2 border-black text-left flex items-center justify-between ${
                        formData.category === cat.id
                          ? `${cat.color} shadow-[3px_3px_0px_0px_#000] scale-[1.02]`
                          : 'bg-[#FAF7F2] hover:bg-slate-100 text-black shadow-none'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {formData.category === cat.id && (
                        <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Drag & Drop File Picker */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5 text-black flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-[#E11D48]" />
                  Upload Photo File (JPG, PNG, WebP • Max 12MB) *
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-3 border-dashed border-black rounded-2xl p-6 text-center bg-[#FAF7F2] hover:bg-[#FFF9E6] transition-all cursor-pointer group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-[#FFD600] border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6 text-black stroke-[2.5]" />
                  </div>
                  <p className="text-xs font-black text-black">
                    {formData.fileName ? (
                      <span className="text-[#059669]">Selected: {formData.fileName} ({formData.fileSize})</span>
                    ) : (
                      <span>Click to Browse or Drag Photo Here</span>
                    )}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">
                    High-resolution original photos preferred for magazine printing
                  </p>
                </div>
              </div>

              {/* Row 5: Caption & Photographer Byline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider mb-1 text-black flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Photo Caption / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Finals Saw-Blade Bot Clash"
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm font-bold bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider mb-1 text-black flex items-center gap-1">
                    <AtSign className="w-3.5 h-3.5 text-[#E11D48]" />
                    Photo Credit / Handle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @piyush.raw or Piyush Photography"
                    value={formData.credit}
                    onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black text-sm font-bold bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#FF5722] hover:bg-[#e64a19] text-white font-black text-sm uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synchronizing with University Vault...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 stroke-[3]" />
                    <span>Deposit to University Media Vault 🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Live Polaroid Press Preview (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
            
            {/* Y2K Digital Camera Press Preview */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-black shadow-[8px_8px_0px_0px_#000] relative">
              
              {/* Press Header Strip */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E11D48] border-2 border-black animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-wider">LIVE DIGITAL CAMERA VIEWFINDER</span>
                </div>
                <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#FFD600] border border-black shadow-[1px_1px_0px_0px_#000]">
                  CANON Y2K • LIVE
                </span>
              </div>

              {/* Real Camera Device Frame (Popping Out to the Right - Extra Grand with Punchy Tilt on Hover) */}
              <div 
                onClick={playCameraShutterSound}
                title="Click to snap shutter! 📸"
                className="relative ml-0 w-[126%] sm:w-[144%] aspect-[568/388] my-4 sm:my-7 select-none transition-all duration-300 ease-out hover:-rotate-6 hover:scale-[1.04] cursor-pointer filter drop-shadow-[6px_12px_24px_rgba(0,0,0,0.32)]"
              >
                {/* 1. Event Photo Inside Camera Screen */}
                <div 
                  className="absolute overflow-hidden bg-black z-0 shadow-inner"
                  style={{
                    left: '7.39%',
                    top: '33.93%',
                    width: '47.01%',
                    height: '51.67%',
                    borderRadius: '5px'
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Live Preview"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: isCustomUploaded ? 'center center' : 'center 12%' }}
                  />

                  {/* Retro Viewfinder OSD Overlays */}
                  <div className="absolute inset-0 pointer-events-none p-1.5 sm:p-2 flex flex-col justify-between text-[7px] sm:text-[9px] font-mono font-black text-white/95 leading-none">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 bg-red-600/90 text-white px-1.5 py-0.5 rounded text-[6.5px] sm:text-[8px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        REC
                      </span>
                      <span className="bg-black/60 px-1.5 py-0.5 rounded text-[7px] sm:text-[8.5px]">
                        🔋 98%
                      </span>
                    </div>

                    {/* Bottom area clear */}
                    <div></div>
                  </div>
                </div>

                {/* 2. Transparent Camera Overlay with Stickers & Bezel */}
                <img
                  src="/camera-frame.png"
                  alt="Camera Body Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10"
                />
              </div>

              {/* Camera Metadata Card */}
              <div className="space-y-2 bg-[#FAF7F2] p-3.5 rounded-2xl border-2 border-black">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-black leading-tight">
                      {formData.caption || 'Fest Captured Moment'}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                      By: <span className="text-black font-black">{formData.studentName || 'Student Photographer'}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#7C3AED] text-white border border-black shrink-0">
                    {formData.enrollmentNo || 'AJU/ID'}
                  </span>
                </div>

                <div className="pt-2 border-t border-black/20 flex items-center justify-between text-[10px] font-extrabold text-slate-600">
                  <span>🏛️ {formData.collegeDept}</span>
                  <span className="text-[#E11D48] font-black">{formData.credit || '@photographer'}</span>
                </div>
              </div>

              {/* Verification Stamp */}
              <div className="mt-3 flex items-center justify-between p-2 px-3 rounded-xl bg-[#FFD600]/25 border-2 border-black text-[10px] font-black">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Eligible for Annual Technika Magazine & Press Coverage</span>
                </span>
                <span className="bg-black text-[#FFD600] px-1.5 py-0.5 rounded text-[8.5px]">SPOTLIGHT</span>
              </div>
            </div>

            {/* University PR Guidelines Card */}
            <div className="bg-[#7C3AED] text-white rounded-2xl p-4 border-3 border-black shadow-[5px_5px_0px_0px_#000]">
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-4 h-4 text-[#FFD600]" />
                <h5 className="text-xs font-black uppercase tracking-wider">How University Selection Works:</h5>
              </div>
              <ul className="text-[10.5px] font-bold text-white/90 space-y-1 list-disc list-inside">
                <li>Photos are automatically curated in the central <strong>Admin Media Vault</strong>.</li>
                <li>University PR Cell reviews submissions for the official <strong>Annual Fest Magazine</strong>.</li>
                <li>Selected student photographers receive official <strong>Certificate of Media Contribution</strong> & byline credit.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-black shadow-[10px_10px_0px_0px_#000] text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-[#00F5A0] border-3 border-black shadow-[4px_4px_0px_0px_#000] mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-black stroke-[3]" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#FFD600] border border-black shadow-[1px_1px_0px_0px_#000]">
              SUBMISSION CODE: {successModal.submission_id}
            </span>

            <h3 className="text-2xl font-black text-black mt-2 mb-1">
              Photo Deposited to Vault! 🎉
            </h3>

            <p className="text-xs font-bold text-slate-700 mb-4">
              Thank you, <span className="font-black text-black">{successModal.student_name}</span>! Your photo from <span className="font-black text-[#FF5722]">{successModal.category}</span> is now indexed in the ARKA JAIN University Media Vault.
            </p>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border-2 border-black mb-5 text-left text-[11px] font-bold space-y-1">
              <div>📁 <strong>Archive ID:</strong> {successModal.submission_id}</div>
              <div>📅 <strong>Timestamp:</strong> {successModal.upload_date}</div>
              <div>🏷️ <strong>Status:</strong> <span className="text-[#059669] font-black">Shortlisted for Press & Magazine</span></div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3 px-5 rounded-xl bg-[#00F5A0] hover:bg-[#00d88d] text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              Upload Another Fest Capture 📸
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
