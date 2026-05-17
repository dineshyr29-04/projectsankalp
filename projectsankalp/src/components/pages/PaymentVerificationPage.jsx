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
  Trash2,
} from "lucide-react";
import Container from "../core/Container";
import {
  exportPaymentVerification,
  exportDomainSummary,
} from "../../utils/excelExport";

const DOMAINS = [
  {
    id: "women",
    title: "Women's Entrepreneurship",
    color: "text-blue-500",
    accent: "bg-blue-500",
  },
  {
    id: "health",
    title: "Health & Wellness",
    color: "text-emerald-500",
    accent: "bg-emerald-500",
  },
  {
    id: "climate",
    title: "Climate Action",
    color: "text-teal-500",
    accent: "bg-teal-500",
  },
];

export default function PaymentVerificationPage({
  slots,
  onBack,
  onUpdate,
  onDelete,
}) {
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
      data[domain] = teams.map((team) => ({
        ...team,
        paymentVerified: team.paymentVerified || false,
        paymentDate: team.paymentDate || null,
        paymentTime: team.paymentTime || null,
        verifiedBy: team.verifiedBy || "",
        verificationDate: team.verificationDate || null,
        notes: team.notes || "",
      }));
    });
    setPaymentData(data);
  }, [slots]);

  // Get all teams filtered
  const getAllTeams = () => {
    let allTeams = [];
    Object.entries(paymentData).forEach(([domain, teams]) => {
      allTeams = allTeams.concat(teams.map((t) => ({ ...t, domain })));
    });

    return allTeams.filter((team) => {
      if (!team.teamId) return false;

      const matchesSearch =
        team.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDomain =
        filterDomain === "all" || team.domain === filterDomain;

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "verified" && team.paymentVerified) ||
        (filterStatus === "pending" && !team.paymentVerified);

      return matchesSearch && matchesDomain && matchesStatus;
    });
  };

  const filteredTeams = getAllTeams();

  const handleVerifyPayment = (team) => {
    const now = new Date().toISOString();
    const updatedData = {
      ...paymentData,
      [team.domain]: paymentData[team.domain].map((t) =>
        t.id === team.id
          ? {
              ...t,
              paymentVerified: true,
              verifiedBy: "Admin",
              verificationDate: now,
              notes: verifyNotes,
              paymentDate: team.paymentDate || now,
              paymentTime: team.paymentTime || now,
            }
          : t,
      ),
    };
    setPaymentData(updatedData);

    if (onUpdate && team.docId) {
      onUpdate(team.docId, {
        paymentVerified: true,
        verifiedBy: "Admin",
        verificationDate: now,
        notes: verifyNotes,
        paymentDate: team.paymentDate || now,
        paymentTime: team.paymentTime || now,
      });
    }

    setSelectedTeam(null);
    setVerifyNotes("");
  };

  const handleUnverifyPayment = (team) => {
    if (
      !window.confirm(
        "Are you sure you want to revoke verification for this team?",
      )
    )
      return;

    const updatedData = {
      ...paymentData,
      [team.domain]: paymentData[team.domain].map((t) =>
        t.id === team.id
          ? {
              ...t,
              paymentVerified: false,
              verifiedBy: "",
              verificationDate: null,
              notes: "",
            }
          : t,
      ),
    };
    setPaymentData(updatedData);

    if (onUpdate && team.docId) {
      onUpdate(team.docId, {
        paymentVerified: false,
        verifiedBy: "",
        verificationDate: null,
        notes: "",
      });
    }

    setSelectedTeam(null);
  };

  const getDomainStats = () => {
    const stats = {};
    DOMAINS.forEach((domain) => {
      const teams = paymentData[domain.id] || [];
      const verified = teams.filter(
        (t) => t.paymentVerified && t.teamId,
      ).length;
      const total = teams.filter((t) => t.teamId).length;
      stats[domain.title] = { total, verified };
    });
    return stats;
  };

  const stats = getDomainStats();
  const totalStats = Object.values(stats).reduce(
    (acc, curr) => ({
      total: acc.total + curr.total,
      verified: acc.verified + curr.verified,
    }),
    { total: 0, verified: 0 },
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-[70] bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 px-3 py-3 md:py-4">
        <div className="w-full flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white text-slate-950 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              Payment Verification
            </h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
              Manual Verification Portal
            </p>
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
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search Team ID / Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border-none rounded-xl py-3 pl-11 pr-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all ring-1 ring-white/10 text-white placeholder:text-white/20"
            />
          </div>

          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="bg-white/5 border-none rounded-xl py-3 px-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all  ring-1 ring-white/10 text-white"
          >
            <option value="all">All Domains</option>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border-none rounded-xl py-3 px-4 text-[10px] md:text-xs font-bold focus:ring-2 focus:ring-blue-500/20 transition-all ring-1 ring-white/10 text-white"
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
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-[32px] shadow-xl shadow-blue-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-blue-100 mb-2">
              Total Teams
            </span>
            <span className="text-2xl font-black tracking-tighter">
              {totalStats.total}
            </span>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-5 rounded-[32px] shadow-xl shadow-emerald-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-emerald-100 mb-2">
              Verified
            </span>
            <span className="text-2xl font-black tracking-tighter">
              {totalStats.verified}
            </span>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-5 rounded-[32px] shadow-xl shadow-orange-500/20">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-orange-100 mb-2">
              Pending
            </span>
            <span className="text-2xl font-black tracking-tighter">
              {totalStats.total - totalStats.verified}
            </span>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-5 rounded-[32px] shadow-xl">
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">
              Completion
            </span>
            <span className="text-2xl font-black tracking-tighter">
              {totalStats.total > 0
                ? Math.round((totalStats.verified / totalStats.total) * 100)
                : 0}
              %
            </span>
          </div>
        </div>

        {/* DOMAIN GRID VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {DOMAINS.map((domain) => {
            const domainTeams = filteredTeams.filter(
              (t) => t.domain === domain.id,
            );
            return (
              <div key={domain.id} className="flex flex-col">
                {/* Domain Header */}
                <div className="flex items-center justify-between px-4 mb-6">
                  <div>
                    <h3 className="text-lg tracking-tight uppercase leading-none text-[#ffffff]">
                      {domain.title}
                    </h3>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 block">
                      {domainTeams.length} Teams
                    </span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${domain.accent} animate-pulse shadow-sm`}
                  />
                </div>

                {/* Teams Grid for this Domain */}
                <div className="space-y-3">
                  {domainTeams.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-[24px] border-2 border-dashed border-slate-200">
                      <AlertCircle
                        size={24}
                        className="mx-auto text-slate-300 mb-2"
                      />
                      <p className="text-[10px] font-bold text-slate-400">
                        No teams
                      </p>
                    </div>
                  ) : (
                    domainTeams.map((team) => (
                      <motion.div
                        key={team.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 rounded-[32px] border transition-all group hover:shadow-2xl ${
                          team.paymentVerified
                            ? "bg-emerald-500/5 border-emerald-500/20 shadow-lg shadow-emerald-500/5"
                            : "bg-white/5 border-white/10 hover:border-orange-500/30"
                        }`}
                      >
                        {/* Team Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${team.paymentVerified ? "bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-white/10 border border-white/10"} text-white transition-all`}
                              >
                                {team.paymentVerified ? (
                                  <ShieldCheck size={20} />
                                ) : (
                                  <Clock size={20} className="text-orange-500 animate-pulse" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[16px] font-black text-white uppercase truncate leading-none mb-1">
                                  {team.teamId}
                                </h4>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest line-clamp-1">
                                  {team.teamName}
                                </p>
                                {team.college && (
                                  <p className="text-[8px] font-semibold text-white/30 uppercase tracking-wider line-clamp-1 mt-0.5">
                                    {team.college}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex gap-1 shrink-0">
                            {team.imageUrl && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setViewingImage(team.imageUrl)}
                                className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all text-[10px]"
                              >
                                <Eye size={14} />
                              </motion.button>
                            )}
                            {!team.paymentVerified && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedTeam(team)}
                                className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                              >
                                <Check size={14} />
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                onDelete &&
                                onDelete(team.domain, team.id, team.docId)
                              }
                              className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-3 bg-white/5 p-4 rounded-[24px] border border-white/5">
                          {/* Transaction ID */}
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                              UTR ID
                            </span>
                            <span className="text-xs font-mono font-bold text-white tracking-wider truncate">
                              {team.transactionId || "NOT PROVIDED"}
                            </span>
                          </div>

                          {/* Status - MAKE IT PROPER */}
                          <div className="flex items-center justify-between gap-1 pt-3 border-t border-white/5">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                              STATUS
                            </span>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                              team.paymentVerified 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                              : "bg-orange-500/10 text-orange-400 border-orange-500/30"
                            }`}>
                              {team.paymentVerified ? "VERIFIED" : "PENDING VERIF."}
                            </div>
                          </div>

                          {/* Meta Info */}
                          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                            {team.paymentDate && (
                              <div>
                                <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest mb-0.5">Paid On</span>
                                <span className="text-[10px] font-bold text-white/60">
                                  {new Date(team.paymentDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {team.verificationDate && (
                              <div className="text-right">
                                <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest mb-0.5">Verified</span>
                                <span className="text-[10px] font-bold text-emerald-500">
                                  {new Date(team.verificationDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Notes */}
                        {team.notes && (
                          <div className="mt-2 p-2 bg-slate-100 rounded-[10px] border border-slate-200">
                            <p className="text-[8px] font-bold text-slate-600 line-clamp-2">
                              {team.notes}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </Container>
      

      {/* VERIFICATION MODAL */}
      <AnimatePresence>
        {selectedTeam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl border border-emerald-100"
            >
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">
                Verify Payment
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
                Confirm this payment verification
              </p>

              <div className="bg-slate-50 p-6 rounded-[28px] mb-6 border border-slate-100">
                <div className="mb-4">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Team Details
                  </span>
                  <p className="text-lg font-black text-slate-900">
                    {selectedTeam.teamId}
                  </p>
                  <p className="text-[10px] font-bold text-slate-600">
                    {selectedTeam.teamName}
                  </p>
                </div>
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Transaction
                  </span>
                  <p className="text-sm font-mono text-slate-800">
                    {selectedTeam.transactionId || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">
                  Verification Notes
                </label>
                <textarea
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  placeholder="Add verification notes (optional)"
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl p-4 text-[10px] font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-0 transition-all resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                {!selectedTeam.paymentVerified ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVerifyPayment(selectedTeam)}
                    className="w-full bg-emerald-500 text-white py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all"
                  >
                    Confirm & Mark Verified
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleUnverifyPayment(selectedTeam)}
                    className="w-full bg-red-500 text-white py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all"
                  >
                    Revoke Verification
                  </motion.button>
                )}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingImage(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white rounded-[48px] p-2 shadow-2xl"
            >
              <img
                src={viewingImage}
                alt="Payment Proof"
                className="w-full h-auto rounded-[40px]"
              />
              <button
                onClick={() => setViewingImage(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
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
