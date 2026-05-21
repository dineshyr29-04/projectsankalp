import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-16 pb-12 overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden hidden md:block">
        <h2 className="text-[15vw] font-serif font-black text-white/[0.05] leading-none uppercase tracking-tighter whitespace-nowrap text-center">
          PROJECT SANKALP
        </h2>
      </div>

      <Container className="relative z-10 w-full px-6 sm:px-10 lg:px-20 mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-8 lg:gap-12 border-b border-white/5 pb-16">
          {/* Column 1: Info */}
          <div className="col-span-2 lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1 bg-emerald-500 rounded-full" />
              <div>
                <h3 className="text-2xl font-serif font-black tracking-tight uppercase leading-none">
                  Project Sankalp
                </h3>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/80">
                  Code4Change
                </span>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-medium">
              A premier social-impact hackathon solving global challenges
              through purposeful technology.
            </p>

            <div className="flex items-start gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors duration-500">
              <MapPin
                size={16}
                className="text-emerald-500 mt-0.5 flex-shrink-0"
              />
              <p className="text-[11px] leading-relaxed font-medium">
                Yendurance Zone, Yenepoya University, Deralakatte, Mangalore
                575018
              </p>
            </div>
          </div>

          {/* Column 2: Hackathon */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Explore
            </h4>
            <ul className="space-y-4">
              {["About", "Tracks", "Process", "Prizes"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-white/50 cursor-default flex items-center gap-2 font-black uppercase tracking-widest">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Partners
            </h4>
            <ul className="space-y-4">
              {["NSS Unit", "YSET", "Yenepoya"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-white/50 hover:text-emerald-500 transition-all flex items-center gap-1.5 group font-black uppercase tracking-widest"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Support
            </h4>
            <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-8 space-y-6 backdrop-blur-md">
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Questions about the mission?
              </p>

              <div className="flex flex-col gap-4">
                <a
                  className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-black/20"
                  href="mailto:projectsankalp@yenepoya.edu.in"
                >
                  Email Us <Mail size={14} />
                </a>

                <a
                  href="tel:+918951349166"
                  className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-emerald-500 transition-colors"
                >
                  <Phone size={14} />
                  +91 89513 49166
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black text-center md:text-left">
            © 2026 Project Sankalp. <br className="md:hidden" /> All rights
            reserved.
          </p>
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em]">
            <span className="text-white/20 font-medium">Organized by</span>
            <span className="font-black text-white/40">NSS Unit & YSET</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
