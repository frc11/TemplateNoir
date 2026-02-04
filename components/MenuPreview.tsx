import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../types';
import { FullMenu } from './FullMenu';

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Wagyu & Void',
    description: 'Tartar de Wagyu A5 ahumado, emulsión de ajo negro y cracker de carbón. Servido en absoluto silencio.',
    price: '42',
    category: 'entrada',
    image: 'https://images.unsplash.com/photo-1643906662497-6a165b4528c7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Midnight Risotto',
    description: 'Arroz Carnaroli teñido en tinta de sepia, vieiras de Hokkaido y polvo de oro comestible para romper la oscuridad.',
    price: '55',
    category: 'principal',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Obsidian Truffle',
    description: 'Ganache de chocolate 70% en coraza de trufa, cristales de sal marina y un susurro de aceite de trufa.',
    price: '28',
    category: 'postre',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=1200&auto=format&fit=crop'
  }
];



export const MenuPreview: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <section id="menu" className="py-24 bg-stone-950 relative w-full overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900/20 via-stone-950 to-stone-950 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-32 text-center"
        >
          <span className="font-body text-amber-900/80 tracking-[0.4em] text-[10px] uppercase block mb-4">
            Gastronomía de Autor
          </span>
          <h2 className="font-display italic text-4xl md:text-6xl text-stone-200">
            La Colección
          </h2>
        </motion.div>

        <div className="flex flex-col gap-32 md:gap-48 mb-32">
          {MENU_ITEMS.map((item, index) => (
            <DishGalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Explore Full Menu Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group relative px-10 py-4 bg-transparent border border-stone-800 hover:bg-stone-900 transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10 font-body text-xs tracking-[0.25em] text-stone-400 group-hover:text-stone-200 transition-colors uppercase">
              Explorar Carta Completa
            </span>
          </button>
        </div>
      </div>



      <FullMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section >
  );
};

const DishGalleryItem: React.FC<{ item: MenuItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
    >
      {/* Text Section */}
      <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="font-body text-amber-700/60 text-xs tracking-[0.25em] uppercase mb-4 block">
            0{index + 1} — {item.category}
          </span>

          <h3 className="font-display italic text-4xl md:text-6xl text-stone-100 mb-6 leading-tight">
            {item.name}
          </h3>

          <div className="w-12 h-[1px] bg-stone-800 mb-6 transition-all duration-700 ease-out hover:w-24 hover:bg-stone-500" />

          <p className="font-body text-stone-400 text-sm md:text-base leading-loose font-light mb-8 max-w-md">
            {item.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="font-cinzel text-stone-500 text-lg">${item.price}</span>
          </div>
        </motion.div>
      </div>

      {/* Image Section - The "WOW" Mask */}
      <div className="w-full md:w-7/12 aspect-[4/5] md:aspect-[3/4] relative group cursor-none">
        <motion.div
          className="w-full h-full overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* The Image Scaling Effect with Hover Zoom */}
          <motion.img
            initial={{ scale: 1.25, filter: 'blur(5px)' }}
            animate={isInView ? { scale: 1, filter: 'blur(0px)' } : {}}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />

          {/* Subtle Overlay that lightens on hover */}
          <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-700" />

          {/* Corner accents */}
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
        </motion.div>
      </div>
    </div>
  );
};