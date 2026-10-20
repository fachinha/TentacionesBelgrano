import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { About } from './components/About';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PRODUCTS } from './data/products';
import type { Product } from './types';

const STORAGE_KEY = 'tentaciones_catalog_data_v2';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Limpiar datos legados de versiones anteriores para no arrastrar fotos erróneas
      localStorage.removeItem('tentaciones_catalog_data');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const badPatterns = [
            'photo-1568901346375-23c9450c58cd',
            'photo-1586190848861-99aa4a171e90',
            'photo-1555939594-58d7cb561ad1',
            'photo-1588195538326-c5b1e9f80a1b',
            'photo-1618160702438-9b02ab6515c9',
          ];
          const healed = parsed.map((p: Product) => {
            const hasBadImage = badPatterns.some(pattern => p.image && p.image.includes(pattern));
            if (hasBadImage) {
              const defaultProd = PRODUCTS.find(d => d.id === p.id);
              if (defaultProd) {
                return { ...p, image: defaultProd.image };
              }
            }
            return p;
          });
          return healed;
        }
      }
    } catch (e) {
      console.error('Error cargando catálogo desde localStorage', e);
    }
    return PRODUCTS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch (e) {
      console.error('Error guardando catálogo en localStorage', e);
    }
  };

  const handleResetProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error restableciendo catálogo', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-warm text-brand-dark selection:bg-brand-turquoise selection:text-brand-bordo font-sans">
      {/* Top Navbar */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Catalog products={products} />
        <About />
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloating />

      {/* Administration Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onResetProducts={handleResetProducts}
      />
    </div>
  );
};

export default App;

