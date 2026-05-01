import { motion } from "framer-motion";
import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Calendar, Clock } from "lucide-react";

export default function Timeline() {
  return (
    <Section id="timeline" className="bg-transparent">
      <Container>
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            The Roadmap
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 text-primary">Event Timeline</h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-medium">
            From the initial spark of an idea to the final pitch. Follow the journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative p-8 rounded-[40px] bg-white border border-border/50 hover:border-accent hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700" />
              
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-2xl bg-surface border border-border group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Clock size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-text-secondary group-hover:text-primary transition-colors">
                    {item.time}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif font-black mb-3 text-primary group-hover:text-accent transition-colors leading-tight">
                  {item.event}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                  Step {index + 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
