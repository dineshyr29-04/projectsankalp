import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Camera, Shield } from "lucide-react";

// Preset configurations for cinematic styles
const STYLE_PRESETS = {
  "cyber-emerald": {
    background: "bg-slate-950",
    glowColor: "rgba(16, 185, 129, 0.15)",
    borderClass: "border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]",
    headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500",
    accentColor: "text-emerald-400",
    glowClass: "from-emerald-500/10 via-transparent to-slate-950/20",
    decor: "cyber",
  },
  "cosmic-blue": {
    background: "bg-slate-950",
    glowColor: "rgba(59, 130, 246, 0.15)",
    borderClass: "border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]",
    headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400",
    accentColor: "text-blue-400",
    glowClass: "from-blue-500/10 via-transparent to-slate-950/20",
    decor: "cosmic",
  },
  "neon-rose": {
    background: "bg-slate-950",
    glowColor: "rgba(244, 63, 94, 0.15)",
    borderClass: "border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]",
    headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-pink-500",
    accentColor: "text-rose-400",
    glowClass: "from-rose-500/10 via-transparent to-slate-950/20",
    decor: "neon",
  },
  "amber-ember": {
    background: "bg-slate-950",
    glowColor: "rgba(245, 158, 11, 0.15)",
    borderClass: "border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.1)]",
    headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500",
    accentColor: "text-amber-400",
    glowClass: "from-amber-500/10 via-transparent to-slate-950/20",
    decor: "ember",
  },
  "minimalist-noir": {
    background: "bg-black",
    glowColor: "rgba(255, 255, 255, 0.05)",
    borderClass: "border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.02)]",
    headingColor: "text-white",
    accentColor: "text-white/60",
    glowClass: "from-white/5 via-transparent to-black",
    decor: "noir",
  },
};

