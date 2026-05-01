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
    <Section id="tracks" className="bg-surface">
      <Container>
        <div className="text-center mb-16">
          <span className="text-green font-bold uppercase tracking-widest text-sm mb-4 block">Event Categories</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-primary">Innovation Tracks</h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-medium">
            Select your domain and engineer the future of energy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.tracks.map((track, index) => {
            const Icon = icons[track.icon];
            return (
              <div 
                key={index}
                className="p-8 rounded-3xl bg-white border border-border flex flex-col items-center text-center hover:shadow-xl transition-all duration-500 group"
              >
                <div className="mb-6 p-4 rounded-full bg-surface border border-border text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{track.title}</h3>
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
