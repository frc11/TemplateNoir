import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash on mobile
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for average movement
    const springConfig = { damping: 25, stiffness: 400 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        // 1. Detect environment
        const checkMobile = () => {
            const isTouch = window.matchMedia('(pointer: coarse)').matches;
            setIsMobile(isTouch);

            // Manage body cursor style
            if (!isTouch) {
                document.body.classList.add('cursor-none');
            } else {
                document.body.classList.remove('cursor-none');
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // 2. Mouse move listener
        const manageMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        // 3. Hover listeners for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements or their parents
            const isInteractive = target.closest('a, button, input, [role="button"], .cursor-pointer');
            setIsHovered(!!isInteractive);
        };

        const handleMouseOut = () => {
            setIsHovered(false);
        };

        if (!isMobile) {
            window.addEventListener('mousemove', manageMouseMove);
            window.addEventListener('mouseover', handleMouseOver);
            // We use mouseover/out bubbling to catch global events
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.classList.remove('cursor-none');
        };
    }, [isMobile, mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%'
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isHovered ? 0.6 : 1,
            }}
            transition={{
                scale: { duration: 0.2, ease: "easeOut" },
                opacity: { duration: 0.2 }
            }}
            className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        />
    );
};
