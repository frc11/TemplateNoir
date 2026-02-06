import { useEffect, useRef } from 'react';

export const useFocusTrap = (isOpen: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Store current focus
            previousFocusRef.current = document.activeElement as HTMLElement;

            // Focus the container or first focusable element
            if (containerRef.current) {
                const focusableElements = containerRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length > 0) {
                    (focusableElements[0] as HTMLElement).focus();
                } else {
                    containerRef.current.focus();
                }
            }
        } else {
            // Restore focus
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || !containerRef.current) return;

            if (e.key === 'Tab') {
                const focusableElements = containerRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return containerRef;
};
