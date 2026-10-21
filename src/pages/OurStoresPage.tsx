import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Coffee, 
  Scissors, 
  Car, 
  Send,
  X,
  Navigation,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORES, StoreLocation } from '../data/stores';

export const OurStoresPage: React.FC = () => {
  const { navigateToPage, selectedStoreId, setSelectedStoreId, addCustomerRequest, ownerEmail, ownerPhone } = useStore();

  const [activeStoreId, setActiveStoreId] = useState<string>(selectedStoreId || STORES[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    storeId: activeStoreId,
    service: 'Tactile Hair Inspection & Sensory Bar',
    date: '',
    time: '11:00 AM',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const selectedStore = STORES.find((s) => s.id === activeStoreId) || STORES[0];

  const handleOpenBooking = (storeId?: string) => {
    const targetStoreId = storeId || activeStoreId;
    setActiveStoreId(targetStoreId);
    setFormData((prev) => ({ ...prev, storeId: targetStoreId }));
    setFormError(null);
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.date) {
      setFormError('Please fill in your full name, contact phone number, and desired appointment date.');
      return;
    }
    setFormError(null);

    const targetStore = STORES.find((s) => s.id === formData.storeId) || selectedStore;

    addCustomerRequest({
      type: 'consultation',
      customerName: formData.fullName.trim(),
      customerEmail: formData.email.trim() || undefined,
      customerPhone: formData.phone.trim(),
      title: `Consultation at ${targetStore.name}`,
      details: `Service: ${formData.service}. Notes: ${formData.notes.trim() || 'None specified'}`,
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      storeLocation: `${targetStore.name} (${targetStore.city})`,
      status: 'confirmed',
      adminNotes: `Online boutique reservation. Service: ${formData.service}`,
    });

    setBookingSuccess(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] min-h-screen text-[#1B2017]">
      {/* Top Editorial Header */}
      <section className="border-b border-[#E8E2D5] bg-[#F4EFE6]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#697462] mb-6">
            <button 
              onClick={() => navigateToPage('home')}
              className="hover:text-[#1B2017] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-[#BDB4A4]">/</span>
            <span className="text-[#1B2017] font-semibold">Our Stores</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#95B373]/15 border border-[#95B373]/30 rounded-xs mb-3">
                <span className="w-2 h-2 rounded-full bg-[#95B373] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B3E1F] font-bold">
                  Boutique Location: Addis Ababa · Coming Soon: Washington DC / Maryland (USA)
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1B2017] tracking-tight leading-tight">
                Our Atelier Boutiques & Lounges
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#56624F] font-light leading-relaxed">
                Step into our flagship salon around <strong>Addis Ababa, Bole Brass, past Yod Abyssinia (KKare Building)</strong> to touch, feel, and inspect our genuine Brazilian Double Donors (85%–90%) and Vietnamese Super Double Donors (100% equal length). We are also expanding to America with our upcoming Washington DC / Maryland atelier!
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleOpenBooking('addis-bole-brass')}
                className="px-7 py-3.5 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.22em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2.5 rounded-xs shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#95B373]" />
                <span>Book In-Store Consultation</span>
              </button>
            </div>
          </div>

          {/* Store Selector - 2 Refined Cards (Active vs Coming Soon) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E2DAD0]">
            {STORES.map((store) => {
              const isActive = activeStoreId === store.id;
              const isComingSoon = store.status === 'coming_soon';

              return (
                <button
                  key={store.id}
                  onClick={() => {
                    setActiveStoreId(store.id);
                    setSelectedStoreId(store.id);
                  }}
                  className={`p-5 text-left border-2 transition-all cursor-pointer flex flex-col justify-between rounded-xs ${
                    isActive
                      ? 'border-[#1B2017] bg-[#1B2017] text-white shadow-md'
                      : 'border-[#DDD5C7] bg-white text-[#2C3823] hover:border-[#95B373]/70 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold ${isActive ? 'text-[#C9D6BD]' : 'text-[#7D8A75]'}`}>
                        {store.city} · {store.country}
                      </span>
                      {isComingSoon ? (
                        <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] uppercase tracking-widest font-bold rounded-xs">
                          Coming Soon in USA
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-[#95B373] text-white text-[9px] uppercase tracking-widest font-bold rounded-xs">
                          Open Now · Flagship
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight mb-1">
                      {store.name}
                    </h3>
                    <p className={`text-xs ${isActive ? 'text-[#D7E0CF]' : 'text-[#5C6955]'}`}>
                      {store.address}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-current/15 flex items-center justify-between text-[11px]">
                    <span className={`font-mono ${isActive ? 'text-[#95B373]' : 'text-[#72806A]'}`}>
                      {isComingSoon ? '🇺🇸 Washington DC / Maryland' : '🇪🇹 Bole Brass, KKare Building'}
                    </span>
                    <span className="underline font-semibold">
                      {isActive ? 'Currently Viewing' : 'View Details →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Store Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {selectedStore.status === 'coming_soon' ? (
          /* ==================================================== */
          /* COMING SOON SHOWCASE (WASHINGTON DC / MARYLAND, USA) */
          /* ==================================================== */
          <div className="space-y-8">
            {/* Elegant Banner */}
            <div className="bg-gradient-to-br from-[#1B2017] via-[#2A3721] to-[#1B2017] text-white border border-[#48593C] p-8 sm:p-12 rounded-xs shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#95B373]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xs text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>America Expansion — Coming Soon</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  Washington DC & Maryland Atelier
                </h2>

                <p className="text-sm sm:text-base text-[#DCE6D2] font-light leading-relaxed">
                  We are excited to announce our upcoming atelier in America, located in the <strong>Washington DC area around Maryland</strong>! Soon, clients across the United States will be able to touch and inspect our authentic 100% human hair collections in person, receive custom bridal consultations, and enjoy rapid domestic USA shipping.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${ownerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      'Hello LIYU Atelier! I would like to inquire about your upcoming Washington DC / Maryland boutique launch and order delivery in the USA.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold rounded-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveStoreId('addis-bole-brass');
                      setSelectedStoreId('addis-bole-brass');
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs uppercase tracking-widest font-bold rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#95B373]" />
                    <span>View Active Addis Ababa Location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* What to Expect Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#DDD5C7] p-6 rounded-xs shadow-xs space-y-2.5">
                <div className="w-9 h-9 rounded-full bg-[#95B373]/15 border border-[#95B373]/30 text-[#2B3E1F] flex items-center justify-center font-serif font-bold text-sm">
                  01
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2017]">
                  Fast Domestic USA Dispatch
                </h4>
                <p className="text-xs text-[#5C6954] leading-relaxed">
                  Upon opening, all US clients will enjoy express nationwide delivery within 1-2 business days, plus local collection in Washington DC and Maryland.
                </p>
              </div>

              <div className="bg-white border border-[#DDD5C7] p-6 rounded-xs shadow-xs space-y-2.5">
                <div className="w-9 h-9 rounded-full bg-[#95B373]/15 border border-[#95B373]/30 text-[#2B3E1F] flex items-center justify-center font-serif font-bold text-sm">
                  02
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2017]">
                  Tactile Sensory Lounge
                </h4>
                <p className="text-xs text-[#5C6954] leading-relaxed">
                  Touch and compare genuine Brazilian Double Donors (85%–90% equal length) and Vietnamese Super Double Donors (100% equal length) in person.
                </p>
              </div>

              <div className="bg-white border border-[#DDD5C7] p-6 rounded-xs shadow-xs space-y-2.5">
                <div className="w-9 h-9 rounded-full bg-[#95B373]/15 border border-[#95B373]/30 text-[#2B3E1F] flex items-center justify-center font-serif font-bold text-sm">
                  03
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2017]">
                  Worldwide Shipping Today
                </h4>
                <p className="text-xs text-[#5C6954] leading-relaxed">
                  You don't have to wait for the US launch! All products on our online store can be ordered right now with DHL Express Worldwide delivery directly to your door.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* ACTIVE BOUTIQUE: ADDIS ABABA (BOLE BRASS, KKARE)     */
          /* ==================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Visual Gallery & Interactive Booking */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Store Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden border border-[#DDD5C7] shadow-sm bg-[#EAE2D5] rounded-xs">
                <img
                  src={selectedStore.imageUrl}
                  alt={selectedStore.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-7 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D0DEB5] font-semibold mb-1">
                    {selectedStore.city} • {selectedStore.country}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                    {selectedStore.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#F1EFEA] font-light max-w-xl">
                    {selectedStore.tagline}
                  </p>
                </div>
              </div>

              {/* In-Store Client Services */}
              <div className="bg-white border border-[#DDD5C7] p-7 shadow-xs rounded-xs">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7E8B75] font-semibold block mb-2">
                  Boutique Services
                </span>
                <h3 className="font-serif text-2xl text-[#1B2017] mb-6">
                  Signature Atelier Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#ECE5D9]">
                  {selectedStore.services.map((service, idx) => (
                    <div key={idx} className={`${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''} space-y-2`}>
                      <span className="text-xs font-mono text-[#8C9885] font-bold block">
                        0{idx + 1}.
                      </span>
                      <h4 className="font-serif text-base font-semibold text-[#1B2017]">
                        {service.title}
                      </h4>
                      <p className="text-xs text-[#5D6B56] font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutique Amenities */}
              <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 shadow-xs">
                <h3 className="font-serif text-xl text-[#1B2017] mb-4">
                  Boutique Amenities & Hospitality
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedStore.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#38462E]">
                      <CheckCircle2 className="w-4 h-4 text-[#95B373] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Store Details, Hours, Maps, & Consultation Booking */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contact & Working Hours Card */}
              <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 shadow-xs space-y-5">
                <div className="border-b border-[#EAE3D6] pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#95B373] block mb-1">
                    Boutique Location
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1B2017]">
                    {selectedStore.name}
                  </h3>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 text-xs text-[#44503C]">
                  <MapPin className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2017] font-semibold text-sm">
                      {selectedStore.address}
                    </strong>
                    <span className="text-[#64715E] block mt-0.5">
                      Landmark: {selectedStore.landmark}
                    </span>
                    <span className="text-[#95B373] font-medium block mt-0.5">
                      Addis Ababa, Ethiopia
                    </span>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-3 text-xs text-[#44503C]">
                  <Phone className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2017] font-semibold">Telephone & Concierge:</strong>
                    <a href={`tel:${selectedStore.phone}`} className="hover:underline text-[#293620] font-medium">
                      {selectedStore.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp direct link */}
                <div className="flex items-start gap-3 text-xs text-[#44503C]">
                  <MessageSquare className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2017] font-semibold">WhatsApp Concierge:</strong>
                    <a 
                      href={`https://wa.me/${selectedStore.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#2C411D] font-bold hover:underline"
                    >
                      Chat directly with boutique manager
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3 text-xs text-[#44503C] border-t border-[#EAE3D6] pt-4">
                  <Clock className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <strong className="block text-[#1B2017] font-semibold mb-2">Operating Hours:</strong>
                    <div className="space-y-1.5 text-xs text-[#5D6955]">
                      <div className="flex justify-between">
                        <span>Monday – Friday:</span>
                        <span className="font-medium text-[#1B2017]">{selectedStore.hours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium text-[#1B2017]">{selectedStore.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium text-[#1B2017]">{selectedStore.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenBooking(selectedStore.id)}
                    className="w-full py-3.5 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#95B373]" />
                    <span>Schedule In-Store Consultation</span>
                  </button>
                </div>
              </div>

              {/* Directions & Map Preview Box */}
              <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-semibold text-[#1B2017]">
                    Navigation & Directions
                  </h4>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.mapEmbedQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#95B373] font-bold hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
                <p className="text-xs text-[#5C6A54] leading-relaxed">
                  Located in Bole Brass, past Yod Abyssinia at the KKare Building. Complimentary parking is available directly at the boutique entrance. Our concierge will welcome you upon arrival with warm towel service and Ethiopian specialty coffee.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Stores Comparison Grid at bottom */}
        <section className="mt-16 pt-12 border-t border-[#E8E2D5]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#95B373] block mb-1">
              Atelier Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017]">
              Our Current & Upcoming Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {STORES.map((store) => {
              const isComingSoon = store.status === 'coming_soon';

              return (
                <div
                  key={store.id}
                  className={`bg-white border-2 rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow ${
                    isComingSoon ? 'border-dashed border-amber-300 bg-[#FFFDF8]' : 'border-[#95B373]'
                  }`}
                >
                  <div>
                    <div className="aspect-16/9 bg-[#FAF7F2] overflow-hidden relative">
                      <img
                        src={store.imageUrl}
                        alt={store.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        {isComingSoon ? (
                          <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] uppercase tracking-widest font-bold rounded-xs shadow-xs">
                            Coming Soon in USA
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-[#95B373] text-white text-[10px] uppercase tracking-widest font-bold rounded-xs shadow-xs">
                            Open Now · Flagship
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#95B373] block mb-1">
                        {store.city} · {store.country}
                      </span>
                      <h3 className="font-serif text-lg text-[#1B2017] mb-2 font-bold">
                        {store.name}
                      </h3>
                      <p className="text-xs text-[#5D6B56] mb-4">
                        {store.address}
                      </p>
                      <div className="text-xs text-[#39472E] font-medium space-y-1">
                        <div>Phone: {store.phone}</div>
                        <div>Hours: {store.hours.weekdays}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => {
                        setActiveStoreId(store.id);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#DDD5C7] text-[#1B2017] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
                    >
                      {isComingSoon ? 'Learn More About US Launch' : 'View Details & Services'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Booking Appointment Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#56644E] hover:text-[#1B2017] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-[#95B373] rounded-full mx-auto flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1B2017]">
                  Consultation Request Received
                </h3>
                <p className="text-xs text-[#56634E] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your consultation at <strong>{selectedStore.name}</strong> has been logged for <strong>{formData.date} at {formData.time}</strong>.
                </p>
                <div className="p-4 bg-white border border-[#DDD5C7] rounded-xs text-xs text-[#2A3721] text-left space-y-1">
                  <div><strong>Location:</strong> {selectedStore.address}</div>
                  <div><strong>Service:</strong> {formData.service}</div>
                  <div><strong>Telephone:</strong> {selectedStore.phone}</div>
                </div>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="px-6 py-2.5 bg-[#1B2017] text-white text-xs uppercase tracking-[0.2em] rounded-xs cursor-pointer font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#95B373] block mb-1">
                  Private Boutique Service
                </span>
                <h3 className="font-serif text-2xl text-[#1B2017] mb-2">
                  Book In-Store Consultation
                </h3>
                <p className="text-xs text-[#5B6753] mb-6">
                  Experience our 100% human hair textures with a certified atelier specialist.
                </p>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xs flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  {/* Store select */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                      Boutique Location
                    </label>
                    <select
                      value={formData.storeId}
                      onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                      className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                    >
                      {STORES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.city}) {s.status === 'coming_soon' ? '— Coming Soon' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service type */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                      Desired Atelier Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                    >
                      <option value="Tactile Hair Inspection & Sensory Bar">Tactile Hair Inspection & Sensory Bar</option>
                      <option value="Custom Density & Length Consultation">Custom Density & Length Consultation</option>
                      <option value="Lace Matching & Sizing (HD / Swiss)">Lace Matching & Sizing (HD / Swiss)</option>
                      <option value="Bridal Suite Hair Consultation">Bridal Suite Hair Consultation</option>
                      <option value="Salon & Stylist Volume Sourcing">Salon & Stylist Volume Sourcing</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Preferred Time *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sara Haile"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          placeholder="+251 911 ..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Special Requests or Textures to Prepare
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Interested in 24 inch Burmese & Vietnamese Ocean Wave"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Appointment Request</span>
                    </button>
                    <p className="text-[10px] text-center text-[#7A8772] mt-2">
                      Our concierge team will verify availability on WhatsApp or telephone shortly.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
