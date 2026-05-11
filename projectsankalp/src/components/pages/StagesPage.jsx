import { motion } from "framer-motion";
import Container from "../core/Container";
import { useEffect } from "react";

export default function StagesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mission Challenges | Project Sankalp";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32">
      {/* Simple Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <Container className="relative z-10 pt-32 md:pt-48 px-6 sm:px-10 lg:px-20 mx-auto">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all mb-20 group cursor-pointer border-none bg-transparent p-0"
        >
          <span className="text-xs font-bold uppercase tracking-widest">← Back to Hub</span>
        </button>

        {/* Hero */}
        <div className="max-w-5xl mb-40">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-slate-900" />
            <span className="text-slate-900 font-black uppercase tracking-[0.5em] text-[10px]">
              Mission Objectives
            </span>
          </div>

          <h1 className="text-6xl md:text-[110px] font-serif font-black mb-10 leading-[0.85] tracking-tighter text-slate-900">
            Global <br />
            <span className="italic">Challenges.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-medium border-l-4 border-slate-900 pl-8">
            A high-stakes arena for social innovation. We've identified three critical domains where technology can create the most profound impact. Choose your mission.
          </p>
        </div>

        {/* Domain Challenges - Hardcoded Human Style */}
        <div className="space-y-32 mb-40">
          {/* Track 01 */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-16 border-t border-slate-100">
            <div className="lg:w-[450px] shrink-0">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
                01 / Economic Empowerment
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tight mb-8">
                Women's Entrepreneurship
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                Championing gender equality by building tools for financial independence and micro-business scaling. We aim to bridge the credit gap and provide digital ecosystems for growth.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Micro-Financing</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skill Networks</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leadership Tools</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-10">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Targeted Problem Statements</span>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">PS-01</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Decentralized marketplaces for rural artisans to scale global reach.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">PS-02</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">AI-driven financial literacy platforms for women-led startups.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">PS-03</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">P2P micro-lending systems with community-based trust scoring.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Track 02 */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-16 border-t border-slate-100">
            <div className="lg:w-[450px] shrink-0">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
                02 / Community Wellbeing
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tight mb-8">
                Health & Sanitation
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                Developing innovative systems for preventive healthcare, clean water access, and waste management. Focus on tech that solves basic human needs at scale.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telemedicine</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waste Optimization</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clean Water</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-10">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Targeted Problem Statements</span>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">PS-01</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Predictive analysis of water-borne diseases in urban settlements.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">PS-02</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Smart waste management systems for decentralized municipalities.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">PS-03</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Mobile-first diagnostic tools for rural maternal healthcare.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Track 03 */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-16 border-t border-slate-100">
            <div className="lg:w-[450px] shrink-0">
              <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
                03 / Sustainability
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tight mb-8">
                Climate Action
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                Harnessing technology to combat climate change and promote green energy transitions. Building a circular economy and tracking environmental impact.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Renewable Energy</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Circular Economy</span>
                <span className="px-4 py-2 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Carbon Tracking</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-10">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Targeted Problem Statements</span>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">PS-01</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Real-time carbon footprint trackers for household consumption.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">PS-02</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Marketplaces for upcycled industrial waste and circular resources.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-slate-50">
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">PS-03</p>
                  <p className="text-xl font-bold text-slate-900 leading-snug">Community-driven reforestation monitoring using satellite imagery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="relative rounded-[60px] bg-slate-900 p-16 md:p-32 text-center overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-8xl font-serif font-black leading-[0.9] text-white tracking-tighter">
              Commit to <br />
              <span className="italic text-emerald-400">Innovation.</span>
            </h2>

            <p className="text-white/50 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your journey from ideation to impact starts with a single click. Join 500+ innovators building for a better tomorrow.
            </p>

            <button
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="bg-white text-slate-900 px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-emerald-400 transition-all cursor-pointer border-none"
            >
              Start Your Mission
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 opacity-30 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">Project Sankalp _ 2026</p>
        </div>
      </Container>
    </div>
  );
}
