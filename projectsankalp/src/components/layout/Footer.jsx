import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { MapPin, Mail, Phone, ExternalLink, Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white pt-24 pb-12 overflow-hidden">
      {/* Massive Background Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden">
        <h2 className="text-[15vw] font-serif font-black text-white/[0.03] leading-none uppercase tracking-tighter whitespace-nowrap text-center">
          PROJECT SANKALP
        </h2>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary p-0.5">
                <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center">
                  <span className="text-xl font-serif font-black text-accent">PS</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-black tracking-tight uppercase">Project Sankalp</h3>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Code for Change</span>
              </div>
            </div>
            
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              The premier social-impact hackathon connecting innovators to solve global climate and health challenges.
            </p>

            <div className="flex items-start gap-3 text-white/60 group cursor-pointer hover:text-white transition-colors">
              <MapPin size={18} className="text-accent mt-1 shrink-0" />
              <p className="text-xs leading-relaxed">
                Yenepoya (Deemed to be University),<br />
                Deralakatte, Mangalore, Karnataka 575018
              </p>
            </div>
          </div>

          {/* Column 2: Hackathon */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Hackathon</h4>
            <ul className="space-y-4">
              {['About', 'Tracks', 'Process', 'Prizes', 'Timeline', 'Register'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-accent transition-colors flex items-center gap-2 group">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Partners</h4>
            <ul className="space-y-4">
              {['NSS Unit', 'YSET', 'Yenepoya Univ', 'Research Hub'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/60 hover:text-accent transition-colors flex items-center gap-1.5 group">
                    {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Contact Box */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Support</h4>
            <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-6 space-y-6 backdrop-blur-sm">
              <p className="text-xs text-white/60 leading-relaxed">
                Need help with registration or have questions about the hackathon?
              </p>
              
              <button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-3 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF6B00]/20 active:scale-95">
                Contact Us <Mail size={14} />
              </button>

              <div className="space-y-3 pt-2">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-xs text-white/80 hover:text-accent transition-colors">
                  <Phone size={14} className="text-accent" />
                  +91 98765 43210
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-lg text-xs text-white/80 hover:bg-white/10 transition-all border border-white/5 group">
                  <Send size={14} className="text-accent group-hover:rotate-12 transition-transform" />
                  Join Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/30 uppercase tracking-widest">
            © 2026 Project Sankalp. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <span className="text-white/30">Organized by</span>
            <span className="font-black text-white/80">NSS Unit & YSET</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
