import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Formatea un número en formato monetario argentino: "$ 12.000"
 */
export function formatCurrency(amount: number): string {
  const formattedNumber = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return `$ ${formattedNumber}`;
}

/**
 * Genera el enlace directo a WhatsApp con texto codificado correctamente
 */
export function buildWhatsAppUrl(message: string, phone: string = BUSINESS_INFO.whatsappNumber): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Mensaje predeterminado para consultas generales
 */
export function getGeneralWhatsAppUrl(): string {
  const text = '¡Hola! Estoy consultando por los productos de Tentaciones Bariloche. ¿Me pueden ayudar con un pedido?';
  return buildWhatsAppUrl(text);
}

/**
 * Mensaje específico para consultar por un producto del catálogo
 */
export function getProductWhatsAppUrl(productName: string, presentation: string, price: number): string {
  const formattedPrice = formatCurrency(price);
  const text = `¡Hola! Quisiera consultar por ${productName} (${presentation} - ${formattedPrice}) en Tentaciones. ¿Tienen disponibilidad?`;
  return buildWhatsAppUrl(text);
}
