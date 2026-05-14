import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Globe, 
  Heart, 
  Leaf,
  Activity,
  LayoutGrid,
  Trash2,
  X
} from "lucide-react";
import Container from "../core/Container";

const DOMAINS = [
  { 
    id: "women", 
    title: "Women's Entrepreneurship", 
    icon: Globe, 
    color: "text-blue-500",
    accent: "bg-blue-500"
  },
  { 
    id: "health", 
    title: "Health & Sanitation", 
    icon: Heart, 
    color: "text-emerald-500",
    accent: "bg-emerald-500"
  },
  { 
    id: "climate", 
    title: "Climate Action", 
    icon: Leaf, 
    color: "text-teal-500",
    accent: "bg-teal-500"
  }
];

export default function BookingStatusPage({ slots, onBack, onDelete }) {
  const [time, setTime] = React.useState(new Date());
  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate stats
  const totalSlots = 30;
  const bookedCount = Object.values(slots).flat().filter(s => s.teamId).length;
  const occupancy = Math.round((bookedCount / totalSlots) * 100);

  // CSV Export Logic
  const exportToCSV = () => {
    const allBookings = Object.entries(slots).flatMap(([domainId, domainSlots]) => 
      domainSlots.filter(s => s.teamId).map(s => ({
        timestamp: new Date().toLocaleDateString(),
        teamId: s.teamId,
        teamName: s.teamName,
        sector: domainId,
        transactionId: s.transactionId || "N/A",
        imageUrl: s.imageUrl || "No Photo",
        status: "PENDING"
      }))
    );

    if (allBookings.length === 0) return alert("No bookings to export.");

    // Using the ="..." format prevents Excel from converting long numbers to scientific notation (like 1.2E+11)
    const headers = ["Timestamp", "Team ID", "Team Name", "Sector", "Transaction ID", "Image Link", "Status"];
    const rows = allBookings.map(b => [
      b.timestamp, 
      b.teamId, 
      b.teamName, 
      b.sector, 
      `="${b.transactionId}"`, // Force Excel to treat as text
      b.imageUrl, 
      b.status
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Sankalp_Manifest_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-100 blur-[150px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 px-6 mx-auto max-w-7xl">
        {/* Navigation */}
        <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all group active:scale-95"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Manifest</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={exportToCSV}
            className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all active:scale-95 group"
          >
            <LayoutGrid size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Export to Excel</span>
          </motion.button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tighter text-slate-900">Mission Manifest.</h1>
            <p className="text-slate-500 mt-4 text-lg font-medium max-w-xl italic">
              Real-time synchronization of all orbital docking bays across the three mission sectors.
            </p>
          </div>

          {/* Real-time Stats Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl flex items-center gap-10">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Global Occupancy</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{occupancy}%</span>
                <span className="text-emerald-400 text-xs font-bold">Live</span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-800" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">System Pulse</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold tracking-tighter text-slate-200">
                  {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manifest Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {DOMAINS.map((domain) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] border border-slate-200 p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-black tracking-tight leading-tight max-w-[140px]">{domain.title}</h3>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</span>
                  <div className="flex items-center justify-end gap-2">
                    <div className={`w-2 h-2 rounded-full ${domain.accent} animate-pulse`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>

              {/* Slots List */}
              <div className="space-y-3">
                {slots[domain.id].map((slot) => (
                  <div 
                    key={slot.id}
                    className={`
                      flex items-center justify-between p-4 rounded-2xl border transition-all
                      ${slot.teamId 
                        ? "bg-slate-900 border-slate-800 text-white shadow-lg" 
                        : "bg-slate-50 border-slate-100 text-slate-400 border-dashed"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black tracking-widest uppercase ${slot.teamId ? "text-emerald-400" : "text-slate-300"}`}>
                        #{String(slot.id).padStart(2, '0')}
                      </span>
                      {slot.teamId ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-black tracking-wide truncate max-w-[100px] uppercase text-emerald-400">{slot.teamId}</span>
                          <span className="text-[10px] font-bold text-slate-400 truncate max-w-[100px]">{slot.teamName}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Vacant</span>
                      )}
                    </div>
                    
                    {slot.teamId && (
                      <div className="flex items-center gap-2">
                        {/* View Photo Button */}
                        <button
                          onClick={() => {
                            // Find the full document data to get the image
                            // In this simple manifest, we might need to fetch the full data or ensure it's passed
                            // For now, if slot.imageUrl exists (which it will after our update)
                            if (slot.imageUrl) setSelectedImage(slot.imageUrl);
                            else alert("Photo not synced yet.");
                          }}
                          className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center hover:bg-blue-500 transition-all group/eye"
                          title="View Payment Proof"
                        >
                          <Activity size={12} className="text-blue-400 group-hover:text-white" />
                        </button>

                        <button
                          onClick={() => onDelete(domain.id, slot.id, slot.docId)}
                          className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500 transition-all group/trash"
                        >
                          <Trash2 size={12} className="text-red-400 group-hover/trash:text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white rounded-[48px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedImage} 
                alt="Payment Proof" 
                className="w-full h-auto max-h-[80vh] object-contain bg-slate-100"
              />
              <div className="p-8 text-center bg-white border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Verification Document</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
