import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import Button from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {step === 1 ? (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Book Your Visit</h2>
                <p className="text-slate-500">Schedule your consultation with our expert team.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Preferred Date</label>
                      <input 
                        required 
                        type="date" 
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Reason for Visit</label>
                    <div className="relative">
                      <select className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all appearance-none">
                        <option>General Checkup</option>
                        <option>Teeth Cleaning</option>
                        <option>Pain / Emergency</option>
                        <option>Cosmetic Consultation</option>
                        <option>Orthodontics</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    fullWidth 
                    size="lg"
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20"
                  >
                    {isSubmitting ? 'Processing...' : 'Request Appointment'}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-10 animate-fade-in-up">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Request Received!</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
                Thank you for choosing Vakalova. Our reception team will call you shortly to confirm your slot.
              </p>
              <Button variant="outline" onClick={onClose} fullWidth>
                Close Window
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;