import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Timeline() {
  return (
    <Section id="timeline" className="bg-transparent">
      <Container>
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Schedule</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-primary">Event Timeline</h2>
          <p className="text-text-secondary font-medium">A 24-hour journey from idea to impact.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {siteConfig.timeline.map((item, index) => (
            <div key={index} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-surface border-4 border-primary z-10 group-hover:bg-primary transition-all duration-300" />
                {index !== siteConfig.timeline.length - 1 && (
                  <div className="w-[3px] h-full bg-border group-hover:bg-primary/50 transition-colors" />
                )}
              </div>
              <div className="pb-12 pt-1">
                <span className="text-sm font-bold text-primary mb-2 block tracking-wider bg-primary/10 w-fit px-3 py-1 rounded-full">
                  {item.time}
                </span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.event}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
