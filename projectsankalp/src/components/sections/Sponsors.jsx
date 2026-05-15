import Section from "../core/Section";
import Container from "../core/Container";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import LogoLoop from "../ui/LogoLoop";

export default function Sponsors() {
  const sponsors = [
    { src: "/nsslogo.png", alt: "NSS Unit", title: "NSS Unit" },
    { src: "/IIC.png", alt: "IIC", title: "Institution's Innovation Council" },
    {
      src: "/yenepoya-logo.png",
      alt: "/yentech.png",
      title: "Technical Club of YSET",
    },
    {
      src: "/MYAA.png",
      alt: "Ministry of Youth Affairs and Sports",
      title: "Ministry of Youth Affairs and Sports",
    },
    {
      src: "/incubation-logo.png",
      alt: "Incubation Center",
      title: "Incubation Center",
    },
    {
      src: "yset-logo.png",
      alt: "Yenepoya Institute of Technology",
      title: "Yenepoya Institute of Technology",
    },
  ];

  return (
    <Section
      id="sponsors"
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-slate-50"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50/30 rounded-full blur-[120px] opacity-50" />
      </div>

      <Container className="relative z-10 px-6 sm:px-14 lg:px-20 mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter leading-[1.1] mb-24"
          >
            Supported <br />
            <span className="text-emerald-600 italic mt-10 inline-block">
              By Pioneers.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-600 text-lg font-medium border-l border-slate-100 pl-8"
          >
            A collective of visionary institutions committed to fostering
            grassroots innovation.
          </motion.p>
        </div>

        {/* Infinite Logo Loop Integration */}
        <div className="relative py-12 md:py-20 mb-20 bg-slate-50/30 overflow-hidden">
          <LogoLoop
            logos={sponsors}
            speed={80}
            direction="left"
            logoHeight={90}
            gap={80}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Strategic partners and sponsors"
          />
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="h-px w-24 bg-slate-200" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative max-w-xl w-full p-10 rounded-[40px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/20 text-center flex flex-col items-center gap-8 hover:border-emerald-200 transition-all duration-500"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-black text-slate-900 leading-tight">
                Partner with us.
              </h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                Empower the next generation of social innovators and showcase
                your organization's commitment to change.
              </p>
            </div>

            <motion.a
              href="mailto:projectsankalp@yenepoya.edu.in"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-slate-900/10 hover:bg-emerald-600 transition-all duration-500 flex items-center gap-3"
            >
              <Mail size={16} />
              Enquire Now
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
