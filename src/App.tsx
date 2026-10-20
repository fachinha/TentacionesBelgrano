import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { About } from './components/About';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-warm text-brand-dark selection:bg-brand-turquoise selection:text-brand-bordo font-sans">
      {/* Top Navbar */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Catalog />
        <About />
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloating />
    </div>
  );
};

export default App;
