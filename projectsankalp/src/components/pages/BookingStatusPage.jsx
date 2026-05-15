import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Globe,
  Heart,
  Leaf,
  Activity,
  Trash2,
  X,
  UserCheck,
  Search as SearchIcon,
  ShieldCheck,
  Scan,
  AlertCircle,
  CheckCircle2,
  Download,
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
    glow: "shadow-blue-500/20",
  },
  {
    id: "health",
    title: "Health & Wellness",
    icon: Heart,
    color: "text-emerald-500",
    accent: "bg-emerald-500",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "climate",
    title: "Climate Action",
    icon: Leaf,
    color: "text-teal-500",
    accent: "bg-teal-500",
    glow: "shadow-teal-500/20",
  },
];

export default function BookingStatusPage({
  slots,
  occupancy: propOccupancy,
  onBack,
  onDelete,
  onCheckIn,
  onUpdatePayment,
  onNavigate,
}) {
  const [time, setTime] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [highlightId, setHighlightId] = useState("");
  const [confirmedTeam, setConfirmedTeam] = useState(null);
  const [scanError, setScanError] = useState(null);
  const qrScannerRef = useRef(null);
  const lastScannedId = useRef(null);
  const lastScanTime = useRef(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [sortBy, setSortBy] = useState("id");

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
      const match = allSlots.find((s) => s.teamId?.toUpperCase() === upperId);
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
            {
              fps: 30,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
              disableFlip: true,
            },
            (result) => {
              const now = Date.now();
              if (
                result === lastScannedId.current &&
                now - lastScanTime.current < 2000
              )
                return;
              lastScannedId.current = result;
              lastScanTime.current = now;
              handleScanSuccess(result);
            },
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

  // ── FILTERING & SORTING LOGIC ──
  const getFilteredSlots = (domainId) => {
    let domainSlots = slots[domainId] || [];

    // Filter by Search
    if (highlightId) {
      domainSlots = domainSlots.filter(
        (s) =>
          s.teamId?.toUpperCase().includes(highlightId) ||
          s.teamName?.toUpperCase().includes(highlightId),
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

    // Filter by Domain (Technical Sector)
    if (domainFilter && domainFilter !== "") {
      domainSlots = domainSlots.filter((s) => s.selectedDomain === domainFilter);
    }

    // Sort
    return [...domainSlots].sort((a, b) => {
      if (!a.teamId) return 1;
      if (!b.teamId) return -1;

      if (sortBy === "name") {
        return a.teamName.localeCompare(b.teamName);
      } else if (sortBy === "time") {
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
      // Handle URL deep links like ?teamId=C4C-01
      if (result.includes("teamId=")) {
        const url = new URL(result);
        scannedId = url.searchParams.get("teamId") || result;
      }

      const cleanId = scannedId.trim().toUpperCase();
      setHighlightId(cleanId);

      // Flatten slots and ensure we have data
      const allSlots = Object.values(slots)
        .flat()
        .filter((s) => s.teamId);
      const matchingSlot = allSlots.find(
        (s) =>
          s.teamId.trim().toUpperCase() === cleanId ||
          s.transactionId?.trim().toUpperCase() === cleanId,
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

  const bookedCount = Object.values(slots)
    .flat()
    .filter((s) => s.teamId).length;
  const occupancy = propOccupancy || Math.round((bookedCount / 30) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden select-none">
      {/* ── STICKY CONTROL HUB ── */}
      <div className="sticky top-0 z-[70] bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 px-3 py-3 md:py-4">
        <div className="w-full flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex-1 relative">
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search Team ID / Name..."
              value={highlightId}
              onChange={(e) => setHighlightId(e.target.value.toUpperCase())}
              className="w-full bg-white/5 border-none rounded-xl py-3 pl-11 pr-4 text-[10px] md:text-xs font-black tracking-widest uppercase focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner text-white placeholder:text-white/20"
            />
            {highlightId && (
              <button
                onClick={() => setHighlightId("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate && onNavigate("payment")}
              className="h-10 md:h-12 px-3 md:px-5 bg-blue-500 text-white rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <span className="hidden lg:inline">Payments</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate && onNavigate("registration")}
              className="h-10 md:h-12 px-3 md:px-5 bg-emerald-500 text-white rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span className="hidden lg:inline">Check-In</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsScanning(true)}
              className="w-10 h-10 md:w-12 md:h-12 bg-white text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shrink-0"
          >
            <Scan size={18} />
          </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const allTeams = Object.entries(slots).flatMap(
                  ([domain, teams]) =>
                    teams
                      .filter((t) => t.teamId)
                      .map((t) => ({ ...t, domain })),
                );
                import("../../utils/excelExport").then((m) =>
                  m.exportRegistrationCheckIn(allTeams),
                );
              }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/5 text-white border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm shrink-0"
            >
              <Download size={18} />
            </motion.button>
          </div>
        </div>
        {/* ADVANCED FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
          <div className="relative group">
            <label className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1 ml-1">
              Mission Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 px-3 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer text-white"
            >
              <option value="" className="bg-slate-900">All Teams</option>
              <option value="verified" className="bg-slate-900">Payment Verified</option>
              <option value="pending" className="bg-slate-900">Pending Admin</option>
              <option value="checked" className="bg-slate-900">Checked In</option>
            </select>
            <div className="absolute right-3 bottom-2.5 pointer-events-none text-slate-400">
              <ChevronLeft size={12} className="-rotate-90" />
            </div>
          </div>

          <div className="relative group">
            <label className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1 ml-1">
              Technical Sector
            </label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 px-3 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer text-white"
            >
              <option value="" className="bg-slate-900">All Domains</option>
              <option value="women" className="bg-slate-900">Women's Entr.</option>
              <option value="health" className="bg-slate-900">Health & Wellness</option>
              <option value="climate" className="bg-slate-900">Climate Action</option>
            </select>
            <div className="absolute right-3 bottom-2.5 pointer-events-none text-slate-400">
              <ChevronLeft size={12} className="-rotate-90" />
            </div>
          </div>

          <div className="relative group">
            <label className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1 ml-1">
              Sort Sequence
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 px-3 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer text-white"
            >
              <option value="id" className="bg-slate-900">Team ID</option>
              <option value="name" className="bg-slate-900">Alpha Name</option>
              <option value="time" className="bg-slate-900">Check-in Time</option>
            </select>
            <div className="absolute right-3 bottom-2.5 pointer-events-none text-slate-400">
              <ChevronLeft size={12} className="-rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <Container full className="pt-8">
        {/* MANIFEST LISTS */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {DOMAINS.filter((d) => !domainFilter || d.id === domainFilter).map(
            (domain) => {
              const domainSlots = getFilteredSlots(domain.id);
              return (
                <div key={domain.id} className="flex flex-col min-w-0">
                  <div className="flex items-center justify-between px-4 mb-6">
                    <div className="min-w-0">
                      <h3 className="text-xl font-black tracking-tight uppercase leading-none text-white truncate">
                        {domain.title}
                      </h3>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 block">
                        Sector Registry
                      </span>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${domain.accent} animate-pulse shadow-sm shrink-0`}
                    />
                  </div>

                  <div className="space-y-3">
                    {domainSlots.map((slot) => {
                      const isHighlighted =
                        highlightId &&
                        (slot.teamId?.toUpperCase() ===
                          highlightId.toUpperCase() ||
                          slot.teamName
                            ?.toUpperCase()
                            .includes(highlightId.toUpperCase()));

                      return (
                        <div
                          key={`${domain.id}-${slot.id}`}
                          id={
                            slot.teamId
                              ? `slot-${slot.teamId.toUpperCase()}`
                              : `slot-${slot.id}`
                          }
                          className={`
                            flex items-center justify-between p-4 md:p-5 rounded-[24px] md:rounded-[36px] border transition-all duration-300 relative overflow-hidden
                            ${
                              isHighlighted
                                ? "bg-emerald-500 border-emerald-400 text-white scale-[1.03] shadow-2xl z-10"
                                : slot.checkedIn
                                  ? "bg-emerald-900/30 border-emerald-800 text-emerald-100 shadow-sm"
                                  : slot.teamId
                                  ? "bg-white border-white/20 text-slate-950 shadow-xl"
                                  : "bg-white/5 border-white/10 text-white/10 border-dashed"
                            }
                          `}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span
                              className={`text-[10px] font-mono font-black shrink-0 ${slot.checkedIn ? "text-emerald-500" : isHighlighted ? "text-emerald-200" : "text-slate-500"}`}
                            >
                              #{String(slot.id).padStart(2, "0")}
                            </span>
                            {slot.teamId ? (
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                                  <span
                                    className={`text-[10px] md:text-[11px] font-black uppercase tracking-wider truncate ${slot.checkedIn ? "text-emerald-600" : isHighlighted ? "text-white" : slot.teamId ? "text-emerald-600" : "text-emerald-400"}`}
                                  >
                                    {slot.teamId}
                                  </span>
                                  {slot.checkedIn && (
                                    <ShieldCheck
                                      size={10}
                                      className="text-emerald-500 shrink-0"
                                    />
                                  )}
                                </div>
                                <span
                                  className={`text-[10px] md:text-[11px] font-bold truncate leading-none ${slot.checkedIn ? "text-slate-900" : slot.teamId ? "text-slate-900" : "text-white/90"}`}
                                >
                                  {slot.teamName}
                                </span>
                                {!slot.paymentVerified && (
                                  <span className="text-[7px] font-black uppercase tracking-widest text-orange-400 mt-1 block">
                                    [ PENDING VERIFICATION ]
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-10">
                                Standby
                              </span>
                            )}
                          </div>
                          {slot.teamId && (
                            <div className="flex items-center gap-1.5 shrink-0 ml-4">
                              <button
                                onClick={() => {
                                  if (
                                    slot.paymentVerified &&
                                    !window.confirm(
                                      "Are you sure you want to REVOKE verification for this team?",
                                    )
                                  )
                                    return;
                                  onUpdatePayment(slot.docId, {
                                    paymentVerified: !slot.paymentVerified,
                                  });
                                }}
                                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${slot.paymentVerified ? "bg-blue-500 text-white shadow-lg" : slot.teamId ? "bg-black/10 hover:bg-blue-500 text-black/40 hover:text-white" : "bg-white/10 hover:bg-blue-500 text-white/40 hover:text-white"}`}
                                title={
                                  slot.paymentVerified ? "Unverify" : "Verify"
                                }
                              >
                                <ShieldCheck size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  onCheckIn(slot.docId, !slot.checkedIn)
                                }
                                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-500 text-white shadow-lg" : slot.teamId ? "bg-black/10 hover:bg-emerald-500 text-black/40 hover:text-white" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                                title={
                                  slot.checkedIn ? "Check-Out" : "Check-In"
                                }
                              >
                                <UserCheck
                                  size={16}
                                  className={
                                    slot.checkedIn ? "animate-pulse" : ""
                                  }
                                />
                              </button>
                              <button
                                onClick={() =>
                                  slot.imageUrl &&
                                  setSelectedImage(slot.imageUrl)
                                }
                                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${slot.checkedIn ? "bg-emerald-100 text-emerald-600" : slot.teamId ? "bg-black/10 hover:bg-emerald-500 text-black/40 hover:text-white" : "bg-white/10 hover:bg-emerald-500 text-white/40 hover:text-white"}`}
                              >
                                <Activity size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  onDelete(domain.id, slot.id, slot.docId)
                                }
                                className="w-9 h-9 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </Container>

      {/* ── CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {confirmedTeam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedTeam(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-10 text-center shadow-2xl overflow-hidden border border-emerald-100"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-inner">
                <CheckCircle2 size={40} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase mb-1">
                {confirmedTeam.alreadyIn
                  ? "Already Checked In"
                  : "Check-In Success"}
              </h3>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">
                Manifest Synchronized
              </p>

              <div className="bg-slate-50 p-6 rounded-[32px] mb-8 border border-slate-100">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Participant Record
                </span>
                <span className="block text-xl font-black text-slate-900 mb-0.5">
                  {confirmedTeam.teamId}
                </span>
                <span className="block text-xs font-bold text-slate-500 italic">
                  {confirmedTeam.teamName}
                </span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScanning(false)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-black rounded-[48px] p-1 shadow-2xl overflow-hidden"
            >
              <div className="relative aspect-square">
                <div id="reader" className="w-full h-full" />
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/20 rounded-[40px] relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl" />
                    <motion.div
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-4 right-4 h-0.5 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]"
                    />
                  </div>
                </div>
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">
                      Scanner Active
                    </span>
                  </div>
                  <button
                    onClick={() => setIsScanning(false)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="p-8 text-center bg-black border-t border-white/5">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-relaxed">
                  Center mission code within markers
                  <br />
                  Verification is instantaneous
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {scanError && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-4 right-4 z-[110] bg-red-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <AlertCircle size={24} />
            <div className="flex-1">
              <p className="font-black uppercase tracking-widest text-[10px]">
                Verification Failed
              </p>
              <p className="text-[10px] font-bold opacity-80">
                {scanError === "INVALID_TICKET"
                  ? "This QR code does not match any registered team."
                  : "Camera access failed or was denied."}
              </p>
            </div>
            <button
              onClick={() => setScanError(null)}
              className="ml-auto bg-white/20 p-2 rounded-xl"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE PREVIEW */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white rounded-[48px] p-2 shadow-2xl border border-white/10"
            >
              <img
                src={selectedImage}
                alt="Verification"
                className="w-full h-auto rounded-[40px] shadow-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-lg text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
