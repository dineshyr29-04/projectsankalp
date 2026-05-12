
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
import Footer from "../layout/Footer";

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

export default function SlotBookingPage({ onBack }) {
  const [step, setStep] = useState(1); // 1: Identity, 2: Domain, 3: Slots, 4: Success
  const [teamId, setTeamId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Mock slot data
  const [slots, setSlots] = useState({
    women: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, time: `Session ${String(i + 1).padStart(2, '0')}`, taken: i === 2 || i === 5 })),
    health: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, time: `Session ${String(i + 1).padStart(2, '0')}`, taken: i === 0 || i === 4 || i === 9 })),
    climate: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, time: `Session ${String(i + 1).padStart(2, '0')}`, taken: i === 1 || i === 7 }))
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleVerify = () => {
    if (!teamId.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 1500);
  };

  const handleBook = () => {
    if (!selectedSlot) return;
    
    // Decrease count (simulated by marking as taken)
    const newSlots = { ...slots };
    newSlots[selectedDomain.id] = newSlots[selectedDomain.id].map(s => 
      s.id === selectedSlot.id ? { ...s, taken: true } : s
    );
    
    setSlots(newSlots);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 pb-20 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 px-6 mx-auto max-w-5xl">
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

          {/* STEP 2: DOMAIN SELECTION */}
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
                {DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => {
                      setSelectedDomain(domain);
                      setStep(3);
                    }}
                    className={`text-left p-8 rounded-[32px] border-2 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl group ${domain.border} hover:border-emerald-500/40`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${domain.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <domain.icon className={domain.color} size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-4 tracking-tight leading-tight">{domain.title}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-8">{domain.description}</p>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                      Enter Sector <ArrowRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SLOT ALLOCATION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-10"
            >
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px]">Sector: {selectedDomain.title}</span>
                  <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-slate-900 mt-4">Orbital Slots</h2>
                </div>
                <div className="bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {slots[selectedDomain.id].map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.taken}
                    onClick={() => setSelectedSlot(slot)}
                    className={`
                      relative aspect-square rounded-[24px] border-2 flex flex-col items-center justify-center gap-2 transition-all group
                      ${slot.taken 
                        ? "bg-slate-100 border-slate-200 cursor-not-allowed grayscale" 
                        : selectedSlot?.id === slot.id 
                          ? "bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-600/30 scale-95" 
                          : "bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg active:scale-95"
                      }
                    `}
                  >
                    {slot.taken ? <Lock size={20} className="opacity-40" /> : <ShieldCheck size={24} className={selectedSlot?.id === slot.id ? "text-emerald-200" : "text-emerald-500 opacity-20 group-hover:opacity-100"} />}
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Slot {slot.id}</span>
                    <span className="text-[9px] font-bold opacity-40">{slot.taken ? "Reserved" : "Available"}</span>
                  </button>
                ))}
              </div>

              <div className="mt-20 flex flex-col items-center border-t border-slate-200 pt-16">
                <button
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
                >
                  Finalize Allocation <CheckCircle2 size={20} />
                </button>
                <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Note: Slot allocation is final and cannot be modified.</p>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-10 shadow-inner">
                <CheckCircle2 className="text-emerald-600" size={56} />
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tighter mb-6">Mission Docked.</h1>
              <p className="text-slate-500 max-w-md mb-12 text-lg font-medium leading-relaxed">
                Team <span className="text-slate-900 font-black">{teamId}</span> has successfully reserved **Slot {selectedSlot.id}** in the **{selectedDomain.title}** sector.
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Slot</span>
                  <span className="text-2xl font-black text-slate-900">{selectedSlot.id}</span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-xs font-black text-emerald-600 uppercase">Confirmed</span>
                </div>
              </div>

              <button
                onClick={onBack}
                className="inline-flex items-center gap-3 text-slate-900 px-8 py-4 rounded-xl border border-slate-200 font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-50 transition-all"
              >
                Return to Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
      
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}