export default function PosterPreview({
  posterRef,
  croppedImage,
  name = "Your Name",
  domain = "Track / Domain",
  tagline = "Your cinematic code quote...",
  teamName = "",
  stylePreset = "cyber-emerald",
  brightness = 100,
  contrast = 100,
  overlayOpacity = 60,
  onUploadClick,
}) {
  const currentStyle = STYLE_PRESETS[stylePreset] || STYLE_PRESETS["cyber-emerald"];

  // 3D Tilting Card Motion Setup
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateXSpring = useSpring(y, springConfig);
  const rotateYSpring = useSpring(x, springConfig);

  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glowX = useTransform(x, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["30%", "70%"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 flex items-center justify-center w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-[430px] sm:max-w-[450px] aspect-[3/4] relative group/poster"
      >
        {/* Floating Ambient Shadow Behind the Poster */}
        <div
          className="absolute inset-4 rounded-[32px] blur-[30px] opacity-60 transition-all duration-500 group-hover/poster:blur-[45px] z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${currentStyle.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* The Poster Outer Shell (DOM Node that html2canvas will capture) */}
        <div
          ref={posterRef}
          id="sankalp-cinematic-poster"
          className={`w-full h-full relative overflow-hidden rounded-[32px] border ${currentStyle.background} ${currentStyle.borderClass} flex flex-col p-8 select-none z-10`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dynamic Styles Decor Background Layers */}
          {currentStyle.decor === "cyber" && (
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
          )}
          {currentStyle.decor === "cosmic" && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px] z-0" />
          )}
          {currentStyle.decor === "neon" && (
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_bottom,transparent_50%,#f43f5e_50%)] bg-[size:100%_4px] z-0" />
          )}
          {currentStyle.decor === "ember" && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute -bottom-10 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 right-1/4 w-60 h-60 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
            </div>
          )}

          {/* Premium Ambient Corner Glow Flares */}
          <div
            className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${currentStyle.glowClass} blur-[80px] rounded-full pointer-events-none z-0`}
          />
          <div
            className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${currentStyle.glowClass} blur-[80px] rounded-full pointer-events-none z-0`}
          />

          {/* Dynamic Mouse Gradient Reflection Overlay */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.06)_0%,transparent_50%)] pointer-events-none z-20"
            style={{
              // Use variables connected to framer motion values
              "--x": glowX,
              "--y": glowY,
            }}
          />

          {/* Noise Film Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none z-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ───────────────── HEADER: BRANDING ───────────────── */}
          <div className="relative z-30 flex flex-col items-center text-center mt-2 border-b border-white/5 pb-4 shrink-0">
            {/* Top tiny logos/metadata */}
            <div className="flex items-center gap-2 justify-center text-[7px] sm:text-[8px] font-black uppercase tracking-[0.25em] text-white/40 mb-1.5">
              <span>YENEPOYA UNIVERSITY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>NSS UNIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>MYAS INDIA</span>
            </div>

            {/* Main Event Title */}
            <div className="flex items-center justify-center gap-1.5">
              <Shield size={10} className={`${currentStyle.accentColor} opacity-75`} />
              <h2 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-white font-sans">
                PROJECT SANKALP 2026
              </h2>
            </div>
            <p className="text-[6.5px] sm:text-[7px] font-bold text-white/30 uppercase tracking-[0.3em] mt-0.5">
              NATIONAL HACKATHON FOR SOCIAL CHANGE
            </p>
          </div>

          {/* ───────────────── CENTER: IMAGE LAYER ───────────────── */}
          <div className="relative flex-grow my-5 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 z-20 flex items-center justify-center">
            {croppedImage ? (
              <div className="absolute inset-0 w-full h-full">
                {/* User Cropped Image */}
                <img
                  src={croppedImage}
                  alt={name}
                  className="w-full h-full object-cover select-none"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                />

                {/* Subtle Cinematic Vignette Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_95%)] pointer-events-none" />

                {/* Dark Bottom Fade Gradient to mask the photo edge into poster background */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
              </div>
            ) : (
              /* Image Upload Placeholder State */
              <button
                onClick={onUploadClick}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center hover:bg-white/[0.02] active:bg-white/[0.05] transition-colors group/placeholder"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md group-hover/placeholder:scale-125 transition-transform" />
                  <div className="relative w-12 h-12 rounded-full border border-white/10 bg-slate-950 flex items-center justify-center text-white/50 group-hover/placeholder:text-white transition-colors">
                    <Camera size={18} />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 group-hover/placeholder:text-emerald-400 transition-colors">
                  Upload Poster Picture
                </span>
                <span className="text-[8px] text-white/30 uppercase tracking-[0.18em] mt-1.5 max-w-[200px] leading-relaxed">
                  Drag & Drop or Click to place yourself inside the design
                </span>
              </button>
            )}

            {/* Glowing Accent Lines Over Image (Style Presets specific) */}
            {croppedImage && currentStyle.decor === "cyber" && (
              <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none text-[6px] font-mono text-emerald-400/60 leading-none">
                <span>[SEC: ALPHA]</span>
                <span>SYS_INIT: OK</span>
              </div>
            )}
            {croppedImage && currentStyle.decor === "cosmic" && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <Sparkles size={12} className="text-blue-400/50 animate-pulse" />
              </div>
            )}
          </div>

          {/* ───────────────── BOTTOM: TYPOGRAPHY & OVERLAYS ───────────────── */}
          <div className="relative z-30 flex flex-col items-center text-center pb-2 shrink-0">
            {/* Team Tag/Name */}
            {teamName && (
              <span className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 px-3 py-0.5 rounded-full border border-white/5 bg-white/5 ${currentStyle.accentColor}`}>
                TEAM: {teamName}
              </span>
            )}

            {/* Participant Name */}
            <h1
              className={`text-2xl sm:text-3xl font-serif font-black uppercase leading-none tracking-wide text-center max-w-full truncate px-2 italic`}
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', 'Georgia', serif",
                textShadow: "0 10px 30px rgba(0,0,0,0.8)",
              }}
            >
              {name || "YOUR NAME"}
            </h1>

            {/* Sub-Title / Role or Domain */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-[1px] bg-white/20" />
              <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] ${currentStyle.accentColor}`}>
                {domain || "HACKATHON BUILDER"}
              </p>
              <span className="w-1.5 h-[1px] bg-white/20" />
            </div>

            {/* Personal Tagline / Code Quote */}
            <p className="text-[9px] sm:text-[9.5px] font-medium italic text-white/50 max-w-xs mt-3 leading-relaxed tracking-wide px-4">
              "{tagline || "We build the code that shifts the coordinates of the future."}"
            </p>

            {/* Cinematic Movie Credits "Billing Block" */}
            <div className="w-full border-t border-white/5 mt-5 pt-4 flex flex-col items-center">
              <div className="max-w-[340px] text-[6.5px] sm:text-[7px] font-sans font-medium text-white/25 uppercase tracking-[0.22em] text-center leading-normal">
                DIRECTED BY <span className="text-white/40">CODE4CHANGE</span> &bull; INITIATIVE OF <span className="text-white/40">PROJECT SANKALP</span> &bull; SPONSORED BY <span className="text-white/40">YENEPOYA UNIVERSITY</span> NSS CELL <br />
                PRODUCTION BY <span className="text-white/40">MINISTRY OF YOUTH AFFAIRS AND SPORTS</span> &bull; HOSTED AT <span className="text-white/40">YENEPOYA CAMPUS</span> &bull; ALL RIGHTS RESERVED 2026
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
