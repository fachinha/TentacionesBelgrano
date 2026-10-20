import React from 'react';
import { MapPin, MessageCircle, ShoppingBag, ArrowUp, Lock, Star, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { BUSINESS_INFO, SISTER_STORES } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09665C] text-white pt-16 pb-12 border-t border-[#054840] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-teal-badge.jpg"
                alt="Tentaciones - Quesos & Fiambres"
                className="h-12 w-auto object-contain rounded-xl shadow-md border border-brand-cream/20"
              />
            </div>

            <p className="text-sm text-brand-warm/80 leading-relaxed max-w-sm">
              Fiambrería y quesería especializada en San Carlos de Bariloche. Pequeños placeres, grandes sabores para tus picadas y encuentros.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-cream font-medium">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{BUSINESS_INFO.address}, San Carlos de Bariloche</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-brand-cream uppercase tracking-wider text-xs">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-brand-warm/80">
              <li>
                <a href="#inicio" className="hover:text-brand-turquoise transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-turquoise transition-colors">
                  Catálogo de Quesos y Fiambres
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-brand-turquoise transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-brand-turquoise transition-colors">
                  Ubicación en Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-brand-cream uppercase tracking-wider text-xs">
              Especialidades
            </h4>
            <ul className="space-y-2 text-sm text-brand-warm/80">
              <li>
                <a href="#catalogo" className="hover:text-brand-cream transition-colors">
                  Quesos Tradicionales
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-cream transition-colors">
                  Fiambres Seleccionados
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-cream transition-colors">
                  Trucha Ahumada
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-cream transition-colors">
                  Bebidas &amp; Jugos
                </a>
              </li>
            </ul>
          </div>

          {/* Official Channels */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-brand-cream uppercase tracking-wider text-xs">
              Canales Oficiales
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs text-brand-warm/90 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs text-brand-warm/90 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram: {BUSINESS_INFO.instagramHandle}</span>
              </a>

              <a
                href={BUSINESS_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-colors border border-white/15"
              >
                <ShoppingBag className="w-4 h-4 text-brand-cream" />
                <span>Tienda Oficial Uber Eats</span>
              </a>
            </div>
          </div>

        </div>

        {/* Nuestros Otros Locales en Bariloche */}
        <div className="py-8 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cream animate-pulse" />
              <h3 className="text-xs uppercase tracking-[0.25em] text-brand-cream font-bold">
                Nuestros Otros Locales en Bariloche
              </h3>
            </div>
            <p className="text-xs text-brand-warm/80">
              Negocios gastronómicos de nuestra familia comercial en el centro de Bariloche.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SISTER_STORES.map((store) => (
              <div
                key={store.name}
                className="bg-[#054840]/80 hover:bg-[#054840] p-4 sm:p-5 rounded-2xl border border-brand-cream/25 hover:border-brand-cream/50 transition-all space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                      {store.name}
                    </h4>
                    <span className="text-[11px] text-brand-cream font-medium">
                      {store.subtitle}
                    </span>
                  </div>
                  {store.websiteUrl && (
                    <a
                      href={store.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-cream/20 hover:bg-brand-cream text-brand-cream hover:text-[#03332D] text-[10px] uppercase tracking-wider font-bold transition-colors"
                      title={`Visitar web de ${store.name}`}
                    >
                      <span>Web</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {store.description && (
                  <p className="text-xs text-brand-warm/85 leading-relaxed">
                    {store.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {store.whatsappUrl && (
                    <a
                      href={store.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03332D] hover:bg-[#25D366] text-white hover:text-white border border-white/10 hover:border-[#25D366] text-xs font-semibold transition-colors"
                      title={`WhatsApp ${store.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {store.uberEatsUrl && (
                    <a
                      href={store.uberEatsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03332D] hover:bg-white hover:text-brand-dark text-white border border-white/10 hover:border-white text-xs font-semibold transition-colors"
                      title={`Pedir por Uber Eats en ${store.name}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-brand-cream" />
                      <span>Uber Eats</span>
                    </a>
                  )}

                  {store.instagramUrl && (
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03332D] hover:bg-[#E1306C] text-white border border-white/10 hover:border-[#E1306C] text-xs font-semibold transition-colors"
                      title={`Instagram ${store.name}`}
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-300" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {store.googleMapsUrl && (
                    <a
                      href={store.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03332D] hover:bg-brand-cream hover:text-brand-dark text-white border border-white/10 hover:border-brand-cream text-xs font-semibold transition-colors"
                      title={`Ubicación de ${store.name}`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-cream" />
                      <span>Ubicación</span>
                    </a>
                  )}

                  {store.googleReviewsUrl && (
                    <a
                      href={store.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#03332D] hover:bg-amber-400 hover:text-black text-white border border-white/10 hover:border-amber-400 text-xs font-semibold transition-colors"
                      title={`Dejar opinión para ${store.name}`}
                    >
                      <Star className="w-3.5 h-3.5 text-amber-300" />
                      <span>Opiniones</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-4">
            <p>
              &copy; {new Date().getFullYear()} Tentaciones Fiambrería. Todos los derechos reservados.
            </p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-brand-cream transition-colors text-[11px] underline-offset-2 hover:underline"
                title="Acceso exclusivo administración"
              >
                <Lock className="w-3 h-3" />
                <span>Administración</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-center sm:text-right max-w-md">
            Información comercial y catálogo de referencia basados en los canales públicos de Uber Eats, WhatsApp y Google Maps.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver al inicio"
            className="p-2 rounded-full bg-white/15 hover:bg-brand-cream hover:text-brand-dark text-white transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
