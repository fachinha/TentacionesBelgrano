import React from 'react';
import { ArrowDown, MessageCircle, ShoppingBag, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-24 sm:pt-28 pb-16 md:pb-24 overflow-hidden">
      {/* Background with warm ambient culinary visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1920&q=80"
          alt="Tabla gourmet de quesos, fiambres y salames en Bariloche"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105"
        />
        {/* Brand color wash gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bordo/95 via-brand-bordo/80 to-brand-bordo/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bordo via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 lg:pt-18 text-white">
        <div className="max-w-3xl">
          
          {/* Location & Specialty Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-turquoise text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in duration-500">
            <MapPin className="w-3.5 h-3.5 text-brand-turquoise" />
            <span>Av. Belgrano 69 · San Carlos de Bariloche</span>
          </div>

          {/* Suggested Official Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Pequeños placeres,{' '}
            <span className="text-brand-turquoise italic font-normal block sm:inline">
              grandes sabores.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-brand-warm/90 leading-relaxed font-normal mb-8 max-w-2xl">
            Descubrí nuestros quesos, fiambres y sabores seleccionados en el corazón de Bariloche. Cortes frescos feteados en el momento y la mejor atención.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-brand-turquoise hover:bg-brand-turquoise-dark shadow-lg shadow-brand-turquoise/25 hover:shadow-brand-turquoise/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explorar productos</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>Pedí por WhatsApp</span>
            </a>

            <a
              href={BUSINESS_INFO.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-brand-warm/90 hover:text-white bg-black/40 hover:bg-black/60 border border-white/15 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-brand-turquoise" />
              <span>Tienda Uber Eats</span>
            </a>
          </div>

          {/* Transparency note */}
          <div className="flex items-center gap-2 text-xs text-brand-warm/75">
            <ShieldCheck className="w-4 h-4 text-brand-turquoise flex-shrink-0" />
            <span>Precios y catálogo de referencia tomados de Uber Eats · Consulta directa de stock por WhatsApp</span>
          </div>

        </div>
      </div>

      {/* Feature Highlights Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-brand-warm-dark shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise-dark font-bold mb-2.5">
              🧀
            </div>
            <h2 className="text-sm font-bold text-brand-bordo font-serif">Quesos Selectos</h2>
            <p className="text-xs text-brand-muted mt-1 leading-snug">
              Blandos, semiduros, duros y azules en trozos o feteados.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-brand-warm-dark shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise-dark font-bold mb-2.5">
              🥓
            </div>
            <h2 className="text-sm font-bold text-brand-bordo font-serif">Fiambres al Momento</h2>
            <p className="text-xs text-brand-muted mt-1 leading-snug">
              Jamón crudo, cocido, lomos, bondiola y salames de calidad.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-brand-warm-dark shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise-dark font-bold mb-2.5">
              🏔️
            </div>
            <h2 className="text-sm font-bold text-brand-bordo font-serif">Sabor Patagónico</h2>
            <p className="text-xs text-brand-muted mt-1 leading-snug">
              Trucha ahumada envasada y especialidades regionales.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-brand-warm-dark shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise-dark font-bold mb-2.5">
              <Sparkles className="w-4 h-4 text-brand-turquoise-dark" />
            </div>
            <h2 className="text-sm font-bold text-brand-bordo font-serif">Atención Directa</h2>
            <p className="text-xs text-brand-muted mt-1 leading-snug">
              Consultas por WhatsApp y pedidos a domicilio por Uber Eats.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
