export type ProductCategory = 'todos' | 'quesos' | 'fiambres' | 'ahumados' | 'bebidas';

export type ProductUnitType = 'feteado' | 'trozo' | 'unidad' | 'litro' | 'envasado';

export interface Product {
  id: string;
  name: string;
  category: 'quesos' | 'fiambres' | 'ahumados' | 'bebidas';
  price: number;
  presentation: string;
  unitType: ProductUnitType;
  image: string;
  badge?: string;
  description?: string;
  warningNotice?: string;
}

export interface CategoryOption {
  id: ProductCategory;
  label: string;
  countKey?: 'quesos' | 'fiambres' | 'ahumados' | 'bebidas';
}

export interface BusinessContactInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  province: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappUrl: string;
  uberEatsUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export interface SisterStore {
  name: string;
  subtitle: string;
  description?: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  uberEatsUrl?: string;
  googleMapsUrl?: string;
  googleReviewsUrl?: string;
  websiteUrl?: string;
  phoneDisplay?: string;
}
