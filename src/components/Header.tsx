import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#catalogo' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#09665C] ${
        isScrolled
          ? 'shadow-lg border-b border-[#054840] py-2.5 sm:py-3'
          : 'py-3 sm:py-4 border-b border-[#054840]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Oficial de Tentaciones */}
          <a
            href="#inicio"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream rounded-xl"
            aria-label="Ir al inicio de Tentaciones Fiambrería"
          >
            <img
              src="/logo-teal-badge.jpg"
              alt="Tentaciones - Quesos & Fiambres"
              className="h-10 sm:h-12 w-auto object-contain rounded-xl shadow-sm border border-white/20 transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/90 hover:text-brand-cream hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call To Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold text-brand-dark bg-brand-cream hover:bg-brand-cream-light shadow-md hover:shadow-lg transition-all rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-teal-dark" />
              <span>Hacer un pedido</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-white/15 rounded-full border border-white/20"
              aria-label="Abrir WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09665C] border-b border-[#054840] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium text-white hover:text-brand-cream hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/20 flex flex-col gap-2.5">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 rounded-xl border border-white/20"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Pedir por WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
              </a>

              <a
                href={BUSINESS_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-bold text-brand-dark bg-brand-cream hover:bg-brand-cream-light rounded-xl shadow-md"
              >
                <ShoppingBag className="w-5 h-5 text-brand-teal-dark" />
                <span>Ver tienda en Uber Eats</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
