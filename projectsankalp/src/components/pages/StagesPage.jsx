
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
      <Container className="relative pt-32 md:pt-48 px-6 sm:px-14 lg:px-2 mx-auto ">
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
          <main className="space-y-24 sm:space-y-32 md:space-y-40">
    {domains.map((domain, idx) => (
      <section
        key={domain.id}
        className={`
          relative overflow-hidden rounded-2xl
          border border-zinc-200/80 bg-white
          px-6 py-12
          sm:px-8 sm:py-16
          md:px-16 md:py-20
          lg:px-24 lg:py-28
          xl:px-28 xl:py-32
          transition-colors duration-300
          hover:border-zinc-300
          ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}
        `}
        style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        {/* subtle top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div
          className={`
          flex flex-col gap-16
          sm:gap-20
          md:gap-24
          lg:gap-28
          xl:gap-36
          md:flex-row
          ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}
        `}
      >
        {/* LEFT SIDE */}
        <div className="flex-1 min-w-0">
          
          {/* meta */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex items-center gap-4 sm:gap-5">
            <span className="text-xs sm:text-[11px] font-medium tracking-wide text-zinc-400">
              Mission {domain.id}
            </span>

            <span className="h-[3px] w-[3px] rounded-full bg-zinc-300" />

            <span className="text-xs sm:text-[11px] text-zinc-400 line-clamp-1">
              {domain.tags.join(" · ")}
            </span>
          </div>

          {/* title */}
          <h2 className="
            max-w-[11ch]
            sm:max-w-[12ch]
            md:max-w-[10ch]
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            leading-tight
            sm:leading-[1]
            md:leading-[0.95]
            tracking-[-0.02em]
            sm:tracking-[-0.035em]
            md:tracking-[-0.045em]
            text-zinc-950
            font-semibold
          ">
            {domain.title}
          </h2>

          {/* description */}
          <p className="
            mt-8
            sm:mt-10
            md:mt-12
            max-w-[32ch]
            sm:max-w-[36ch]
            md:max-w-[34ch]
            text-base
            sm:text-[17px]
            md:text-[18px]
            leading-7
            sm:leading-8
            text-zinc-600
          ">
            {domain.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-[1.2] min-w-0 md:flex-[1.4]">
          
          {/* section label */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex items-center justify-between">
            <span className="text-xs sm:text-[11px] font-medium tracking-wide text-zinc-400">
              Problem Statements
            </span>

            <span className="text-xs sm:text-[11px] text-zinc-300">
              {domain.problems.length} items
            </span>
          </div>

          {/* problems */}
          <ul className="space-y-0">
            {domain.problems.map((ps, i) => (
              <li
                key={ps.id}
                className="
                  group
                  flex items-start gap-4
                  sm:gap-6
                  md:gap-8
                  border-b border-zinc-100
                  py-6
                  sm:py-8
                  md:py-10
                  last:border-b-0
                  last:pb-0
                "
              >
                {/* id */}
                <span className="
                  min-w-[44px]
                  sm:min-w-[48px]
                  md:min-w-[56px]
                  pt-1
                  font-mono
                  text-[10px]
                  sm:text-[11px]
                  tracking-wide
                  text-zinc-400
                  flex-shrink-0
                ">
                  {ps.id}
                </span>

                {/* content */}
                <div className="flex-1 min-w-0">
                  <p className="
                    max-w-[44ch]
                    text-base
                    sm:text-[17px]
                    md:text-[18px]
                    leading-7
                    sm:leading-8
                    text-zinc-800
                    transition-colors duration-200
                    group-hover:text-zinc-950
                  ">
                    {ps.text}
                  </p>
                </div>
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
