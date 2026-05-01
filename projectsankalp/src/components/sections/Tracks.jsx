import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Wallet, HeartPulse, GraduationCap, Leaf } from "lucide-react";

const icons = {
  Wallet,
  HeartPulse,
  GraduationCap,
  Leaf
};

export default function Tracks() {
  return (
    <Section id="tracks" className="bg-surface/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Innovation Tracks</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose a theme that resonates with your vision and build a solution that makes a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.tracks.map((track, index) => {
            const Icon = icons[track.icon];
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl glass-effect flex flex-col items-center text-center hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{track.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {track.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
