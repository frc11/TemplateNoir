import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <section id="location" className="py-24 md:py-32 px-6 md:px-12 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900/30 via-stone-950 to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full md:w-1/2 aspect-square md:aspect-[4/5] bg-stone-900 relative overflow-hidden shadow-2xl pointer-events-none"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.05389601666!2d-65.28911674251214!3d-26.832791656885662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b8801e06fa5!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1sen!2sar!4v1709668352654!5m2!1sen!2sar"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: 'grayscale(100%) invert(100%) contrast(90%) brightness(95%) hue-rotate(180deg)'
            }}
            allowFullScreen
            loading="lazy"
            title="Noir Location"
          />

          {/* Tactical Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-5 h-5">

            {/* Pin Marker */}
            <div className="absolute inset-0 bg-amber-700 rotate-45 border-2 border-stone-950 shadow-[0_0_20px_rgba(180,83,9,0.6)]">
              {/* Inner Glow */}
              <div className="absolute inset-1 bg-amber-400 rotate-0" />
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="font-body text-amber-700/60 text-xs tracking-[0.25em] uppercase mb-4 block">
              Coordenadas
            </span>
            <h2 className="font-display italic text-5xl md:text-7xl text-stone-200 mb-12">
              Encuentra <br /> el Vacío
            </h2>

            <div className="space-y-12">
              <div className="flex gap-6 group">
                <MapPin className="text-stone-600 shrink-0 mt-1 transition-colors group-hover:text-amber-700" size={20} />
                <div>
                  <h3 className="font-cinzel text-lg text-stone-300 mb-2">Dirección</h3>
                  <p className="font-body text-stone-500 font-light leading-relaxed">
                    25 de Mayo 432, 5to Piso, <br />
                    San Miguel de Tucumán, T4000
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <Clock className="text-stone-600 shrink-0 mt-1 transition-colors group-hover:text-amber-700" size={20} />
                <div>
                  <h3 className="font-cinzel text-lg text-stone-300 mb-2">Horario</h3>
                  <p className="font-body text-stone-500 font-light leading-relaxed">
                    Martes — Domingo <br />
                    20:00 — Cierre
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <Phone className="text-stone-600 shrink-0 mt-1 transition-colors group-hover:text-amber-700" size={20} />
                <div>
                  <h3 className="font-cinzel text-lg text-stone-300 mb-2">Contacto</h3>
                  <p className="font-body text-stone-500 font-light leading-relaxed">
                    +54 9 381 000-0000 <br />
                    reservas@noirdining.com.ar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};