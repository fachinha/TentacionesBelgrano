import { MapPin, Navigation, MessageCircle, ShoppingBag, Clock, Compass } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/formatters';

export const LocationContact: React.FC = () => {
  return (
    <section id="ubicacion" className="py-16 md:py-24 bg-brand-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-turquoise-dark bg-brand-turquoise/15 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Encontranos en Bariloche
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-bordo tracking-tight">
            Ubicación y Contacto
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-muted">
            Estamos ubicados en pleno centro de la ciudad. Podés pasar a retirar tus pedidos o coordinar envíos a domicilio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-dark shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise-dark flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-bordo">
                    Local Comercial
                  </h3>
                  <p className="text-sm font-semibold text-brand-dark mt-1">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {BUSINESS_INFO.city}, {BUSINESS_INFO.province}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-warm-dark/60 flex flex-col gap-3">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-brand-bordo hover:bg-brand-bordo-light transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-brand-turquoise" />
                  <span>Cómo llegar en Google Maps</span>
                </a>
              </div>
            </div>

            {/* Direct Channels Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-dark shadow-card space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-bordo mb-2">
                Canales de Atención Directa
              </h3>

              {/* WhatsApp Link */}
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-warm hover:bg-brand-warm-dark/70 border border-brand-warm-dark/70 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-muted font-bold block">
                      WhatsApp Oficial
                    </span>
                    <span className="text-sm font-bold text-brand-dark group-hover:text-brand-bordo">
                      {BUSINESS_INFO.phoneDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-brand-turquoise-dark group-hover:translate-x-0.5 transition-transform">
                  Escribir &rarr;
                </span>
              </a>

              {/* Instagram Link */}
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-warm hover:bg-brand-warm-dark/70 border border-brand-warm-dark/70 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-muted font-bold block">
                      Instagram Oficial
                    </span>
                    <span className="text-sm font-bold text-brand-dark group-hover:text-brand-bordo">
                      {BUSINESS_INFO.instagramHandle}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-brand-turquoise-dark group-hover:translate-x-0.5 transition-transform">
                  Seguir &rarr;
                </span>
              </a>

              {/* Uber Eats Store */}
              <a
                href={BUSINESS_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-warm hover:bg-brand-warm-dark/70 border border-brand-warm-dark/70 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-muted font-bold block">
                      Delivery en Uber Eats
                    </span>
                    <span className="text-sm font-bold text-brand-dark group-hover:text-brand-bordo">
                      Tienda Oficial
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-brand-turquoise-dark group-hover:translate-x-0.5 transition-transform">
                  Ver tienda &rarr;
                </span>
              </a>

            </div>

            {/* Hours consultation badge */}
            <div className="p-4 rounded-2xl bg-brand-turquoise/10 border border-brand-turquoise/30 flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-turquoise-dark flex-shrink-0 mt-0.5" />
              <div className="text-xs text-brand-dark leading-relaxed">
                <strong className="block text-brand-bordo font-bold">Horarios y disponibilidad:</strong>
                Para confirmar horarios de apertura del día, stock especial para picadas y entregas personalizadas, te respondemos al instante vía WhatsApp.
              </div>
            </div>

          </div>

          {/* Interactive Map Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-brand-warm-dark shadow-card overflow-hidden h-[420px] sm:h-[520px] flex flex-col">
              
              {/* Map Title Bar */}
              <div className="p-4 sm:p-5 border-b border-brand-warm-dark/80 bg-brand-warm flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-bordo">
                  <Compass className="w-4 h-4 text-brand-turquoise-dark" />
                  <span>San Carlos de Bariloche · Centro</span>
                </div>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-turquoise-dark hover:underline flex items-center gap-1"
                >
                  Abrir mapa completo
                  <Navigation className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="relative flex-1 w-full bg-brand-warm-dark">
                <iframe
                  title="Ubicación de Tentaciones en Av. Belgrano 69, Bariloche"
                  src="https://maps.google.com/maps?q=Tentaciones+Av.+Belgrano+69+San+Carlos+de+Bariloche&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Map footer helper */}
              <div className="p-3 bg-white text-center text-xs text-brand-muted border-t border-brand-warm-dark">
                Dirección exacta: <strong>{BUSINESS_INFO.address}</strong>, R8400 San Carlos de Bariloche.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
