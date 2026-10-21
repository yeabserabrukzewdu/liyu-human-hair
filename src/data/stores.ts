export interface StoreLocation {
  id: string;
  name: string;
  tagline: string;
  city: string;
  country: string;
  address: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  services: {
    title: string;
    description: string;
  }[];
  imageUrl: string;
  isFlagship: boolean;
  appointmentRequired: boolean;
  mapEmbedQuery: string;
  status: 'active' | 'coming_soon';
}

export const STORES: StoreLocation[] = [
  {
    id: 'addis-bole-brass',
    name: 'Addis Ababa Flagship Atelier',
    tagline: 'Main Luxury Boutique & Raw Hair Sensory Bar',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Bole Brass, past Yod Abyssinia, KKare Building',
    landmark: 'Bole Brass, past Yod Abyssinia, KKare Building',
    phone: '+251 911 234 567',
    whatsapp: '+251911234567',
    email: 'yeabserabruk1234@gmail.com',
    hours: {
      weekdays: '9:00 AM – 8:00 PM',
      saturday: '9:00 AM – 8:00 PM',
      sunday: '11:00 AM – 6:00 PM',
    },
    features: [
      'Touch & Feel 100% Real Hair Sensory Bar',
      'Full Stock of Double Donors (Brazil · 85–90%)',
      'Super Double Donors (Vietnam · 100% Equal Length)',
      '1 Piece Price Transparent Counter',
      'Complimentary Sidamo Specialty Espresso & Hospitality',
      'Same-Day Ready-to-Wear Bundles Pickup',
    ],
    services: [
      {
        title: 'Tactile Hair Inspection',
        description: 'Test the cuticles, weight, and bounce of our genuine Brazilian & Vietnamese bundles in person.',
      },
      {
        title: 'Custom Density & Length Consultation',
        description: 'Our certified master braiders match your head circumference with the exact bundle count needed.',
      },
      {
        title: 'Lace Matching & Sizing',
        description: 'HD lace and transparent Swiss lace skin-tone calibration with professional studio lighting.',
      },
    ],
    imageUrl: '/19.png',
    isFlagship: true,
    appointmentRequired: false,
    mapEmbedQuery: 'KKare+Building+Bole+Brass+Addis+Ababa',
    status: 'active',
  },
  {
    id: 'usa-washington-maryland',
    name: 'Washington DC & Maryland Atelier',
    tagline: 'United States Flagship Boutique & VIP Suite',
    city: 'Washington DC / Maryland',
    country: 'United States',
    address: 'Washington DC Metro Area, Maryland',
    landmark: 'Serving the Washington DC & Maryland (DMV) Metropolitan Area',
    phone: 'Coming Soon',
    whatsapp: '+251911234567',
    email: 'yeabserabruk1234@gmail.com',
    hours: {
      weekdays: 'Coming Soon',
      saturday: 'Coming Soon',
      sunday: 'Coming Soon',
    },
    features: [
      'United States East Coast Hub',
      'Express Domestic USA Shipping & Local Pickup',
      'Private 1-on-1 Consultation & Sensory Suite',
      'Full Collection of Brazilian & Vietnamese Donors',
      'Bespoke Bridal & Custom Unit Coordination',
      'VIP Concierge Service',
    ],
    services: [
      {
        title: 'Bespoke Consultations (Coming Soon)',
        description: 'Private 1-on-1 consultations for our upcoming United States atelier launch.',
      },
      {
        title: 'US Domestic Fast Dispatch',
        description: 'Direct courier delivery throughout Washington DC, Maryland, and across the USA upon launch.',
      },
      {
        title: 'Tactile Inspection Lounge',
        description: 'Feel the 85-90% and 100% equal length fullness before purchasing.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    isFlagship: false,
    appointmentRequired: true,
    mapEmbedQuery: 'Washington+DC+Maryland',
    status: 'coming_soon',
  },
];
