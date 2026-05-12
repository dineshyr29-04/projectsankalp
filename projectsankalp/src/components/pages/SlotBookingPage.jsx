
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Globe, 
  Heart, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Loader2,
  ChevronLeft
} from "lucide-react";
import Container from "../core/Container";

const DOMAINS = [
  {
    id: "women",
    title: "Women's Entrepreneurship",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Empowering gender equality through financial tech."
  },
  {
    id: "health",
    title: "Health & Sanitation",
    icon: Heart,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Innovating for public health and clean water."
  },
  {
    id: "climate",
    title: "Climate Action",
    icon: Leaf,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    description: "Building a sustainable and green future."
  }
];

export default function SlotBookingPage({ onBack, slots, onBook }) {
  const [step, setStep] = useState(1); // 1: Identity, 2: Domain, 3: Slots, 4: Success
  const [teamId, setTeamId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleVerify = () => {
    if (!teamId.trim()) return;
    setIsVerifying(true);
    setError("");

    // ── SECURITY CHECK: Already Registered? ──
    const allBookings = Object.values(slots).flat();
    const isAlreadyRegistered = allBookings.some(
      s => s.teamId?.toLowerCase() === teamId.toLowerCase()
    );

    setTimeout(() => {
      setIsVerifying(false);
      if (isAlreadyRegistered) {
        setError("This team is already registered in the system.");
      } else {
        setStep(2);
      }
    }, 1200);
  };

  const handleBook = async () => {
    if (!selectedSlot || isBooking) return;
    
    setIsBooking(true);
    try {
      await onBook(selectedDomain.id, selectedSlot.id, teamId);
      setStep(4);
    } catch (err) {
      setError("System error: Unable to lock docking bay. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 mx-auto ">
        {/* Navigation */}
        {step < 4 && (
          <button
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              {step === 1 ? "Cancel Allocation" : "Go Back"}
            </span>
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center py-20"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-8 shadow-2xl">
                <ShieldCheck className="text-emerald-400" size={40} />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tight mb-4">Command Center</h1>
              <p className="text-slate-500 max-w-md mb-12 font-medium">Verify your Team ID to access the mission docking system and allocate your session slot.</p>
              
              <div className="relative w-full max-w-sm group">
                <input
                  type="text"
                  placeholder="Enter Team ID (e.g., PS-2026-001)"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-5 text-center font-bold tracking-widest uppercase text-slate-900 focus:border-emerald-500 outline-none transition-all shadow-sm group-hover:shadow-md"
                />
                
                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleVerify}
                  disabled={!teamId || isVerifying}
                  className="w-full mt-6 bg-slate-900 text-white rounded-2xl py-5 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                >
                  {isVerifying ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Verify Identity <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DOMAIN SELECTION & CONFIRMATION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-10"
            >
              <div className="mb-16">
                <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">Step 02</span>
                <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-slate-900 mt-4">Select Mission Sector</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {DOMAINS.map((domain) => {
                  const availableSlots = slots[domain.id].filter(s => !s.teamId).length;
                  return (
                    <button
                      key={domain.id}
                      disabled={availableSlots === 0}
                      onClick={() => {
                        setSelectedDomain(domain);
                        // Find first available slot
                        const firstAvailable = slots[domain.id].find(s => !s.teamId);
                        setSelectedSlot(firstAvailable);
                      }}
                      className={`text-left p-8 rounded-[32px] border-2 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl group ${domain.border} hover:border-emerald-500/40 ${availableSlots === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                      <div className={`w-14 h-14 rounded-2xl ${domain.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                        <domain.icon className={domain.color} size={28} />
                      </div>
                      <h3 className="text-xl font-black mb-4 tracking-tight leading-tight">{domain.title}</h3>
                      <p className="text-slate-500 text-sm font-medium mb-8">{domain.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                          {availableSlots === 0 ? "Sector Full" : "Enter Sector"} <ArrowRight size={14} />
                        </div>
                        <span className="text-[9px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-400">
                          {availableSlots} BAYS LEFT
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Confirmation Modal Overlay */}
              <AnimatePresence>
                {selectedDomain && selectedSlot && step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-slate-100"
                    >
                      <div className={`w-20 h-20 rounded-3xl ${selectedDomain.bg} flex items-center justify-center mx-auto mb-8`}>
                        <ShieldCheck className={selectedDomain.color} size={40} />
                      </div>
                      
                      <h3 className="text-2xl font-black text-center text-slate-900 mb-4 font-serif italic">Confirm Allocation?</h3>
                      <p className="text-center text-slate-500 text-sm font-medium mb-10 leading-relaxed px-4">
                        You are about to be assigned to the <span className="font-bold text-slate-900">{selectedDomain.title}</span> mission sector. 
                        This action is permanent.
                      </p>

                      <div className="space-y-3">
                        <button
                          onClick={handleBook}
                          disabled={isBooking}
                          className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          {isBooking ? <Loader2 className="animate-spin" size={18} /> : "Finalize Mission"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDomain(null);
                            setSelectedSlot(null);
                          }}
                          className="w-full py-5 rounded-2xl text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] hover:text-slate-900 transition-colors"
                        >
                          Decline Allocation
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center py-10"
            >
              <div className="relative bg-white rounded-[40px] border border-slate-200 p-10 shadow-2xl overflow-hidden group">
                {/* Digital Pass Aesthetic */}
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                
                <h2 className="font-serif text-3xl font-black tracking-tight text-slate-900 mb-2">Mission Accomplished.</h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-10 italic opacity-80">Docking Bay #{selectedSlot?.id} Allocated</p>

                <div className="space-y-6 text-left border-t border-dashed border-slate-200 pt-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Team Identity</span>
                      <span className="text-xl font-black text-slate-900">{teamId}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Mission Sector</span>
                      <span className={`text-sm font-black uppercase tracking-wider ${selectedDomain?.color}`}>{selectedDomain?.title}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-between border border-slate-100">
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Pass Status</span>
                      <span className="text-xs font-black text-emerald-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        VERIFIED & SECURE
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                      <ShieldCheck size={24} className="text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="w-full py-4 rounded-2xl border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Print Digital Pass
                  </button>
                  <button 
                    onClick={onBack}
                    className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                  >
                    Return to Hub
                  </button>
                </div>
              </div>
              <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] italic">Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>      
    </div>
  );
}
