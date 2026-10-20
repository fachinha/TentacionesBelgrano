import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside aria-label="Contacto flotante de WhatsApp" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      
      {/* Desktop Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-brand-bordo text-white px-3.5 py-2 rounded-2xl shadow-xl border border-brand-turquoise/40 text-xs animate-in fade-in slide-in-from-right-2 duration-200">
          <span>¿Querés hacer un pedido? Escribinos</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Cerrar sugerencia"
            className="text-brand-warm hover:text-white p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Tentaciones por WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-turquoise/50"
      >
        {/* Subtle Pulse Rings */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />

        {/* Small Active Green Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-turquoise border-2 border-white rounded-full z-20" />
      </a>
    </aside>
  );
};
