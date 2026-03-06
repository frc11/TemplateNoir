import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock as ClockIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

// API Simulation
const submitReservation = async (data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% failure chance
      if (Math.random() < 0.1) {
        reject(new Error("Network error"));
      } else {
        resolve();
      }
    }, 2000);
  });
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  people?: string;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
}

export const Reservations: React.FC = () => {
  const initialFormState = {
    people: '',
    date: '',
    time: '',
    name: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [shake, setShake] = useState(false);

  // Custom Picker State
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableTimes = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

  const handleMonthChange = (direction: number) => {
    setCurrentMonth(direction > 0 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

  const handleDateSelect = (day: Date) => {
    setFormData(prev => ({ ...prev, date: format(day, 'yyyy-MM-dd') }));
    setIsDatePickerOpen(false);
    if (errors.date) setErrors(prev => ({ ...prev, date: undefined }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setIsTimePickerOpen(false);
    if (errors.time) setErrors(prev => ({ ...prev, time: undefined }));
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    const today = startOfDay(new Date());

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isDisabled = isBefore(day, today);
        const isSelected = formData.date === format(day, 'yyyy-MM-dd');

        days.push(
          <div
            key={day.toString()}
            onClick={() => !isDisabled && handleDateSelect(cloneDay)}
            className={`p-2 text-center text-sm transition-colors ${!isSameMonth(day, monthStart) ? "text-stone-700 pointer-events-none" :
              isDisabled ? "text-stone-600 cursor-not-allowed" :
                isSelected ? "bg-amber-900/40 text-amber-100 font-bold" :
                  "text-stone-300 hover:bg-stone-800 cursor-pointer"
              }`}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<React.Fragment key={day.toString()}>{days}</React.Fragment>);
      days = [];
    }
    return rows;
  };

  // Close pickers on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.datepicker-container')) {
        setIsDatePickerOpen(false);
      }
      if (!target.closest('.timepicker-container')) {
        setIsTimePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear errors when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear specific error
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (status === 'error') setStatus('idle');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);

    // Check required and formats
    if (!formData.people) newErrors.people = "Requerido";
    if (!formData.time) newErrors.time = "Requerido";
    if (!formData.name) newErrors.name = "Requerido";

    if (!formData.date) {
      newErrors.date = "Requerido";
    } else if (selectedDate < today) {
      newErrors.date = "La fecha no puede ser pasada";
    }

    if (!formData.email) {
      newErrors.email = "Requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

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
    setErrors({});
  };

  const isSubmitting = status === 'submitting';

  // Check if form has any content to determine button state partially
  const hasContent = Object.values(formData).some(val => val !== '');

  return (
    <section id="reservations" className="py-32 md:py-48 px-6 bg-stone-950 border-t border-stone-900/50 flex justify-center relative overflow-hidden min-h-[600px]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950 pointer-events-none" />

      <div className="max-w-5xl w-full relative flex flex-col justify-center z-10">

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
              animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              className="relative z-10"
            >
              <form
                onSubmit={handleSubmit}
                className={`text-center transition-opacity duration-700 ${isSubmitting ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                noValidate
              >

                <div className="font-display italic text-2xl md:text-3xl lg:text-5xl leading-[1.8] md:leading-[2] text-stone-400 font-light break-words max-w-4xl mx-auto">
                  <span>Hola, deseo una mesa para </span>

                  {/* People Input */}
                  <div className="inline-flex flex-col align-baseline mx-2 relative top-2">
                    <input
                      type="number"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      placeholder="2"
                      min="1"
                      max="20"
                      disabled={isSubmitting}
                      className="w-16 md:w-24 bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-800 font-normal rounded-none py-1"
                    />
                    <div className="h-4 mt-1">
                      {errors.people && <span className="text-[10px] text-rose-900 font-body uppercase tracking-wider block whitespace-nowrap">{errors.people}</span>}
                    </div>
                  </div>

                  <span> personas<span className="text-rose-900 ml-1 text-sm align-top">*</span>, el día </span>

                  {/* Custom Date Picker */}
                  <div className="inline-flex flex-col align-baseline mx-2 relative top-2">
                    <div className="relative w-48 md:w-64">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDatePickerOpen(!isDatePickerOpen);
                          setIsTimePickerOpen(false);
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors font-normal py-1 pr-6 cursor-pointer flex justify-between items-center"
                      >
                        <span className="truncate">{formData.date ? format(new Date(formData.date + 'T12:00:00'), "dd 'de' MMMM", { locale: es }) : 'dd/mm/aaaa'}</span>
                        <Calendar size={16} className="text-stone-500 absolute right-0" />
                      </button>

                      <AnimatePresence>
                        {isDatePickerOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-stone-900 border border-stone-800 shadow-2xl z-50 p-4"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <button type="button" onClick={() => handleMonthChange(-1)} className="text-stone-400 hover:text-white"><ChevronLeft size={20} /></button>
                              <span className="font-cinzel text-stone-200 capitalize text-sm">
                                {format(currentMonth, "MMMM yyyy", { locale: es })}
                              </span>
                              <button type="button" onClick={() => handleMonthChange(1)} className="text-stone-400 hover:text-white"><ChevronRight size={20} /></button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                                <div key={day} className="text-center font-body text-[10px] text-stone-500">{day}</div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {renderCalendarDays()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="h-4 mt-1">
                      {errors.date && <span className="text-[10px] text-rose-900 font-body uppercase tracking-wider block whitespace-nowrap">{errors.date}</span>}
                    </div>
                  </div>

                  <span> a las </span>

                  {/* Custom Time Picker */}
                  <div className="inline-flex flex-col align-baseline mx-2 relative top-2">
                    <div className="relative w-40 md:w-48">
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimePickerOpen(!isTimePickerOpen);
                          setIsDatePickerOpen(false);
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-100 text-center focus:border-amber-700 focus:outline-none transition-colors font-normal py-1 pr-6 cursor-pointer flex justify-between items-center"
                      >
                        <span className="truncate">{formData.time || '--:--'}</span>
                        <ClockIcon size={16} className="text-stone-500 absolute right-0" />
                      </button>

                      <AnimatePresence>
                        {isTimePickerOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-stone-900 border border-stone-800 shadow-2xl z-50 max-h-48 overflow-y-auto scrollbar-hide"
                          >
                            {availableTimes.map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`w-full text-center py-2 text-sm font-body transition-colors ${formData.time === time ? 'bg-amber-900/40 text-amber-100' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
                              >
                                {time}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="h-4 mt-1">
                      {errors.time && <span className="text-[10px] text-rose-900 font-body uppercase tracking-wider block whitespace-nowrap">{errors.time}</span>}
                    </div>
                  </div>

                  <span>.<br className="block my-2" /> Mi nombre es </span>

                  {/* Name Input */}
                  <div className="inline-flex flex-col align-baseline mx-2 relative top-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu Nombre"
                      disabled={isSubmitting}
                      className="w-48 md:w-80 bg-transparent border-b border-stone-700 text-stone-100 text-center font-display italic focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-800 rounded-none py-1"
                    />
                    <div className="h-4 mt-1">
                      {errors.name && <span className="text-[10px] text-rose-900 font-body uppercase tracking-wider block whitespace-nowrap">{errors.name}</span>}
                    </div>
                  </div>

                  <span><span className="text-rose-900 ml-0.5 text-sm align-top">*</span> y mi email es </span>

                  {/* Email Input */}
                  <div className="inline-flex flex-col align-baseline mx-2 relative top-2 text-left">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      disabled={isSubmitting}
                      className="w-80 md:w-[28rem] bg-transparent border-b border-stone-700 text-stone-100 text-center font-display italic focus:border-amber-700 focus:outline-none transition-colors placeholder:text-stone-800 rounded-none py-1 block mx-auto"
                    />
                    <div className="h-4 mt-1 text-center">
                      {errors.email && <span className="text-[10px] text-rose-900 font-body uppercase tracking-wider block whitespace-nowrap">{errors.email}</span>}
                    </div>
                  </div>

                  <span><span className="text-rose-900 ml-0.5 text-sm align-top">*</span>.</span>
                </div>

                <div className="mt-20 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || (Object.keys(errors).length > 0 && shake)}
                    className="group relative px-12 py-5 bg-transparent border border-stone-800 overflow-hidden transition-all hover:border-amber-900/50 disabled:border-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 font-body text-xs tracking-[0.3em] uppercase text-stone-300 group-hover:text-amber-100 transition-colors">
                      {isSubmitting ? 'Enviando...' : 'Confirmar Mesa'}
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
                        className="mt-6 text-xs text-rose-900 font-body tracking-wider uppercase"
                      >
                        Error de conexión. Intente nuevamente.
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
                Mesa Confirmada
              </h3>
              <p className="font-body text-stone-400 text-sm tracking-widest uppercase mb-8">
                Te esperamos en la oscuridad.
              </p>
              <button
                onClick={handleReset}
                className="text-stone-600 hover:text-stone-300 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Hacer otra reserva
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};