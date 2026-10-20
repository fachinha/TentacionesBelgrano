import React from 'react';
import { ArrowDown, MessageCircle, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-24 sm:pt-28 pb-16 md:pb-24 overflow-hidden">
      {/* Background with real gourmet picada photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-picada.jpg"
          alt="Picada profesional con quesos y fiambres seleccionados de Tentaciones"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
        />
        {/* Logo-inspired deep teal & dark pine gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal-deep/95 via-brand-teal-dark/80 to-brand-teal-deep/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-deep via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 lg:pt-18 text-white">
        <div className="max-w-3xl">
          


          {/* Official Title with Cream Accent from Logo */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Pequeños placeres,{' '}
            <span className="text-brand-cream italic font-normal block sm:inline">
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
              href={BUSINESS_INFO.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-brand-dark bg-brand-cream hover:bg-brand-cream-light shadow-xl shadow-black/30 hover:shadow-brand-cream/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ShoppingBag className="w-4 h-4 text-brand-teal-dark" />
              <span>Pedir en Uber Eats</span>
            </a>

            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-brand-teal hover:bg-brand-teal-dark border border-white/20 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Ver catálogo</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-white/90 hover:text-white bg-black/40 hover:bg-black/60 border border-white/15 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
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
