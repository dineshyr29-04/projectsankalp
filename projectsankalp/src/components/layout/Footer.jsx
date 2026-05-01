import Container from "../core/Container";
import { siteConfig } from "../../config/site";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-transparent">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-xl font-serif font-black tracking-tighter text-primary">
              PROJECT <span className="text-accent">SANKALP</span>
            </h3>
            <p className="text-sm text-text-secondary">
              {siteConfig.subtitle}
            </p>
          </div>

          <div className="flex gap-8 text-sm text-text-secondary">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-text-primary transition-colors">Contact</a>
          </div>

          <p className="text-xs text-text-secondary/50">
            © 2026 Project Sankalp. Built for Change.
          </p>
        </div>
      </Container>
    </footer>
  );
}
