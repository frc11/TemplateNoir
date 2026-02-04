import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulación de API fuera del componente
const submitReservation = async (data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% de probabilidad de fallo
      if (Math.random() < 0.1) {
        reject(new Error("Network error"));
      } else {
        resolve();
      }
    }, 2000);
  });
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const Reservations: React.FC = () => {
  const initialFormState = {
    people: '',
    date: '',
    time: '',
    name: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'error') setStatus('idle'); // Clear error on type
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await submitReservation(formData);
      setStatus('success');
      console.log("Reservation Confirmed:", formData);
    } catch (error) {
      setStatus('error');
      console.error("Reservation Failed:", error);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setStatus('idle');
  };

  const isSubmitting = status === 'submitting';

  return (
    <section id="reservations" className="py-32 md:py-48 px-6 bg-stone-950 border-t border-stone-900/50 flex justify-center overflow-hidden min-h-[600px]">
      <div className="max-w-5xl w-full relative flex flex-col justify-center">
        
        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
           <span className="font-cinzel text-[15vw] leading-none whitespace-nowrap">BOOKING</span>
        </div>

        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative z-10"
            >
              <form 
                onSubmit={handleSubmit} 
                className={`text-center transition-opacity duration-700 ${isSubmitting ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
              >
                
                <div className="font-display italic text-2xl md:text-4xl lg:text-5xl leading-[1.6] md:leading-[1.8] text-stone-400 font-light break-words">
                  <span>Hola, me gustaría reservar una mesa para </span>
                  
                  <div className="inline-block relative mx-1 md:mx-2 align-baseline">
                    <input
                      type="number"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      placeholder="2"
                      min="1"
                      max="20"
                      disabled={isSubmitting}
                      className="w-12 md:w-24 bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-700 font-normal rounded-none"
                      required
                    />
                  </div>
                  
                  <span> personas, el día </span>
                  
                  <div className="inline-block relative mx-1 md:mx-2 align-baseline">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-28 md:w-48 bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-700 font-normal appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full rounded-none"
                      required
                    />
                  </div>
                  
                  <span> a las </span>
                  
                  <div className="inline-block relative mx-1 md:mx-2 align-baseline">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-20 md:w-32 bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-700 font-normal appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full rounded-none"
                      required
                    />
                  </div>
                  
                  <span>. <br className="hidden md:block" /> Mi nombre es </span>
                  
                  <div className="inline-block relative mx-1 md:mx-2 align-baseline">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu Nombre"
                      disabled={isSubmitting}
                      className="w-40 md:w-72 max-w-[80vw] bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-700 font-normal rounded-none"
                      required
                    />
                  </div>
                  <span>.</span>
                </div>

                <div className="mt-16 md:mt-24 flex flex-col items-center">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative px-12 py-5 bg-transparent border border-stone-800 overflow-hidden transition-all hover:border-amber-900/50 disabled:border-stone-800 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 font-body text-xs tracking-[0.3em] uppercase text-stone-300 group-hover:text-amber-100 transition-colors">
                      {isSubmitting ? 'Contactando Concierge...' : 'Confirmar Experiencia'}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-stone-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-[0.2,0.8,0.2,1]" />
                    )}
                  </button>

                   <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 text-xs text-amber-900/80 font-body tracking-wider uppercase"
                      >
                        Conexión interrumpida. Por favor, intente de nuevo.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative z-10 flex flex-col items-center justify-center text-center py-12"
            >
              <h3 className="font-display italic text-4xl md:text-6xl text-stone-200 mb-6">
                Request Received
              </h3>
              <p className="font-body text-stone-400 text-sm tracking-widest uppercase mb-8">
                We await your arrival in the shadows.
              </p>
              <button 
                onClick={handleReset}
                className="text-stone-600 hover:text-stone-300 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Make another reservation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};