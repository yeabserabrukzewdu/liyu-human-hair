export type HairColor =
  | 'Black'
  | 'Natural Black'
  | 'Coffee Brown'
  | 'Half Coffee Brown'
  | 'Highlight'
  | 'Piano'
  | 'Burgundy'
  | 'Ash Blonde'
  | 'Mushroom Blonde'
  | 'Blonde';

export type HairTexture =
  | 'Wave'
  | 'Pixie'
  | 'Fumi'
  | 'Deep Frizz'
  | 'Burmese'
  | 'Ocean Wave'
  | 'Raw Hair'
  | 'Body Wave'
  | 'Pixie Curl';

export type DonorCategory = 'Double Donor' | 'Super Double Donor';

export interface ProductVariant {
  id: string;
  color: HairColor;
  length: number; // in inches (e.g. 10, 12, 14, 16, 18, 20, 22, 24, 26, 28)
  price: number; // in USD for ONE bundle
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  catalogNumber: number; // 1 to 7 from user's specification
  category: HairTexture | string;
  shortDescription: string;
  description: string;
  basePrice: number;
  maxPrice: number;
  availableColors: (HairColor | string)[];
  availableLengths: number[];
  variants: ProductVariant[];
  images: string[];
  colorImages?: Record<string, string>;
  colorThumbnails?: Record<string, string>;
  bundleNotice?: string;
  features: string[];
  cuticleStatus: string;
  origin: string;
  donorType: string;
  donorCategory: DonorCategory;
  donorFullness: string;
  weightGrams: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFlashSale?: boolean;
  discountPercentage?: number;
  inStock?: boolean;
}

export type RequestType = 'order' | 'consultation' | 'custom_inquiry';
export type RequestStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';

export interface CustomerRequest {
  id: string;
  type: RequestType;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  title: string;
  details: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt?: string;
  totalAmount?: number;
  itemsSummary?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  storeLocation?: string;
  orderId?: string;
  adminNotes?: string;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
  showToggle: boolean;
  businessHours: string;
}

export interface CartItem {
  id: string; // unique item id (product id + variant id)
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface OrderCheckpoint {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  note?: string;
}

export type OrderProgressStage =
  | 'confirmed'
  | 'quality_check'
  | 'weft_prep'
  | 'dispatched'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface Order {
  id: string; // e.g. "LIYU-84920-EXP"
  trackingNumber: string; // e.g. "DHL-8201-9943"
  carrier: 'DHL Express Worldwide' | 'FedEx International Priority';
  createdAt: string;
  estimatedDelivery: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerNotes?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    productName: string;
    image: string;
    color: HairColor;
    length: number;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'stripe' | 'paypal' | 'apple_pay' | 'order_reservation';
  paymentStatus: 'paid' | 'pending' | 'reservation_confirmed';
  currentStage: OrderProgressStage;
  progressPercent: number;
  checkpoints: OrderCheckpoint[];
  lastUpdated: string;
}

export interface EmailRecord {
  id: string;
  recipientType: 'buyer' | 'owner';
  recipientEmail: string;
  recipientName: string;
  senderEmail: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  orderId?: string;
  requestId?: string;
  sentAt: string;
  status: 'sent' | 'delivered';
  customerContact?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  itemsSummary?: string;
  totalAmount?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'sale' | 'vip' | 'system';
  read: boolean;
  linkText?: string;
  actionType?: 'view_order' | 'view_sale' | 'view_product';
  orderId?: string;
  productId?: string;
}

export interface FilterState {
  searchQuery: string;
  textures: HairTexture[];
  colors: HairColor[];
  lengths: number[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
}

export interface BrowsingHistoryItem {
  productId: string;
  viewedAt: number;
  texture: HairTexture;
  preferredColor?: HairColor;
}
