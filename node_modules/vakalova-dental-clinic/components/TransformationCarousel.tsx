import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Transformation } from '../types';

interface TransformationCarouselProps {
  items: Transformation[];
}

const TransformationCarousel: React.FC<TransformationCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-20">
      <div className="text-center mb-10">
        <h3 className="text-primary-600 font-bold uppercase tracking-wider mb-2 text-sm">Real Results</h3>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Patient Transformations</h2>
      </div>

      <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
          {/* Images Section */}
          <div className="md:w-3/5 h-[300px] md:h-full relative flex">
            {/* Before Image */}
            <div className="w-1/2 h-full relative border-r-2 border-white">
              <img 
                src={currentItem.beforeImage} 
                alt="Before" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                BEFORE
              </div>
            </div>
            {/* After Image */}
            <div className="w-1/2 h-full relative">
              <img 
                src={currentItem.afterImage} 
                alt="After" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                AFTER
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-slate-50 relative">
             {/* Navigation Overlay for desktop on the right side */}
            <div className="mb-6">
               <span className="text-primary-600 font-bold text-sm tracking-widest">CASE STUDY #{currentItem.id}</span>
               <h3 className="text-3xl font-serif font-bold text-slate-900 mt-2 mb-4">{currentItem.title}</h3>
               <p className="text-slate-600 leading-relaxed mb-6">{currentItem.description}</p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
               <div className="flex gap-2">
                 <button 
                   onClick={prevSlide}
                   className="p-3 rounded-full border border-slate-300 hover:border-primary-600 hover:text-primary-600 hover:bg-white transition-all"
                   aria-label="Previous transformation"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button 
                   onClick={nextSlide}
                   className="p-3 rounded-full border border-slate-300 hover:border-primary-600 hover:text-primary-600 hover:bg-white transition-all"
                   aria-label="Next transformation"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
               </div>
               <div className="flex gap-1.5">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-primary-600' : 'w-2 bg-slate-300 hover:bg-primary-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformationCarousel;