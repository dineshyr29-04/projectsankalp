import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { toPng } from "html-to-image";

// Sub-components
import PosterPreview from "./poster-generator/PosterPreview";
import ControlPanel from "./poster-generator/ControlPanel";
import ImageCropperModal from "./poster-generator/ImageCropperModal";

// Helper utilities
import { getCroppedImg } from "../../utils/cropImage";
import Container from "../core/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PosterGeneratorPage({ onBack }) {
  // Poster customizations
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [tagline, setTagline] = useState("");
  const [teamName, setTeamName] = useState("");
  const [stylePreset, setStylePreset] = useState("cyber-emerald");

  // Picture grading controls
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  // Image upload & crop state
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const posterRef = useRef(null);

  // Page level SEO & document title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cinematic Poster Generator | Project Sankalp";
  }, []);

  const handleImageUpload = (src) => {
    setRawImageSrc(src);
    setIsCropperOpen(true);
  };

  const handleCropComplete = async (croppedAreaPixels, rotation) => {
    try {
      const cropped = await getCroppedImg(rawImageSrc, croppedAreaPixels, rotation);
      if (cropped) {
        setCroppedImage(cropped.url);
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    } finally {
      setIsCropperOpen(false);
    }
  };

  const handleExport = async () => {
    if (!croppedImage) {
      alert("Please upload and crop a picture first before generating your poster!");
      return;
    }

    setIsExporting(true);
    setExportSuccess(false);

    try {
      // 1. Give components a slight window to settle transitions
      await new Promise((resolve) => setTimeout(resolve, 600));

      const element = document.getElementById("sankalp-cinematic-poster");
      if (!element) {
        throw new Error("Poster target element not found.");
      }

      // 2. Capture using html-to-image toPng with pixelRatio: 3 for high-density sharp output
      const imageURL = await toPng(element, {
        pixelRatio: 3, // Multiplies the output resolution for razor-sharp result
        quality: 0.95,
        backgroundColor: "#020712", // matches slate-950 theme background
        cacheBust: true,
        style: {
          transform: "scale(1)",
        },
      });

      // 3. Convert and trigger file download
      const link = document.createElement("a");
      const safeName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "-") || "participant";
      link.download = `sankalp-poster-${safeName}.png`;
      link.href = imageURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to render and download poster:", err);
      alert("Something went wrong during poster rendering. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Back button pushstate dispatch
  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (typeof window !== "undefined") {
        window.history.pushState({ view: "landing" }, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* ── Background Glow Elements ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Radial Top Aurora */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -left-[10%] w-[700px] h-[700px] bg-emerald-500/5 blur-[130px] rounded-full"
        />
        {/* Animated Radial Bottom Aurora */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[5%] w-[650px] h-[650px] bg-blue-500/5 blur-[120px] rounded-full"
        />
      </div>

      <main className="relative z-10 py-10 sm:py-16">
        <Container>
          {/* ── BACK NAVIGATION HEADER ── */}
          <div className="mb-10 sm:mb-14">
            <button
              onClick={handleGoBack}
              className="group flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase border-b-2 border-white pb-1 hover:border-emerald-500 transition-colors"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
              <span>Go Back</span>
            </button>
          </div>

          {/* ── PAGE TITLE SECTION ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-12 sm:mb-16 text-left max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 sm:mb-5">
              <Sparkles size={11} className="text-emerald-400 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                Sankalp 2026 Creative Lab
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none italic font-sans mb-5">
              The Cinematic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Creator Poster
              </span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm font-medium leading-relaxed max-w-xl uppercase tracking-wider">
              Immortalize your hackathon project. Upload your photo, customize your role, and download a high-definition cinematic poster optimized for social sharing.
            </p>
          </motion.div>

          {/* ── SPLIT PANEL LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6">
            {/* LEFT COLUMN: Floating Poster Preview (Takes 5 spans) */}
            <div className="lg:col-span-5 flex flex-col items-center gap-5 lg:sticky lg:top-24">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] self-start lg:pl-2">
                Poster Preview
              </span>
              <PosterPreview
                posterRef={posterRef}
                croppedImage={croppedImage}
                name={name}
                domain={domain}
                tagline={tagline}
                teamName={teamName}
                stylePreset={stylePreset}
                brightness={brightness}
                contrast={contrast}
                onUploadClick={() => document.getElementById("file-upload")?.click()}
              />
              {/* Image upload helper hidden node */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = () => handleImageUpload(reader.result);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {/* Hover Tilt Instruction Info */}
              <div className="hidden lg:flex items-center gap-2.5 text-[9px] text-white/30 font-semibold uppercase tracking-widest mt-2 bg-white/[0.01] border border-white/5 px-4 py-2 rounded-xl">
                <AlertCircle size={11} className="text-emerald-500/60" />
                <span>Hover and move your mouse to tilt poster in 3D space</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Styling controls (Takes 7 spans) */}
            <div className="lg:col-span-7 w-full">
              <ControlPanel
                name={name}
                setName={setName}
                domain={domain}
                setDomain={setDomain}
                tagline={tagline}
                setTagline={setTagline}
                teamName={teamName}
                setTeamName={setTeamName}
                stylePreset={stylePreset}
                setStylePreset={setStylePreset}
                brightness={brightness}
                setBrightness={setBrightness}
                contrast={contrast}
                setContrast={setContrast}
                hasImage={!!croppedImage}
                onImageUpload={handleImageUpload}
                onRecropClick={() => setIsCropperOpen(true)}
                onExport={handleExport}
                isExporting={isExporting}
                exportSuccess={exportSuccess}
              />
            </div>
          </div>
        </Container>
      </main>

      {/* ── IMAGE CROPPER MODAL OVERLAY ── */}
      <ImageCropperModal
        isOpen={isCropperOpen}
        imageSrc={rawImageSrc}
        onCropComplete={handleCropComplete}
        onClose={() => setIsCropperOpen(false)}
      />
    </div>
  );
}
