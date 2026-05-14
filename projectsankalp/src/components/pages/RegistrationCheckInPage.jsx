import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Scan,
  CheckCircle2,
  AlertCircle,
  Download,
  X,
  User,
  Users,
  Clock,
  Filter,
  Search as SearchIcon
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Container from "../core/Container";
import { exportRegistrationCheckIn } from "../../utils/excelExport";

const DOMAINS = [
  { id: "women", title: "Women's Entrepreneurship", color: "text-blue-500", accent: "bg-blue-500" },
  { id: "health", title: "Health & Wellness", color: "text-emerald-500", accent: "bg-emerald-500" },
  { id: "climate", title: "Climate Action", color: "text-teal-500", accent: "bg-teal-500" }
];

const MAX_TEAMS_PER_DOMAIN = 10;

export default function RegistrationCheckInPage({ slots, onBack, onCheckIn, onDelete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [lastScannedTeam, setLastScannedTeam] = useState(null);
  const [registrationData, setRegistrationData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");
  const qrScannerRef = useRef(null);
  const lastScannedId = useRef(null);
  const lastScanTime = useRef(0);

  // Initialize registration data from slots
  useEffect(() => {
    const data = {};
    Object.entries(slots).forEach(([domain, teams]) => {
      data[domain] = teams
        .filter(t => t.teamId) // Only teams with IDs
        .slice(0, MAX_TEAMS_PER_DOMAIN) // Limit to 10 per domain
        .map(team => ({
          ...team,
          domain,
          checkedIn: team.checkedIn || false,
          checkInTime: team.checkInTime || null,
          paymentVerified: team.paymentVerified || false,
          paymentDate: team.paymentDate || null
        }));
    });
    setRegistrationData(data);
  }, [slots]);

  // Setup QR Scanner
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
      if (result.includes("teamId=")) {
        const url = new URL(result);
        scannedId = url.searchParams.get("teamId") || result;
      }

      const cleanId = scannedId.trim().toUpperCase();
      
      // Find the team across all domains
      let matchingTeam = null;
      let matchingDomain = null;

      for (const [domain, teams] of Object.entries(registrationData)) {
        const found = teams.find(t => t.teamId?.toUpperCase() === cleanId);
        if (found) {
          matchingTeam = found;
          matchingDomain = domain;
          break;
        }
      }

      if (matchingTeam && !matchingTeam.checkedIn) {
        // Auto check-in: Update local state and trigger callback
        const updatedData = {
          ...registrationData,
          [matchingDomain]: registrationData[matchingDomain].map(t =>
            t.id === matchingTeam.id
              ? {
                  ...t,
                  checkedIn: true,
                  checkInTime: new Date().toISOString()
                }
              : t
          )
        };
        setRegistrationData(updatedData);
        setLastScannedTeam(matchingTeam);
        
        // Trigger callback to update Firebase
        if (onCheckIn) {
          onCheckIn(matchingTeam.docId, true);
        }

        if (window.navigator.vibrate) window.navigator.vibrate(100);
      } else if (matchingTeam && matchingTeam.checkedIn) {
        setScanError("ALREADY_CHECKED_IN");
      } else {
        setScanError("INVALID_TICKET");
      }
    } catch (e) {
      console.error("Scan processing failed:", e);
      setScanError("INVALID_TICKET");
    }

    setIsScanning(false);
  };

  // Get filtered teams
  const getFilteredTeams = () => {
    let allTeams = [];
    const domainsToShow = filterDomain === "all" 
      ? DOMAINS.map(d => d.id) 
      : [filterDomain];

    domainsToShow.forEach(domain => {
      const teams = registrationData[domain] || [];
      allTeams = allTeams.concat(teams);
    });

    return allTeams.filter(team =>
      team.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get stats
  const getStats = () => {
    let totalTeams = 0;
    let checkedIn = 0;

    Object.values(registrationData).forEach(teams => {
      teams.forEach(team => {
        totalTeams++;
        if (team.checkedIn) checkedIn++;
      });
    });

    return { totalTeams, checkedIn, pending: totalTeams - checkedIn };
  };

  const stats = getStats();
  const filteredTeams = getFilteredTeams();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20 overflow-x-hidden">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-[70] bg-white/90 backdrop-blur-2xl border-b border-slate-200/50 px-3 py-3 md:py-4">
        <div className="w-full flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Registration Check-In</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Auto Check-in Portal (Max 10/Domain)</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsScanning(true)}
            className="w-12 h-12 bg-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 shrink-0"
          >
            <Scan size={22} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => exportRegistrationCheckIn(filteredTeams)}
            className="w-12 h-12 bg-blue-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 shrink-0"
          >
            <Download size={22} />
          </motion.button>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Team ID / Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100/50 border-none rounded-xl py-3 pl-11 pr-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="bg-slate-100/50 border-none rounded-xl py-3 px-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all"
          >
            <option value="all">All Domains</option>
            {DOMAINS.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </div>
      </div>

      <Container full className="pt-8">
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-[32px] shadow-xl shadow-blue-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-blue-100 mb-2">Total Teams</span>
            <span className="text-4xl font-black tracking-tighter">{stats.totalTeams}</span>
            <p className="text-[10px] font-bold text-blue-100 mt-2">{MAX_TEAMS_PER_DOMAIN} per domain</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-[32px] shadow-xl shadow-emerald-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-emerald-100 mb-2">Checked In</span>
            <span className="text-4xl font-black tracking-tighter">{stats.checkedIn}</span>
            <p className="text-[10px] font-bold text-emerald-100 mt-2">Auto Verified</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-[32px] shadow-xl shadow-orange-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-orange-100 mb-2">Pending</span>
            <span className="text-4xl font-black tracking-tighter">{stats.pending}</span>
            <p className="text-[10px] font-bold text-orange-100 mt-2">Awaiting Scan</p>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-[32px] shadow-xl">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">Completion</span>
            <span className="text-4xl font-black tracking-tighter">
              {stats.totalTeams > 0 ? Math.round((stats.checkedIn / stats.totalTeams) * 100) : 0}%
            </span>
            <p className="text-[10px] font-bold text-slate-300 mt-2">Progress</p>
          </div>
        </div>

        {/* TEAMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">No teams found</p>
            </div>
          ) : (
            filteredTeams.map((team) => (
              <motion.div
                key={team.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-[28px] border-2 transition-all ${
                  team.checkedIn
                    ? "bg-emerald-50 border-emerald-200 shadow-lg shadow-emerald-100"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-200"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${team.checkedIn ? "bg-emerald-500" : "bg-slate-300"} text-white`}>
                    {team.checkedIn ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete && onDelete(team.domain, team.id, team.docId)}
                    className="w-9 h-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                <h3 className="text-lg font-black text-slate-900 uppercase mb-1">{team.teamId}</h3>
                <p className="text-[10px] font-bold text-slate-600 mb-4 line-clamp-2">{team.teamName}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Check-in Status</span>
                    <span className={team.checkedIn ? "text-emerald-600 font-black" : "text-orange-600 font-black"}>
                      {team.checkedIn ? "✓ Checked In" : "○ Pending"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Payment Status</span>
                    <span className={team.paymentVerified ? "text-emerald-600 font-black" : "text-orange-600 font-black"}>
                      {team.paymentVerified ? "✓ Verified" : "○ Pending"}
                    </span>
                  </div>
                  {team.checkInTime && (
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-500">Check-in Time</span>
                      <span className="text-slate-700">{new Date(team.checkInTime).toLocaleTimeString()}</span>
                    </div>
                  )}
                </div>

                {!team.checkedIn && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Manual check-in if needed
                      if (onCheckIn) onCheckIn(team.docId, true);
                    }}
                    className="w-full bg-emerald-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                  >
                    Manual Check-In
                  </motion.button>
                )}
              </motion.div>
            ))
          )}
        </div>
      </Container>

      {/* LAST SCANNED NOTIFICATION */}
      <AnimatePresence>
        {lastScannedTeam && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-4 right-4 z-[110]"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1">
                <p className="font-black uppercase tracking-widest text-[10px]">Auto Check-In Success</p>
                <p className="text-[10px] font-bold opacity-90">{lastScannedTeam.teamId} - {lastScannedTeam.teamName}</p>
              </div>
              <button
                onClick={() => setLastScannedTeam(null)}
                className="ml-auto bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR SCANNER MODAL */}
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
                  <button onClick={() => setIsScanning(false)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="p-8 text-center bg-black border-t border-white/5">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-relaxed">
                  Position QR code within frame<br/>
                  Auto check-in triggered on scan
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ERROR NOTIFICATION */}
      <AnimatePresence>
        {scanError && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-4 right-4 z-[110]"
          >
            <div className="bg-red-500 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4">
              <AlertCircle size={24} />
              <div className="flex-1">
                <p className="font-black uppercase tracking-widest text-[10px]">Scan Failed</p>
                <p className="text-[10px] font-bold opacity-90">
                  {scanError === "ALREADY_CHECKED_IN" ? "Team already checked in" :
                   scanError === "INVALID_TICKET" ? "QR code not found" :
                   "Camera access denied"}
                </p>
              </div>
              <button
                onClick={() => setScanError(null)}
                className="ml-auto bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
