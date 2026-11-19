import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Search, 
  Star, 
  Filter, 
  RefreshCw, 
  Camera, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Award,
  Check
} from 'lucide-react';

const SEED_PHOTOS = [
  {
    id: 1,
    submission_id: "LENS-2026-8841",
    student_name: "Arjun Sharma",
    enrollment_no: "AJU/24/BTECH/019",
    college_dept: "School of Engineering & IT",
    category: "Robo Wars",
    caption: "Flame-spitting battlebot clash inside the Technika arena cage!",
    credit: "@arjun.lens",
    image_url: "/robo war pic/images.jpg",
    upload_date: "15 Nov 2026",
    status: "Approved for Magazine"
  },
  {
    id: 2,
    submission_id: "LENS-2026-9214",
    student_name: "Priya Kumari",
    enrollment_no: "AJU/23/BCA/084",
    college_dept: "Dept of Computer Applications",
    category: "Concerts & Stage",
    caption: "Celebrity artist lighting up the auditorium with 10k+ crowd roaring",
    credit: "@priya_clicks",
    image_url: "/concert/images (6).jpg",
    upload_date: "15 Nov 2026",
    status: "Approved for Magazine"
  },
  {
    id: 3,
    submission_id: "LENS-2026-6302",
    student_name: "Farhan Akhtar",
    enrollment_no: "AJU/24/BBA/102",
    college_dept: "School of Commerce & Mgmt",
    category: "Runway & Glamour",
    caption: "Royal ethnic showstopper ramp walk under auditorium spotlights",
    credit: "@farhan_raw",
    image_url: "/concert/images (1).jpg",
    upload_date: "14 Nov 2026",
    status: "Pending Review"
  },
  {
    id: 4,
    submission_id: "LENS-2026-4719",
    student_name: "Tanvi Mishra",
    enrollment_no: "AJU/23/ENG/051",
    college_dept: "School of Engineering & IT",
    category: "Campus Life & Sports",
    caption: "High-voltage Tug of War knockout clash on university grounds!",
    credit: "@tanvi_captures",
    image_url: "/runway/images (1).jpg",
    upload_date: "14 Nov 2026",
    status: "Pending Review"
  }
];

