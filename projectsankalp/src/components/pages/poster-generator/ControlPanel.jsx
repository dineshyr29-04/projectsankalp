import React, { useState } from "react";
import { Upload, Sliders, Type, Palette, ShieldAlert, Sparkles, RefreshCw, Download } from "lucide-react";

// List of domains for the dropdown
const DOMAINS_LIST = [
  "Tech for Social Good",
  "Healthcare Innovation",
  "Climate Action & Sustainability",
  "Quality Education & Literacy",
  "Rural Development & Empowerment",
  "Custom...",
];

export default function ControlPanel({
  name,
  setName,
  domain,
  setDomain,
  tagline,
  setTagline,
  teamName,
  setTeamName,
  stylePreset,
  setStylePreset,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  hasImage,
  onImageUpload,
  onRecropClick,
  onExport,
  isExporting,
  exportSuccess,
}) {
  const [activeTab, setActiveTab] = useState("content");
  const [customDomainActive, setCustomDomainActive] = useState(false);

  const handleDomainChange = (e) => {
    const val = e.target.value;
    if (val === "Custom...") {
      setCustomDomainActive(true);
      setDomain("");
    } else {
      setCustomDomainActive(false);
      setDomain(val);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      {/* Navigation Tabs */}
      <div className="flex bg-slate-950/40 p-1.5 rounded-2xl border border-white/5">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeTab === "content"
              ? "bg-slate-800 text-white shadow-md border border-white/5"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          <Type size={14} />
          Details
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeTab === "style"
              ? "bg-slate-800 text-white shadow-md border border-white/5"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          <Palette size={14} />
          Aesthetics
        </button>
        <button
          onClick={() => setActiveTab("adjust")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeTab === "adjust"
              ? "bg-slate-800 text-white shadow-md border border-white/5"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          <Sliders size={14} />
          Filters
        </button>
      </div>

      {/* ───────────────── TAB CONTENT: DETAILS ───────────────── */}
      {activeTab === "content" && (
        <div className="flex flex-col gap-5">
          {/* Image Upload Area */}
          <div>
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 block">
              Poster Picture
            </label>
            {hasImage ? (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Sparkles size={18} />
                </div>
                <div className="flex-grow">
                  <span className="text-xs font-bold text-white block">Image Uploaded</span>
                  <span className="text-[10px] text-white/40 block mt-0.5">Portrait crop active</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onRecropClick}
                    className="p-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                    title="Adjust crop position"
                  >
                    <RefreshCw size={12} />
                    Crop
                  </button>
                  <label className="p-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl cursor-pointer transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center">
                    <Upload size={12} />
                    <input type="file" onChange={onFileChange} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="relative group border-2 border-dashed border-white/10 hover:border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/[0.01]"
              >
                <input type="file" onChange={onFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all mb-3">
                  <Upload size={16} />
                </div>
                <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
                  Upload portrait photo
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1">
                  Drag and drop JPG / PNG file here
                </span>
              </div>
            )}
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name-input" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Participant Name
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ARYA SHARMA"
              maxLength={26}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-2xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
            />
          </div>

          {/* Team Name Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="team-input" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Team Name (Optional)
            </label>
            <input
              id="team-input"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. NEXUS CODERS"
              maxLength={22}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-2xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
            />
          </div>

          {/* Domain / Track Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="domain-select" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Domain / Track
            </label>
            <select
              id="domain-select"
              onChange={handleDomainChange}
              defaultValue=""
              className="w-full bg-slate-900 border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-2xl py-3 px-4 text-xs text-white focus:outline-none transition-colors"
            >
              <option value="" disabled>Select project track</option>
              {DOMAINS_LIST.map((item) => (
                <option key={item} value={item} className="bg-slate-950">
                  {item}
                </option>
              ))}
            </select>
            {customDomainActive && (
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Type custom domain title..."
                maxLength={28}
                className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-2xl py-3 px-4 text-xs text-white mt-2 placeholder-white/20 focus:outline-none transition-colors"
              />
            )}
          </div>

          {/* Personal Quote / Tagline */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tagline-input" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Cinematic Slogan / Quote
            </label>
            <textarea
              id="tagline-input"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Architecting a sustainable tomorrow with AI."
              rows={2}
              maxLength={110}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-emerald-500/50 rounded-2xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
            />
            <div className="flex justify-between items-center text-[9px] text-white/30 font-medium">
              <span>Maximum 110 characters</span>
              <span>{tagline.length}/110</span>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── TAB CONTENT: STYLE PRESETS ───────────────── */}
      {activeTab === "style" && (
        <div className="flex flex-col gap-5">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
            Poster Preset Themes
          </label>
          <div className="grid grid-cols-1 gap-3.5">
            {[
              {
                id: "cyber-emerald",
                name: "Cyber Emerald",
                desc: "Glowing toxic greens, cyber grids, clean hacking visuals.",
                gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
              },
              {
                id: "cosmic-blue",
                name: "Cosmic Blue",
                desc: "Space purple and deep cosmic indigo with stardust dots.",
                gradient: "bg-gradient-to-r from-blue-600 to-cyan-400",
              },
              {
                id: "neon-rose",
                name: "Neon Rose",
                desc: "Retro synthwave hot magenta, pink flares, scanner aesthetic.",
                gradient: "bg-gradient-to-r from-rose-500 to-pink-500",
              },
              {
                id: "amber-ember",
                name: "Amber Ember",
                desc: "Volcanic copper, magma glows, cinematic floating sparks.",
                gradient: "bg-gradient-to-r from-amber-500 to-orange-500",
              },
              {
                id: "minimalist-noir",
                name: "Minimalist Noir",
                desc: "Monochrome, high contrast dark values, pure silver typography.",
                gradient: "bg-gradient-to-r from-white to-gray-500",
              },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => setStylePreset(preset.id)}
                className={`group flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                  stylePreset === preset.id
                    ? "bg-white/[0.04] border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.06)]"
                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                {/* Visual Circle Indicator */}
                <div className={`w-8 h-8 rounded-full ${preset.gradient} shrink-0 mt-0.5 shadow-lg relative flex items-center justify-center`}>
                  {stylePreset === preset.id && (
                    <div className="w-2 h-2 rounded-full bg-slate-950" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {preset.name}
                  </h4>
                  <p className="text-[10px] text-white/40 mt-1 leading-normal max-w-xs uppercase tracking-wide font-medium">
                    {preset.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────── TAB CONTENT: FILTERS ───────────────── */}
      {activeTab === "adjust" && (
        <div className="flex flex-col gap-6">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
            Image Grading Adjustments
          </label>

          {/* Brightness Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white/50 uppercase tracking-widest text-[10px]">Brightness</span>
              <span className="font-mono text-white/70">{brightness}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={140}
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              disabled={!hasImage}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            />
          </div>

          {/* Contrast Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white/50 uppercase tracking-widest text-[10px]">Contrast</span>
              <span className="font-mono text-white/70">{contrast}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={140}
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              disabled={!hasImage}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            />
          </div>

          {!hasImage && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-400 mt-2">
              <ShieldAlert size={16} className="shrink-0" />
              <p className="text-[9px] font-bold uppercase tracking-wider leading-relaxed">
                Upload a picture first to unlock image filters and grading sliders.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ───────────────── DOWNLOAD SECTOR ───────────────── */}
      <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-4">
        <button
          onClick={onExport}
          disabled={isExporting}
          className={`w-full relative group/btn overflow-hidden rounded-2xl py-4.5 px-6 font-sans font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-[0.98] ${
            isExporting
              ? "bg-slate-800 text-white/50 cursor-not-allowed"
              : exportSuccess
              ? "bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/40 text-white hover:bg-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Shine swept glow animation */}
          {!isExporting && !exportSuccess && (
            <div className="absolute inset-y-0 -left-[45%] w-[30%] rotate-12 bg-white/[0.08] blur-xl translate-x-[-180%] group-hover/btn:translate-x-[450%] transition-transform duration-[1200ms] ease-out pointer-events-none" />
          )}

          {isExporting ? (
            <>
              <RefreshCw size={14} className="animate-spin text-emerald-400" />
              Rendering Poster (scale: 3)...
            </>
          ) : exportSuccess ? (
            <>
              Success! Downloading...
            </>
          ) : (
            <>
              <Download size={14} className="text-emerald-400 group-hover/btn:scale-110 transition-transform" />
              Generate Cinematic Poster
            </>
          )}
        </button>

        <p className="text-[8px] text-white/20 text-center uppercase tracking-widest font-semibold leading-relaxed">
          High-definition capture outputs crisp vector texts, overlays & background filters
        </p>
      </div>
    </div>
  );
}
