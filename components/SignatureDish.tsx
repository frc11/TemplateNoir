import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, animate, useScroll, useTransform } from 'framer-motion';

export const SignatureDish: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax: Section reference for scroll tracking
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax: Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax: Transform values for depth effect
  // Ghost image moves slower (creates distance)
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Text moves slightly faster/opposite for separation
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pulse animation value
  const radius = useMotionValue(250);

  // Smooth physics for the spotlight - Tuned for high responsiveness (Low mass, high stiffness)
  // This ensures the spotlight tracks the mouse very closely even on fast movements
  const springConfig = { damping: 35, stiffness: 700, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check environment
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Subtle breathing/pulsing animation for the spotlight radius
    const radiusControls = animate(radius, [250, 280, 250], {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      radiusControls.stop();
    };
  }, [radius]);

  // Auto-pilot for mobile
  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Wider range for mobile to show more context
    const rangeX = window.innerWidth * 0.3;
    const rangeY = window.innerHeight * 0.2;

    const animateMobile = (time: number) => {
      // Figure-8 pattern
      const t = time * 0.0005; // Speed
      const x = centerX + Math.cos(t) * rangeX;
      const y = centerY + Math.sin(t * 2) * rangeY;

      mouseX.set(x);
      mouseY.set(y);

      requestAnimationFrame(animateMobile);
    };

    const frameId = requestAnimationFrame(animateMobile);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile, mouseX, mouseY]);

  // Dynamic mask template
  // The mask reveals the content where the radial gradient is opaque (black)
  // and hides it where transparent.
  const maskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${smoothX}px ${smoothY}px, black 15%, transparent 85%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Ignore mouse if mobile (though touch events might trigger it, best to be safe)

    const { clientX, clientY, currentTarget } = e;
    const bounds = currentTarget.getBoundingClientRect();

    // Calculate relative position within the section
    mouseX.set(clientX - bounds.left);
    mouseY.set(clientY - bounds.top);
  };

  // Set initial position to center on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile) {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }
  }, [mouseX, mouseY, isMobile]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-screen bg-stone-950 overflow-hidden flex items-center justify-center cursor-none"
    >
      {/* 1. Base Layer: Ghost Image (Always visible but faint) - WITH PARALLAX */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: ghostY }}
      >
        <img
          src="https://images.unsplash.com/photo-1549416878-b9ca95255263?q=80&w=2400&auto=format&fit=crop"
          alt="Signature Dish Ghost"
          className={`w-full h-full object-cover grayscale filter blur-sm scale-110 transition-opacity duration-500 ${isMobile ? 'opacity-20' : 'opacity-10'}`}
        />
      </motion.div>

      {/* 2. Reveal Layer: Full Color Image (Masked by spotlight) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          maskImage,
          WebkitMaskImage: maskImage
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1549416878-b9ca95255263?q=80&w=2400&auto=format&fit=crop"
          alt="Signature Dish Revealed"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* 3. Text Overlay (Pointer events none to allow mouse through) - WITH PARALLAX */}
      <motion.div
        className="relative z-20 pointer-events-none text-center mix-blend-difference"
        style={{ y: textY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="block font-body text-xs tracking-[0.5em] text-stone-400 uppercase mb-4"
        >
          The Signature
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display italic text-6xl md:text-8xl text-stone-200 leading-none"
        >
          Venison <br /> & Ashes
        </motion.h2>

        {!isMobile && (
          <motion.p
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-1/2 -translate-x-1/2 mt-32 font-body text-[10px] uppercase tracking-widest text-stone-500 whitespace-nowrap"
          >
            [ Move to Explore ]
          </motion.p>
        )}
      </motion.div>

      {/* 4. Custom Cursor Follower (Optional visual cue) - Only on Desktop */}
      {!isMobile && (
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-0 left-0 w-4 h-4 -ml-2 -mt-2 bg-white rounded-full mix-blend-overlay z-30 pointer-events-none blur-[1px]"
        />
      )}
    </section>
  );
};