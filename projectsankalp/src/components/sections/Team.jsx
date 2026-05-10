import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";

export default function Team() {
  const team = [
    {
      name: "Dr. Akash Yadav",
      role: "Lead Organizer",
      tag: "Leadership",
      bio: "Spearheading social innovation through technology and community empowerment.",
    },
    {
      name: "Prof. S. Kumar",
      role: "Faculty Coordinator",
      tag: "Mentorship",
      bio: "Bridging the gap between academic research and real-world impact.",
    },
    {
      name: "Ms. Priya Rao",
      role: "Tech Lead",
      tag: "Development",
      bio: "Expert in building scalable solutions for global challenges.",
    },
    {
      name: "Mr. Rahul V.",
      role: "Design Lead",
      tag: "Experience",
      bio: "Focused on creating intentional and human-centric digital experiences.",
    },
  ];

  return (
    <Section
      id="team"
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-slate-50"
    >
      {/* Premium Atmospheric Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Massive Background Label - Subtler */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-slate-50 tracking-tighter opacity-30">
          CORE_TEAM
        </div>
      </div>

      <Container className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="text-left mb-20 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-slate-200" />
            <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">
              The Minds Behind
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 text-slate-900 tracking-tight leading-[0.9]">
            Meet the <br />
            <span className="text-slate-400 italic">Core Team.</span>
          </h2>
          <p className="text-slate-600 text-lg font-medium border-l border-slate-100 pl-8 max-w-2xl">
            A diverse group of educators, developers, and designers working to
            make Project Sankalp a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative p-10 rounded-2xl bg-white border border-slate-300 transition-all duration-700 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(139,92,246,0.05)] hover:border-emerald-400 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="space-y-4 mb-12">
                <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase">
                  {member.tag}
                </span>
                <h3 className="text-2xl font-serif font-black text-slate-900 leading-tight tracking-tight">
                  {member.name}
                </h3>
                <div className="w-8 h-[1px] bg-slate-100 group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-700" />
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  {member.role}
                </span>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {member.bio}
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-slate-50">
                <div className="text-[8px] font-black text-slate-200 uppercase tracking-[0.4em] select-none">
                  SANKALP_CORE_{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
