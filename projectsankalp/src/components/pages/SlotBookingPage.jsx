import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { 
  ShieldCheck, 
  Globe, 
  Heart, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Loader2,
  ChevronLeft,
  Search,
  Upload,
  Check,
  X,
  CreditCard,
  QrCode,
  Download,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";
import { db, storage } from "../../lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Container from "../core/Container";

const DOMAINS = [
  {
    id: "women",
    title: "Women's Entrepreneurship",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Empowering gender equality through financial tech.",
    slotsTotal: 15
  },
  {
    id: "health",
    title: "Health & Sanitation",
    icon: Heart,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Innovating for public health and clean water.",
    slotsTotal: 15
  },
  {
    id: "climate",
    title: "Climate Action",
    icon: Leaf,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    description: "Building a sustainable and green future.",
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
  const [screenshotUrl, setScreenshotUrl] = useState("");
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
        backgroundColor: '#111',
        style: {
          borderRadius: '48px'
        }
      });
      const link = document.createElement('a');
      link.download = `SANKALP_TICKET_${verifiedTeam?.teamId || 'ENTRY'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to generate ticket. Please take a manual screenshot.');
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
      return allRegs.size; // Return total for ID generation
    } catch (err) {
      console.error("Error fetching slots:", err);
      return 0;
    }
  };

  const handleVerify = async () => {
    if (!teamInput.trim()) return;
    setIsProcessing(true);
    setError("");

    try {
      // Check if the team name has already registered
      const normalized = teamInput.trim().toLowerCase();
      const q = query(
        collection(db, "registrations"), 
        where("teamNameLower", "==", normalized)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        setError("This team name has already been claimed.");
        setIsProcessing(false);
        return;
      }

      // Generate a collision-resistant ID using timestamp
      const generatedId = `C4C-${Date.now()}`;

      setVerifiedTeam({
        teamName: teamInput.trim(),
        teamId: generatedId,
        captainName: "New Entry",
        institute: "Participant" 
      });
      setStep("DOMAIN");
    } catch (err) {
      setError("System terminal offline. Check connection.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScreenshotChange = (e) => {
    if (e.target.files[0]) {
      setScreenshot(e.target.files[0]);
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
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
      };
    });
  };


  const handleSubmit = async () => {
    if (!transactionId || !screenshot) {
      setError("Please provide both transaction ID and payment proof.");
      return;
    }
    
    setIsProcessing(true);
    setError("");
    setUploadProgress(10);

    try {
      // 1. Compress Image (Make it small enough for Firestore - ~100KB)
      const base64Image = await compressImage(screenshot);
      setUploadProgress(50);

      const teamNameLower = (verifiedTeam.teamName || '').trim().toLowerCase();

      // Final uniqueness check to prevent race conditions
      const dupQ = query(collection(db, 'registrations'), where('teamNameLower', '==', teamNameLower));
      const dupSnap = await getDocs(dupQ);
      if (!dupSnap.empty) {
        setError('This team name was registered moments ago. Please refresh and try a different name.');
        setIsProcessing(false);
        return;
      }

      const payload = {
        teamId: verifiedTeam.teamId,
        teamName: verifiedTeam.teamName,
        teamNameLower,
        selectedDomain: selectedDomain.id,
        transactionId: transactionId,
        paymentStatus: "PENDING",
        imageUrl: base64Image, // Store directly in Firestore
        timestamp: new Date().toLocaleString()
      };

      // 2. Save to Firestore (Primary "In-House" Storage)
      await addDoc(collection(db, "registrations"), {
        ...payload,
        createdAt: serverTimestamp()
      });
      setUploadProgress(80);

      // 3. Optional Background Sync to Sheets (Silent failure)
      if (GOOGLE_SHEETS_WEBHOOK) {
        try {
          const params = new URLSearchParams();
          params.append("payload", JSON.stringify({ ...payload, imageData: "Stored in Firebase" }));
          fetch(GOOGLE_SHEETS_WEBHOOK, { method: "POST", mode: "no-cors", body: params });
        } catch (e) { console.warn("Sheet sync skipped"); }
      }
      setUploadProgress(100);

      setStep("SUCCESS");
    } catch (err) {
      console.error("Submission Error:", err);
      setError(`System Error: ${err.message || "Connection Interrupted"}. Please try again.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <Container full className="relative z-10 pt-24 pb-20 mx-auto px-6">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            if (step === "VERIFY") onBack();
            else if (step === "DOMAIN") setStep("VERIFY");
            else if (step === "PAYMENT") setStep("DOMAIN");
            else onBack();
          }}
          className="fixed top-8 left-8 z-50 flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl hover:bg-white/10 transition-all group active:scale-95"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {step === "VERIFY" ? "Exit Terminal" : "Back"}
          </span>
        </motion.button>

        <AnimatePresence mode="wait">
          {/* STEP 1: TEAM VERIFICATION */}
          {step === "VERIFY" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center max-w-2xl mx-auto py-12"
            >
              <motion.div 
                
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 rounded-[32px] flex items-center justify-center mb-12 relative rotate-12 group-hover:rotate-0 transition-transform duration-500"
              >
                
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight text-center mb-4 italic">
                Identity.
              </h1>
              <p className="text-white/40 text-center mb-12 max-w-md font-medium leading-relaxed uppercase tracking-[0.2em] text-[10px]">
                Verify your team signature to initiate reservation.
              </p>

              <div className="w-full relative group">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  placeholder="TEAM NAME"
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-7 text-2xl text-center font-black tracking-widest uppercase focus:border-white/30 focus:bg-white/[0.08] outline-none transition-all relative z-10"
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-6 text-red-400 font-bold uppercase tracking-widest text-[10px] bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20"
                >
                  <X size={14} /> {error}
                </motion.div>
              )}

              <button
                onClick={handleVerify}
                disabled={!teamInput || isProcessing}
                className="w-full mt-8 bg-white text-black py-7 rounded-3xl font-black uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-4 hover:bg-white/90 disabled:opacity-50 transition-all active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] group"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <>Verify Team <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
              </button>
            </motion.div>
          )}

          {/* STEP 2: DOMAIN SELECTION */}
          {step === "DOMAIN" && (
            <motion.div
              key="domain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-6 md:py-12"
            >
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">Deployment Sector</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter italic">Select Mission.</h2>
                </div>                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-4 w-full md:w-auto">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-xs font-black tracking-tight truncate max-w-[150px] uppercase">{verifiedTeam?.teamName}</span>
                    <span className="block text-[9px] font-bold text-white/30 tracking-widest">{verifiedTeam?.teamId}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DOMAINS.map((domain) => {
                  const slotsLeft = domainSlots[domain.id] ?? domain.slotsTotal;
                  const isSelected = selectedDomain?.id === domain.id;
                  const isFull = slotsLeft <= 0;

                  return (
                    <motion.button
                      key={domain.id}
                      whileHover={!isFull ? { y: -8, scale: 1.02 } : {}}
                      whileTap={!isFull ? { scale: 0.98 } : {}}
                      onClick={() => !isFull && setSelectedDomain(domain)}
                      disabled={isFull}
                      className={`
                        relative group text-left rounded-[40px] p-8 transition-all duration-500 border overflow-hidden
                        ${isSelected 
                          ? "bg-white border-white shadow-2xl shadow-white/10" 
                          : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }
                        ${isFull ? "opacity-20 grayscale cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className={`w-14 h-14 rounded-2xl ${isSelected ? "bg-black/5" : domain.bg} flex items-center justify-center transition-colors`}>
                            <domain.icon className={isSelected ? "text-black" : domain.color} size={28} />
                          </div>
                          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${isSelected ? "bg-black/10 text-black" : "bg-white/5 text-white/40"}`}>
                            {slotsLeft} Open
                          </div>
                        </div>

                        <h3 className={`text-2xl font-serif font-black italic mb-3 tracking-tight ${isSelected ? "text-black" : "text-white"}`}>
                          {domain.title}
                        </h3>
                        <p className={`text-[13px] font-medium leading-relaxed mb-8 ${isSelected ? "text-black/60" : "text-white/40"}`}>
                          {domain.description}
                        </p>
                        
                        <div className={`pt-6 border-t ${isSelected ? "border-black/10" : "border-white/5"} flex justify-between items-center`}>
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isSelected ? "text-black" : "text-blue-500"}`}>
                            {isFull ? "Sector Full" : isSelected ? "Sector Selected" : "Initialize"}
                          </span>
                          {!isFull && <ArrowRight size={16} className={`transition-all duration-500 ${isSelected ? "text-black" : "text-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`} />}
                        </div>
                      </div>

                      {/* Ambient background glow for cards */}
                      {!isSelected && (
                        <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity ${domain.bg}`} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center pt-12">
                <button
                  onClick={() => setIsConfirming(true)}
                  disabled={!selectedDomain}
                  className="w-full md:w-auto bg-white text-black px-20 py-7 rounded-3xl font-black uppercase tracking-[0.5em] text-[11px] disabled:opacity-30 hover:bg-white/90 transition-all active:scale-95 shadow-2xl shadow-white/10"
                >
                  Confirm Mission Selection
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PAYMENT TERMINAL */}
          {step === "PAYMENT" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-6 md:py-12"
            >
              {/* Left Side: QR & Info */}
              <div className="space-y-6 md:space-y-8">
                <div className="bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Secure Payment Gateway</span>
                  
                  <div className="bg-white p-5 rounded-[32px] shadow-2xl mb-8 relative group">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src="/payment_qr.png" alt="Payment QR" className="w-48 md:w-56 h-auto relative z-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-serif font-black italic">{REGISTRATION_FEE}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Registration & Processing Fee</p>
                  </div>
                </div>

                <div className="bg-blue-600/5 border border-blue-500/10 p-6 md:p-8 rounded-3xl flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Lock className="text-blue-500" size={20} />
                  </div>
                  <p className="text-[11px] text-blue-200/50 leading-relaxed font-medium">
                    Ensure the transaction ID is accurate. Verification takes 12-24 hours. Your domain slot is reserved immediately upon submission.
                  </p>
                </div>
              </div>

              {/* Right Side: Verification Form */}
              <div className="bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[40px] flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black italic mb-8 md:mb-10 leading-tight">Verify Payment.</h2>
                  
                  <div className="space-y-6 md:space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Transaction ID (UTR)</label>
                      <input 
                        type="text" 
                        placeholder="EX: 4123..."
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 font-black tracking-widest uppercase focus:border-white/30 focus:bg-white/[0.08] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Payment Screenshot</label>
                      <label className="group relative w-full h-40 md:h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/10 hover:border-white/30 overflow-hidden">
                        {screenshot ? (
                          <div className="flex flex-col items-center gap-3 p-4">
                            <ImageIcon className="text-blue-500" size={32} />
                            <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[150px]">{screenshot.name}</span>
                            <button onClick={(e) => { e.preventDefault(); setScreenshot(null); }} className="text-red-400 hover:text-red-300 text-[10px] font-black uppercase tracking-widest mt-2">
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <Upload className="text-white/20 group-hover:text-white" size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Click to Upload</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotChange} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-10 md:mt-12 space-y-4">
                  {isProcessing && (
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                      />
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!transactionId || !screenshot || isProcessing}
                    className="w-full bg-white text-black py-6 md:py-7 rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:bg-white/90 disabled:opacity-30 transition-all active:scale-95 shadow-2xl shadow-white/10"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <>Complete Reservation <Check size={18} /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS SCREEN */}
          {step === "SUCCESS" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto text-center"
            >
              {/* SUCCESS TICKET CARD */}
              <div 
                ref={ticketRef}
                className="bg-[#111] border border-white/10 rounded-[48px] p-10 mb-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                
                <div className="mb-10 relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-500 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl relative z-10"
                  >
                    <CheckCircle2 className="text-white" size={40} />
                  </motion.div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter italic mb-4 text-white">Manifest Secured.</h1>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10">Mission Identity Locked</p>

                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-8 flex flex-col items-center">
                  <div className="p-4 bg-white rounded-2xl mb-6">
                    <QRCodeSVG 
                      value={`${window.location.origin}/status?teamId=${verifiedTeam?.teamId}`}
                      size={150}
                      level="H"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center text-left">
                    <div>
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">TEAM ID</span>
                      <span className="text-lg font-black tracking-widest text-emerald-400 uppercase">{verifiedTeam?.teamId}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">SECTOR</span>
                      <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">{selectedDomain?.title}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left border-t border-white/5 pt-6">
                  <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest text-center">
                    Project Sankalp 2026 // Registry Confirmed
                  </p>
                </div>
              </div>

              {/* DOWNLOAD PROMPT & WARNING */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-8 mb-10">
                <div className="flex items-center justify-center gap-3 mb-3 text-red-500">
                  <AlertTriangle size={20} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Entry Requirement</h3>
                </div>
                <p className="text-red-400 font-bold text-xs leading-relaxed mb-8">
                  IT IS MANDATORY TO DOWNLOAD THIS RECEIPT. YOU MUST PRESENT THIS QR CODE AT THE ENTRY GATE.
                </p>
                
                <button
                  onClick={handleDownloadTicket}
                  className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                >
                  <Download size={16} />
                  Download Entry Receipt
                </button>
              </div>

              <button
                onClick={onBack}
                className="text-white/20 hover:text-white font-black uppercase tracking-[0.4em] text-[9px] transition-colors"
              >
                Return to Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {isConfirming && selectedDomain && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirming(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[48px] p-12 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-600" />
              
              <div className={`w-20 h-20 rounded-3xl ${selectedDomain.bg} flex items-center justify-center mx-auto mb-10`}>
                <ShieldCheck className={selectedDomain.color} size={40} />
              </div>

              <h3 className="text-3xl font-serif font-black italic text-center mb-4 leading-tight">Confirm Reservation?</h3>
              <p className="text-center text-white/40 font-medium mb-10 leading-relaxed">
                You are about to reserve a slot in the <span className="text-white font-bold underline underline-offset-4">{selectedDomain.title}</span> domain. Proceed to secure your mission.
              </p>

              <div className="space-y-6 bg-white/5 p-8 rounded-3xl mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Team ID</span>
                  <span className="text-sm font-black tracking-widest uppercase">{verifiedTeam?.teamId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Reserved Fee</span>
                  <span className="text-sm font-black tracking-widest text-blue-500">{REGISTRATION_FEE}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsConfirming(false)}
                  className="py-5 rounded-2xl text-white/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsConfirming(false);
                    setStep("PAYMENT");
                  }}
                  className="py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-white/5 hover:bg-white/90 transition-all active:scale-95"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
