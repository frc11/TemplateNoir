import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { MENU_DATA, MENU_CATEGORIES } from '../src/data/menuData';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface FullMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

type FilterType = 'all' | 'signature' | 'plant-based' | 'gluten-free';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop";

const FILTERS: { label: string; value: FilterType }[] = [
    { label: 'ALL', value: 'all' },
    { label: 'SIGNATURE', value: 'signature' },
    { label: 'PLANT-BASED', value: 'plant-based' },
    { label: 'GLUTEN-FREE', value: 'gluten-free' }
];

const MobileImage = ({ src, alt, onClick }: { src: string; alt: string; onClick: (e: React.MouseEvent) => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-full h-48 bg-stone-900/50 rounded-sm overflow-hidden flex items-center justify-center">
            {/* Loading Spinner - Always centered in the placeholder box */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 border-2 border-stone-800 border-t-stone-400 rounded-full animate-spin" />
                </div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                onClick={onClick}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover cursor-zoom-in shadow-xl shadow-stone-950/50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

export const FullMenu: React.FC<FullMenuProps> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const [activeImage, setActiveImage] = useState<string>(DEFAULT_IMAGE);
    const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    // Accessibility: Focus Trap
    const containerRef = useFocusTrap(isOpen);

    // ESC Key Handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (zoomedImage) {
                if (event.key === 'Escape') setZoomedImage(null);
                return;
            }
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, zoomedImage]);

    // Handle Scroll Indicator Visibility with standard scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                const maxScroll = scrollHeight - clientHeight;
                if (scrollTop > maxScroll - 50) {
                    setShowScrollIndicator(false);
                } else {
                    setShowScrollIndicator(true);
                }
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement && isOpen) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
    }, [isOpen]);

    // Lock body scroll and reset state
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setShowScrollIndicator(true);
            setActiveFilter('all');
            setExpandedMobileId(null);
            setZoomedImage(null);
        } else {
            document.body.style.overflow = 'unset';
            setActiveImage(DEFAULT_IMAGE);
            setExpandedMobileId(null);
            setZoomedImage(null);
        }
    }, [isOpen]);

    const handleMouseEnter = (image: string | undefined) => {
        if (image && window.innerWidth >= 768) setActiveImage(image);
    };

    const handleMouseLeave = () => {
        // Keeping last hovered state for smoother feel
    };

    // Filter menu items based on active filter
    const getFilteredItems = () => {
        if (activeFilter === 'all') return MENU_DATA;
        return MENU_DATA.filter(item => item.tags?.includes(activeFilter));
    };

    const filteredItems = getFilteredItems();

    // Variants for Staggered Animation
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.2, 0.8, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            y: -15,
            transition: {
                duration: 0.3
            }
        }
    };

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className="fixed inset-0 z-[999] bg-stone-950 flex flex-col md:flex-row h-screen outline-none"
                    tabIndex={-1}
                >
                    {/* LEFT COLUMN - SCROLLABLE LIST */}
                    <div
                        ref={scrollRef}
                        className="w-full md:w-[45%] h-full overflow-y-auto relative z-10 bg-stone-950/95 backdrop-blur-md md:bg-stone-950 
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[60] p-2 text-stone-500 hover:text-white transition-colors duration-300"
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="p-8 md:p-16 lg:p-20 min-h-screen pb-48">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mb-12 md:mb-16"
                            >
                                <h2 className="font-display italic text-5xl md:text-7xl text-stone-100 mb-4">
                                    Carta
                                </h2>
                                <p className="font-body text-stone-500 text-sm tracking-widest uppercase">
                                    Selección de Temporada
                                </p>
                            </motion.div>

                            {/* FILTER BAR */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-wrap gap-4 md:gap-6 mb-16 md:mb-20 pb-6 border-b border-stone-900/50"
                            >
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setActiveFilter(filter.value)}
                                        className={`
                      font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-300
                      ${activeFilter === filter.value
                                                ? 'text-amber-700'
                                                : 'text-stone-600 hover:text-stone-400'
                                            }
                    `}
                                    >
                                        {activeFilter === filter.value && <span className="mr-1">•</span>}
                                        {filter.label}
                                    </button>
                                ))}
                            </motion.div>

                            {/* MENU CATEGORIES */}
                            <motion.div layout="position" className="space-y-20 md:space-y-32">
                                <AnimatePresence mode="popLayout">
                                    {MENU_CATEGORIES.map((category) => {
                                        const categoryItems = filteredItems.filter(item => item.category === category);
                                        if (categoryItems.length === 0) return null;

                                        return (
                                            <motion.div
                                                key={category}
                                                layout="position"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                                            >
                                                <h3 className="sticky top-0 bg-stone-950 py-4 z-20 font-cinzel text-2xl md:text-3xl text-amber-900/60 mb-8 border-b border-stone-900/50 backdrop-blur-md md:backdrop-filter-none">
                                                    {category}
                                                </h3>
                                                <motion.div
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="show"
                                                    className="space-y-8"
                                                >
                                                    <AnimatePresence mode="sync">
                                                        {categoryItems.map((item) => (
                                                            <motion.div
                                                                key={item.id}
                                                                layout="position"
                                                                variants={itemVariants}
                                                                transition={{ layout: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }}
                                                                initial="hidden"
                                                                animate="show"
                                                                exit="exit"
                                                                onClick={() => {
                                                                    if (window.innerWidth < 768) {
                                                                        setExpandedMobileId(expandedMobileId === item.id ? null : item.id);
                                                                    }
                                                                }}
                                                                onMouseEnter={() => handleMouseEnter(item.image)}
                                                                onMouseLeave={handleMouseLeave}
                                                                className="group cursor-pointer md:cursor-default relative pl-4 border-l-2 border-transparent hover:border-amber-900/50 transition-all duration-300"
                                                            >
                                                                <div className="flex justify-between items-baseline mb-2 text-stone-400 group-hover:text-stone-100 transition-colors duration-300">
                                                                    <h4 className="font-display text-xl md:text-2xl">
                                                                        {item.name}
                                                                    </h4>
                                                                    <span className="font-cinzel text-stone-600 text-sm group-hover:text-amber-700/80 transition-colors">
                                                                        ${item.price}
                                                                    </span>
                                                                </div>
                                                                <p className="font-body text-stone-600 text-sm font-light leading-relaxed max-w-[90%] group-hover:text-stone-400 transition-colors duration-300">
                                                                    {item.description}
                                                                </p>

                                                                {/* Mobile Expand Hint */}
                                                                {item.image && expandedMobileId !== item.id && (
                                                                    <div className="md:hidden mt-3 text-[9px] text-amber-700/60 uppercase tracking-[0.2em] font-body">
                                                                        [ Presiona para expandir ]
                                                                    </div>
                                                                )}

                                                                {/* Mobile Image Expansion */}
                                                                <AnimatePresence>
                                                                    {expandedMobileId === item.id && item.image && (
                                                                        <motion.div
                                                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                                            animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                                                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                                            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                                                                            className="md:hidden overflow-hidden w-full flex justify-center"
                                                                        >
                                                                            <MobileImage
                                                                                src={item.image}
                                                                                alt={item.name}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setZoomedImage(item.image!);
                                                                                }}
                                                                            />
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </motion.div>
                                                        ))}
                                                    </AnimatePresence>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>

                            <div className="mt-24 pt-12 border-t border-stone-900 text-center md:text-left">
                                <p className="font-body text-stone-700 text-xs tracking-widest uppercase">
                                    * Ingredientes orgánicos y de origen local cuando es posible.<br />
                                    * Por favor informe cualquier alergia al personal.
                                </p>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <AnimatePresence>
                            {showScrollIndicator && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed bottom-8 left-8 md:left-16 z-30 pointer-events-none flex flex-col items-center gap-2 text-stone-600/50"
                                >
                                    <span className="text-[10px] tracking-widest uppercase [writing-mode:vertical-rl]">Scroll</span>
                                    <ChevronDown size={14} className="animate-bounce" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN - STICKY VISUAL */}
                    <div className="hidden md:block w-[55%] h-full relative overflow-hidden bg-stone-900">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

                        {/* Image Crossfade */}
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={activeImage}
                                src={activeImage}
                                alt="Menu Preview"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-full h-full object-cover absolute inset-0 z-0"
                            />
                        </AnimatePresence>

                        {/* Cinematic Grain/Texture Overlay */}
                        <div className="absolute inset-0 z-20 opacity-15 pointer-events-none mix-blend-overlay"
                            style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}
                        />
                    </div>

                    {/* Zoom Modal Overlay */}
                    <AnimatePresence>
                        {zoomedImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setZoomedImage(null)}
                                className="fixed inset-0 z-[1000] bg-stone-950/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out"
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
                                    className="absolute top-6 right-6 z-[1001] p-2 text-stone-400 hover:text-white transition-colors"
                                >
                                    <X size={32} />
                                </button>
                                <motion.img
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    src={zoomedImage}
                                    alt="Zoomed"
                                    onClick={(e) => e.stopPropagation()} // Prevent closing if they click the image itself, though clicking around it closes it
                                    className="w-full max-w-4xl max-h-[85vh] object-contain rounded-md shadow-2xl"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(content, document.body);
};
