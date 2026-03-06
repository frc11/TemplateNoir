import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const Intro: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="story"
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-12 w-full bg-stone-950 relative overflow-hidden z-10"
    >
      {/* Background Image - Abstract Smoke/Ink */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Abstract Smoke"
          className="w-full h-full object-cover grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/80 to-stone-950" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* Left: Chef / Owner Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full md:w-5/12 aspect-[3/4] relative"
        >
          <div className="absolute inset-0 bg-amber-900/10 mix-blend-color z-10 pointer-events-none" />
          <img
            src="/noir_neon_sign_straight.png"
            alt="NOIR Restaurant Sign in the Rain"
            className="w-full h-full object-cover grayscale contrast-125 select-none rounded-sm"
          />
          {/* Decorative corner accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-amber-900/40" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-amber-900/40" />
        </motion.div>

        {/* Right: The Story */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="font-body text-amber-700/60 text-xs tracking-[0.3em] uppercase mb-6 block">
              Nuestra Historia
            </span>

            <h2 className="font-display italic text-5xl md:text-7xl text-stone-200 leading-none mb-10">
              Nacido del <br /> <span className="text-stone-400">Silencio y el Fuego</span>
            </h2>

            <div className="space-y-6 font-body text-stone-400 font-light leading-relaxed text-sm md:text-base mb-12 max-w-xl">
              <p>
                Todo comenzó con una obsesión singular: el rechazo al ruido moderno. Las tendencias gastronómicas actuales exigen espectáculos vacíos, salones bulliciosos y platos diseñados para ser vistos antes que saboreados.
              </p>
              <p>
                <span className="text-stone-300">NOIR fue concebido como un refugio.</span> Un espacio donde la penumbra afila los sentidos y el trato reverencial hacia los ingredientes originarios toma el centro del escenario. Trabajamos exclusivamente con pescadores artesanales y aplicamos técnicas de fuego que no perdonan errores.
              </p>
              <p>
                No buscamos alimentar multitudes. Buscamos a aquellos dispuestos a rendirse ante el vacío, encontrando en la más absoluta oscuridad la expresión más pura del sabor.
              </p>
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-6"
            >
              <div className="w-12 h-[1px] bg-stone-700" />
              <div>
                <p className="font-display italic text-2xl text-stone-300">Elias Vance</p>
                <p className="font-body text-[10px] tracking-widest text-stone-600 uppercase mt-1">Founder & Executive Chef</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};