export default function AdminPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'shortlist'
  const [photos, setPhotos] = useState([]);
  const [photoCategory, setPhotoCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  // Load photos from API or fallback to LocalStorage
  useEffect(() => {
    if (isOpen) {
      loadPhotos();
    }
  }, [isOpen]);

  const loadPhotos = async () => {
    setLoadingPhotos(true);
    let loadedFromApi = false;

    try {
      const res = await fetch('http://127.0.0.1:8000/api/photos');
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
          loadedFromApi = true;
        }
      }
    } catch (e) {
      console.log('Using local vault archive storage');
    }

    if (!loadedFromApi) {
      const storedPhotos = JSON.parse(localStorage.getItem('technika_campus_photos') || '[]');
      if (storedPhotos.length === 0) {
        localStorage.setItem('technika_campus_photos', JSON.stringify(SEED_PHOTOS));
        setPhotos(SEED_PHOTOS);
      } else {
        setPhotos(storedPhotos);
      }
    }
    setLoadingPhotos(false);
  };

  if (!isOpen) return null;

  // Toggle Shortlist Status (moves between All and Magazine Shortlist tab!)
  const handleToggleShortlist = async (photoId) => {
    const updated = photos.map((p) => {
      if (p.id === photoId) {
        const isApproved = p.status === 'Approved for Magazine';
        const nextStatus = isApproved ? 'Pending Review' : 'Approved for Magazine';
        return { ...p, status: nextStatus };
      }
      return p;
    });

    setPhotos(updated);
    localStorage.setItem('technika_campus_photos', JSON.stringify(updated));

    // Try sync with backend
    try {
      const targetPhoto = updated.find((p) => p.id === photoId);
      if (targetPhoto) {
        await fetch(`http://127.0.0.1:8000/api/photos/${photoId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: targetPhoto.status })
        });
      }
    } catch (err) {
      // Standalone mode
    }
  };

  // 1-Click High-Res Photo Download
  const handleDownloadPhoto = (photo) => {
    const link = document.createElement('a');
    link.href = photo.image_url;
    link.download = `${photo.submission_id}_${photo.student_name.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all shortlisted photos
  const handleDownloadAllShortlisted = () => {
    const shortlistedList = photos.filter((p) => p.status === 'Approved for Magazine');
    if (shortlistedList.length === 0) {
      alert('No photos in the shortlist yet!');
      return;
    }
    shortlistedList.forEach((p, idx) => {
      setTimeout(() => {
        handleDownloadPhoto(p);
      }, idx * 250);
    });
  };

  // Filtered List
  const displayPhotos = photos.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === 'Approved for Magazine';
    const matchesCat = photoCategory === 'All' || p.category === photoCategory;
    const matchesSearch =
      p.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.enrollment_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.submission_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.caption && p.caption.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesCat && matchesSearch;
  });

  const shortlistedCount = photos.filter((p) => p.status === 'Approved for Magazine').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-[10px_10px_0px_0px_#000] border-4 border-black flex flex-col overflow-hidden text-black">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black text-white flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#00F5A0] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#FFD600]">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">
                  University Media & Press Vault
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#00F5A0] text-black border border-black uppercase tracking-wider">
                  Live Press Vault 🟢
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-bold">
                ARKA JAIN University • Technika 6.0 Central Press & Media Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FF5722] hover:text-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#00F5A0] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer font-black"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 bg-[#FAF7F2] border-b-2 border-black">
          <div className="flex items-center gap-2">
            {/* Tab 1: All Submissions */}
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-t-2 border-x-2 border-black flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-white text-black border-b-2 border-b-white -mb-[2px] shadow-none'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-b-2 border-b-black'
              }`}
            >
              <Camera className="w-4 h-4 text-[#FF5722]" />
              <span>All Submissions ({photos.length})</span>
            </button>

            {/* Tab 2: Magazine Shortlist */}
            <button
              onClick={() => setActiveTab('shortlist')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-t-2 border-x-2 border-black flex items-center gap-2 ${
                activeTab === 'shortlist'
                  ? 'bg-white text-black border-b-2 border-b-white -mb-[2px] shadow-none'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-b-2 border-b-black'
              }`}
            >
              <Star className="w-4 h-4 text-[#FFD600] fill-[#FFD600]" />
              <span>⭐ Magazine Shortlist ({shortlistedCount})</span>
              {shortlistedCount > 0 && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00F5A0] text-black font-black">
                  READY
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {activeTab === 'shortlist' && shortlistedCount > 0 && (
              <button
                onClick={handleDownloadAllShortlisted}
                className="text-[11px] font-black px-3.5 py-1.5 rounded-lg bg-[#00F5A0] hover:bg-[#00d88d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Download All ({shortlistedCount})</span>
              </button>
            )}

            <button
              onClick={loadPhotos}
              className="text-[11px] font-black px-3 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingPhotos ? 'animate-spin' : ''}`} />
              <span>Refresh Vault</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-white border-b-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search photographer, roll no, caption..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border-2 border-black text-xs font-bold text-black placeholder-slate-400 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-0.5">
            {['All', 'Robo Wars', 'Concerts & Stage', 'Runway & Glamour', 'Campus Life & Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setPhotoCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer border-2 border-black shrink-0 ${
                  photoCategory === cat
                    ? 'bg-[#FFD600] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white hover:bg-slate-100 text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PHOTO GRID VIEW */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">
          {displayPhotos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-3 border-black shadow-[5px_5px_0px_0px_#000] p-8 max-w-lg mx-auto">
              {activeTab === 'shortlist' ? (
                <>
                  <Star className="w-12 h-12 text-[#FFD600] fill-[#FFD600] mx-auto mb-3" />
                  <h4 className="text-lg font-black text-black mb-1">No Photos Shortlisted Yet</h4>
                  <p className="text-xs text-slate-600 font-bold mb-4">
                    Go to the <strong>All Submissions</strong> tab and click <strong>"★ Shortlist for Magazine"</strong> on any photo you want to publish in the annual fest magazine!
                  </p>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="px-4 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                  >
                    View All Submissions →
                  </button>
                </>
              ) : (
                <>
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <h4 className="text-base font-black">No submissions found</h4>
                  <p className="text-xs text-slate-600 font-bold">Try selecting 'All' or upload a new photo from the Campus Lens section!</p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayPhotos.map((photo) => {
                const isShortlisted = photo.status === 'Approved for Magazine';

                return (
                  <div
                    key={photo.id || photo.submission_id}
                    className={`bg-white rounded-2xl border-3 border-black p-4 flex flex-col justify-between transition-all ${
                      isShortlisted
                        ? 'shadow-[6px_6px_0px_0px_#00F5A0] ring-2 ring-[#00F5A0]'
                        : 'shadow-[5px_5px_0px_0px_#000]'
                    }`}
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[9.5px] font-black px-2 py-0.5 rounded bg-[#FFD600] text-black border border-black">
                          {photo.submission_id}
                        </span>
                        <span className="text-[9px] font-extrabold text-slate-500">
                          {photo.upload_date}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border-2 border-black bg-slate-900 mb-3 shadow-[2px_2px_0px_0px_#000]">
                        <img
                          src={photo.image_url}
                          alt={photo.caption || "Campus photo"}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: photo.image_url && photo.image_url.includes('images (1).jpg') ? 'center 12%' : 'center center' }}
                        />

                        {/* Category Tag */}
                        <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-black border border-white/30">
                          {photo.category}
                        </div>

                        {/* Status Stamp */}
                        {isShortlisted && (
                          <div className="absolute bottom-2 right-2 bg-[#00F5A0] text-black font-black text-[9px] uppercase px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_#000] rotate-[-2deg]">
                            ★ SHORTLISTED
                          </div>
                        )}
                      </div>

                      {/* Title / Caption */}
                      <h4 className="text-xs font-black text-black leading-snug mb-1 line-clamp-2">
                        "{photo.caption || 'Campus Fest Moment'}"
                      </h4>
                      
                      {/* Photographer Metadata */}
                      <div className="text-[10.5px] font-bold text-slate-700 space-y-0.5 mb-3 bg-[#FAF7F2] p-2.5 rounded-xl border border-black/20">
                        <div>👤 <strong>Photographer:</strong> {photo.student_name}</div>
                        <div>🎓 <strong>Roll No:</strong> {photo.enrollment_no}</div>
                        <div>🏛️ <strong>Dept:</strong> {photo.college_dept}</div>
                        {photo.credit && <div>📷 <strong>Credit:</strong> {photo.credit}</div>}
                      </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="pt-2 border-t border-black/20 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleShortlist(photo.id)}
                        className={`text-[9.5px] font-black px-2.5 py-1.5 rounded-lg border-2 border-black transition-all cursor-pointer flex items-center gap-1 ${
                          isShortlisted
                            ? 'bg-[#00F5A0] text-black shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-white hover:bg-slate-100 text-black shadow-none'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${isShortlisted ? 'fill-black' : ''}`} />
                        <span>{isShortlisted ? '★ Shortlisted' : '☆ Shortlist for Magazine'}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadPhoto(photo)}
                        className="text-[9.5px] font-black px-3 py-1.5 rounded-lg bg-[#FF5722] hover:bg-[#e64a19] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Download className="w-3 h-3 stroke-[2.5]" />
                        <span>High-Res</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-black flex items-center justify-between text-xs text-black font-bold">
          <span>ARKA JAIN University • Media & PR Committee</span>
          <span className="text-[#059669]">
            {shortlistedCount} photo{shortlistedCount === 1 ? '' : 's'} approved for annual magazine
          </span>
        </div>
      </div>
    </div>
  );
}
