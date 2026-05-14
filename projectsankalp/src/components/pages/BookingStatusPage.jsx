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
  Search as SearchIcon,
  UserCheck,
  Clock,
  ShieldCheck,
  Scan
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

  // FAST SCANNER LOGIC
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
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20 overflow-x-hidden">
      
      {/* ── TOP NAV BAR (LOGO | SEARCH | SCAN) ── */}
      <div className="sticky top-0 z-[70] bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-2 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-6">
          
          {/* LOGO ONLY BACK BUTTON */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack} 
            className="w-9 h-9 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all shrink-0"
          >
            <ChevronLeft size={18} md:size={20} />
          </motion.button>

          {/* SEARCH BAR (CENTER) */}
          <div className="flex-1 relative min-w-0">
            <SearchIcon size={14} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="SEARCH..."
              value={highlightId}
              onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
              className="w-full bg-slate-100 border-none rounded-xl py-2 md:py-3.5 pl-9 md:pl-12 pr-4 text-[9px] md:text-xs font-black tracking-widest uppercase focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            {highlightId && (
              <button onClick={() => setHighlightId("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                <X size={12} />
              </button>
            )}
          </div>

          {/* SCAN ICON (END) */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsScanning(true)}
            className="w-9 h-9 md:w-12 md:h-12 bg-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all shrink-0"
          >
            <Scan size={18} md:size={20} />
          </motion.button>
        </div>
      </div>

      <Container className="px-3 md:px-8 mx-auto max-w-7xl pt-6 md:pt-8">
        
        {/* ── STATS SECTION ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-12">
          <div className="col-span-2 bg-slate-900 text-white p-5 md:p-8 rounded-[24px] md:rounded-[48px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <span className="block text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Occupancy Rate</span>
            <span className="text-3xl md:text-6xl font-black tracking-tighter">{occupancy}%</span>
          </div>
          
          <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[48px] shadow-xl border border-slate-100 flex flex-col justify-between">
            <span className="block text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Last Sync</span>
            <span className="text-lg md:text-2xl font-mono font-bold text-slate-900">
              {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="bg-emerald-500 text-white p-5 md:p-8 rounded-[24px] md:rounded-[48px] shadow-xl flex flex-col justify-between">
            <span className="block text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100 mb-1">Status</span>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] md:text-xs font-black tracking-widest uppercase">Online</span>
            </div>
          </div>
        </div>

        {/* ── MANIFEST CARDS ── */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="flex flex-col min-w-0 w-full">
              <div className="flex items-center justify-between px-2 md:px-4 mb-4 md:mb-6">
                <div className="min-w-0">
                  <h3 className="text-base md:text-xl font-black tracking-tight uppercase leading-none text-slate-900 truncate">{domain.title}</h3>
                  <span className="text-[7px] md:text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1 block">Sector Registry</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${domain.accent} animate-pulse shrink-0`} />
              </div>

              <div className="space-y-2 md:space-y-3">
                {slots[domain.id].map((slot) => {
                  const isHighlighted = highlightId && (
                    slot.teamId?.toUpperCase() === highlightId.toUpperCase() || 
                    slot.teamName?.toUpperCase().includes(highlightId.toUpperCase())
                  );
                  
                  return (
                    <div 
                      key={slot.id}
                      className={`
                        flex items-center justify-between p-3 md:p-5 rounded-[20px] md:rounded-[32px] border transition-all duration-300 relative overflow-hidden w-full
                        ${isHighlighted 
                          ? "bg-emerald-500 border-emerald-400 text-white scale-[1.02] shadow-2xl z-10" 
                          : slot.checkedIn
                            ? "bg-emerald-50 border-emerald-100 text-slate-900 shadow-sm"
                            : slot.teamId 
                              ? "bg-slate-900 border-slate-800 text-white shadow-xl" 
                              : "bg-slate-50/50 border-slate-100 text-slate-300 border-dashed"
                        }
                      `}
                    >
                      {/* PERFECT MOBILE ALIGNMENT WITH SHRINK PROTECTION */}
                      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                        <span className={`text-[8px] md:text-[10px] font-mono font-black shrink-0 ${slot.checkedIn ? "text-emerald-500" : isHighlighted ? "text-emerald-200" : "text-slate-400"}`}>
                          #{String(slot.id).padStart(2, '0')}
                        </span>
                        
                        {slot.teamId ? (
                          <div className="flex flex-col min-w-0 overflow-hidden">
                            <div className="flex items-center gap-1 mb-0.5 min-w-0">
                              <span className={`text-[8px] md:text-[11px] font-black uppercase tracking-wider truncate ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-white" : "text-emerald-400"}`}>
                                {slot.teamId}
                              </span>
                              {slot.checkedIn && <ShieldCheck size={8} md:size={10} className="text-emerald-500 shrink-0" />}
                            </div>
                            <span className={`text-[8px] md:text-[10px] font-bold truncate leading-none ${slot.checkedIn ? "text-slate-900" : "text-white/90"}`}>
                              {slot.teamName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[8px] font-black uppercase tracking-widest opacity-20">Standby</span>
                        )}
                      </div>
                      
                      {slot.teamId && (
                        <div className="flex items-center gap-1 md:gap-1.5 shrink-0 ml-2">
                          <button 
                            onClick={() => onCheckIn(slot.docId, !slot.checkedIn)}
                            className={`w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                          >
                            <UserCheck size={12} md:size={14} />
                          </button>
                          <button 
                            onClick={() => slot.imageUrl && setSelectedImage(slot.imageUrl)}
                            className={`w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                          >
                            <Activity size={12} md:size={14} />
                          </button>
                          <button 
                            onClick={() => onDelete(domain.id, slot.id, slot.docId)}
                            className="w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={12} md:size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* SCANNER MODAL */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleStopScanner} className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-black rounded-[40px] p-1 shadow-2xl overflow-hidden">
              <div className="relative aspect-square">
                <div id="reader" className="w-full h-full" />
                <div className="absolute inset-0 pointer-events-none border-[20px] md:border-[30px] border-black/40">
                  <div className="w-full h-full border-2 border-emerald-500/50 rounded-xl md:rounded-2xl relative">
                    <motion.div 
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-4 right-4 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]"
                    />
                  </div>
                </div>
                <button onClick={handleStopScanner} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white"><X size={16} /></button>
              </div>
              <div className="p-6 text-center bg-black">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Syncing Mission...</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IMAGE PREVIEW */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-lg w-full bg-white rounded-[32px] md:rounded-[48px] p-2 shadow-2xl">
              <img src={selectedImage} alt="Verification" className="w-full h-auto rounded-[28px] md:rounded-[40px]" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"><X size={20} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
