import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaTwitter,
  FaBehance,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { cn } from "../../lib/utils";

export default function TeamShowcase({ members, showRole = true }) {
  if (!members || members.length === 0) return null;

  return (
    <div className={cn(
      "w-full mx-auto py-4 md:py-8 font-sans transition-all duration-500",
      showRole ? "max-w-6xl" : "max-w-5xl"
    )}>
      <div className={cn(
        "grid gap-6 md:gap-8 px-4 sm:px-0 transition-all duration-500",
        showRole
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      )}>
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "group relative flex flex-col rounded-3xl bg-slate-50/50 hover:bg-white border border-slate-100/80 hover:border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)] transition-all duration-500",
              showRole ? "p-6 md:p-8" : "p-4"
            )}
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Elegant hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Card Content */}
            <div className="mt-4 flex flex-col flex-grow">
              <h3 className={cn(
                "font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors duration-300",
                showRole ? "text-xl md:text-2xl" : "text-lg"
              )}>
                {member.name}
              </h3>
              {showRole && member.role && (
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2.5 leading-relaxed">
                  {member.role}
                </p>
              )}
              
              {/* Divider / Social Icons container */}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between w-full">
                <SocialIcons member={member} />
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em] select-none group-hover:text-emerald-500/20 transition-colors">
                  {showRole ? "ADVISOR" : "CONVENER"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SocialIcons({ member, light = false, size = 14 }) {
  const hasSocial =
    member.social?.twitter ||
    member.social?.linkedin ||
    member.social?.instagram ||
    member.social?.behance ||
    member.social?.github;
  if (!hasSocial) return null;

  const iconClass = cn(
    "p-2 rounded-full transition-all duration-300 hover:scale-110",
    light
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100",
  );

  return (
    <div className="flex items-center gap-1.5">
      {member.social?.linkedin && (
        <a
          href={member.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={size} />
        </a>
      )}
      {member.social?.github && (
        <a
          href={member.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="GitHub"
        >
          <FaGithub size={size} />
        </a>
      )}
      {member.social?.instagram && (
        <a
          href={member.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Instagram"
        >
          <FaInstagram size={size} />
        </a>
      )}
      {member.social?.twitter && (
        <a
          href={member.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Twitter"
        >
          <FaTwitter size={size} />
        </a>
      )}
      {member.social?.behance && (
        <a
          href={member.social.behance}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Behance"
        >
          <FaBehance size={size} />
        </a>
      )}
    </div>
  );
}
