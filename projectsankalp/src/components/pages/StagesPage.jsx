import { motion } from "framer-motion";
import Container from "../core/Container";
import { useEffect } from "react";

export default function StagesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mission Challenges | Project Sankalp";
  }, []);

  const domains = [
    {
      id: "01",
      title: "Women's Entrepreneurship",
      category: "Economic Empowerment",
      color: "text-blue-600",
      accent: "bg-blue-600",
      description: "Championing gender equality by building tools for financial independence and micro-business scaling. We aim to bridge the credit gap and provide digital ecosystems for growth.",
      tags: ["Micro-Financing", "Skill Networks", "Leadership Tools"],
      problems: [
        { id: "PS-01", text: "Decentralized marketplaces for rural artisans to scale global reach." },
        { id: "PS-02", text: "AI-driven financial literacy platforms for women-led startups." },
        { id: "PS-03", text: "P2P micro-lending systems with community-based trust scoring." }
      ]
    },
    {
      id: "02",
      title: "Health & Sanitation",
      category: "Community Wellbeing",
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      description: "Developing innovative systems for preventive healthcare, clean water access, and waste management. Focus on tech that solves basic human needs at scale.",
      tags: ["Telemedicine", "Waste Optimization", "Clean Water"],
      problems: [
        { id: "PS-01", text: "Predictive analysis of water-borne diseases in urban settlements." },
        { id: "PS-02", text: "Smart waste management systems for decentralized municipalities." },
        { id: "PS-03", text: "Mobile-first diagnostic tools for rural maternal healthcare." }
      ]
    },
    {
      id: "03",
      title: "Climate Action",
      category: "Sustainability",
      color: "text-teal-600",
      accent: "bg-teal-600",
      description: "Harnessing technology to combat climate change and promote green energy transitions. Building a circular economy and tracking environmental impact.",
      tags: ["Renewable Energy", "Circular Economy", "Carbon Tracking"],
      problems: [
        { id: "PS-01", text: "Real-time carbon footprint trackers for household consumption." },
        { id: "PS-02", text: "Marketplaces for upcycled industrial waste and circular resources." },
        { id: "PS-03", text: "Community-driven reforestation monitoring using satellite imagery." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-40">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-48 px-6 sm:px-10 lg:px-20 mx-auto max-w-[1400px]">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all mb-24 group cursor-pointer border-none bg-transparent p-0"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">← Back to Hub</span>
        </button>

        {/* Hero */}
        <div className="max-w-5xl mb-48">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-slate-900" />
            <span className="text-slate-900 font-black uppercase tracking-[0.5em] text-[10px]">
              Mission Objectives
            </span>
          </div>

          <h1 className="text-6xl md:text-[120px] font-serif font-black mb-12 leading-[0.8] tracking-tighter text-slate-900">
            Global <br />
            <span className="italic">Challenges.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl font-medium border-l-8 border-slate-900 pl-10">
            We've identified three critical domains where technology can create the most profound impact. Choose your mission and solve the problem statements listed below.
          </p>
        </div>

        {/* Domain Challenges - Perfectly Spaced Horizontal Layout */}
        <div className="space-y-48">
          {domains.map((domain) => (
            <div key={domain.id} className="relative border-2 b
            order-slate-200 p-2 rounded-3xl">
              {/* Domain Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 border-b border-slate-100 pb-12">
                <div className="max-w-3xl">
                  <span className={`${domain.color} text-[11px] font-black uppercase tracking-[0.5em] block mb-6`}>
                    Domain {domain.id} / {domain.category}
                  </span>
                  <h2 className="text-5xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter mb-8 leading-none">
                    {domain.title}
                  </h2>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    {domain.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {domain.tags.map(tag => (
                    <span key={tag} className="px-6 py-3 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem Statements Section - Clear and Spaced */}
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.6em] text-slate-900 shrink-0">
                    Targeted Problem Statements
                  </h3>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
                  {domain.problems.map((ps) => (
                    <div 
                      key={ps.id} 
                      className="group relative p-12 rounded-[48px] bg-white border border-slate-100 shadow-sm transition-all duration-500"
                    >
                      <div className="mb-8">
                        <span className={`px-5 py-2 rounded-xl ${domain.accent} text-white text-[10px] font-black tracking-[0.2em] uppercase`}>
                          {ps.id}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                        {ps.text}
                      </p>
                      
                      {/* Sub-label for clarity */}
                      <div className="mt-10 pt-10 border-t border-slate-50">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Mission Challenge Detail</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-64 relative rounded-[80px] bg-slate-900 p-20 md:p-40 text-center overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto space-y-16">
            <h2 className="text-6xl md:text-[130px] font-serif font-black leading-[0.8] text-white tracking-tighter">
              Commit to <br />
              <span className="italic text-emerald-400 text-[0.8em]">Innovation.</span>
            </h2>

            <p className="text-white/40 font-medium text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Your journey from ideation to impact starts with a single click. Join 500+ innovators building for a better tomorrow.
            </p>

            <button
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="bg-white text-slate-900 px-20 py-8 rounded-full text-xs font-black uppercase tracking-[0.5em] hover:bg-emerald-400 transition-all cursor-pointer border-none shadow-2xl"
            >
              Start Your Mission
            </button>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-center gap-6 opacity-20 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em]">Project Sankalp _ 2026</p>
        </div>
      </Container>
    </div>
  );
}
