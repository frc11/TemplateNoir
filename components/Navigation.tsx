import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 transition-all duration-700 ease-[0.2,0.8,0.2,1] ${
          isScrolled ? 'bg-stone-950 py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        {/* Logo */}
        <a href="#" className="font-cinzel text-2xl tracking-[0.2em] font-bold text-stone-200 hover:text-white transition-colors z-50 mix-blend-difference">
          NOIR
        </a>

        {/* Right Controls */}
        <div className="flex items-center gap-8 md:gap-12 z-50">
          {/* Reserve Text Button */}
          <a href="#reservations" className="hidden md:block group relative py-1 cursor-pointer">
            <span className="font-body text-xs tracking-[0.25em] text-stone-300 uppercase group-hover:text-white transition-colors">
              Reserve
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-[0.2,0.8,0.2,1] group-hover:w-full" />
          </a>

          {/* Minimalist 2-Line Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col justify-center gap-1.5 w-8 h-8 p-1 focus:outline-none mix-blend-difference"
            aria-label="Menu"
          >
            <motion.div 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
              transition={{ ease: [0.2, 0.8, 0.2, 1], duration: 0.5 }}
              className="w-full h-[1px] bg-stone-200 transition-colors group-hover:bg-white origin-center"
            />
            <motion.div 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
              transition={{ ease: [0.2, 0.8, 0.2, 1], duration: 0.5 }}
              className="w-full h-[1px] bg-stone-200 transition-colors group-hover:bg-white origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-stone-950 flex flex-col items-center justify-center gap-8"
          >
            <div className="flex flex-col items-center gap-6">
              {['Story', 'Menu', 'Location', 'Reservations'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className="font-display text-4xl md:text-6xl text-stone-400 hover:text-white transition-colors cursor-pointer italic hover:scale-105 transform duration-500"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute bottom-12 flex gap-8 font-body text-xs tracking-widest text-stone-600 uppercase"
            >
              <a href="#" className="hover:text-stone-400">Instagram</a>
              <a href="#" className="hover:text-stone-400">Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};