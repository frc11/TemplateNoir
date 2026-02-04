import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const Intro: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section 
      id="story" 
      ref={ref}
      className="py-40 md:py-64 px-6 md:px-12 w-full flex justify-center items-center bg-stone-950"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display font-light text-3xl md:text-5xl leading-relaxed md:leading-snug text-stone-300"
        >
          "Cocina de autor inspirada en la <span className="text-white italic font-normal">oscuridad</span> y el <span className="text-white italic font-normal">silencio</span>."
        </motion.p>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent mx-auto mt-12"
        />
      </div>
    </section>
  );
};