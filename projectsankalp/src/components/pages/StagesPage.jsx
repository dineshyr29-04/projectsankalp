
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
      color: "text-blue-600",
      accent: "bg-blue-600",
      borderColor: "border-blue-100",
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
      color: "text-emerald-600",
      accent: "bg-emerald-600",
      borderColor: "border-emerald-100",
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
      color: "text-teal-600",
      accent: "bg-teal-600",
      borderColor: "border-teal-100",
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
    <div className="min-h-screen bg-neutral-50 text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900 pb-40">
      <Container className="relative pt-32 md:pt-48 px-6 sm:px-14 lg:px-28 mx-auto max-w-5xl">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 transition-colors mb-24 text-sm font-medium"
        >
          <span aria-hidden className="text-base">←</span>
          Back to Hub
        </button>

        {/* Hero */}
        <header className="mb-28">
          <div className="mb-6">
            <span className="block text-xs font-semibold text-zinc-500 tracking-tight mb-2">Mission Objectives</span>
            <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4 leading-tight">
              Global Challenges
            </h1>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl">
              We’ve identified three critical domains where technology can create the most profound impact. Choose your mission and solve the problem statements listed below.
            </p>
          </div>
        </header>

        {/* Domain Challenges */}
        <main className="space-y-24">
          {domains.map((domain, idx) => (
            <section
              key={domain.id}
              className={`relative bg-white border border-zinc-200 rounded-2xl px-10 py-14 md:px-20 md:py-20 flex flex-col md:flex-row gap-14 md:gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              style={{ boxShadow: '0 1px 4px 0 rgba(24, 24, 27, 0.03)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-semibold text-zinc-400">Mission {domain.id}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span className="text-xs text-zinc-400 font-normal">{domain.tags.join(', ')}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
                  {domain.title}
                </h2>
                <p className="text-zinc-600 text-base md:text-lg mb-8 max-w-xl">
                  {domain.description}
                </p>
              </div>
              <div className="flex-[2] min-w-0">
                <div className="mb-2">
                  <span className="block text-xs font-medium text-zinc-400 mb-4">Problem Statements</span>
                  <ul className="space-y-6">
                    {domain.problems.map((ps) => (
                      <li
                        key={ps.id}
                        className="flex items-start gap-4 px-0 py-4 border-b border-zinc-100 last:border-b-0"
                      >
                        <span className="text-xs font-mono text-zinc-400 pt-1 min-w-[48px] inline-block">{ps.id}</span>
                        <span className="text-zinc-800 text-base md:text-lg leading-snug">
                          {ps.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </main>

        {/* CTA */}
        <footer className="mt-40 flex flex-col items-center gap-8 text-center">
          <div className="bg-zinc-900 rounded-2xl px-12 py-16 md:px-24 md:py-20 w-full max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">Commit to Innovation</h2>
            <p className="text-zinc-400 text-base md:text-lg mb-10">Your journey from ideation to impact starts with a single click. Join 500+ innovators building for a better tomorrow.</p>
            <button
              onClick={() => window.open("https://unstop.com/o/srUpcMo?lb=mjGUrFNY&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Projesan58755", "_blank")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-zinc-900 font-semibold text-base border border-zinc-200 hover:bg-zinc-50 transition-colors"
            >
              Start Your Mission
            </button>
          </div>
          <p className="text-xs text-zinc-400 mt-12">Project Sankalp &mdash; 2026</p>
        </footer>

        <div className="mt-32 flex flex-col items-center gap-6 opacity-20 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em]">Project Sankalp _ 2026</p>
        </div>
      </Container>
    </div>
  );
}
