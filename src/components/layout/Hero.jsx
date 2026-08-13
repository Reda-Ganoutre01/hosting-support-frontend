import React from "react";
import { Check, Bell } from "lucide-react";
import Button from "@/components/ui/Button.jsx";

export default function Hero({ 
  slides, 
  currentSlide, 
  setCurrentSlide, 
  activeSlide, 
  domainQuery, 
  setDomainQuery 
}) {
  return (
    <section className="pt-10 pb-32 lg:pt-14 lg:pb-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-white">
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white transition-all">
                {activeSlide.title}
              </h1>

              <p className="text-lg sm:text-xl text-white/90 font-normal max-w-xl leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Features List with Orange Checkmarks */}
              <div className="space-y-3 pt-1 text-white font-medium text-base sm:text-lg">
                {activeSlide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-orange-400 stroke-[3]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code Pill Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 bg-blue-900/60 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm shadow-md">
                  <div className="bg-blue-500 text-white p-1.5 rounded-full animate-pulse">
                    <Bell className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span>{activeSlide.tag}</span>
                </div>
              </div>

              {/* Starting price text */}
              <div className="text-white font-medium text-lg pt-1">
                À partir de <strong className="text-orange-400 font-extrabold text-xl">6,25 Dhs/mois</strong>
              </div>

              {/* Commander CTA Button */}
              <div className="pt-2">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-base font-extrabold px-8 py-3.5 rounded-xl shadow-xl shadow-orange-500/30">
                  <span>{activeSlide.buttonText}</span>
                </Button>
              </div>

            </div>

            {/* Right Content: Clean Transparent Illustration */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg flex justify-center items-center">
                <img 
                  key={activeSlide.image}
                  src={activeSlide.image} 
                  alt={activeSlide.title}
                  className="w-full h-auto object-contain max-h-[440px] drop-shadow-2xl transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Carousel Navigation Slice Dots Centered */}
          <div className="flex items-center justify-center gap-3 pt-6 pb-2 relative z-30">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-orange-500 ring-2 ring-white ring-offset-1 ring-offset-transparent scale-110' 
                    : 'bg-white/90 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Floating Domain Search Box Overlapping Hero & Body */}
        <div className="absolute -bottom-16 left-0 right-0 max-w-4xl mx-auto px-4 z-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-400/30">
            
            {/* Domain Input Field */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-inner">
              <input 
                type="text" 
                value={domainQuery}
                onChange={(e) => setDomainQuery(e.target.value)}
                placeholder="domain.com"
                className="w-full px-5 py-3 text-slate-800 text-base outline-none bg-transparent"
              />
              <Button className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-8 py-3.5 rounded-xl transition-colors shrink-0">
                Rechercher un domaine
              </Button>
            </div>

            {/* Popular Extension Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              
              <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.ma</div>
                <div className="text-xs text-blue-200 mt-1 font-medium">129 Dh</div>
              </div>

              <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.com</div>
                <div className="text-xs text-blue-200 mt-1 font-medium">145 Dh</div>
              </div>

              <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.net</div>
                <div className="text-xs text-blue-200 mt-1 font-medium">149 Dh</div>
              </div>

              <div className="bg-blue-800/60 backdrop-blur-md border border-blue-400/20 p-3 rounded-xl text-center text-white">
                <div className="text-lg font-bold underline underline-offset-4 decoration-amber-400">.be</div>
                <div className="text-xs text-blue-200 mt-1 font-medium">129 Dh</div>
              </div>

            </div>

          </div>
        </div>

      </section>
  );
}
