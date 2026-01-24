import React from 'react';
import { X, DollarSign } from 'lucide-react';
import { Service } from '../types';
import Button from './Button';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onBook: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, service, onBook }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
               {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">{service.title}</h3>
              <p className="text-sm text-slate-500">Starting at {service.priceStart}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary-600" />
              Standard Pricing
            </h4>
            <div className="space-y-3">
              {service.pricingDetails?.map((detail, index) => (
                <div key={index} className="flex justify-between items-center text-sm border-b border-slate-200/60 last:border-0 pb-2 last:pb-0">
                  <span className="text-slate-600 font-medium">{detail.item}</span>
                  <span className="text-slate-900 font-bold">{detail.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 italic text-center">
              *Prices may vary based on complexity and insurance coverage.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" fullWidth onClick={onClose}>
              Close
            </Button>
            <Button fullWidth onClick={() => { onClose(); onBook(); }}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;