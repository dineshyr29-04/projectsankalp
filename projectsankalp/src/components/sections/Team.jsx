import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";

export default function Team() {
  const team = [
    {
      name: "Dr. Akash Yadav",
      role: "Lead Organizer",
      tag: "Leadership",
      bio: "Spearheading social innovation through technology and community empowerment."
    },
    {
      name: "Prof. S. Kumar",
      role: "Faculty Coordinator",
      tag: "Mentorship",
      bio: "Bridging the gap between academic research and real-world impact."
    },
    {
      name: "Ms. Priya Rao",
      role: "Tech Lead",
      tag: "Development",
      bio: "Expert in building scalable solutions for global challenges."
    },
    {
      name: "Mr. Rahul V.",
      role: "Design Lead",
      tag: "Experience",
      bio: "Focused on creating intentional and human-centric digital experiences."
    }
  ];

  return (
    <Section id="team" className="relative bg-gradient-to-tr from-white via-slate-50 to-white py-24 md:py-32 overflow-hidden border-t border-border">
      {/* Unique Atmospheric Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <Container>
        <div className="text-left mb-20 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-accent" />
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">The Minds Behind</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 text-primary tracking-tight">
            Meet the <br /> 
            <span className="text-accent italic">Core Team.</span>
          </h2>
          <p className="text-text-secondary text-lg font-medium border-l-2 border-border pl-6 max-w-2xl">
            A diverse group of educators, developers, and designers working to make Project Sankalp a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border bg-border">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative p-8 md:p-10 transition-all duration-500 bg-white hover:bg-surface/50`}
            >
              <div className="space-y-4 mb-12">
                <span className="text-[9px] font-black tracking-[0.2em] text-accent uppercase">
                  {member.tag}
                </span>
                <h3 className="text-2xl font-serif font-black text-primary leading-tight">
                  {member.name}
                </h3>
                <div className="w-8 h-[1px] bg-border group-hover:w-16 group-hover:bg-accent transition-all duration-700" />
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block">
                  {member.role}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {member.bio}
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="text-[8px] font-black text-primary/20 uppercase tracking-[0.4em] select-none">
                  SANKALP_TEAM_{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
