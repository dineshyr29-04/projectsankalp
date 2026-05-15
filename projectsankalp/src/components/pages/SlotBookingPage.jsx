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
  const [isConfirming, setIsConfirming] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [domainSlots, setDomainSlots] = useState({});
  const ticketRef = useRef(null);

  const handleDownloadTicket = async () => {
    if (ticketRef.current === null) return;
    try {
      const dataUrl = await toPng(ticketRef.current, { 
        cacheBust: true,
        backgroundColor: '#050505',
      });
      const link = document.createElement('a');
      link.download = `SANKALP_TICKET_${verifiedTeam?.teamId || 'ENTRY'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

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
        setError("REGISTRY CONFLICT: NAME ALREADY CLAIMED");
        setIsProcessing(false);
        return;
      }
      const generatedId = `C4C-${Date.now().toString().slice(-6)}`;
      setVerifiedTeam({ teamName: teamInput.trim(), teamId: generatedId });
      setStep("DOMAIN");
    } catch (err) {
      setError("SYSTEM OFFLINE");
    } finally {
      setIsProcessing(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.5));
        };
      };
    });
  };

  const handleSubmit = async () => {
    if (!transactionId || !screenshot) {
      setError("DATA REQUIRED");
      return;
    }
    setIsProcessing(true);
    setError("");
    setUploadProgress(10);
    try {
      const base64Image = await compressImage(screenshot);
      setUploadProgress(50);
      const teamNameLower = verifiedTeam.teamName.trim().toLowerCase();
      const payload = {
        teamId: verifiedTeam.teamId,
        teamName: verifiedTeam.teamName,
        teamNameLower,
        selectedDomain: selectedDomain.id,
        transactionId: transactionId,
        paymentStatus: "PENDING",
        imageUrl: base64Image,
        timestamp: new Date().toLocaleString()
      };
      await addDoc(collection(db, "registrations"), { ...payload, createdAt: serverTimestamp() });
      setUploadProgress(100);
      setStep("SUCCESS");
    } catch (err) {
      setError("SUBMISSION ERROR");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[150px] rounded-full" />
      </div>

      <Container full className="relative z-10 px-8">
        {/* Minimal Nav */}
        <div className="fixed top-12 left-12 right-12 flex justify-between items-center z-50 mix-blend-difference">
          <button onClick={() => onBack()} className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40 hover:opacity-100 transition-opacity">
            [ EXIT ]
          </button>
          <div className="flex gap-4">
             {["VERIFY", "DOMAIN", "PAYMENT", "SUCCESS"].map((s, idx) => (
               <div key={s} className={`w-1 h-1 rounded-full ${step === s ? "bg-white" : "bg-white/10"}`} />
             ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "VERIFY" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col justify-center max-w-5xl"
            >
              <div className="space-y-4 mb-20">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">REGISTRY INITIALIZATION</span>
                <h1 className="text-[12vw] md:text-[8vw] font-serif font-black italic leading-[0.9] tracking-tighter">
                  Who is <br /> Entering?
                </h1>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  placeholder="TEAM_NAME"
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  className="w-full bg-transparent border-none text-[8vw] md:text-[6vw] font-serif font-black italic tracking-tighter focus:outline-none placeholder:text-white/5 uppercase"
                  autoFocus
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-[2px] bg-white/10 absolute bottom-0"
                />
                <motion.div 
                  animate={{ width: teamInput ? "100%" : "0%" }}
                  className="h-[2px] bg-white absolute bottom-0"
                />
              </div>

              {error && <p className="mt-8 text-red-500 text-[10px] font-black tracking-widest uppercase">{error}</p>}

              <div className="mt-20">
                <button
                  onClick={handleVerify}
                  disabled={!teamInput || isProcessing}
                  className="group flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.6em] disabled:opacity-20"
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-500">
                    {isProcessing ? "PROCESSING..." : "CONTINUE TO SECTOR SELECTION"}
                  </span>
                  <span className="text-4xl group-hover:translate-x-8 transition-transform duration-500">→</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === "DOMAIN" && (
            <motion.div
              key="domain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen pt-48 pb-20"
            >
              <div className="mb-32">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">DEPLOYMENT SECTORS</span>
                <h2 className="text-7xl md:text-9xl font-serif font-black italic tracking-tighter leading-none mt-4">
                  The Mission.
                </h2>
              </div>

              <div className="space-y-0 border-t border-white/10">
                {DOMAINS.map((domain, index) => {
                  const slotsLeft = domainSlots[domain.id] ?? domain.slotsTotal;
                  const isFull = slotsLeft <= 0;
                  const isSelected = selectedDomain?.id === domain.id;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => !isFull && setSelectedDomain(domain)}
                      className={`w-full group py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 transition-all duration-700 relative overflow-hidden ${isFull ? "opacity-20" : "hover:bg-white hover:text-black"}`}
                    >
                      <div className="flex items-baseline gap-12 relative z-10">
                        <span className="text-xl md:text-2xl font-serif font-black italic opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                        <h3 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter transition-all duration-500 group-hover:pl-8">
                          {domain.title}
                        </h3>
                      </div>
                      
                      <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-2 relative z-10">
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                          {isFull ? "SECTOR_CAPACITY_REACHED" : `${slotsLeft} SLOTS_AVAILABLE`}
                        </span>
                        {isSelected && <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white px-4 py-1">[ SELECTED ]</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-32 flex justify-center">
                <button
                  onClick={() => setStep("PAYMENT")}
                  disabled={!selectedDomain}
                  className={`px-20 py-8 border-2 border-white font-black uppercase tracking-[0.6em] text-[12px] transition-all duration-700 ${selectedDomain ? "hover:bg-white hover:text-black" : "opacity-10 cursor-not-allowed"}`}
                >
                  INITIALIZE PAYMENT GATEWAY
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
              className="min-h-screen flex flex-col justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40 items-center">
                <div className="space-y-12">
                   <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">CREDIT VERIFICATION</span>
                     <h2 className="text-7xl md:text-9xl font-serif font-black italic tracking-tighter leading-none mt-4">
                       Secure.
                     </h2>
                   </div>
                   
                   <div className="space-y-4">
                     <p className="text-[14px] font-black uppercase tracking-[0.4em] leading-relaxed opacity-40">
                       TRANSFER FEE OF <span className="text-white opacity-100">{REGISTRATION_FEE}</span> TO THE PROTOCOL ADDRESS. SCAN TO AUTHORIZE.
                     </p>
                     <div className="bg-white p-6 inline-block">
                        <img src="/payment_qr.png" alt="QR" className="w-48 h-48 grayscale" />
                     </div>
                   </div>
                </div>

                <div className="space-y-16">
                  <div className="space-y-8">
                    <div className="group relative">
                      <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-4 block">TRANSACTION_HASH</label>
                      <input 
                        type="text" 
                        placeholder="ENTER UTR ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                        className="w-full bg-transparent border-b-2 border-white/10 py-6 text-3xl font-serif font-black italic tracking-widest focus:border-white outline-none transition-all uppercase placeholder:text-white/5"
                      />
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 block">PROOF_OF_TRANSFER</label>
                      <label className="relative flex items-center gap-8 cursor-pointer group">
                        <div className="w-20 h-20 border-2 border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                          {screenshot ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-2xl font-serif font-black italic opacity-20">+</span>}
                        </div>
                        <div>
                          <span className="block text-[11px] font-black uppercase tracking-[0.4em] mb-1">
                            {screenshot ? screenshot.name : "ATTACH_SCREENSHOT"}
                          </span>
                          <span className="block text-[9px] font-bold text-white/20 uppercase tracking-widest">MAX_SIZE 5MB // JPEG_PNG</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshot(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!transactionId || !screenshot || isProcessing}
                    className="w-full py-10 bg-white text-black font-black uppercase tracking-[0.8em] text-[12px] hover:bg-emerald-500 transition-all duration-700 disabled:opacity-10"
                  >
                    {isProcessing ? `UPLOADING [ ${uploadProgress}% ]` : "FINALIZE RESERVATION"}
                  </button>
                  {error && <p className="text-red-500 text-[10px] font-black tracking-widest uppercase text-center">{error}</p>}
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
              <div ref={ticketRef} className="bg-[#050505] p-12 md:p-20 relative max-w-xl w-full border border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-white/20" />
                
                <div className="mb-16">
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 block mb-10">IDENTITY_VERIFIED</span>
                  <h1 className="text-7xl md:text-9xl font-serif font-black italic tracking-tighter leading-none mb-6">Locked.</h1>
                </div>

                <div className="flex flex-col items-center gap-12">
                   <div className="bg-white p-4">
                     <QRCodeSVG 
                        value={`${window.location.origin}/status?teamId=${verifiedTeam?.teamId}`}
                        size={150}
                        level="H"
                      />
                   </div>
                   
                   <div className="w-full flex justify-between border-t border-white/10 pt-12">
                     <div className="text-left">
                       <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">IDENTIFIER</span>
                       <span className="text-3xl font-serif font-black italic tracking-widest">{verifiedTeam?.teamId}</span>
                     </div>
                     <div className="text-right">
                       <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">SECTOR</span>
                       <span className="text-3xl font-serif font-black italic tracking-widest">{selectedDomain?.code}</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className="mt-20 space-y-8 max-w-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] leading-relaxed opacity-40">
                  RESERVATION COMPLETE. SAVE THIS TOKEN FOR MISSION ACCESS.
                </p>
                <button
                  onClick={handleDownloadTicket}
                  className="w-full py-8 border-2 border-white font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white hover:text-black transition-all duration-700"
                >
                  DOWNLOAD ACCESS TOKEN
                </button>
                <button onClick={onBack} className="block w-full text-[9px] font-black uppercase tracking-[0.8em] opacity-20 hover:opacity-100 transition-opacity">
                  RETURN_TO_HUB
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
