import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { BUSINESS_INFO } from '../data/businessInfo';
import { ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todos: PRODUCTS.length,
      quesos: 0,
      fiambres: 0,
      ahumados: 0,
      bebidas: 0,
    };

    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, []);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search match (name, description, presentation, badge)
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description?.toLowerCase().includes(query) ?? false;
      const presMatch = product.presentation.toLowerCase().includes(query);
      const badgeMatch = product.badge?.toLowerCase().includes(query) ?? false;

      return nameMatch || descMatch || presMatch || badgeMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-brand-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-turquoise-dark bg-brand-turquoise/15 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Selección Tentaciones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-bordo tracking-tight">
            Catálogo de Productos
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-brand-muted leading-relaxed">
            Quesos de diversas maduraciones, fiambres de primera línea y especialidades patagónicas. Hacé tu pedido directo en <strong>Uber Eats</strong> con entrega rápida en Bariloche o consultanos disponibilidad.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="mb-8 space-y-4">
          
          {/* Search Input Box */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por queso, fiambre, marca (ej. Cremón, Espuña, Trucha)..."
                aria-label="Buscar productos en el catálogo"
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-brand-warm-dark rounded-2xl text-sm text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-brand-turquoise shadow-sm transition-all"
              />
              <Search className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="p-1 rounded-full hover:bg-brand-warm text-brand-muted hover:text-brand-dark absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs (scrollable on mobile) */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 pt-1 gap-2 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-bordo text-white shadow-md shadow-brand-bordo/20'
                      : 'bg-white text-brand-dark hover:text-brand-bordo hover:bg-brand-warm border border-brand-warm-dark/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
                      isActive
                        ? 'bg-brand-turquoise text-brand-bordo'
                        : 'bg-brand-warm text-brand-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result counter & active filters note */}
          <div className="flex items-center justify-between text-xs text-brand-muted px-2 pt-1">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-turquoise-dark" />
              Mostrando <strong className="text-brand-dark">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'producto' : 'productos'}
            </span>

            {(searchQuery || selectedCategory !== 'todos') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                }}
                className="text-brand-turquoise-dark hover:underline font-semibold"
              >
                Restablecer filtros
              </button>
            )}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-brand-warm-dark p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-brand-warm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-brand-bordo">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-bordo mb-2">
              No encontramos productos
            </h3>
            <p className="text-sm text-brand-muted mb-6 leading-relaxed">
              No hay coincidencias para &quot;{searchQuery}&quot; en la categoría seleccionada. Podés restablecer la búsqueda o consultarnos directamente por WhatsApp si estás buscando un corte o producto especial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-bordo bg-brand-warm hover:bg-brand-warm-dark transition-colors"
              >
                Ver todo el catálogo
              </button>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-brand-turquoise hover:bg-brand-turquoise-dark transition-colors"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Uber Eats Delivery Banner */}
        <div className="mt-14 sm:mt-16 bg-gradient-to-r from-brand-bordo to-brand-bordo-light rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/20 text-brand-turquoise text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              Delivery disponible en Bariloche
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
              ¿Preferís recibir tu pedido en tu casa?
            </h3>
            <p className="text-sm sm:text-base text-brand-warm/90 leading-relaxed mb-6">
              Pedí tus quesos y fiambres favoritos directamente desde nuestra tienda oficial en <strong>Uber Eats</strong> con entrega a domicilio rápida y segura.
            </p>
            <a
              href={BUSINESS_INFO.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider text-brand-bordo bg-brand-turquoise hover:bg-brand-turquoise-light transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Abrir tienda en Uber Eats</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Decorative graphic backdrop */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-20 pointer-events-none">
            <div className="w-full h-full flex items-center justify-center font-serif text-9xl text-white select-none">
              🧀
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
