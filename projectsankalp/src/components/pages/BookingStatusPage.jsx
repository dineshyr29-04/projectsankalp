import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Search as SearchIcon,
  X,
  CheckCircle2,
  Scan,
  Download,
  ShieldCheck,
  UserCheck,
  Activity,
  Trash2,
  Filter,
  BarChart3,
  Calendar,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Container from "../core/Container";

const DOMAINS = [
  { id: "women", title: "Women's Entr.", color: "text-blue-500", accent: "bg-blue-500" },
  { id: "health", title: "Health & Sanit.", color: "text-emerald-500", accent: "bg-emerald-500" },
  { id: "climate", title: "Climate Action", color: "text-teal-500", accent: "bg-teal-500" },
];

export default function BookingStatusPage({
  slots,
  onBack,
  onCheckIn,
  onDelete,
  onUpdatePayment,
  onNavigate,
  occupancy: propOccupancy,
}) {
  const [highlightId, setHighlightId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [confirmedTeam, setConfirmedTeam] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // "", "verified", "pending", "checked"
  const [domainFilter, setDomainFilter] = useState(""); // "", "women", "health", "climate"
  const [sortBy, setSortBy] = useState("id"); // "id", "name", "time"
  const scannerRef = useRef(null);

  // ── SCANNER LOGIC ──
  useEffect(() => {
    if (isScanning) {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 30, qrbox: { width: 250, height: 250 } },
          handleScanSuccess,
          (err) => {}
        )
        .catch((err) => {
          console.error("Scanner failed:", err);
          setScanError("CAMERA_ACCESS_DENIED");
          setIsScanning(false);
        });

      return () => {
        stopAndClear(html5QrCode);
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

  // ── FILTERING & SORTING LOGIC ──
  const getFilteredSlots = (domainId) => {
    let domainSlots = slots[domainId] || [];

    // Filter by Search
    if (highlightId) {
      domainSlots = domainSlots.filter(
        (s) =>
          s.teamId?.toUpperCase().includes(highlightId) ||
          s.teamName?.toUpperCase().includes(highlightId) ||
          s.transactionId?.toUpperCase().includes(highlightId)
      );
    }

    // Filter by Status
    if (statusFilter === "verified") {
      domainSlots = domainSlots.filter((s) => s.paymentVerified);
    } else if (statusFilter === "pending") {
      domainSlots = domainSlots.filter((s) => s.teamId && !s.paymentVerified);
    } else if (statusFilter === "checked") {
      domainSlots = domainSlots.filter((s) => s.checkedIn);
    }

    // Filter by Domain (if using global domainFilter)
    if (domainFilter && domainFilter !== "" && domainId !== domainFilter) {
      return []; // Hide if it doesn't match global filter
    }

    // NEW: Remove empty "Standby" slots since there is no limit
    domainSlots = domainSlots.filter(s => s.teamId);

    // Sort
    return [...domainSlots].sort((a, b) => {
      if (!a.teamId) return 1;
      if (!b.teamId) return -1;

      if (sortBy === "name") return a.teamName.localeCompare(b.teamName);
      if (sortBy === "time") {
        const timeA = a.checkInTime?.seconds || 0;
        const timeB = b.checkInTime?.seconds || 0;
        return timeB - timeA;
      }
      return a.teamId.localeCompare(b.teamId);
    });
  };

  const handleScanSuccess = (result) => {
    try {
      let scannedId = result;
      if (result.includes("teamId=")) {
        const url = new URL(result);
        scannedId = url.searchParams.get("teamId") || result;
      }
      const cleanId = scannedId.trim().toUpperCase();
      setHighlightId(cleanId);

      const allSlots = Object.values(slots).flat().filter(s => s.teamId);
      const matchingSlot = allSlots.find(
        (s) => s.teamId.toUpperCase() === cleanId || s.transactionId?.toUpperCase() === cleanId
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
      setScanError("SCAN_FAILED");
    }
    setIsScanning(false);
  };

  const bookedCount = Object.values(slots).flat().filter((s) => s.teamId).length;
  const verifiedCount = Object.values(slots).flat().filter((s) => s.paymentVerified).length;
  const checkedInCount = Object.values(slots).flat().filter((s) => s.checkedIn).length;
  const occupancy = propOccupancy || Math.round((bookedCount / 30) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* ── STICKY CONTROL HUB ── */}
      <div className="sticky top-0 z-[70] bg-slate-900/80 backdrop-blur-2xl border-b border-white/5 px-4 py-4 md:py-6 shadow-2xl">
        <div className="w-full flex flex-col lg:flex-row items-center gap-6">
          {/* Header & Search */}
          <div className="flex-1 w-full flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-12 h-12 bg-white text-slate-950 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all shrink-0"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 relative group">
              <SearchIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="SEARCH MANIFEST (ID, NAME, UTR)..."
                value={highlightId}
                onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-12 text-[11px] font-black tracking-[0.2em] uppercase focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none transition-all text-white placeholder:text-white/10"
              />
              {highlightId && (
                <button onClick={() => setHighlightId("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            <button onClick={() => onNavigate && onNavigate("payment")} className="h-14 px-6 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 whitespace-nowrap">
              <ShieldCheck size={18} />
              <span>Payment Desk</span>
            </button>
            <button onClick={() => onNavigate && onNavigate("registration")} className="h-14 px-6 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 whitespace-nowrap">
              <UserCheck size={18} />
              <span>Reg. Desk</span>
            </button>
            <button onClick={() => setIsScanning(true)} className="w-14 h-14 bg-white text-slate-950 rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shrink-0">
              <Scan size={22} />
            </button>
            <button 
              onClick={() => {
                const allTeams = Object.entries(slots).flatMap(([domain, teams]) => teams.filter(t => t.teamId).map(t => ({ ...t, domain })));
                import("../../utils/excelExport").then(m => m.exportRegistrationCheckIn(allTeams));
              }}
              className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 shrink-0"
            >
              <Download size={22} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20 mr-2">
            <Filter size={12} />
            <span>Directives</span>
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-emerald-500/50 transition-all cursor-pointer hover:bg-white/10"
          >
            <option value="" className="bg-slate-900">All Status</option>
            <option value="verified" className="bg-slate-900">Verified Only</option>
            <option value="pending" className="bg-slate-900">Pending Only</option>
            <option value="checked" className="bg-slate-900">Checked-In</option>
          </select>

          <select 
            value={domainFilter} 
            onChange={(e) => setDomainFilter(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-emerald-500/50 transition-all cursor-pointer hover:bg-white/10"
          >
            <option value="" className="bg-slate-900">All Sectors</option>
            {DOMAINS.map(d => <option key={d.id} value={d.id} className="bg-slate-900">{d.title}</option>)}
          </select>

          <div className="h-4 w-px bg-white/5 mx-2 hidden sm:block" />

          <div className="flex-1 flex justify-end gap-6 items-center">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Occupancy</span>
              <span className="text-sm font-black text-emerald-500 tracking-tighter">{occupancy}%</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Verified</span>
              <span className="text-sm font-black text-blue-500 tracking-tighter">{verifiedCount}/{bookedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <Container full className="pt-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOMAINS.map((domain) => {
            const filteredSlots = getFilteredSlots(domain.id);
            if (domainFilter && domainFilter !== domain.id) return null;

            return (
              <div key={domain.id} className="flex flex-col h-full">
                {/* Sector Header */}
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${domain.accent}`} />
                    <div>
                      <h2 className="text-lg tracking-tight text-[#ffffff] uppercase italic font-serif">
                        {domain.title}
                      </h2>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                        {filteredSlots.length} Missions Active
                      </span>
                    </div>
                  </div>
                  <Info size={16} className="text-white/10" />
                </div>

                {/* Slot Grid/List */}
                <div className="space-y-3">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => {
                      const isHighlighted = highlightId && (
                        slot.teamId?.toUpperCase().includes(highlightId) || 
                        slot.teamName?.toUpperCase().includes(highlightId) ||
                        slot.transactionId?.toUpperCase().includes(highlightId)
                      );

                      return (
                        <motion.div
                          layout
                          key={slot.docId || slot.id}
                          className={`relative group rounded-[28px] border transition-all duration-300 p-5 ${
                            isHighlighted 
                            ? "bg-white/10 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-[1.02]" 
                            : slot.checkedIn 
                              ? "bg-emerald-500/5 border-emerald-500/10" 
                              : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                  REGISTERED
                                </span>
                                {slot.paymentVerified ? (
                                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 flex items-center gap-1">
                                    <ShieldCheck size={10} />
                                    VERIFIED
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                                    PENDING
                                  </span>
                                )}
                                {slot.checkedIn && (
                                  <span className="text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase tracking-widest">
                                    In Terminal
                                  </span>
                                )}
                              </div>
                              
                              <h3 className="text-lg font-black text-white uppercase tracking-tight truncate leading-tight mb-1">
                                {slot.teamName}
                              </h3>
                              <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.2em] italic font-serif">
                                {slot.teamId}
                              </p>

                              {!slot.paymentVerified && (
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                  <Activity size={12} className="text-orange-500 animate-pulse" />
                                  <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Awaiting Verification Signal</span>
                                </div>
                              )}
                            </div>

                            {/* Manifest Actions */}
                            <div className="flex flex-col gap-2 ml-4">
                              <button
                                onClick={() => {
                                  if (slot.paymentVerified && !window.confirm("ARE YOU SURE YOU WANT TO REVOKE VERIFICATION?")) return;
                                  onUpdatePayment(slot.docId, { paymentVerified: !slot.paymentVerified });
                                }}
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${slot.paymentVerified ? "bg-blue-600 text-white shadow-lg" : "bg-white/5 text-white/20 hover:bg-blue-600 hover:text-white"}`}
                              >
                                <ShieldCheck size={18} />
                              </button>
                              <button
                                onClick={() => onCheckIn(slot.docId, !slot.checkedIn)}
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-600 text-white shadow-lg" : "bg-white/5 text-white/20 hover:bg-emerald-600 hover:text-white"}`}
                              >
                                <UserCheck size={18} />
                              </button>
                              <button
                                onClick={() => slot.imageUrl && setSelectedImage(slot.imageUrl)}
                                className="w-10 h-10 rounded-2xl bg-white/5 text-white/20 hover:bg-white/20 hover:text-white transition-all flex items-center justify-center"
                              >
                                <ExternalLink size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="p-12 rounded-[32px] border border-dashed border-white/5 flex flex-col items-center justify-center opacity-30">
                      <BarChart3 size={32} className="mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Active Sessions</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* ── IMAGE VIEW MODAL ── */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900"
            >
              <div className="absolute top-8 right-8 z-10">
                <button onClick={() => setSelectedImage(null)} className="w-14 h-14 bg-white text-slate-950 rounded-2xl flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>
              <img src={selectedImage} alt="Payment Proof" className="w-full h-full object-contain" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SCANNER MODAL ── */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScanning(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 rounded-[40px] p-8 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white uppercase italic font-serif">Mission Scanner</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Align QR within active zone</p>
              </div>
              <div id="reader" className="rounded-[32px] overflow-hidden border-2 border-emerald-500/30" />
              <button onClick={() => setIsScanning(false)} className="w-full mt-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:border-red-500 transition-all">
                Abort Scan
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {confirmedTeam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedTeam(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-slate-900 rounded-[40px] p-10 text-center shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-500/20">
                <CheckCircle2 size={40} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white uppercase mb-1">
                {confirmedTeam.alreadyIn ? "Status: ACTIVE" : "Access Granted"}
              </h3>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Terminal Sync Complete</p>
              
              <div className="bg-white/5 p-6 rounded-[32px] mb-8 border border-white/5">
                <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Mission Identifier</span>
                <span className="block text-2xl font-black text-white mb-1 font-serif italic tracking-tighter">{confirmedTeam.teamId}</span>
                <span className="block text-xs font-bold text-white/40 uppercase truncate">{confirmedTeam.teamName}</span>
              </div>

              <button onClick={() => setConfirmedTeam(null)} className="w-full bg-white text-slate-950 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-white transition-all">
                Dismiss Signal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
