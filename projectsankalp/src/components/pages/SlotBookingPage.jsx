import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  Search,
  Upload,
  Check,
  X,
  CreditCard,
  QrCode,
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
const GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbzyXATn_PKJCxOyIR3kmYLIRIhjwljY94_wAyWrqX23urpsktDTK4Qnb9WClDkmQx03kQ/exec"; // USER NEEDS TO PROVIDE THIS

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
      const q = query(
        collection(db, "registrations"), 
        where("teamName", "==", teamInput.trim())
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        setError("This team name has already been claimed.");
        setIsProcessing(false);
        return;
      }

      // Generate the next C4C ID
      const totalCount = await fetchSlots();
      const nextIdNumber = (totalCount + 1).toString().padStart(2, '0');
      const generatedId = `C4C-${nextIdNumber}`;

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

  const handleSubmit = async () => {
    if (!transactionId || !screenshot) {
      setError("Please provide both transaction ID and payment proof.");
      return;
    }
    setIsProcessing(true);
    setError("");

    try {
      // 1. Convert Image to Base64 (Bypasses CORS issue)
      const reader = new FileReader();
      reader.readAsDataURL(screenshot);
      reader.onload = async () => {
        const base64Image = reader.result;

        // 2. Send EVERYTHING to Google Sheets (Webapp handles Drive upload)
        const registrationData = {
          teamId: verifiedTeam.teamId,
          teamName: verifiedTeam.teamName,
          selectedDomain: selectedDomain.id,
          transactionId,
          paymentStatus: "PENDING",
          image: base64Image, // Base64 string
          timestamp: new Date().toISOString()
        };

        if (GOOGLE_SHEETS_WEBHOOK) {
          try {
            const response = await fetch(GOOGLE_SHEETS_WEBHOOK, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(registrationData)
            });

            // Note: with no-cors, we can't read the response, but we assume success if no error thrown
          } catch (sheetErr) {
            console.error("Sheet sync failed:", sheetErr);
          }
        }

        // 3. Save to Firestore (Record of Truth)
        await addDoc(collection(db, "registrations"), {
          ...registrationData,
          image: "Stored in Drive/Sheets", // Don't store massive base64 in Firestore
          createdAt: serverTimestamp()
        });

        setStep("SUCCESS");
        setIsProcessing(false);
      };
    } catch (err) {
      setError("Critical failure during finalization.");
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

      <Container className="relative z-10 pt-24 pb-20 mx-auto px-6">
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="py-12"
            >
              <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                <div>
                  <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Deployment Phase</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter italic">Select Sector</h2>
                </div>                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-6 max-w-sm">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-black tracking-tight truncate">{verifiedTeam?.teamName}</span>
                      <span className="bg-emerald-500 text-[8px] font-black px-2 py-0.5 rounded text-black uppercase">Verified</span>
                    </div>
                    <div className="flex flex-col text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                      <span>Capt. {verifiedTeam?.captainName || "Identity Secured"}</span>
                      <span className="truncate">{verifiedTeam?.institute || "Universal Institute"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {DOMAINS.map((domain) => {
                  const slotsLeft = domainSlots[domain.id] ?? domain.slotsTotal;
                  return (
                    <motion.button
                      key={domain.id}
                      whileHover={{ y: -10 }}
                      onClick={() => {
                        setSelectedDomain(domain);
                        setIsConfirming(true);
                      }}
                      disabled={slotsLeft <= 0}
                      className="group relative text-left bg-white/5 border border-white/10 rounded-[40px] p-10 transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <div className={`w-20 h-20 rounded-3xl ${domain.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                        <domain.icon className={domain.color} size={40} />
                      </div>
                      <h3 className="text-3xl font-black mb-4 tracking-tight leading-none uppercase">{domain.title}</h3>
                      <p className="text-white/40 font-medium text-sm mb-12 leading-relaxed">{domain.description}</p>
                      
                      <div className="flex justify-between items-center pt-8 border-t border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:translate-x-2 transition-transform">
                          Initialize Sector
                        </span>
                        <div className="px-4 py-2 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {slotsLeft} BAYS OPEN
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: PAYMENT TERMINAL */}
          {step === "PAYMENT" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 py-12"
            >
              {/* Left Side: QR & Info */}
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Secure Payment Gateway</span>
                  
                  <div className="bg-white p-6 rounded-[32px] shadow-2xl mb-8 relative group">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src="/payment_qr.png" alt="Payment QR" className="w-56 h-auto relative z-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-black">{REGISTRATION_FEE}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Registration & Processing Fee</p>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Lock className="text-blue-500" size={24} />
                  </div>
                  <p className="text-xs text-blue-200/60 leading-relaxed font-medium">
                    Ensure the transaction ID is clearly visible. Payment verification takes 12-24 hours. Your domain slot is reserved immediately upon submission.
                  </p>
                </div>
              </div>

              {/* Right Side: Verification Form */}
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-serif font-black italic mb-10 leading-tight">Verify Payment.</h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Transaction ID (UTR)</label>
                      <input 
                        type="text" 
                        placeholder="EX: 4123..."
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black tracking-widest uppercase focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Payment Screenshot</label>
                      <label className="group relative w-full h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/10 hover:border-blue-500/50 overflow-hidden">
                        {screenshot ? (
                          <div className="flex flex-col items-center gap-4 p-4">
                            <ImageIcon className="text-blue-500" size={40} />
                            <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[200px]">{screenshot.name}</span>
                            <button onClick={(e) => { e.preventDefault(); setScreenshot(null); }} className="text-red-400 hover:text-red-300">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <Upload className="text-white/30 group-hover:text-white" size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Click to Upload</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotChange} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  {isProcessing && (
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!transactionId || !screenshot || isProcessing}
                    className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/90 disabled:opacity-50 transition-all active:scale-95"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <>Complete Reservation <Check size={20} /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS SCREEN */}
          {step === "SUCCESS" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="relative mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-32 h-32 bg-emerald-500 rounded-[40px] flex items-center justify-center mx-auto shadow-[0_20px_60px_rgba(16,185,129,0.3)] relative z-10"
                >
                  <CheckCircle2 className="text-white" size={64} />
                </motion.div>
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter italic mb-6">Reservation Secured.</h1>
              <p className="text-white/50 font-medium text-lg leading-relaxed mb-12 max-w-md mx-auto">
                Your deployment in the <span className="text-white font-bold">{selectedDomain?.title}</span> sector has been initiated. Mission credentials sent to registry.
              </p>

              <div className="grid grid-cols-2 gap-4 text-left mb-16">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Operation ID</span>
                  <span className="text-sm font-black uppercase tracking-widest text-emerald-500">{verifiedTeam?.teamId}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Sector</span>
                  <span className="text-sm font-black uppercase tracking-widest text-blue-500">{selectedDomain?.title}</span>
                </div>
              </div>

              <button
                onClick={onBack}
                className="bg-white text-black px-14 py-6 rounded-2xl font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all active:scale-95 shadow-2xl shadow-white/10"
              >
                Return to Command Hub
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
