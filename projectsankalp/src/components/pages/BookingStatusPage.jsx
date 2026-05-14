import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Globe, 
  Heart, 
  Leaf,
  Activity,
  LayoutGrid,
  Trash2,
  X,
  Zap,
  Camera,
  Search as SearchIcon,
  UserCheck,
  Clock,
  ShieldCheck,
  Scan,
  Maximize2
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Container from "../core/Container";

const DOMAINS = [
  { 
    id: "women", 
    title: "Women's Entrepreneurship", 
    icon: Globe, 
    color: "text-blue-500",
    accent: "bg-blue-500",
    glow: "shadow-blue-500/20"
  },
  { 
    id: "health", 
    title: "Health & Wellness", 
    icon: Heart, 
    color: "text-emerald-500",
    accent: "bg-emerald-500",
    glow: "shadow-emerald-500/20"
  },
  { 
    id: "climate", 
    title: "Climate Action", 
    icon: Leaf, 
    color: "text-teal-500",
    accent: "bg-teal-500",
    glow: "shadow-teal-500/20"
  }
];

export default function BookingStatusPage({ slots, occupancy: propOccupancy, onBack, onDelete, onCheckIn }) {
  const [time, setTime] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [highlightId, setHighlightId] = useState("");
  const qrScannerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // AUTO CHECK-IN ON URL REDIRECT
    const params = new URLSearchParams(window.location.search);
    const teamIdParam = params.get("teamId");
    if (teamIdParam) {
      const upperId = teamIdParam.toUpperCase();
      setHighlightId(upperId);
      const allSlots = Object.values(slots).flat();
      const match = allSlots.find(s => s.teamId?.toUpperCase() === upperId);
      if (match && match.docId && !match.checkedIn) {
        onCheckIn(match.docId, true);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => clearInterval(timer);
  }, [slots, onCheckIn]);

  // PROFESSIONAL SCANNER LOGIC
  useEffect(() => {
    if (isScanning) {
      const startScanner = async () => {
        const html5QrCode = new Html5Qrcode("reader");
        qrScannerRef.current = html5QrCode;

        try {
          await html5QrCode.start(
            { facingMode: "environment" }, 
            { fps: 24, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
            (result) => {
              let scannedId = result;
              if (result.includes("teamId=")) {
                const url = new URL(result);
                scannedId = url.searchParams.get("teamId") || result;
              }
              const upperId = scannedId.toUpperCase();
              setHighlightId(upperId);
              const allSlots = Object.values(slots).flat();
              const matchingSlot = allSlots.find(s => s.teamId?.toUpperCase() === upperId);
              if (matchingSlot && matchingSlot.docId && !matchingSlot.checkedIn) {
                onCheckIn(matchingSlot.docId, true);
              }
              handleStopScanner();
            }
          );
        } catch (err) {
          console.error("Scanner Error:", err);
        }
      };
      startScanner();
    }
    return () => { if (qrScannerRef.current) handleStopScanner(); };
  }, [isScanning, slots, onCheckIn]);

  const handleStopScanner = async () => {
    if (qrScannerRef.current && qrScannerRef.current.isScanning) {
      await qrScannerRef.current.stop();
    }
    setIsScanning(false);
  };

  const bookedCount = Object.values(slots).flat().filter(s => s.teamId).length;
  const occupancy = propOccupancy || Math.round((bookedCount / 30) * 100);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white pb-24">
      
      {/* ── PREMIUM HEADER CONTROL BAR ── */}
      <div className="sticky top-0 z-[70] bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack} 
            className="flex items-center gap-2 bg-slate-900 text-white px-4 md:px-6 py-3 rounded-2xl shadow-xl shadow-slate-900/10 transition-all"
          >
            <ChevronLeft size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Hub</span>
          </motion.button>

          <div className="flex-1 relative max-w-lg group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <SearchIcon size={16} />
            </div>
            <input 
              type="text"
              placeholder="SEARCH MISSION MANIFEST..."
              value={highlightId}
              onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
              className="w-full bg-slate-100/50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl py-3.5 pl-14 pr-6 text-[10px] font-black tracking-[0.2em] uppercase focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-inner"
            />
            {highlightId && (
              <button onClick={() => setHighlightId("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500">
                <X size={16} />
              </button>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsScanning(true)}
            className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
          >
            <Scan size={24} />
          </motion.button>
        </div>
      </div>

      <Container className="pt-12 px-6 md:px-12 mx-auto max-w-7xl">
        
        {/* ── MISSION OVERVIEW SECTION ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="relative">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block"
            >
              System Registry Alpha
            </motion.span>
            <h1 className="font-serif text-6xl md:text-9xl font-black tracking-tighter text-slate-900 leading-none">
              Manifest<span className="text-emerald-500">.</span>
            </h1>
            <p className="text-slate-400 mt-6 text-lg md:text-2xl font-medium italic max-w-lg leading-relaxed">
              Real-time synchronization of mission sectors and team deployments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 text-white p-8 rounded-[48px] shadow-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-all" />
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Occupancy</span>
              <span className="text-5xl font-black tracking-tighter">{occupancy}%</span>
            </div>
            <div className="bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Sync Pulse</span>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-2xl font-mono font-bold text-slate-900 leading-none">
                  {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTOR GRIDS ── */}
        <div className="grid lg:grid-cols-3 gap-10">
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="relative group">
              <div className={`absolute inset-0 ${domain.accent}/5 blur-[80px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <div className="bg-white rounded-[56px] border border-slate-200/60 p-10 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                <div className="flex items-center justify-between mb-16">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase leading-none text-slate-900 mb-2">{domain.title}</h3>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Sector Authority</span>
                  </div>
                  <div className={`w-14 h-14 rounded-3xl ${domain.accent} text-white flex items-center justify-center shadow-2xl ${domain.glow}`}>
                    <domain.icon size={28} />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  {slots[domain.id].map((slot) => {
                    const isHighlighted = highlightId && (
                      slot.teamId?.toUpperCase() === highlightId.toUpperCase() || 
                      slot.teamName?.toUpperCase().includes(highlightId.toUpperCase())
                    );
                    
                    return (
                      <motion.div 
                        key={slot.id}
                        layout
                        className={`
                          flex items-center justify-between p-6 rounded-[32px] border transition-all duration-500 relative overflow-hidden
                          ${isHighlighted 
                            ? "bg-emerald-500 border-emerald-400 text-white scale-[1.05] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] z-20" 
                            : slot.checkedIn
                              ? "bg-emerald-50/50 border-emerald-100 text-slate-900 shadow-sm"
                              : slot.teamId 
                                ? "bg-slate-900 border-slate-800 text-white shadow-xl ring-1 ring-white/5" 
                                : "bg-slate-50/30 border-slate-100 text-slate-300 border-dashed"
                          }
                        `}
                      >
                        <div className="flex items-center gap-5 relative z-10">
                          <span className={`text-[10px] font-black font-mono tracking-widest ${slot.checkedIn ? "text-emerald-500" : isHighlighted ? "text-emerald-200" : "text-slate-400"}`}>
                            #{String(slot.id).padStart(2, '0')}
                          </span>
                          {slot.teamId ? (
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-black uppercase tracking-wider leading-none ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-white" : "text-emerald-400"}`}>{slot.teamId}</span>
                                {slot.checkedIn && (
                                  <div className="flex items-center gap-1 bg-emerald-500 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
                                    <ShieldCheck size={8} /> OK
                                  </div>
                                )}
                              </div>
                              <span className={`text-[11px] font-black truncate max-w-[120px] leading-tight ${slot.checkedIn ? "text-slate-900" : isHighlighted ? "text-white" : "text-white/80"}`}>{slot.teamName}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-10">Standby</span>
                          )}
                        </div>
                        
                        {slot.teamId && (
                          <div className="flex items-center gap-1.5 relative z-10">
                            <button 
                              onClick={() => onCheckIn(slot.docId, !slot.checkedIn)}
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-500 text-white shadow-lg" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                            >
                              <UserCheck size={16} className={slot.checkedIn ? "animate-pulse" : ""} />
                            </button>
                            <button 
                              onClick={() => slot.imageUrl && setSelectedImage(slot.imageUrl)}
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                            >
                              <Activity size={16} />
                            </button>
                            <button 
                              onClick={() => onDelete(domain.id, slot.id, slot.docId)}
                              className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* ── PROFESSIONAL SCANNER INTERFACE ── */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={handleStopScanner} 
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-3xl" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 30 }} 
              className="relative w-full max-w-lg bg-black rounded-[64px] p-1 shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden rounded-[60px] bg-slate-900">
                {/* Viewfinder Overlay */}
                <div id="reader" className="w-full h-full object-cover" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                  <div className="w-64 h-64 border-2 border-white/30 rounded-[48px] relative">
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl" />
                    
                    {/* Scanning Laser Line */}
                    <motion.div 
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-4 right-4 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] z-20"
                    />
                  </div>
                </div>

                {/* Control Overlay */}
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-30">
                  <div>
                    <h3 className="text-white text-xl font-black tracking-tighter uppercase leading-none mb-1">Optical Scan</h3>
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Syncing...</span>
                  </div>
                  <button onClick={handleStopScanner} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-10 text-center">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-relaxed">
                  Align Team ID code within the<br/>emerald focal markers.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── IMAGE PREVIEW MODAL ── */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-lg w-full bg-black rounded-[64px] p-2 shadow-2xl border border-white/10">
              <img src={selectedImage} alt="Verification" className="w-full h-auto rounded-[60px]" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
