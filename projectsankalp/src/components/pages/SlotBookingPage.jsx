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
  serverTimestamp,
} from "firebase/firestore";
import Container from "../core/Container";
import { 
  ChevronLeft, 
  Check, 
  Upload, 
  AlertCircle, 
  ArrowRight,
  User,
  ShieldCheck,
  Target
} from "lucide-react";

const DOMAINS = [
  {
    id: "women",
    title: "Women's Entrepreneurship",
    code: "01",
    description: "Empowering gender equality through financial tech systems.",
  },
  {
    id: "health",
    title: "Health & Sanitation",
    code: "02",
    description: "Innovating for public health and clean water infrastructure.",
  },
  {
    id: "climate",
    title: "Climate Action",
    code: "03",
    description: "Building a sustainable and green future for all humanity.",
  },
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
    // Slots are now unlimited by default
    setDomainSlots({});
  };

  const handleVerify = async () => {
    if (!teamInput.trim()) return;
    setIsProcessing(true);
    setError("");
    try {
      const normalized = teamInput.trim().toLowerCase();
      const q = query(
        collection(db, "registrations"),
        where("teamNameLower", "==", normalized),
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        setError("TEAM NAME ALREADY REGISTERED");
        setIsProcessing(false);
        return;
      }
      const allRegs = await getDocs(collection(db, "registrations"));
      const nextNumber = allRegs.size + 1;
      const generatedId = `TEAM-${String(nextNumber).padStart(3, '0')}`;
      setVerifiedTeam({ teamName: teamInput.trim(), teamId: generatedId });
      setStep("DOMAIN");
    } catch (err) {
      setError("CONNECTION ERROR");
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
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.5));
        };
      };
    });
  };

  const handleSubmit = async () => {
    if (!transactionId || !screenshot) {
      setError("DATA REQUIRED");
      return;
    }
    if (transactionId.length !== 12) {
      setError("UTR MUST BE EXACTLY 12 CHARACTERS");
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
        paymentVerified: false,
        imageUrl: base64Image,
        timestamp: new Date().toLocaleString(),
      };
      await addDoc(collection(db, "registrations"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      if (GOOGLE_SHEETS_WEBHOOK) {
        fetch(GOOGLE_SHEETS_WEBHOOK, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            timestamp: new Date().toLocaleString(),
          }),
        }).catch((err) => console.error("Sheets Sync Failed:", err));
      }

      setUploadProgress(100);
      setStep("SUCCESS");
    } catch (err) {
      setError("SUBMISSION ERROR");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (step === "DOMAIN") setStep("VERIFY");
    else if (step === "PAYMENT") setStep("DOMAIN");
    else onBack();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-white selection:text-slate-950 relative overflow-hidden flex flex-col items-center">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/5 via-transparent to-blue-500/5" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#FFF 1px, transparent 1px), linear-gradient(90deg, #FFF 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      <Container className={`relative z-10 w-full px-6 py-12 flex-1 flex flex-col transition-all duration-700 ${step === "PAYMENT" ? "max-w-5xl" : "max-w-2xl"}`}>
        {/* Navigation */}
        <div className="flex flex-col items-center mb-16 gap-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">
              Mission Step {step === "VERIFY" ? "01" : step === "DOMAIN" ? "02" : step === "PAYMENT" ? "03" : "04"}
            </span>
            <div className="flex gap-2">
              {["VERIFY", "DOMAIN", "PAYMENT", "SUCCESS"].map((s) => (
                <div 
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-700 ${step === s ? "bg-emerald-500 w-12" : "bg-white/10 w-4"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "VERIFY" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center items-center text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 border border-emerald-500/20">
                <User size={32} className="text-emerald-500" />
              </div>
              <h1 className="text-4xl font-serif font-black italic tracking-tight mb-4">
                Team Registration
              </h1>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-12">
                Initialize your mission entry
              </p>

              <div className="w-full space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="ENTER TEAM NAME"
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-6 text-xl font-serif font-black italic tracking-widest focus:outline-none focus:border-emerald-500 focus:bg-white/10 placeholder:text-white/10 uppercase transition-all text-center"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center justify-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                )}

                <button
                  onClick={handleVerify}
                  disabled={!teamInput || isProcessing}
                  className="w-full bg-white text-slate-950 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[12px] hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? "PROCESSING..." : "CONTINUE"}
                  {!isProcessing && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </motion.div>
          )}

          {step === "DOMAIN" && (
            <motion.div
              key="domain"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-blue-500/20">
                  <Target size={28} className="text-blue-500" />
                </div>
                <h2 className="text-3xl font-serif font-black italic tracking-tight mb-2">
                  Select Domain
                </h2>
                <p className="text-white/60 text-[11px] font-black uppercase tracking-widest">
                  Active Session: {verifiedTeam?.teamName}
                </p>
              </div>

              <div className="space-y-4">
                {DOMAINS.map((domain) => {
                  const isSelected = selectedDomain?.id === domain.id;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain)}
                    className={`w-full p-8 rounded-[32px] border-2 transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden ${
                      isSelected 
                      ? "bg-emerald-500/10 border-emerald-500" 
                      : "bg-white/5 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                        <Check size={14} />
                      </div>
                    )}
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-3 group-hover:text-emerald-500 transition-colors">
                      Track {domain.code}
                    </span>
                    <h3 className="text-2xl font-serif font-black italic tracking-tight uppercase group-hover:scale-105 transition-transform duration-500">
                      {domain.title}
                    </h3>
                    
                  </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-12">
                <button
                  onClick={() => setStep("PAYMENT")}
                  disabled={!selectedDomain}
                  className="w-full bg-white text-slate-950 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[12px] hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-10 shadow-xl"
                >
                  PROCEED TO PAYMENT
                </button>
              </div>
            </motion.div>
          )}

          {step === "PAYMENT" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-blue-500/20">
                  <ShieldCheck size={28} className="text-blue-500" />
                </div>
                <h2 className="text-3xl font-serif font-black italic tracking-tight mb-2">
                  Verify Payment
                </h2>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                  Mission: {selectedDomain?.title}
                </p>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-8 items-stretch">
                {/* QR Container - Left Side */}
                <div className="flex-[1.2] bg-white rounded-[48px] p-10 flex flex-col items-center justify-center shadow-[0_32px_64px_-12px_rgba(255,255,255,0.1)] border border-white/20">
                  <div className="w-full max-w-[280px] aspect-square bg-white rounded-[32px] p-6 mb-8 border border-slate-100 shadow-inner flex items-center justify-center">
                    <QRCodeSVG
                      value={`upi://pay?pa=projectsankalp@okaxis&pn=Project%20Sankalp&am=800&cu=INR`}
                      size={240}
                      level="H"
                      includeMargin={false}
                      imageSettings={{
                        src: "/favicon.ico",
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-5xl md:text-6xl font-serif font-black italic text-slate-950 mb-2 block tracking-tight">
                      {REGISTRATION_FEE}
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                      MISSION ENTRY FEE
                    </p>
                  </div>
                </div>

                {/* Inputs Container - Right Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="bg-white/5 border-2 border-white/10 rounded-[32px] p-8 text-center group focus-within:border-emerald-500 transition-all flex-1 flex flex-col justify-center">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-4 block group-focus-within:text-emerald-500">
                      UTR Transaction ID (12 CHARS)
                    </label>
                    <input
                      type="text"
                      placeholder="ENTER 12 DIGITS"
                      value={transactionId}
                      maxLength={12}
                      onChange={(e) => setTransactionId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      className="w-full bg-transparent border-none p-0 text-2xl md:text-3xl font-serif font-black italic tracking-[0.2em] focus:ring-0 outline-none uppercase placeholder:text-white/5 text-center"
                    />
                  </div>

                  <div className="relative group flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="screenshot-upload"
                      onChange={(e) => setScreenshot(e.target.files[0])}
                    />
                    <label 
                      htmlFor="screenshot-upload"
                      className={`w-full h-full flex flex-col items-center justify-center text-center p-8 rounded-[32px] border-2 border-dashed transition-all cursor-pointer ${
                        screenshot 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" 
                        : "bg-white/5 border-white/10 hover:border-white/30 text-white/40 hover:text-white"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center mb-4 ${screenshot ? "bg-emerald-500 text-white shadow-lg" : "bg-white/5 border border-white/10"}`}>
                        <Upload size={20} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                          {screenshot ? "FILE ATTACHED" : "UPLOAD PROOF"}
                        </span>
                        <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">
                          {screenshot ? screenshot.name : "PNG, JPG // MAX 5MB"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-xl mx-auto mt-12">
                <button
                  onClick={handleSubmit}
                  disabled={!transactionId || !screenshot || isProcessing}
                  className="w-full bg-white text-slate-950 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[12px] hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-10"
                >
                  {isProcessing ? "PROCESSING MISSION..." : "FINALIZE REGISTRATION"}
                </button>

                {error && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center mt-4">
                    {error}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === "SUCCESS" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center text-center px-4"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-[40px] flex items-center justify-center mb-12 border border-emerald-500/30 animate-bounce">
                <ShieldCheck size={48} className="text-emerald-500" />
              </div>
              <h1 className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-6">
                Success.
              </h1>
              <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] mb-12 leading-relaxed">
                Mission Code Assigned <br />
                <span className="text-emerald-500 text-lg mt-2 block">{verifiedTeam?.teamId}</span>
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 w-full">
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-white/60">
                  Verification in progress. <br />
                  We will inform you shortly via official channels once finished.
                </p>
              </div>

              <button
                onClick={onBack}
                className="group flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase border-b-2 border-white pb-1 hover:border-emerald-500 transition-colors"
              >
                <span>RETURN TO HUB</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
