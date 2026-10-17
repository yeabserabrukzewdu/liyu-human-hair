import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Coffee, 
  Scissors, 
  Car, 
  Send,
  X,
  Navigation
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORES, StoreLocation } from '../data/stores';

export const OurStoresPage: React.FC = () => {
  const { navigateToPage, selectedStoreId, setSelectedStoreId, addCustomerRequest } = useStore();

  const [activeStoreId, setActiveStoreId] = useState<string>(selectedStoreId || STORES[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
    if (storeId) {
      setActiveStoreId(storeId);
      setFormData((prev) => ({ ...prev, storeId }));
    }
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.date) {
      alert('Please fill in your name, contact phone, and desired appointment date.');
      return;
    }

    addCustomerRequest({
      type: 'consultation',
      customerName: formData.fullName,
      customerEmail: formData.email || undefined,
      customerPhone: formData.phone,
      title: `Consultation at ${selectedStore.name}`,
      details: `Service: ${formData.service}. Notes: ${formData.notes || 'None specified'}`,
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      storeLocation: `${selectedStore.name} (${selectedStore.city})`,
      status: 'confirmed',
      adminNotes: `Online boutique reservation. Service: ${formData.service}`,
    });

    setBookingSuccess(true);
    setTimeout(() => {
      // auto close modal after 3 seconds or allow user to dismiss
    }, 3000);
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
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7E8B75] font-semibold block mb-3">
                Atelier Boutiques & Lounges
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1B2017] tracking-tight leading-tight">
                Our Stores & Lounges
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#56624F] font-light leading-relaxed">
                Step into our sensory salons to touch, feel, and inspect our genuine Brazilian Double Donors (85%–90%) and Vietnamese Super Double Donors (100% equal length). Experience personal hair consultation, transparent 1 piece prices, and bespoke wig fittings.
              </p>
            </div>

            {/* Quick Action Button */}
            <div>
              <button
                onClick={() => handleOpenBooking(activeStoreId)}
                className="px-7 py-3.5 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.22em] font-medium transition-all cursor-pointer flex items-center gap-2.5"
              >
                <Calendar className="w-4 h-4 text-[#95B373]" />
                <span>Book In-Store Consultation</span>
              </button>
            </div>
          </div>

          {/* Store Selector - Architectural & Refined */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-[#E2DAD0]">
            {STORES.map((store) => (
              <button
                key={store.id}
                onClick={() => {
                  setActiveStoreId(store.id);
                  setSelectedStoreId(store.id);
                }}
                className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  activeStoreId === store.id
                    ? 'border-[#1B2017] bg-[#1B2017] text-white shadow-xs'
                    : 'border-[#DDD5C7] bg-white text-[#2C3823] hover:bg-[#F3ECE0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] uppercase font-mono tracking-wider ${activeStoreId === store.id ? 'text-[#C9D6BD]' : 'text-[#7D8A75]'}`}>
                      {store.city} · {store.country}
                    </span>
                    {store.isFlagship && (
                      <span className={`text-[9px] uppercase tracking-wider font-mono ${activeStoreId === store.id ? 'text-[#95B373]' : 'text-[#7D8A75]'}`}>
                        Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold leading-tight">
                    {store.name}
                  </h3>
                </div>
                <span className={`text-[11px] mt-2 block font-light ${activeStoreId === store.id ? 'text-[#D7E0CF]' : 'text-[#6C7866]'}`}>
                  {store.address.slice(0, 42)}...
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Store Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Visual Gallery & Interactive Booking */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Store Image Banner */}
            <div className="relative aspect-16/10 overflow-hidden border border-[#DDD5C7] shadow-sm bg-[#EAE2D5]">
              <img
                src={selectedStore.imageUrl}
                alt={selectedStore.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-7 text-white">
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
            <div className="bg-white border border-[#DDD5C7] p-7 shadow-xs">
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
                  Location Information
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1B2017]">
                  {selectedStore.name}
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs text-[#44503C]">
                <MapPin className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1B2017] font-semibold">{selectedStore.address}</strong>
                  <span className="text-[#64715E]">{selectedStore.landmark}</span>
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
                  <span>Schedule Consultation Here</span>
                </button>
              </div>
            </div>

            {/* Directions & Map Preview Box */}
            <div className="bg-white border border-[#DDD5C7] rounded-xs p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-semibold text-[#1B2017]">
                  Navigation & Parking
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
                Complimentary parking is available directly at the boutique entrance. Our concierge will welcome you upon arrival with warm towel service and Ethiopian specialty coffee.
              </p>
            </div>
          </div>
        </div>

        {/* All Stores Comparison Grid at bottom */}
        <section className="mt-16 pt-12 border-t border-[#E8E2D5]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#95B373] block mb-1">
              Global Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017]">
              Visit Any of Our Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORES.map((store) => (
              <div
                key={store.id}
                className="bg-white border border-[#DDD5C7] rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-16/9 bg-[#FAF7F2] overflow-hidden">
                    <img
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
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
                    View Details & Services
                  </button>
                </div>
              </div>
            ))}
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
                  Consultation Confirmed
                </h3>
                <p className="text-xs text-[#56634E] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your consultation at <strong>{selectedStore.name}</strong> has been scheduled for <strong>{formData.date} at {formData.time}</strong>.
                </p>
                <div className="p-4 bg-white border border-[#DDD5C7] rounded-xs text-xs text-[#2A3721] text-left space-y-1">
                  <div><strong>Location:</strong> {selectedStore.address}</div>
                  <div><strong>Service:</strong> {formData.service}</div>
                  <div><strong>Phone:</strong> {selectedStore.phone}</div>
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

                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  {/* Store select */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                      Choose Store Location
                    </label>
                    <select
                      value={formData.storeId}
                      onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                      className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                    >
                      {STORES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service select */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                      Consultation Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs text-[#1B2017]"
                    >
                      <option value="Tactile Hair Inspection & Sensory Bar">
                        Tactile Hair Inspection & Sensory Bar
                      </option>
                      <option value="Double Donor vs Super Double Donor Comparison">
                        Double Donor vs Super Double Donor Comparison
                      </option>
                      <option value="Custom Wig Cap Fitting & Measurement">
                        Custom Wig Cap Fitting & Measurement
                      </option>
                      <option value="Bridal VIP Party Consultation">
                        Bridal VIP Party Consultation
                      </option>
                    </select>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2 rounded-xs text-xs text-[#1B2017]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2 rounded-xs text-xs text-[#1B2017]"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sara Haile"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2 rounded-xs text-xs text-[#1B2017]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+251 911 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#D5CDBD] p-2 rounded-xs text-xs text-[#1B2017]"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#44503D] mb-1">
                      Special Requests / Textures of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Interested in 24 inch Burmese & Vietnamese Ocean Wave"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white border border-[#D5CDBD] p-2 rounded-xs text-xs text-[#1B2017]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#1B2017] hover:bg-[#2F3A27] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-all cursor-pointer shadow-xs"
                    >
                      Confirm Appointment Request
                    </button>
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
