import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram, FaGithub } from 'react-icons/fa';
import { cn } from '../../lib/utils';

export default function TeamShowcase({ members }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!members || members.length === 0) return null;

  // Split members for desktop masonry view
  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="w-full max-w-5xl mx-auto py-4 md:py-8 font-sans">
      {/* ── MOBILE VIEW: High-Impact Cards ── */}
      <div className="flex flex-col gap-12 md:hidden">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* Background Number */}
            <span className="absolute -top-6 -left-2 text-[80px] font-black text-slate-100/50 -z-10 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-6">
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl shadow-slate-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                
                {/* Social Links on Image (Mobile) */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <SocialIcons member={member} light />
                </div>
              </div>

              {/* Info Area */}
              <div className="px-2">
                <div className="flex items-end justify-between mb-1">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                    {member.name}
                  </h3>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {member.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── DESKTOP VIEW: Sophisticated Gallery ── */}
      <div className="hidden md:flex items-start gap-10 lg:gap-14 select-none">
        {/* Photo Grid */}
        <div className="flex gap-3 flex-shrink-0">
          <div className="flex flex-col gap-3">
            {col1.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[155px] h-[165px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-[68px]">
            {col2.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[172px] h-[182px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-[32px]">
            {col3.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[162px] h-[172px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
        </div>

        {/* Member Name List */}
        <div className="flex flex-col gap-5 pt-2 flex-1">
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialIcons({ member, light = false }) {
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance || member.social?.github;
  if (!hasSocial) return null;

  const iconClass = cn(
    "p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110",
    light 
      ? "bg-white/10 text-white hover:bg-white/20" 
      : "bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200"
  );

  return (
    <div className="flex items-center gap-2">
      {member.social?.linkedin && (
        <a href={member.social.linkedin} target="_blank" rel="noopener" className={iconClass}><FaLinkedinIn size={14} /></a>
      )}
      {member.social?.github && (
        <a href={member.social.github} target="_blank" rel="noopener" className={iconClass}><FaGithub size={14} /></a>
      )}
      {member.social?.instagram && (
        <a href={member.social.instagram} target="_blank" rel="noopener" className={iconClass}><FaInstagram size={14} /></a>
      )}
      {member.social?.twitter && (
        <a href={member.social.twitter} target="_blank" rel="noopener" className={iconClass}><FaTwitter size={14} /></a>
      )}
      {member.social?.behance && (
        <a href={member.social.behance} target="_blank" rel="noopener" className={iconClass}><FaBehance size={14} /></a>
      )}
    </div>
  );
}

function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-500 bg-slate-100 shadow-sm',
        className,
        isDimmed ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0',
        isActive ? 'ring-2 ring-slate-900 ring-offset-2 scale-[1.02]' : '',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
      />
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 group',
        isDimmed ? 'opacity-30' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ 
            width: isActive ? 40 : 12,
            backgroundColor: isActive ? "#0f172a" : "#cbd5e1"
          }}
          className="h-[2px] rounded-full transition-all"
        />
        <div className="flex flex-col">
          <span className={cn(
            'text-2xl font-black tracking-tighter transition-colors duration-300',
            isActive ? 'text-slate-900' : 'text-slate-400'
          )}>
            {member.name}
          </span>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {member.role}
                  </p>
                  <div className="h-px w-8 bg-slate-200" />
                  <SocialIcons member={member} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

