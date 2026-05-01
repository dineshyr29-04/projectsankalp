import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Clock, Zap, Target } from "lucide-react";

export default function About() {
  const features = [
    {
      title: "24 Hours",
      description: "A high-intensity sprint to turn your wildest ideas into reality.",
      icon: Clock,
      color: "text-primary"
    },
    {
      title: "Innovation",
      description: "Push the boundaries of technology with creative problem solving.",
      icon: Zap,
      color: "text-accent"
    },
    {
      title: "Real-world Impact",
      description: "Build solutions that matter and can change lives globally.",
      icon: Target,
      color: "text-white"
    }
  ];

  return (
    <Section id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Fueling Innovation <br /> 
              <span className="text-primary-gradient bg-clip-text text-transparent">For a Better Future</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              {siteConfig.description} We bring together the brightest minds to tackle the world's most pressing challenges through code and creativity.
            </p>
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl glass-effect flex gap-6 items-start hover:border-primary/30 transition-colors group"
              >
                <div className={`p-3 rounded-xl bg-surface border border-border group-hover:border-primary/50 transition-colors ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
