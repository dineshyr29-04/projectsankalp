import React, { useState, useEffect } from "react";
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
  ShieldCheck
} from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Container from "../core/Container";

const DOMAINS = [
  { 
    id: "women", 
    title: "Women's Entrepreneurship", 
    icon: Globe, 
    color: "text-blue-500",
    accent: "bg-blue-500"
  },
  { 
    id: "health", 
    title: "Health & Sanitation", 
    icon: Heart, 
    color: "text-emerald-500",
    accent: "bg-emerald-500"
  },
  { 
    id: "climate", 
    title: "Climate Action", 
    icon: Leaf, 
    color: "text-teal-500",
    accent: "bg-teal-500"
  }
];

export default function BookingStatusPage({ slots, occupancy: propOccupancy, onBack, onDelete, onCheckIn }) {
  const [time, setTime] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [highlightId, setHighlightId] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Check for teamId in URL to highlight
    const params = new URLSearchParams(window.location.search);
    const teamIdParam = params.get("teamId");
    if (teamIdParam) {
      setHighlightId(teamIdParam);
      // Remove param from URL without refreshing to keep it clean
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => clearInterval(timer);
  }, []);

  // QR Scanner Logic
  useEffect(() => {
    let scanner = null;
    let timeoutId = null;

    if (isScanning) {
      // Small delay to ensure the modal DOM is fully ready
      timeoutId = setTimeout(() => {
        try {
          scanner = new Html5QrcodeScanner("reader", { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            rememberLastUsedCamera: true,
            aspectRatio: 1.0
          });

          scanner.render((result) => {
            try {
              let scannedId = result;
              if (result.includes("teamId=")) {
                const url = new URL(result);
                scannedId = url.searchParams.get("teamId") || result;
              }
              
              const upperId = scannedId.toUpperCase();
              setHighlightId(upperId);

              // Auto Check-in Logic for Admin Scanner
              // Flatten slots to find the docId for this teamId
              const allSlots = Object.values(slots).flat();
              const matchingSlot = allSlots.find(s => s.teamId?.toUpperCase() === upperId);
              
              if (matchingSlot && matchingSlot.docId && !matchingSlot.checkedIn) {
                onCheckIn(matchingSlot.docId, true);
              }

              setIsScanning(false);
              scanner.clear();
            } catch (e) {
              console.error("Auto check-in failed:", e);
              setIsScanning(false);
              scanner.clear();
            }
          }, (err) => {
            // Scanner searching...
          });
        } catch (err) {
          console.error("Scanner init failed:", err);
        }
      }, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scanner) {
        try { scanner.clear(); } catch(e) {}
      }
    };
  }, [isScanning]);

  // Calculate stats
  const totalSlots = 30;
  const bookedCount = Object.values(slots).flat().filter(s => s.teamId).length;
  const occupancy = propOccupancy || Math.round((bookedCount / totalSlots) * 100);

  // CSV Export Logic
  const exportToCSV = () => {
    const allBookings = Object.entries(slots).flatMap(([domainId, domainSlots]) => 
      domainSlots.filter(s => s.teamId).map(s => ({
        timestamp: new Date().toLocaleDateString(),
        teamId: s.teamId,
        teamName: s.teamName,
        sector: domainId,
        transactionId: s.transactionId || "N/A",
        status: "PENDING"
      }))
    );

    if (allBookings.length === 0) return alert("No bookings to export.");

    // Removed Image Link per request
    const headers = ["Timestamp", "Team ID", "Team Name", "Sector", "Transaction ID", "Status"];
    const rows = allBookings.map(b => [
      b.timestamp, 
      b.teamId, 
      b.teamName, 
      b.sector, 
      `="${b.transactionId}"`, // Keeps leading zeros and prevents scientific notation
      b.status
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Sankalp_Manifest_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-100 blur-[150px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 px-6 mx-auto max-w-7xl">
        {/* Navigation */}
        <div className="fixed top-8 left-8 right-8 z-50 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all group active:scale-95"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Manifest</span>
          </motion.button>

          {/* MANUAL SEARCH BAR - EASIER WAY */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 max-w-md w-full relative group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <SearchIcon size={18} />
            </div>
            <input 
              type="text"
              placeholder="SEARCH TEAM ID / NAME..."
              value={highlightId}
              onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
              className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-full py-3 pl-14 pr-6 text-xs font-black tracking-widest uppercase focus:outline-none focus:border-emerald-500/50 transition-all shadow-lg placeholder:text-slate-300"
            />
            {highlightId && (
              <button 
                onClick={() => setHighlightId("")}
                className="absolute inset-y-0 right-6 flex items-center text-slate-300 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsScanning(true)}
              className="flex items-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-full shadow-xl hover:bg-slate-800 transition-all active:scale-95 group font-bold"
            >
              <Camera size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scan Ticket</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={exportToCSV}
              className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-3 rounded-full shadow-xl hover:bg-emerald-700 transition-all active:scale-95 group font-bold"
            >
              <LayoutGrid size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Download Data</span>
            </motion.button>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <h1 className="font-serif text-5xl md:text-8xl font-black tracking-tighter text-slate-900">Manifest.</h1>
            <p className="text-slate-500 mt-4 text-lg font-medium max-w-xl italic">
              Synchronized registry of all orbital docking bays across mission sectors.
            </p>
          </div>
          
          {/* Real-time Stats Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl flex items-center gap-12 border border-slate-800/50">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Occupancy</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{occupancy}%</span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-800" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Sync Pulse</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold tracking-tighter text-emerald-400">
                  {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manifest Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {DOMAINS.map((domain) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] border border-slate-200 p-10 shadow-sm flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-black tracking-tight leading-tight uppercase">{domain.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sector Authority</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${domain.accent} animate-pulse shadow-lg`} />
              </div>

              {/* Slots List */}
              <div className="space-y-4">
                {slots[domain.id].map((slot) => {
                  const isHighlighted = highlightId && (slot.teamId?.toUpperCase() === highlightId.toUpperCase() || slot.teamName?.toUpperCase().includes(highlightId.toUpperCase()));
                  
                  return (
                    <div 
                      key={slot.id}
                      className={`
                        flex items-center justify-between p-5 rounded-3xl border transition-all duration-500 relative overflow-hidden
                        ${isHighlighted 
                          ? "bg-emerald-500 border-emerald-400 text-white scale-105 shadow-[0_20px_50px_rgba(16,185,129,0.3)] ring-4 ring-emerald-500/20" 
                          : slot.checkedIn
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm"
                            : slot.teamId 
                              ? "bg-slate-900 border-slate-800 text-white shadow-lg ring-1 ring-slate-800" 
                              : "bg-slate-50 border-slate-100 text-slate-400 border-dashed"
                        }
                      `}
                    >
                      {/* Check-in Glow Effect */}
                      {slot.checkedIn && (
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                      )}

                      <div className="flex items-center gap-4 relative z-10">
                        <span className={`text-[10px] font-black tracking-widest uppercase ${slot.checkedIn ? "text-emerald-500" : slot.teamId || isHighlighted ? "text-emerald-200" : "text-slate-300"}`}>
                          #{String(slot.id).padStart(2, '0')}
                        </span>
                        {slot.teamId ? (
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-black tracking-wide uppercase leading-none ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-white" : "text-emerald-400"}`}>{slot.teamId}</span>
                              {slot.checkedIn && (
                                <span className="bg-emerald-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase flex items-center gap-1 shadow-sm">
                                  <ShieldCheck size={8} /> Verified
                                </span>
                              )}
                            </div>
                            <span className={`text-xs font-bold truncate max-w-[110px] ${slot.checkedIn ? "text-slate-900" : isHighlighted ? "text-emerald-100" : "text-white"}`}>{slot.teamName}</span>
                            
                            <div className="flex items-center gap-1.5 mt-1 opacity-60">
                              {slot.checkedIn ? <Clock size={8} className="text-emerald-600" /> : <Zap size={8} className={isHighlighted ? "text-white" : "text-emerald-400"} />}
                              <span className={`text-[8px] font-mono tracking-wider font-bold ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-emerald-50" : "text-slate-400"}`}>
                                {slot.checkedIn ? "ARRIVED" : slot.transactionId}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Vacant Bay</span>
                        )}
                      </div>
                      
                      {slot.teamId && (
                        <div className="flex items-center gap-2 relative z-10">
                          {/* Check-in Action Button */}
                          <button
                            onClick={() => onCheckIn(slot.docId, !slot.checkedIn)}
                            className={`
                              w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95
                              ${slot.checkedIn 
                                ? "bg-emerald-500 text-white shadow-lg" 
                                : isHighlighted
                                  ? "bg-white/20 hover:bg-white text-emerald-500"
                                  : "bg-white/5 hover:bg-emerald-500 text-slate-400 hover:text-white"
                              }
                            `}
                            title={slot.checkedIn ? "Unverify Arrival" : "Confirm Arrival"}
                          >
                            <UserCheck size={16} className={slot.checkedIn ? "animate-bounce" : ""} />
                          </button>

                          {/* View Photo Button */}
                          <button
                            onClick={() => {
                              if (slot.imageUrl) setSelectedImage(slot.imageUrl);
                              else alert("Sync Pending...");
                            }}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all group/eye hover:scale-105 active:scale-95 ${slot.checkedIn ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200" : isHighlighted ? "bg-white/20 hover:bg-white/30 text-white" : "bg-white/5 hover:bg-emerald-500 text-slate-400 hover:text-white"}`}
                            title="View Verification"
                          >
                            <Activity size={14} />
                          </button>

                          <button
                            onClick={() => onDelete(domain.id, slot.id, slot.docId)}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all group/trash hover:scale-105 active:scale-95 ${slot.checkedIn ? "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white" : isHighlighted ? "bg-white/10 hover:bg-red-500 text-white" : "bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* SCANNER MODAL */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScanning(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] p-10 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tight leading-tight uppercase">Desk Scanner</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verification Active</span>
                </div>
                <button 
                  onClick={() => setIsScanning(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div id="reader" className="w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-100" />
              
              <div className="mt-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Position the participant's QR code within the frame to verify their mission identity.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white rounded-[48px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedImage} 
                alt="Payment Proof" 
                className="w-full h-auto max-h-[80vh] object-contain bg-slate-100"
              />
              <div className="p-8 text-center bg-white border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Verification Document</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
