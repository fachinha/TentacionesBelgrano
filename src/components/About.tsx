import React from 'react';
import { CheckCircle2, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Images Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-brand-warm-dark aspect-[4/3] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1549448937-b95c96328908?auto=format&fit=crop&w=900&q=80"
                  alt="Selección de quesos y tablas gourmet en Tentaciones"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Inset floating badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-brand-bordo text-white p-5 rounded-2xl shadow-xl border-2 border-brand-warm max-w-xs">
                <div className="flex items-center gap-2 text-brand-turquoise text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Calidad Garantizada</span>
                </div>
                <p className="text-xs text-brand-warm leading-snug">
                  Cortes feteados al momento para conservar intactos la frescura, el aroma y la textura.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-turquoise/15 text-brand-turquoise-dark text-xs font-bold uppercase tracking-wider mb-4">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Nuestra Propuesta</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-bordo tracking-tight leading-tight">
              Especialistas en quesos, fiambres y sabores que inspiran encuentros.
            </h2>

            <div className="mt-6 space-y-4 text-brand-muted text-base sm:text-lg leading-relaxed">
              <p>
                En <strong>Tentaciones</strong> nos dedicamos a acercarte una selección cuidada de fiambres, quesos tradicionales y especialidades patagónicas en San Carlos de Bariloche.
              </p>
              <p>
                Creemos que el secreto de una buena mesa está en los detalles: el grosor justo de cada feteado, la temperatura adecuada de conservación y la atención dedicada para que encuentres exactamente lo que buscás para tu picada, almuerzo o reunión.
              </p>
            </div>

            {/* Value Pillars List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-warm border border-brand-warm-dark/60">
                <CheckCircle2 className="w-5 h-5 text-brand-turquoise-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-brand-bordo font-serif">Feteado en el acto</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Mantenemos el sabor genuino sin empaques prolongados.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-warm border border-brand-warm-dark/60">
                <CheckCircle2 className="w-5 h-5 text-brand-turquoise-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-brand-bordo font-serif">Variedad gourmet</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Desde quesos clásicos hasta opciones ahumadas y azules.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-warm border border-brand-warm-dark/60">
                <CheckCircle2 className="w-5 h-5 text-brand-turquoise-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-brand-bordo font-serif">Toque patagónico</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Trucha ahumada regional y jugos naturales del valle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-warm border border-brand-warm-dark/60">
                <CheckCircle2 className="w-5 h-5 text-brand-turquoise-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-brand-bordo font-serif">Atención cercana</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Encontranos en {BUSINESS_INFO.address} o escribinos por WhatsApp.</p>
                </div>
              </div>
            </div>

            {/* Location pill */}
            <div className="mt-8 pt-6 border-t border-brand-warm flex items-center gap-2 text-xs text-brand-muted">
              <MapPin className="w-4 h-4 text-brand-turquoise-dark" />
              <span>Visitanos en {BUSINESS_INFO.address}, San Carlos de Bariloche, Río Negro.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
