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
  Scan,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Container from "../core/Container";

const DOMAINS = [
  { id: "women", title: "Women's Entrepreneurship", icon: Globe, color: "text-blue-500", accent: "bg-blue-500", glow: "shadow-blue-500/20" },
  { id: "health", title: "Health & Wellness", icon: Heart, color: "text-emerald-500", accent: "bg-emerald-500", glow: "shadow-emerald-500/20" },
  { id: "climate", title: "Climate Action", icon: Leaf, color: "text-teal-500", accent: "bg-teal-500", glow: "shadow-teal-500/20" }
];

export default function BookingStatusPage({ slots, occupancy: propOccupancy, onBack, onDelete, onCheckIn }) {
  const [time, setTime] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [highlightId, setHighlightId] = useState("");
  const [confirmedTeam, setConfirmedTeam] = useState(null);
  const [scanError, setScanError] = useState(null);
  const qrScannerRef = useRef(null);
  const lastScannedId = useRef(null);
  const lastScanTime = useRef(0);

  // Sync Timer
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // SCROLL TO HIGHLIGHTED TEAM
  useEffect(() => {
    if (highlightId) {
      const element = document.getElementById(`slot-${highlightId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightId]);

  // AUTO CHECK-IN ON URL REDIRECT (EXTERNAL SCAN)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamIdParam = params.get("teamId");
    if (teamIdParam && Object.keys(slots).length > 0) {
      const upperId = teamIdParam.toUpperCase();
      setHighlightId(upperId);
      
      const allSlots = Object.values(slots).flat();
      const match = allSlots.find(s => s.teamId?.toUpperCase() === upperId);
      if (match && match.docId) {
        if (!match.checkedIn) {
          onCheckIn(match.docId, true);
          setConfirmedTeam(match);
        } else {
          // Already checked in, still show modal but maybe different message
          setConfirmedTeam({ ...match, alreadyIn: true });
        }
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [slots, onCheckIn]);

  // HIGH-PERFORMANCE SCANNER ENGINE
  useEffect(() => {
    let html5QrCode = null;

    if (isScanning) {
      setScanError(null);
      const initScanner = async () => {
        html5QrCode = new Html5Qrcode("reader");
        qrScannerRef.current = html5QrCode;
        try {
          await html5QrCode.start(
            { facingMode: "environment" }, 
            { fps: 30, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0, disableFlip: true },
            (result) => {
              const now = Date.now();
              if (result === lastScannedId.current && now - lastScanTime.current < 2000) return;
              lastScannedId.current = result;
              lastScanTime.current = now;
              handleScanSuccess(result);
            }
          );
        } catch (err) {
          setScanError("CAMERA_ACCESS_DENIED");
          setIsScanning(false);
        }
      };
      const timerId = setTimeout(initScanner, 100);
      return () => {
        clearTimeout(timerId);
        if (html5QrCode) stopAndClear(html5QrCode);
      };
    }
  }, [isScanning]);

  const stopAndClear = async (scanner) => {
    try {
      if (scanner && scanner.isScanning) {
        await scanner.stop();
        scanner.clear();
      }
    } catch (e) {}
  };

  const handleScanSuccess = (result) => {
    try {
      let scannedId = result;
      // Handle URL deep links like ?teamId=C4C-01
      if (result.includes("teamId=")) {
        const url = new URL(result);
        scannedId = url.searchParams.get("teamId") || result;
      }
      
      const cleanId = scannedId.trim().toUpperCase();
      setHighlightId(cleanId);

      // Flatten slots and ensure we have data
      const allSlots = Object.values(slots).flat().filter(s => s.teamId);
      const matchingSlot = allSlots.find(s => 
        s.teamId.trim().toUpperCase() === cleanId || 
        s.transactionId?.trim().toUpperCase() === cleanId
      );
      
      if (matchingSlot && matchingSlot.docId) {
        if (!matchingSlot.checkedIn) {
          onCheckIn(matchingSlot.docId, true);
          setConfirmedTeam(matchingSlot);
        } else {
          setConfirmedTeam({ ...matchingSlot, alreadyIn: true });
        }
        if (window.navigator.vibrate) window.navigator.vibrate(100);
      } else {
        setScanError("INVALID_TICKET");
      }
    } catch (e) {
      console.error("Scan processing failed:", e);
      setScanError("INVALID_TICKET");
    }

    setIsScanning(false);
  };

  const bookedCount = Object.values(slots).flat().filter(s => s.teamId).length;
  const occupancy = propOccupancy || Math.round((bookedCount / 30) * 100);

  return (
      <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20 overflow-x-hidden select-none">
      
      {/* ── STICKY CONTROL HUB ── */}
      <div className="sticky top-0 z-[70] bg-white/90 backdrop-blur-2xl border-b border-slate-200/50 px-3 py-3 md:py-4">
        <div className="w-full flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="SEARCH MANIFEST..."
              value={highlightId}
              onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
              className="w-full bg-slate-100/50 border-none rounded-xl py-3 pl-11 pr-4 text-[10px] md:text-xs font-black tracking-widest uppercase focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            {highlightId && (
              <button onClick={() => setHighlightId("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"><X size={14} /></button>
            )}
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => setIsScanning(true)} className="w-12 h-12 bg-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 shrink-0">
            <Scan size={22} />
          </motion.button>
        </div>
      </div>

      <Container full className="pt-8">
        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
          <div className="col-span-2 bg-slate-900 text-white p-6 md:p-8 rounded-[32px] md:rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Live Occupancy</span>
            <span className="text-4xl md:text-6xl font-black tracking-tighter">{occupancy}%</span>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[48px] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
            <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Sync Time</span>
            <span className="text-xl md:text-2xl font-mono font-bold text-slate-900 leading-none">{time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="bg-emerald-500 text-white p-6 md:p-8 rounded-[32px] md:rounded-[48px] shadow-xl shadow-emerald-500/20 flex flex-col justify-between">
            <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100 mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Operational</span>
            </div>
          </div>
        </div>

        {/* MANIFEST LISTS */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {DOMAINS.map((domain) => (
            <div key={domain.id} className="flex flex-col min-w-0">
              <div className="flex items-center justify-between px-4 mb-6">
                <div className="min-w-0">
                  <h3 className="text-xl font-black tracking-tight uppercase leading-none text-slate-900 truncate">{domain.title}</h3>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 block">Sector Registry</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${domain.accent} animate-pulse shadow-sm shrink-0`} />
              </div>

              <div className="space-y-3">
                {slots[domain.id].map((slot) => {
                  const isHighlighted = highlightId && (
                    slot.teamId?.toUpperCase() === highlightId.toUpperCase() || 
                    slot.teamName?.toUpperCase().includes(highlightId.toUpperCase())
                  );
                  
                  return (
                    <div 
                      key={slot.id}
                      id={slot.teamId ? `slot-${slot.teamId.toUpperCase()}` : `slot-${slot.id}`}
                      className={`
                        flex items-center justify-between p-4 md:p-5 rounded-[24px] md:rounded-[36px] border transition-all duration-300 relative overflow-hidden
                        ${isHighlighted 
                          ? "bg-emerald-500 border-emerald-400 text-white scale-[1.03] shadow-2xl z-10" 
                          : slot.checkedIn
                            ? "bg-emerald-50/80 border-emerald-100 text-slate-900 shadow-sm"
                            : slot.teamId 
                              ? "bg-slate-900 border-slate-800 text-white shadow-xl" 
                              : "bg-slate-50/50 border-slate-100 text-slate-300 border-dashed"
                        }
                      `}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className={`text-[10px] font-mono font-black shrink-0 ${slot.checkedIn ? "text-emerald-500" : isHighlighted ? "text-emerald-200" : "text-slate-500"}`}>#{String(slot.id).padStart(2, '0')}</span>
                        {slot.teamId ? (
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                              <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-wider truncate ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-white" : "text-emerald-400"}`}>{slot.teamId}</span>
                              {slot.checkedIn && <ShieldCheck size={10} className="text-emerald-500 shrink-0" />}
                            </div>
                            <span className={`text-[10px] md:text-[11px] font-bold truncate leading-none ${slot.checkedIn ? "text-slate-900" : "text-white/90"}`}>{slot.teamName}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-10">Standby</span>
                        )}
                      </div>
                      {slot.teamId && (
                        <div className="flex items-center gap-1.5 shrink-0 ml-4">
                          <button onClick={() => onCheckIn(slot.docId, !slot.checkedIn)} className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-500 text-white shadow-lg" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}>
                            <UserCheck size={16} className={slot.checkedIn ? "animate-pulse" : ""} />
                          </button>
                          <button onClick={() => slot.imageUrl && setSelectedImage(slot.imageUrl)} className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}><Activity size={16} /></button>
                          <button onClick={() => onDelete(domain.id, slot.id, slot.docId)} className="w-9 h-9 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
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

      {/* ── CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {confirmedTeam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmedTeam(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-white rounded-[40px] p-10 text-center shadow-2xl overflow-hidden border border-emerald-100">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-inner">
                <CheckCircle2 size={40} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase mb-1">
                {confirmedTeam.alreadyIn ? "Status: Verified" : "Verification OK"}
              </h3>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">Manifest Synchronized</p>
              
              <div className="bg-slate-50 p-6 rounded-[32px] mb-8 border border-slate-100">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Participant Record</span>
                <span className="block text-xl font-black text-slate-900 mb-0.5">{confirmedTeam.teamId}</span>
                <span className="block text-xs font-bold text-slate-500 italic">{confirmedTeam.teamName}</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setConfirmedTeam(null)}
                  className="w-full bg-slate-900 text-white py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Confirm & Continue
                </button>
                <button 
                  onClick={() => {
                    setConfirmedTeam(null);
                    setHighlightId("");
                  }}
                  className="w-full text-slate-400 py-2 text-[8px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors"
                >
                  Return to Manifest View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCANNER MODAL */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsScanning(false)} className="absolute inset-0 bg-slate-900/95 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-black rounded-[48px] p-1 shadow-2xl overflow-hidden">
              <div className="relative aspect-square">
                <div id="reader" className="w-full h-full" />
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/20 rounded-[40px] relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl" />
                    <motion.div animate={{ top: ["10%", "90%", "10%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-4 right-4 h-0.5 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]" />
                  </div>
                </div>
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">Scanner Active</span>
                  </div>
                  <button onClick={() => setIsScanning(false)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white"><X size={18} /></button>
                </div>
              </div>
              <div className="p-8 text-center bg-black border-t border-white/5">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-relaxed">Center mission code within markers<br/>Verification is instantaneous</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {scanError && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-8 left-4 right-4 z-[110] bg-red-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <AlertCircle size={24} />
            <div className="flex-1">
              <p className="font-black uppercase tracking-widest text-[10px]">Verification Failed</p>
              <p className="text-[10px] font-bold opacity-80">
                {scanError === "INVALID_TICKET" ? "This QR code does not match any registered team." : "Camera access failed or was denied."}
              </p>
            </div>
            <button onClick={() => setScanError(null)} className="ml-auto bg-white/20 p-2 rounded-xl"><X size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE PREVIEW */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-lg w-full bg-white rounded-[48px] p-2 shadow-2xl border border-white/10">
              <img src={selectedImage} alt="Verification" className="w-full h-auto rounded-[40px] shadow-lg" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-lg text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl"><X size={24} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
