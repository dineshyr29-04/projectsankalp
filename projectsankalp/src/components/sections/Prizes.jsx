import Section from "../core/Section";
import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { Trophy, Award, Medal } from "lucide-react";

export default function Prizes() {
  const icons = [Trophy, Award, Medal];

  return (
    <Section id="prizes" className="bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      
      <Container>
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Rewards</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-primary">Prizes & Rewards</h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-medium">
            Your hard work deserves global recognition and significant rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.prizes.map((prize, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={index}
                className={`p-8 rounded-3xl bg-white border border-border flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl ${
                  index === 0 ? "border-primary scale-105 shadow-xl" : ""
                }`}
              >
                <div className={`mb-6 p-4 rounded-full ${
                  index === 0 ? "bg-primary text-white" : "bg-surface border border-border text-primary"
                }`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{prize.rank}</h3>
                <span className="text-3xl font-black text-accent mb-4 block">{prize.amount}</span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {prize.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-surface/50 border border-border text-center">
          <p className="text-text-secondary italic">
            + Exclusive swag kits, API credits, and certificates for all successful finishers.
          </p>
        </div>
      </Container>
    </Section>
  );
}
