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
    <Section id="sponsors">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Supported By</h2>
          <p className="text-text-secondary">Partners in driving innovation.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl glass-effect flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
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
