import Container from "../core/Container";
import { siteConfig } from "../../config/site";
import { MapPin, Mail, Phone, ExternalLink, Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden">
        <h2 className="text-[15vw] font-serif font-black text-white/[0.02] leading-none uppercase tracking-tighter whitespace-nowrap text-center">
          PROJECT SANKALP
        </h2>
      </div>

      <Container className="relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/5 pb-16">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 p-0.5">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <span className="text-2xl font-serif font-black text-white">PS</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-black tracking-tight uppercase">Project Sankalp</h3>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/80">Code for Change</span>
              </div>
            </div>
            
            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-medium">
              The premier social-impact hackathon connecting innovators to solve global climate and health challenges through purposeful technology.
            </p>

            <div className="flex items-start gap-4 text-white/50 group cursor-pointer hover:text-white transition-colors duration-500">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
                <MapPin size={18} className="text-emerald-500" />
              </div>
              <p className="text-xs leading-relaxed font-medium">
                Yenepoya (Deemed to be University),<br />
                Deralakatte, Mangalore, Karnataka 575018
              </p>
            </div>
          </div>

          {/* Column 2: Hackathon */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Hackathon</h4>
            <ul className="space-y-4">
              {['About', 'Tracks', 'Process', 'Prizes', 'Timeline', 'Register'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-all flex items-center gap-2 group font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Partners</h4>
            <ul className="space-y-4">
              {['NSS Unit', 'YSET', 'Yenepoya Univ', 'Research Hub'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-all flex items-center gap-1.5 group font-medium">
                    {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Support</h4>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8 backdrop-blur-md">
              <p className="text-xs text-white/40 leading-relaxed font-medium">
                Need help with registration or have questions about the hackathon?
              </p>
              
              <a className="w-full bg-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-black/20"
              href="mailto:[projectsankalp@yenepoya.edu.in] ">
                Contact Us <Mail size={14} />
              </a>

              <div className="space-y-4 pt-2">
                <a href="tel:+919876543210" className="flex items-center gap-4 text-xs text-white/60 hover:text-white transition-colors font-bold">
                  <Phone size={14} className="text-emerald-500" />
                  +91 89513 49166
                </a>
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-black">
            © 2026 Project Sankalp. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
            <span className="text-white/20 font-medium">Organized by</span>
            <span className="font-black text-white/60">NSS Unit & YSET</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
