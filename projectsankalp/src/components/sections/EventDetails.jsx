import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";

export default function EventDetails() {
  return (
    <Section id="event-details" className="bg-white py-24 md:py-32 overflow-hidden border-t border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Large Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-accent/5 rounded-[40px] blur-2xl group-hover:bg-accent/10 transition-colors duration-700" />
            <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-[30px] border border-border shadow-2xl">
              <img 
                src="/event-placeholder.png" 
                alt="Project Sankalp Grand Finale" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1px] bg-white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">The Venue</span>
                </div>
                <h4 className="text-xl font-serif font-black text-white">Yenepoya Campus, Mangalore</h4>
              </div>
            </div>
          </motion.div>

          {/* Right: Content Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">Grand Finale Stage</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 text-primary leading-tight">
              Where Innovation <br />
              <span className="text-accent italic">Takes Center Stage.</span>
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-text-secondary leading-relaxed font-medium">
                The final phase of Project Sankalp isn't just a hackathon—it's a high-stakes, 24-hour sprint where the most promising social-impact solutions are brought to life. Hosted at the state-of-the-art facilities of Yenepoya (Deemed to be University), the top 30 teams will have access to expert mentorship, high-speed infrastructure, and a community of like-minded innovators.
              </p>
              
              <p className="text-lg text-text-secondary leading-relaxed font-medium">
                We've built an environment designed for maximum focus and peak performance. From deep-dive technical workshops to collaborative brainstorming zones, every inch of the venue is engineered to help you push the boundaries of what's possible with code. Join us as we turn vision into reality and build the future of social entrepreneurship.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-border w-full flex items-center gap-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Capacity</span>
                <span className="text-2xl font-serif font-black text-primary uppercase">30 Teams</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1">Duration</span>
                <span className="text-2xl font-serif font-black text-primary uppercase">24 Hours</span>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
