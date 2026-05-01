import Section from "../core/Section";
import Container from "../core/Container";

export default function Sponsors() {
  const sponsors = [
    { name: "TechCorp", logo: "https://via.placeholder.com/150x50/0B0F1A/9AA4B2?text=TECHCORP" },
    { name: "InnovateX", logo: "https://via.placeholder.com/150x50/0B0F1A/9AA4B2?text=INNOVATEX" },
    { name: "FutureLabs", logo: "https://via.placeholder.com/150x50/0B0F1A/9AA4B2?text=FUTURELABS" },
    { name: "CloudScale", logo: "https://via.placeholder.com/150x50/0B0F1A/9AA4B2?text=CLOUDSCALE" },
  ];

  return (
    <Section id="sponsors" className="relative bg-gradient-to-tr from-white via-blue-50/20 to-white py-24 md:py-32">
      {/* Unique Atmospheric Element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.03)_0%,transparent_50%)]" />
      <Container>
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Partners</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 text-primary">Supported By</h2>
          <p className="text-text-secondary font-medium">Industry leaders driving innovation in energy.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="p-8 rounded-3xl bg-surface border border-border flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:border-primary"
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="max-h-8 object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
