import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  ChevronLeft, 
  Globe, 
  Heart, 
  Leaf,
  Activity,
  UserCheck,
  LayoutGrid,
  Trash2,
  X
} from "lucide-react";
import Container from "../core/Container";
import Footer from "../layout/Footer";

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

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate stats
  const totalSlots = 30;
  const bookedCount = Object.values(slots).flat().filter(s => s.teamId).length;
  const occupancy = Math.round((bookedCount / totalSlots) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 pb-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-100 blur-[150px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Hub</span>
            </button>
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
            <div className="hidden sm:block">
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">System Pulse</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold tracking-tighter text-slate-200">
                  {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-800 hidden sm:block" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Allocated</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">{bookedCount}</span>
                <span className="text-slate-500 text-xs font-bold">/ 30</span>
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
                  <div className={`p-4 rounded-2xl bg-slate-50 ${domain.color}`}>
                    <domain.icon size={24} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight leading-tight max-w-[140px]">{domain.title}</h3>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</span>
                  <div className="flex items-center justify-end gap-2">
                    <div className={`w-2 h-2 rounded-full ${domain.accent} animate-pulse`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sector Active</span>
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
                          <span className="text-xs font-black tracking-wide truncate max-w-[120px]">TEAM: {slot.teamId}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Vacant Bay</span>
                      )}
                    </div>
                    {slot.teamId ? (
                      <button
                        onClick={() => onDelete(domain.id, slot.id, slot.docId)}
                        className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500 transition-all group/trash"
                        title="Delete Allocation"
                      >
                        <Trash2 size={12} className="text-red-400 group-hover/trash:text-white" />
                      </button>
                    ) : (
                      <LayoutGrid size={14} className="opacity-20" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 italic">Sector Data Secure</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
      
      
    </div>
  );
}
