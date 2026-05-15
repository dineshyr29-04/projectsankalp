import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { db } from "../../lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp
} from "firebase/firestore";
import Container from "../core/Container";

const DOMAINS = [
  {
    id: "women",
    title: "Women's Entrepreneurship",
    code: "01",
    description: "Empowering gender equality through financial tech systems.",
    slotsTotal: 15
  },
  {
    id: "health",
    title: "Health & Sanitation",
    code: "02",
    description: "Innovating for public health and clean water infrastructure.",
    slotsTotal: 15
  },
  {
    id: "climate",
    title: "Climate Action",
    code: "03",
    description: "Building a sustainable and green future for all humanity.",
    slotsTotal: 15
  }
];

const REGISTRATION_FEE = "₹800";
const GOOGLE_SHEETS_WEBHOOK = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;

export default function SlotBookingPage({ onBack }) {
  const [step, setStep] = useState("VERIFY"); // VERIFY, DOMAIN, PAYMENT, SUCCESS
  const [teamInput, setTeamInput] = useState("");
  const [verifiedTeam, setVerifiedTeam] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [domainSlots, setDomainSlots] = useState({});
  const ticketRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const slotsData = {};
      const allRegs = await getDocs(collection(db, "registrations"));
      const regsByDomain = {};
      allRegs.docs.forEach(doc => {
        const d = doc.data().selectedDomain;
        regsByDomain[d] = (regsByDomain[d] || 0) + 1;
      });
      for (const domain of DOMAINS) {
        slotsData[domain.id] = domain.slotsTotal - (regsByDomain[domain.id] || 0);
      }
      setDomainSlots(slotsData);
    } catch (err) {}
  };

  const handleVerify = async () => {
    if (!teamInput.trim()) return;
    setIsProcessing(true);
    setError("");
    try {
      const normalized = teamInput.trim().toLowerCase();
      const q = query(collection(db, "registrations"), where("teamNameLower", "==", normalized));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setError("TEAM NAME ALREADY REGISTERED");
        setIsProcessing(false);
        return;
      }
      const generatedId = `C4C-${Date.now().toString().slice(-6)}`;
      setVerifiedTeam({ teamName: teamInput.trim(), teamId: generatedId });
      setStep("DOMAIN");
    } catch (err) {
      setError("CONNECTION ERROR");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadTicket = async () => {
    if (ticketRef.current === null) return;
    try {
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true, backgroundColor: '#FFFFFF' });
      const link = document.createElement('a');
      link.download = `SANKALP_TICKET_${verifiedTeam?.teamId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden">
      {/* Professional Structural Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      </div>

      <Container full className="relative z-10 px-6 md:px-12 mx-auto max-w-6xl">
        {/* Professional Nav */}
        <div className="fixed top-8 left-8 right-8 flex justify-between items-center z-50">
          <button onClick={onBack} className="text-[10px] font-black tracking-[0.4em] uppercase border-b-2 border-slate-900 pb-1">
            [ EXIT ]
          </button>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">REGISTRATION PHASE</span>
            <div className="h-[2px] w-12 bg-slate-100 relative">
               <motion.div 
                 animate={{ width: step === "VERIFY" ? "25%" : step === "DOMAIN" ? "50%" : step === "PAYMENT" ? "75%" : "100%" }}
                 className="absolute inset-y-0 left-0 bg-slate-900"
               />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "VERIFY" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-screen flex flex-col justify-center pt-20"
            >
              <div className="max-w-3xl">
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 mb-6 block">STEP_01 // IDENTITY</span>
                <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-slate-900 mb-12 leading-none">
                  Registry <br /> Initialization.
                </h1>
                
                <div className="relative pt-8">
                  <input
                    type="text"
                    placeholder="ENTER TEAM NAME"
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    className="w-full bg-transparent border-none text-4xl md:text-5xl font-serif font-black italic tracking-tight focus:outline-none placeholder:text-slate-100 uppercase"
                    autoFocus
                  />
                  <div className="h-[2px] w-full bg-slate-100 mt-4 relative">
                    <motion.div animate={{ width: teamInput ? "100%" : "0%" }} className="absolute inset-y-0 left-0 bg-slate-900" />
                  </div>
                </div>

                {error && <p className="mt-6 text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}

                <div className="mt-16">
                  <button
                    onClick={handleVerify}
                    disabled={!teamInput || isProcessing}
                    className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] disabled:opacity-20 hover:text-emerald-600 transition-colors"
                  >
                    <span>{isProcessing ? "PROCESSING..." : "CONTINUE TO SELECTION"}</span>
                    <span className="text-3xl transition-transform group-hover:translate-x-2">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "DOMAIN" && (
            <motion.div
              key="domain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen pt-48 pb-32"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b-2 border-slate-900 pb-12">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 mb-4 block">STEP_02 // DEPLOYMENT</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-none">The Mission.</h2>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-black tracking-widest text-slate-300 uppercase mb-2">ACTIVE SESSION</span>
                  <span className="text-2xl font-serif font-black italic">{verifiedTeam?.teamName}</span>
                </div>
              </div>

              <div className="space-y-0">
                {DOMAINS.map((domain) => {
                  const slotsLeft = domainSlots[domain.id] ?? domain.slotsTotal;
                  const isFull = slotsLeft <= 0;
                  const isSelected = selectedDomain?.id === domain.id;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => !isFull && setSelectedDomain(domain)}
                      className={`w-full text-left py-10 md:py-12 border-b border-slate-100 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between group ${isFull ? "opacity-20" : "hover:pl-4"}`}
                    >
                      <div className="flex items-baseline gap-10">
                        <span className="text-xl font-serif font-black italic opacity-10 group-hover:opacity-100 transition-opacity">{domain.code}</span>
                        <h3 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tight transition-colors ${isSelected ? "text-emerald-600" : "text-slate-900"}`}>
                          {domain.title}
                        </h3>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center gap-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {isFull ? "CAPACITY FULL" : `${slotsLeft} SLOTS LEFT`}
                        </span>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-24 flex justify-end">
                <button
                  onClick={() => setStep("PAYMENT")}
                  disabled={!selectedDomain}
                  className={`px-16 py-6 bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[11px] transition-all ${selectedDomain ? "hover:bg-emerald-600 shadow-xl" : "opacity-10"}`}
                >
                  PROCEED TO VERIFICATION
                </button>
              </div>
            </motion.div>
          )}

          {step === "PAYMENT" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen pt-48 pb-32"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 mb-6 block">STEP_03 // VERIFICATION</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-slate-900 mb-12 leading-none">Secure Pay.</h2>
                  
                  <div className="space-y-12">
                    <div className="p-8 border-2 border-slate-900 inline-block bg-white">
                      <img src="/payment_qr.png" alt="QR" className="w-48 h-48 grayscale" />
                    </div>
                    <div className="space-y-2">
                       <span className="text-5xl font-serif font-black italic text-slate-900">{REGISTRATION_FEE}</span>
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">REGISTRATION FEE REQUIREMENT</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end space-y-16">
                  <div className="space-y-10">
                    <div className="relative">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">UTR TRANSACTION ID</label>
                      <input 
                        type="text" 
                        placeholder="ENTER ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                        className="w-full bg-transparent border-b-2 border-slate-100 py-4 text-2xl font-serif font-black italic tracking-widest focus:border-slate-900 outline-none transition-all uppercase placeholder:text-slate-100"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">PAYMENT PROOF</label>
                      <label className="flex items-center gap-6 cursor-pointer group">
                        <div className="w-16 h-16 border-2 border-slate-100 flex items-center justify-center group-hover:border-slate-900 transition-all">
                          {screenshot ? <span className="text-emerald-500 font-bold">OK</span> : <span className="text-2xl font-serif font-black italic opacity-10">+</span>}
                        </div>
                        <div>
                          <span className="block text-[11px] font-black uppercase tracking-widest">
                            {screenshot ? screenshot.name : "ATTACH RECEIPT"}
                          </span>
                          <span className="block text-[9px] font-bold text-slate-300 uppercase tracking-widest">MAX 5MB // PNG, JPG</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshot(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!transactionId || !screenshot || isProcessing}
                    className="w-full py-8 bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[12px] hover:bg-emerald-600 transition-all disabled:opacity-10"
                  >
                    {isProcessing ? "PROCESSING..." : "FINALIZE REGISTRATION"}
                  </button>
                  {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === "SUCCESS" && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen flex flex-col justify-center items-center text-center"
            >
              <div ref={ticketRef} className="bg-white border-8 border-slate-900 p-12 md:p-16 max-w-lg w-full relative">
                <div className="mb-12">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 block mb-6">ENTRY TOKEN SECURED</span>
                  <h1 className="text-6xl md:text-7xl font-serif font-black italic tracking-tighter leading-none mb-4">Confirmed.</h1>
                </div>

                <div className="flex flex-col items-center gap-10">
                   <div className="p-4 border-2 border-slate-100">
                     <QRCodeSVG 
                        value={`${window.location.origin}/status?teamId=${verifiedTeam?.teamId}`}
                        size={160}
                        level="H"
                      />
                   </div>
                   
                   <div className="w-full flex justify-between border-t-2 border-slate-900 pt-10">
                     <div className="text-left">
                       <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mb-2">IDENTIFIER</span>
                       <span className="text-2xl font-serif font-black italic">{verifiedTeam?.teamId}</span>
                     </div>
                     <div className="text-right">
                       <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mb-2">SECTOR</span>
                       <span className="text-2xl font-serif font-black italic">{selectedDomain?.code}</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className="mt-16 space-y-6 max-w-xs w-full">
                <button
                  onClick={handleDownloadTicket}
                  className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[11px] hover:invert transition-all"
                >
                  DOWNLOAD TOKEN
                </button>
                <button onClick={onBack} className="block w-full text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-slate-900 transition-colors">
                  [ HUB ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
