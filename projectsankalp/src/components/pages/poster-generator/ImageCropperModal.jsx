import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCw, Check, X } from "lucide-react";

export default function ImageCropperModal({ isOpen, imageSrc, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteInternal = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = () => {
    if (croppedAreaPixels && imageSrc) {
      onCropComplete(croppedAreaPixels, rotation);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                  Adjust Portrait Frame
                </h3>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-semibold">
                  Drag and zoom to align your photo
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cropper Container */}
            <div className="relative flex-grow min-h-[300px] sm:min-h-[400px] bg-slate-950">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={3 / 4} // Fixed portrait aspect ratio for the poster frame
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropCompleteInternal}
                classes={{
                  containerClassName: "bg-slate-950",
                  mediaClassName: "max-h-full",
                  cropAreaClassName: "border-2 border-emerald-500/80 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)]",
                }}
              />
            </div>

            {/* Controls */}
            <div className="p-6 space-y-6 bg-slate-900/80 border-t border-white/5">
              {/* Zoom Slider */}
              <div className="flex items-center gap-4">
                <ZoomOut size={16} className="text-white/40" />
                <div className="flex-grow flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider w-10">
                    Zoom
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-grow h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs text-white/60 font-mono w-8 text-right">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <ZoomIn size={16} className="text-white/40" />
              </div>

              {/* Rotation Slider */}
              <div className="flex items-center gap-4">
                <RotateCw size={16} className="text-white/40" />
                <div className="flex-grow flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider w-10">
                    Angle
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="flex-grow h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs text-white/60 font-mono w-8 text-right">
                    {rotation}°
                  </span>
                </div>
                <div className="w-4" /> {/* Spacer to align with zoom layout */}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white/80 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-white border border-white/5 active:scale-98"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  Apply Crop
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
