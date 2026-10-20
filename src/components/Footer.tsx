import { MapPin, MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const Footer: React.FC = () => {
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

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            &copy; {new Date().getFullYear()} Tentaciones Fiambrería. Todos los derechos reservados.
          </p>

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
