import React, { useState, useId, useRef, useEffect } from 'react';
import type { Product, ProductUnitType } from '../types';

async function computeSha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function formatCountdown(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Download,
  Copy,
  Upload,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (updatedProducts: Product[]) => void;
  onResetProducts: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  onResetProducts,
}) => {
  const pinInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security Gate State
  const ADMIN_TARGET_HASH = '329b4995cf805dd0567b922ea7b19b92dfb7a44be13651671c497ca3f6eb18b0'; // GusYLucas2026!
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_MS = 10 * 60 * 1000;
  const ATTEMPTS_KEY = 'tentaciones_admin_attempts';
  const LOCKOUT_KEY = 'tentaciones_admin_locked_until';

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const checkLockout = () => {
      const lockedUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) || '0', 10);
      const diff = lockedUntil - Date.now();
      if (diff > 0) {
        setIsLocked(true);
        setRemainingTime(diff);
      } else {
        setIsLocked(false);
        setRemainingTime(0);
        if (lockedUntil > 0) {
          localStorage.removeItem(ATTEMPTS_KEY);
          localStorage.removeItem(LOCKOUT_KEY);
        }
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    const trimmed = pin.trim();
    if (!trimmed) {
      setErrorMessage('Por favor ingresá la contraseña.');
      return;
    }

    try {
      const hash = await computeSha256(trimmed);
      if (hash === ADMIN_TARGET_HASH) {
        setIsAuthenticated(true);
        setErrorMessage(null);
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
      } else {
        const attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) || '0', 10) + 1;
        localStorage.setItem(ATTEMPTS_KEY, attempts.toString());
        setPin('');

        if (attempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_MS;
          localStorage.setItem(LOCKOUT_KEY, lockUntil.toString());
          setIsLocked(true);
          setRemainingTime(LOCKOUT_MS);
          setErrorMessage(null);
        } else {
          const left = MAX_ATTEMPTS - attempts;
          setErrorMessage(`Contraseña incorrecta. Te queda${left === 1 ? ' 1 intento.' : `n ${left} intentos.`}`);
        }
      }
    } catch (err) {
      setErrorMessage('Error al verificar la contraseña.');
    }
  };

  // Active Tab: 'edit' | 'add' | 'settings'
  const [activeTab, setActiveTab] = useState<'edit' | 'add' | 'settings'>('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Form state for adding new product
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'quesos',
    price: 3500,
    presentation: 'por 100 g, feteado',
    unitType: 'feteado',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    badge: 'Novedad',
    description: 'Queso artesanal con excelente textura y sabor patagónico.',
    warningNotice: '',
  });

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          price: Math.max(0, newPrice),
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    showNotification('Precio actualizado con éxito');
  };

  const handlePresentationChange = (id: string, newPresentation: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          presentation: newPresentation,
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    showNotification('Presentación actualizada');
  };

  const handleImageChange = (id: string, newImageUrl: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          image: newImageUrl.trim(),
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    showNotification('Foto actualizada');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseás eliminar "${name}" del catálogo?`)) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      showNotification(`"${name}" eliminado`);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name?.trim()) {
      alert('Por favor completá el nombre del producto.');
      return;
    }

    const priceNum = Number(newProduct.price) || 0;
    const productToAdd: Product = {
      id: `custom-${Date.now()}`,
      name: newProduct.name.trim(),
      category: (newProduct.category as Product['category']) || 'quesos',
      price: priceNum,
      presentation: newProduct.presentation?.trim() || 'por 100 g',
      unitType: (newProduct.unitType as ProductUnitType) || 'feteado',
      image:
        newProduct.image?.trim() ||
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
      badge: newProduct.badge?.trim() || undefined,
      description: newProduct.description?.trim() || undefined,
      warningNotice: newProduct.warningNotice?.trim() || undefined,
    };

    const updated = [productToAdd, ...products];
    onUpdateProducts(updated);
    showNotification(`¡"${productToAdd.name}" agregado con éxito!`);
    setActiveTab('edit');

    // Reset form
    setNewProduct({
      name: '',
      category: 'quesos',
      price: 3500,
      presentation: 'por 100 g, feteado',
      unitType: 'feteado',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
      badge: 'Novedad',
      description: '',
      warningNotice: '',
    });
  };

  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tentaciones_catalogo_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Archivo de respaldo descargado');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].name) {
          onUpdateProducts(parsed);
          showNotification(`Catálogo restaurado: ${parsed.length} productos cargados`);
        } else {
          alert('El archivo no tiene el formato de catálogo esperado.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredLocalProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.presentation.toLowerCase().includes(q) ||
      (p.badge?.toLowerCase().includes(q) ?? false) ||
      (p.description?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#03201C]/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl bg-[#03332D] border border-brand-cream/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 text-white font-sans">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#09665C] border-b border-brand-cream/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-cream/20 border border-brand-cream/40 flex items-center justify-center text-brand-cream">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white">
                Panel de Administración
              </h3>
              <p className="text-[11px] text-brand-cream/90 font-medium">
                Gestión de catálogo, precios y fotos • Tentaciones Bariloche
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-brand-cream text-[#03332D] text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 animate-fade-in shadow-inner">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* PIN Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-[#054840] border border-brand-cream/40 flex items-center justify-center mb-6 shadow-xl">
              <Lock className="w-8 h-8 text-brand-cream" />
            </div>

            <h4 className="font-serif text-2xl font-bold text-white mb-2">
              Acceso Exclusivo Administración
            </h4>
            <p className="text-sm text-brand-warm/80 mb-6 leading-relaxed">
              Ingresá el PIN de seguridad para modificar precios, presentaciones, cambiar fotos o dar de alta nuevos productos.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <label htmlFor={pinInputId} className="sr-only">
                  Contraseña de seguridad
                </label>
                <input
                  id={pinInputId}
                  type="password"
                  maxLength={32}
                  disabled={isLocked}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Ingresá la contraseña"
                  className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 bg-[#02241F] border border-brand-cream/40 rounded-xl focus:outline-none focus:border-brand-cream text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  autoFocus
                />
              </div>

              {isLocked ? (
                <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-center text-xs text-rose-200">
                  <p className="font-semibold mb-1">⚠️ Acceso bloqueado por seguridad</p>
                  <p>Superaste los {MAX_ATTEMPTS} intentos. Podrás reintentar en: <strong>{formatCountdown(remainingTime)}</strong></p>
                </div>
              ) : (
                errorMessage && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </div>
                )
              )}

              <button
                type="submit"
                disabled={isLocked}
                className="w-full py-3 rounded-xl bg-brand-cream hover:bg-brand-cream-light text-[#03332D] font-bold text-sm uppercase tracking-wider transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tabs Bar */}
            <div className="px-6 py-2.5 bg-[#02241F] border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-brand-cream text-[#03332D]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Modificar Precios y Fotos ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeTab === 'add'
                      ? 'bg-brand-cream text-[#03332D]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Producto</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-brand-cream text-[#03332D]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Ajustes &amp; Respaldo
                </button>
              </div>

              <div className="text-xs text-brand-cream flex items-center gap-2 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">Cambios en vivo (localStorage)</span>
              </div>
            </div>

            {/* Tab 1: Edit Prices & Photos */}
            {activeTab === 'edit' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Search in admin */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar producto por nombre, categoría o presentación para editar..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#02241F] border border-brand-cream/30 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-cream"
                  />
                </div>

                <div className="space-y-3">
                  {filteredLocalProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-xl bg-[#054840] border border-brand-cream/20 hover:border-brand-cream/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Product Info & Preview */}
                      <div className="flex items-center gap-3.5 min-w-[240px]">
                        <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#02241F] border border-brand-cream/30 flex-shrink-0 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-brand-cream font-bold bg-[#03332D] px-2 py-0.5 rounded">
                              {product.category}
                            </span>
                            {product.badge && (
                              <span className="text-[10px] bg-brand-cream text-[#03332D] font-bold px-1.5 py-0.5 rounded">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-base text-white font-bold leading-tight mt-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-white/70">
                            {product.presentation}
                          </p>
                        </div>
                      </div>

                      {/* Edit Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-2xl">
                        {/* Price Input */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-brand-cream/80 mb-1 font-semibold">
                            Precio ARS ($)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brand-cream font-bold">
                              $
                            </span>
                            <input
                              type="number"
                              defaultValue={product.price || 0}
                              onBlur={(e) => handlePriceChange(product.id, Number(e.target.value))}
                              className="w-full pl-7 pr-3 py-1.5 bg-[#02241F] border border-white/20 rounded-lg text-sm font-semibold text-white focus:border-brand-cream focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Presentation Input */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-brand-cream/80 mb-1 font-semibold">
                            Presentación
                          </label>
                          <input
                            type="text"
                            defaultValue={product.presentation}
                            onBlur={(e) => handlePresentationChange(product.id, e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#02241F] border border-white/20 rounded-lg text-xs font-medium text-white focus:border-brand-cream focus:outline-none"
                            title={product.presentation}
                          />
                        </div>

                        {/* Image URL Input */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-brand-cream/80 mb-1 font-semibold">
                            URL de la Foto
                          </label>
                          <div className="relative">
                            <ImageIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            <input
                              type="text"
                              defaultValue={product.image}
                              onBlur={(e) => handleImageChange(product.id, e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 bg-[#02241F] border border-white/20 rounded-lg text-xs text-white focus:border-brand-cream focus:outline-none truncate"
                              title={product.image}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Delete Action */}
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-2 rounded-lg text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 transition-colors"
                          title="Eliminar producto del catálogo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredLocalProducts.length === 0 && (
                    <div className="text-center py-12 text-white/60 text-sm">
                      No se encontraron productos que coincidan con la búsqueda.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Add New Product Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddProductSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Queso Gouda Estacionado"
                      value={newProduct.name || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Categoría *
                    </label>
                    <select
                      value={newProduct.category || 'quesos'}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    >
                      <option value="quesos">Quesos</option>
                      <option value="fiambres">Fiambres</option>
                      <option value="ahumados">Ahumados</option>
                      <option value="bebidas">Bebidas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Precio ($ ARS) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Ej: 3500"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Presentación *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: por 100 g, feteado / por unidad"
                      value={newProduct.presentation || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, presentation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Tipo de Unidad
                    </label>
                    <select
                      value={newProduct.unitType || 'feteado'}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, unitType: e.target.value as ProductUnitType })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    >
                      <option value="feteado">Feteado</option>
                      <option value="trozo">Trozo</option>
                      <option value="unidad">Unidad</option>
                      <option value="litro">Litro</option>
                      <option value="envasado">Envasado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Insignia / Badge (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Novedad, Gourmet, Premium"
                      value={newProduct.badge || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image URL & Preview */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                    URL de la Foto
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... o enlace de foto"
                      value={newProduct.image || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#02241F] border border-white/20 rounded-xl text-sm text-white focus:border-brand-cream focus:outline-none"
                    />
                    {newProduct.image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-brand-cream/40 flex-shrink-0 bg-[#02241F]">
                        <img
                          src={newProduct.image}
                          alt="Previsualización"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description & Warning */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Descripción del Producto
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Breve reseña del sabor, estacionamiento, textura o maridaje sugerido..."
                      value={newProduct.description || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#02241F] border border-white/20 rounded-xl text-xs text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-cream mb-1 font-bold">
                      Aviso Especial (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Solo disponible por horma entera o fracción de 500 g"
                      value={newProduct.warningNotice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, warningNotice: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#02241F] border border-white/20 rounded-xl text-xs text-white focus:border-brand-cream focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit')}
                    className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-cream hover:bg-brand-cream-light text-[#03332D] text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
                  >
                    Guardar y Agregar al Catálogo
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: Settings & Backup */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Reset to Factory Defaults */}
                <div className="p-5 rounded-xl bg-[#054840] border border-brand-cream/20">
                  <h4 className="font-serif text-lg text-white font-bold mb-1">
                    Restablecer Catálogo Original
                  </h4>
                  <p className="text-xs text-brand-warm/80 mb-4 leading-relaxed">
                    Si deseás volver al estado inicial con todos los 29 productos oficiales de muestra (quesos, fiambres, trucha y bebidas de Bariloche), podés reiniciar el catálogo con este botón.
                  </p>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          '¿Confirmás restablecer todo el catálogo a los valores iniciales oficiales? Se descartarán las modificaciones locales.'
                        )
                      ) {
                        onResetProducts();
                        showNotification('Catálogo restablecido al original');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-400/50 text-rose-300 hover:bg-rose-950/40 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restablecer a valores de fábrica</span>
                  </button>
                </div>

                {/* Backup & Export */}
                <div className="p-5 rounded-xl bg-[#054840] border border-brand-cream/20">
                  <h4 className="font-serif text-lg text-white font-bold mb-1">
                    Respaldo y Descarga de Datos (JSON)
                  </h4>
                  <p className="text-xs text-brand-warm/80 mb-4 leading-relaxed">
                    Guardá un respaldo del catálogo actual como archivo JSON en tu computadora o copialo al portapapeles para transferirlo.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleDownloadBackup}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cream hover:bg-brand-cream-light text-[#03332D] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar Archivo JSON</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(products, null, 2));
                        showNotification('JSON copiado al portapapeles');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar al Portapapeles</span>
                    </button>
                  </div>
                </div>

                {/* Import & Restore */}
                <div className="p-5 rounded-xl bg-[#054840] border border-brand-cream/20">
                  <h4 className="font-serif text-lg text-white font-bold mb-1">
                    Restaurar desde Respaldo (Importar JSON)
                  </h4>
                  <p className="text-xs text-brand-warm/80 mb-4 leading-relaxed">
                    Seleccioná un archivo de respaldo previamente descargado para cargar de inmediato los productos y precios guardados.
                  </p>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json,application/json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-cream/40 hover:bg-white/10 text-brand-cream text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Cargar Archivo JSON</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
