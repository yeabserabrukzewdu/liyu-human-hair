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
}

export const STORES: StoreLocation[] = [
  {
    id: 'bole-flagship',
    name: 'Bole Flagship Atelier',
    tagline: 'Main Luxury Boutique & Raw Hair Sensory Bar',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Bole Medhanialem, Edna Mall Avenue, Boutique #104',
    landmark: 'Facing Bole Medhanialem Cathedral, Luxury District',
    phone: '+251 911 234 567',
    whatsapp: '+251911234567',
    email: 'bole@liyuhair.com',
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
      'Complimentary Sidamo Specialty Espresso Bar',
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
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    isFlagship: true,
    appointmentRequired: false,
    mapEmbedQuery: 'Bole+Medhanialem+Addis+Ababa',
  },
  {
    id: 'kazanchis-vip',
    name: 'Kazanchis VIP Fitting Suite',
    tagline: 'Private Bridal & Bespoke Custom Wig Lounge',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Kazanchis Luxury Business Towers, 4th Floor Private Suite 402',
    landmark: 'Behind InterLuxury Hotel, Diplomatic Zone',
    phone: '+251 922 889 900',
    whatsapp: '+251922889900',
    email: 'kazanchis@liyuhair.com',
    hours: {
      weekdays: '10:00 AM – 7:30 PM (By Appointment)',
      saturday: '10:00 AM – 7:30 PM (By Appointment)',
      sunday: 'Closed for Private VIP Bookings',
    },
    features: [
      'Private 1-on-1 Consultation Rooms',
      'Bridal & Wedding Hair Suite',
      'Custom Wig Construction & Fitting',
      'Dedicated Color Matching Specialist',
      'Champagne & Botanical Tea Hospitality',
      'Reserved Valet Parking for Guests',
    ],
    services: [
      {
        title: 'Bridal Party Hair Consultations',
        description: 'Full bridal group coordination with custom-measured Vietnamese Super Double Donor bundles.',
      },
      {
        title: 'Bespoke Wig Cap Customization',
        description: '3D head measurement for ultra-flat, invisible glueless wig unit assembly.',
      },
      {
        title: 'VIP Confidential Appointment',
        description: 'Complete privacy in our private suite with a dedicated hair master for celebrity and diplomatic clients.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    isFlagship: false,
    appointmentRequired: true,
    mapEmbedQuery: 'Kazanchis+Addis+Ababa',
  },
  {
    id: 'dubai-showroom',
    name: 'Dubai Luxury Showroom',
    tagline: 'International GCC Dispatch & Client Studio',
    city: 'Downtown Dubai',
    country: 'United Arab Emirates',
    address: 'Boulevard Plaza Tower 1, Level 14, Downtown Dubai',
    landmark: 'Directly Opposite Burj Khalifa, Sheikh Mohammed bin Rashid Blvd',
    phone: '+971 4 589 1234',
    whatsapp: '+971508924567',
    email: 'dubai@liyuhair.com',
    hours: {
      weekdays: '10:00 AM – 10:00 PM',
      saturday: '10:00 AM – 10:00 PM',
      sunday: '10:00 AM – 10:00 PM',
    },
    features: [
      'Middle East & International Express Hub',
      'Same-Day Courier across Dubai, Abu Dhabi & Sharjah',
      'Full Collection of 18" to 30" Long Lengths',
      'Multilingual Team (Amharic, English, Arabic)',
      'Wholesale Salon & Stylist Consultation Room',
      'Tax-Free Export Documentation Assistance',
    ],
    services: [
      {
        title: 'Salon Professional Wholesale Previews',
        description: 'Volume wholesale inspection for certified salon partners and international boutique owners.',
      },
      {
        title: 'Express GCC Same-Day Delivery',
        description: 'Place an order in our showroom and receive delivery to your hotel or residence within 4 hours.',
      },
      {
        title: 'Texture & Origin Masterclass',
        description: 'Guided comparison of 85–90% Brazilian Double Donors vs 100% Vietnamese Super Double Donors.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1200&q=80',
    isFlagship: false,
    appointmentRequired: false,
    mapEmbedQuery: 'Boulevard+Plaza+Tower+1+Downtown+Dubai',
  },
];
