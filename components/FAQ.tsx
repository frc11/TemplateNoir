import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Recomendamos vestimenta formal o smart casual. NOIR es una experiencia premium donde la elegancia forma parte del ambiente."
    },
    {
        question: "¿Tienen opciones veganas?",
        answer: "Sí, contamos con una selección curada de platos plant-based, claramente indicados en nuestro menú con etiquetas especiales."
    },
    {
        question: "¿Se requieren reservas?",
        answer: "Las reservas son altamente recomendadas, preferiblemente con 2 semanas de antelación. Debido a la naturaleza íntima de nuestra experiencia, los espacios son limitados."
    },
    {
        question: "¿Cuál es la política de niños?",
        answer: "NOIR es una experiencia gastronómica diseñada exclusivamente para adultos. Nuestra política es 16+ para preservar la atmósfera contemplativa del espacio."
    }
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                    className="text-center mb-16"
                >
                    <span className="font-body text-amber-700/60 text-xs tracking-[0.25em] uppercase mb-4 block">
                        Preguntas Frecuentes
                    </span>
                    <h2 className="font-cinzel text-4xl md:text-6xl text-stone-200 tracking-wide">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQ_DATA.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                            className="border-b border-stone-800"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center py-6 text-left group transition-colors hover:text-white"
                            >
                                <span className="font-cinzel text-lg md:text-xl text-stone-300 group-hover:text-white transition-colors pr-4">
                                    {item.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="shrink-0"
                                >
                                    <ChevronDown className="text-stone-500 group-hover:text-amber-700 transition-colors" size={20} />
                                </motion.div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-6 pr-12">
                                            <p className="font-body text-stone-400 leading-relaxed text-sm md:text-base">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="mt-16 text-center"
                >
                    <p className="font-body text-stone-500 text-xs tracking-wider">
                        ¿Más preguntas?{' '}
                        <a href="#reservations" className="text-amber-700/80 hover:text-amber-600 transition-colors underline">
                            Contáctanos
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
