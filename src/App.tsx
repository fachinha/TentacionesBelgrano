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

const STORAGE_KEY = 'tentaciones_catalog_data';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
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

