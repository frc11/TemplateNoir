import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: Background moves slower than scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Text moves faster and fades out
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Darken effect: As we scroll away, the hero gets darker
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.9]);

  return (
    // Changed to 'sticky top-0' to allow the next section to slide over it
    <section ref={ref} className="sticky top-0 h-screen w-full overflow-hidden bg-stone-950 flex items-center justify-center z-0">

      {/* Background Video */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[120%] z-0 bg-stone-900"
      >
        <img
          src="/hero-bg.png"
          alt="Noir Dining Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900/40 to-stone-950/90" />

        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay" />
      </motion.div>

      {/* Dynamic Overlay that gets darker on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 flex flex-col items-center w-full max-w-screen-xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          className="flex flex-col items-center"
        >
          <span className="font-body text-stone-300 tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6 border-b border-stone-500/30 pb-4 inline-block">
            Est. 2024 • Cocina de Autor
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.8,
            delay: 0.8,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          className="font-display italic text-6xl md:text-8xl lg:text-[10rem] text-stone-100 font-medium tracking-tight leading-[0.9] mix-blend-overlay"
        >
          SABOREA <br className="md:hidden" /> EL VACÍO
        </motion.h1>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: 2.8,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          onClick={() => {
            document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-12 group relative px-8 py-3 bg-transparent border border-white/30 hover:border-amber-900/50 hover:bg-amber-900/20 transition-all duration-500 rounded-sm"
        >
          <span className="font-body text-[10px] md:text-xs tracking-[0.3em] text-stone-300 group-hover:text-amber-100 uppercase transition-colors">
            Reservar Mesa
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase font-body">Desliza</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-stone-500 to-transparent opacity-50" />
      </motion.div>
    </section >
  );
};