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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Collect form data
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: new Date(formData.get('date') as string).toISOString(),
      time: formData.get('time'),
      serviceId: formData.get('serviceId'), // Mock ID from select value
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Booking failed');

      setIsSubmitting(false);
      setStep(2);
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment. Please try again.');
      setIsSubmitting(false);
    }
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">First Name</label>
                      <input
                        required
                        name="firstName"
                        type="text"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Last Name</label>
                      <input
                        required
                        name="lastName"
                        type="text"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Phone Number</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Date & Time</label>
                      <div className="flex gap-2">
                        <input
                          required
                          name="date"
                          type="date"
                          className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm"
                        />
                        <input
                          required
                          name="time"
                          type="time"
                          className="w-28 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Reason for Visit</label>
                    <div className="relative">
                      <select name="serviceId" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all appearance-none">
                        <option value="checkup">General Checkup</option>
                        <option value="cleaning">Teeth Cleaning</option>
                        <option value="pain">Pain / Emergency</option>
                        <option value="cosmetic">Cosmetic Consultation</option>
                        <option value="orthodontics">Orthodontics</option>
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