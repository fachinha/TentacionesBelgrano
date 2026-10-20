import React, { useState } from 'react';
import { MessageCircle, Info, Tag, Scale } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, getProductWhatsAppUrl } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80';

  const categoryLabels: Record<string, string> = {
    quesos: 'Queso',
    fiambres: 'Fiambre',
    ahumados: 'Ahumado',
    bebidas: 'Bebida',
  };

  return (
    <article className="group bg-white rounded-2xl border border-brand-warm-dark/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
      
      {/* Top Part: Image & Badges */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-warm">
          
          {/* Skeleton placeholder while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-brand-warm-dark/50 animate-pulse" />
          )}

          <img
            src={imageError ? fallbackImage : product.image}
            alt={`${product.name} - ${product.presentation}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-brand-bordo/90 text-white backdrop-blur-md shadow-sm">
              {categoryLabels[product.category] || product.category}
            </span>

            {product.badge && (
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-brand-turquoise text-brand-bordo backdrop-blur-md shadow-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Presentation Pill over Image Bottom */}
          <div className="absolute bottom-2.5 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/95 text-brand-dark backdrop-blur-md shadow-sm">
              <Scale className="w-3 h-3 text-brand-turquoise-dark" />
              {product.presentation}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-bordo group-hover:text-brand-bordo-light transition-colors leading-snug">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-xs sm:text-sm text-brand-muted mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Warning / Clarification notice if present (e.g., Atuel) */}
          {product.warningNotice && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-tight">{product.warningNotice}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Part: Price & WhatsApp Action */}
      <div className="p-4 sm:p-5 pt-0 mt-auto border-t border-brand-warm/80">
        <div className="pt-3 flex items-baseline justify-between mb-3.5">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-brand-muted font-medium">
              Precio publicado
            </span>
            <span className="font-serif text-2xl font-bold text-brand-bordo">
              {formatCurrency(product.price)}
            </span>
          </div>

          <span className="text-xs text-brand-muted italic">
            {product.presentation}
          </span>
        </div>

        <a
          href={getProductWhatsAppUrl(product.name, product.presentation, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por ${product.name} por WhatsApp`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-brand-turquoise hover:bg-brand-turquoise-dark shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>

    </article>
  );
};
