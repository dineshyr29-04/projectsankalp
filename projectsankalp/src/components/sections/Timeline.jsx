import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Timeline() {
  return (
    <Section id="timeline">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Event Timeline</h2>
          <p className="text-text-secondary">A 24-hour journey from idea to impact.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {siteConfig.timeline.map((item, index) => (
            <div key={index} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                {index !== siteConfig.timeline.length - 1 && (
                  <div className="w-[2px] h-full bg-border group-hover:bg-primary/30 transition-colors" />
                )}
              </div>
              <div className="pb-12 pt-0.5">
                <span className="text-sm font-bold text-accent mb-2 block tracking-wider">
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
