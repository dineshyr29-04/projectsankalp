import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Search as SearchIcon,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Image as ImageIcon,
  Filter,
  Eye,
  Check,
  Trash2
} from "lucide-react";
import Container from "../core/Container";
import { exportPaymentVerification, exportDomainSummary } from "../../utils/excelExport";

const DOMAINS = [
  { id: "women", title: "Women's Entrepreneurship", color: "text-blue-500", accent: "bg-blue-500" },
  { id: "health", title: "Health & Wellness", color: "text-emerald-500", accent: "bg-emerald-500" },
  { id: "climate", title: "Climate Action", color: "text-teal-500", accent: "bg-teal-500" }
];

export default function PaymentVerificationPage({ slots, onBack, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [verifyNotes, setVerifyNotes] = useState("");
  const [paymentData, setPaymentData] = useState({});

  // Initialize payment data from slots
  useEffect(() => {
    const data = {};
    Object.entries(slots).forEach(([domain, teams]) => {
      data[domain] = teams.map(team => ({
        ...team,
        paymentVerified: team.paymentVerified || false,
        verifiedBy: team.verifiedBy || "",
        verificationDate: team.verificationDate || null,
        notes: team.notes || ""
      }));
    });
    setPaymentData(data);
  }, [slots]);

  // Get all teams filtered
  const getAllTeams = () => {
    let allTeams = [];
    Object.entries(paymentData).forEach(([domain, teams]) => {
      allTeams = allTeams.concat(teams.map(t => ({ ...t, domain })));
    });

    return allTeams.filter(team => {
      if (!team.teamId) return false;
      
      const matchesSearch = 
        team.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDomain = filterDomain === "all" || team.domain === filterDomain;
      
      const matchesStatus = 
        filterStatus === "all" ||
        (filterStatus === "verified" && team.paymentVerified) ||
        (filterStatus === "pending" && !team.paymentVerified);

      return matchesSearch && matchesDomain && matchesStatus;
    });
  };

  const filteredTeams = getAllTeams();

  const handleVerifyPayment = (team) => {
    const updatedData = {
      ...paymentData,
      [team.domain]: paymentData[team.domain].map(t =>
        t.id === team.id
          ? {
              ...t,
              paymentVerified: true,
              verifiedBy: "Admin",
              verificationDate: new Date().toISOString(),
              notes: verifyNotes
            }
          : t
      )
    };
    setPaymentData(updatedData);
    
    // Callback to parent to update Firebase
    if (onUpdate) onUpdate(team.domain, team.id, {
      paymentVerified: true,
      verifiedBy: "Admin",
      verificationDate: new Date().toISOString(),
      notes: verifyNotes
    });
    
    setSelectedTeam(null);
    setVerifyNotes("");
  };

  const getDomainStats = () => {
    const stats = {};
    DOMAINS.forEach(domain => {
      const teams = paymentData[domain.id] || [];
      const verified = teams.filter(t => t.paymentVerified && t.teamId).length;
      const total = teams.filter(t => t.teamId).length;
      stats[domain.title] = { total, verified };
    });
    return stats;
  };

  const stats = getDomainStats();
  const totalStats = Object.values(stats).reduce(
    (acc, curr) => ({
      total: acc.total + curr.total,
      verified: acc.verified + curr.verified
    }),
    { total: 0, verified: 0 }
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20 overflow-x-hidden">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-[70] bg-white/90 backdrop-blur-2xl border-b border-slate-200/50 px-3 py-3 md:py-4">
        <div className="w-full flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <ChevronLeft size={20} />
          </motion.button>
          
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Payment Verification</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Manual Verification Portal</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => exportPaymentVerification(filteredTeams)}
            className="w-12 h-12 bg-blue-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 shrink-0"
          >
            <Download size={22} />
          </motion.button>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1 relative">
            <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Team ID / Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100/50 border-none rounded-xl py-3 pl-11 pr-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="bg-slate-100/50 border-none rounded-xl py-3 px-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="all">All Domains</option>
            {DOMAINS.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-100/50 border-none rounded-xl py-3 px-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </div>

      <Container full className="pt-8">
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-[32px] shadow-xl shadow-blue-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-blue-100 mb-2">Total Teams</span>
            <span className="text-4xl font-black tracking-tighter">{totalStats.total}</span>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-[32px] shadow-xl shadow-emerald-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-emerald-100 mb-2">Verified</span>
            <span className="text-4xl font-black tracking-tighter">{totalStats.verified}</span>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-[32px] shadow-xl shadow-orange-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-orange-100 mb-2">Pending</span>
            <span className="text-4xl font-black tracking-tighter">{totalStats.total - totalStats.verified}</span>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-[32px] shadow-xl">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">Completion</span>
            <span className="text-4xl font-black tracking-tighter">{totalStats.total > 0 ? Math.round((totalStats.verified / totalStats.total) * 100) : 0}%</span>
          </div>
        </div>

        {/* TEAMS LIST */}
        <div className="space-y-4">
          {filteredTeams.length === 0 ? (
            <div className="text-center py-16">
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
                  team.paymentVerified
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${team.paymentVerified ? "bg-emerald-500" : "bg-orange-500"} text-white`}>
                        {team.paymentVerified ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 uppercase">{team.teamId}</h3>
                        <p className="text-[10px] font-bold text-slate-600">{team.teamName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-bold">
                      <div>
                        <span className="text-slate-400 uppercase">Domain</span>
                        <p className="text-slate-800">{team.domain}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase">Transaction ID</span>
                        <p className="text-slate-800">{team.transactionId || "-"}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase">Status</span>
                        <p className={`font-black ${team.paymentVerified ? "text-emerald-600" : "text-orange-600"}`}>
                          {team.paymentVerified ? "Verified" : "Pending"}
                        </p>
                      </div>
                      {team.verificationDate && (
                        <div>
                          <span className="text-slate-400 uppercase">Verified Date</span>
                          <p className="text-slate-800">{new Date(team.verificationDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    {team.imageUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewingImage(team.imageUrl)}
                        className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                      >
                        <Eye size={20} />
                      </motion.button>
                    )}
                    {!team.paymentVerified && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTeam(team)}
                        className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                      >
                        <Check size={20} />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete && onDelete(team.domain, team.id, team.docId)}
                      className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>

                {team.notes && (
                  <div className="mt-4 p-4 bg-slate-100 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-600">
                      <span className="text-slate-400 uppercase block mb-1">Notes</span>
                      {team.notes}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </Container>

      {/* VERIFICATION MODAL */}
      <AnimatePresence>
        {selectedTeam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTeam(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl border border-emerald-100">
              <button onClick={() => setSelectedTeam(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                <X size={18} />
              </button>

              <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">Verify Payment</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Confirm this payment verification</p>

              <div className="bg-slate-50 p-6 rounded-[28px] mb-6 border border-slate-100">
                <div className="mb-4">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Team Details</span>
                  <p className="text-lg font-black text-slate-900">{selectedTeam.teamId}</p>
                  <p className="text-[10px] font-bold text-slate-600">{selectedTeam.teamName}</p>
                </div>
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Transaction</span>
                  <p className="text-sm font-mono text-slate-800">{selectedTeam.transactionId || "N/A"}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Verification Notes</label>
                <textarea
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  placeholder="Add verification notes (optional)"
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl p-4 text-[10px] font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-0 transition-all resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVerifyPayment(selectedTeam)}
                  className="w-full bg-emerald-500 text-white py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all"
                >
                  Confirm & Mark Verified
                </motion.button>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="w-full text-slate-600 py-2 text-[8px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IMAGE VIEWER */}
      <AnimatePresence>
        {viewingImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingImage(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[48px] p-2 shadow-2xl">
              <img src={viewingImage} alt="Payment Proof" className="w-full h-auto rounded-[40px]" />
              <button onClick={() => setViewingImage(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
