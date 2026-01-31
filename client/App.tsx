import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, ChevronRight, Star, Quote, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import Navbar from './components/Navbar';
import Button from './components/Button';
import ChatAssistant from './components/ChatAssistant';
import BookingModal from './components/BookingModal';
import PricingModal from './components/PricingModal';
import TransformationCarousel from './components/TransformationCarousel';
import { SERVICES, DOCTORS, REVIEWS, TRANSFORMATIONS } from './constants';
import { Service } from './types';

const STAR_INDICES = [0, 1, 2, 3, 4];

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForPricing, setSelectedServiceForPricing] = useState<Service | null>(null);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const openPricing = (service: Service) => setSelectedServiceForPricing(service);
  const closePricing = () => setSelectedServiceForPricing(null);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary-200">
      <Navbar onBook={openBooking} />

      {/* Hero Section - Split Layout */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                Accepting New Patients
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 text-slate-900 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Your Smile, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Perfected.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-10 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Experience world-class dental care in a modern, relaxing environment. From routine checkups to complete smile makeovers, we prioritize your comfort.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button size="lg" onClick={openBooking} className="shadow-xl shadow-primary-500/20">Book Appointment</Button>
                <Button size="lg" variant="white" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Services
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Trust Badges / Logos Placeholder */}
                <div className="font-serif font-bold text-slate-400">ADA Member</div>
                <div className="font-serif font-bold text-slate-400">Invisalign Platinum</div>
                <div className="font-serif font-bold text-slate-400">Top Rated 2024</div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:w-1/2 w-full relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/clinic/interior-reception-treatment.jpg"
                  alt="Modern Dental Office"
                  className="w-full h-[500px] lg:h-[650px] object-cover hover:scale-105 transition-transform duration-1000"
                />
                {/* Floating Card inside Image */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg max-w-xs animate-float">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <Star fill="currentColor" className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">4.9/5</p>
                      <p className="text-xs text-slate-500">Patient Satisfaction</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">"The most gentle dentist I've ever visited!"</p>
                </div>
              </div>
              {/* Decorative Blob */}
              <div className="absolute -z-10 top-20 -right-20 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Info Strip - Negative Margin for overlap */}
      <div className="relative z-20 -mt-16 mb-20 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 border border-slate-100">
          <div className="flex-1 p-8 flex items-start gap-4 hover:bg-slate-50 transition-colors">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Opening Hours</h3>
              <p className="text-sm text-slate-500">Mon - Fri: 8:00am - 6:00pm</p>
              <p className="text-sm text-slate-500">Saturday: 9:00am - 2:00pm</p>
            </div>
          </div>
          <div className="flex-1 p-8 flex items-start gap-4 hover:bg-slate-50 transition-colors">
            <div className="p-3 rounded-2xl bg-green-50 text-green-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Our Location</h3>
              <p className="text-sm text-slate-500">123 Health Avenue</p>
              <p className="text-sm text-slate-500">Medical District, NY 10010</p>
            </div>
          </div>
          <div className="flex-1 p-8 flex items-start gap-4 bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative z-10 flex gap-4">
              <div className="p-3 rounded-2xl bg-white/10 text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Emergency Case?</h3>
                <p className="text-sm text-slate-300 mb-2">24/7 support for urgent pain.</p>
                <a href="tel:+15551234567" className="font-bold text-lg hover:underline">(555) 123-4567</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h4 className="text-primary-600 font-bold uppercase tracking-wider mb-2 text-sm">Our Expertise</h4>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">Comprehensive Care <br /> for Your Health</h2>
            </div>
            <div className="max-w-xs">
              <p className="text-slate-500 leading-relaxed">
                Using state-of-the-art technology to provide painless, effective, and lasting treatments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100 overflow-hidden relative flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex-1">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 mb-8 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">{service.description}</p>
                </div>
                <div className="relative z-10 flex items-center justify-between mt-auto">
                  <button
                    onClick={() => openPricing(service)}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline transition-all"
                  >
                    View Pricing Details
                  </button>
                  <button
                    onClick={() => openPricing(service)}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-primary-600 group-hover:text-primary-600 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Transformations Carousel */}
          <TransformationCarousel items={TRANSFORMATIONS} />
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-primary-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
              <div className="grid grid-cols-2 gap-6">
                {DOCTORS.map((doctor, idx) => (
                  <div key={doctor.id} className={`relative rounded-3xl overflow-hidden shadow-xl group ${idx === 1 ? 'mt-16' : 'mb-16'}`}>
                    <img src={doctor.image} alt={doctor.name} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                      <h3 className="text-white font-bold text-xl mb-1">{doctor.name}</h3>
                      <p className="text-primary-300 text-sm font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h4 className="text-primary-600 font-bold uppercase tracking-wider mb-2 text-sm">Our Team</h4>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">Meet the Experts <br /> Behind Your Smile</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Dr. Vakalova and her team are committed to continuing education and staying at the forefront of dental technology. We believe in a patient-centered approach, listening to your concerns and tailoring treatments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <ShieldCheck />, text: 'Certified Invisalign' },
                  { icon: <Heart />, text: 'Painless Dentistry' },
                  { icon: <Star />, text: '15+ Years Experience' },
                  { icon: <Clock />, text: 'Modern Technology' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-primary-600">{item.icon}</div>
                    <span className="font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button onClick={openBooking} size="lg">Schedule Consultation</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32 bg-navy-900 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/30 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Patient Stories</h2>
            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
              </div>
              <span className="text-slate-300 font-medium ml-2 border-l border-white/20 pl-4">4.9/5 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-navy-800 p-8 rounded-[2rem] relative border border-white/5 hover:bg-navy-800/80 transition-colors">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary-500 opacity-20" />
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {STAR_INDICES.map((i) => (
                    i < review.rating ? <Star key={i} size={18} fill="currentColor" /> : null
                  ))}
                </div>
                <p className="text-slate-300 mb-8 italic leading-relaxed text-lg">"{review.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg text-lg">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{review.author}</p>
                    <p className="text-sm text-slate-400">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-12 lg:p-16 bg-gradient-to-br from-primary-700 to-navy-900 text-white relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-500 rounded-full opacity-30 blur-[80px]" />
              <div className="relative z-10">
                <h3 className="text-4xl font-serif font-bold mb-2">Get In Touch</h3>
                <p className="text-primary-200 mb-12 text-lg">We are looking forward to seeing you.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Visit Us</p>
                      <p className="opacity-80 leading-relaxed">123 Health Avenue, Floor 2<br />New York, NY 10010</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Call Us</p>
                      <p className="opacity-80 text-xl font-light mb-1">(555) 123-4567</p>
                      <p className="text-xs uppercase tracking-widest opacity-60">Mon-Fri 8am-6pm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Email Us</p>
                      <p className="opacity-80">contact@vakalovadental.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 min-h-[400px] relative bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=2000"
                alt="Clinic Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-transform cursor-pointer">
                  <MapPin className="text-red-500 w-6 h-6" />
                  <div>
                    <span className="font-bold text-slate-900 block">Vakalova Clinic</span>
                    <span className="text-xs text-slate-500">Click to view on maps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 text-white mb-6">
                <span className="font-serif font-bold text-2xl">Vakalova<span className="text-primary-500">Dental</span></span>
              </div>
              <p className="max-w-md text-slate-400 leading-relaxed">
                Dedicated to providing exceptional dental care in a comfortable and modern environment. Your smile is our passion, and your health is our priority.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 text-lg">Quick Links</h5>
              <ul className="space-y-4">
                <li><a href="#services" className="hover:text-primary-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Services</a></li>
                <li><a href="#doctors" className="hover:text-primary-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Our Team</a></li>
                <li><a href="#booking" onClick={(e) => { e.preventDefault(); openBooking(); }} className="hover:text-primary-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Book Appointment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 text-lg">Legal</h5>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>© {new Date().getFullYear()} Vakalova Dental Clinic. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <ChatAssistant />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <PricingModal
        isOpen={!!selectedServiceForPricing}
        onClose={closePricing}
        service={selectedServiceForPricing}
        onBook={() => { closePricing(); openBooking(); }}
      />
    </div>
  );
}

export default App;