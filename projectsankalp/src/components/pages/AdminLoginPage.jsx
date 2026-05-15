import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, ChevronRight, AlertCircle, Terminal, Activity } from "lucide-react";
import Container from "../core/Container";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLoginPage({ onLogin, onBack }) {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setIsAuthenticating(true);
    
    try {
      const authRef = doc(db, "config", "admin");
      const authSnap = await getDoc(authRef);
      
      let masterKey = import.meta.env.VITE_ADMIN_MASTER_KEY || "ADMIN123";
      if (authSnap.exists()) masterKey = authSnap.data().masterKey;
      
      const enteredKey = passphrase.trim();
      const actualKey = String(masterKey).trim();
      
      if (enteredKey === actualKey && actualKey !== "") {
        onLogin();
      } else {
        throw new Error("INVALID");
      }
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(true);
      setPassphrase("");
      setIsAuthenticating(false);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 10000); // 10 second lockout
      }
      
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-emerald-500">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <Container className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          {/* Security Shield */}
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield size={40} className={`transition-all duration-500 ${isAuthenticating ? "text-emerald-500 animate-pulse" : "text-white"}`} />
          </div>

          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-4 block">
              Restricted Terminal
            </span>
            <h1 className="text-4xl font-serif font-black italic tracking-tighter leading-none mb-4">
              Admin Access
            </h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest max-w-[28ch] mx-auto leading-relaxed">
              Authenticate via encrypted master key to initialize terminal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <motion.div 
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-emerald-500/20 blur-xl rounded-3xl transition-opacity duration-500 ${isAuthenticating ? "opacity-100" : "opacity-0"}`} />
              <div className={`relative bg-white/5 border-2 rounded-[32px] p-2 transition-all duration-300 ${isLocked ? "border-red-900 bg-red-950/20" : error ? "border-red-500" : "border-white/10 group-focus-within:border-emerald-500"}`}>
                <div className="flex items-center">
                  <div className={`w-14 h-14 flex items-center justify-center ${isLocked ? "text-red-500" : "text-white/20"}`}>
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder={isLocked ? "TERMINAL LOCKED" : "ENTER MASTER KEY"}
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    disabled={isAuthenticating || isLocked}
                    className="flex-1 bg-transparent border-none text-white font-serif font-black italic tracking-[0.4em] focus:ring-0 outline-none text-lg placeholder:text-white/5 placeholder:font-sans placeholder:font-black placeholder:tracking-widest disabled:opacity-50"
                  />
                </div>
              </div>
            </motion.div>

            {(error || isLocked) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                  <AlertCircle size={14} />
                  <span>{isLocked ? "Security Protocol: Terminal Locked (10s)" : `Unauthorized Access Attempt (${attempts}/3)`}</span>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={!passphrase || isAuthenticating}
              className={`w-full py-6 rounded-[32px] font-black uppercase tracking-[0.4em] text-[11px] transition-all flex items-center justify-center gap-4 shadow-2xl ${
                isAuthenticating 
                ? "bg-emerald-500 text-white cursor-wait" 
                : "bg-white text-slate-950 hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
              }`}
            >
              {isAuthenticating ? (
                <>
                  <Activity size={18} className="animate-spin" />
                  <span>Decrypting...</span>
                </>
              ) : (
                <>
                  <span>INITIALIZE TERMINAL</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <button
            onClick={onBack}
            className="mt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors"
          >
            Return to Surface
          </button>
        </motion.div>
      </Container>

      {/* Security Footer */}
      <div className="fixed bottom-10 left-10 right-10 flex justify-between items-center opacity-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <Terminal size={14} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Encrypted Session (AES-256)</span>
        </div>
        <div className="text-[8px] font-black uppercase tracking-[0.2em]">
          v2.4.0-STABLE
        </div>
      </div>
    </div>
  );
}
