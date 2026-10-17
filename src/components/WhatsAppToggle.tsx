import React, { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppToggle: React.FC = () => {
  const { whatsappConfig } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  if (!whatsappConfig.showToggle) {
    return null;
  }

  // Clean phone number (strip spaces, dashes, parentheses)
  const rawPhone = whatsappConfig.phoneNumber || '+251911234567';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const defaultMsg = whatsappConfig.defaultMessage || 'Hello LIYU Hair Atelier! I would like to inquire about luxury hair bundles and current availability.';
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div
      id="whatsapp-toggle-container"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Informative Hover / Context Pill */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-full text-xs text-[#2A3720] shadow-lg transition-all duration-200 group hover:border-[#25D366] hover:bg-white cursor-pointer ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-90'
        }`}
        title="Open WhatsApp chat immediately"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
        <span className="font-serif font-medium text-xs tracking-wide group-hover:text-[#128C7E]">
          Chat on WhatsApp
        </span>
        <ExternalLink className="w-3 h-3 text-[#788470] group-hover:text-[#25D366] transition-colors" />
      </a>

      {/* Floating Toggle Button (Direct to WhatsApp) */}
      <a
        id="whatsapp-toggle-btn"
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 shadow-xl hover:shadow-2xl hover:scale-108 transition-all duration-300 cursor-pointer group relative shadow-[#25D366]/35"
        aria-label="Chat directly on WhatsApp"
        title={`Chat with LIYU Hair Atelier on WhatsApp (${rawPhone})`}
      >
        {/* Subtle pulse ring around button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-sm transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.497-.896-.8-1.501-1.789-1.677-2.09-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.633-.929-2.235-.244-.587-.492-.507-.677-.516-.176-.008-.377-.01-.578-.01-.201 0-.527.075-.803.377-.276.301-1.054 1.03-1.054 2.511 0 1.481 1.079 2.91 1.23 3.111.15.201 2.122 3.24 5.14 4.544.718.31 1.279.496 1.716.635.722.23 1.379.197 1.9.119.58-.088 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.84.5 3.56 1.37 5.04L2 22l5.12-1.34c1.43.78 3.06 1.22 4.92 1.22 5.53 0 10.02-4.49 10.02-10.02S17.57 2 12.04 2zm0 18.25c-1.61 0-3.1-.47-4.37-1.28l-.31-.2-3.24.85.86-3.16-.21-.33a8.19 8.19 0 0 1-1.26-4.31c0-4.55 3.7-8.25 8.28-8.25 4.58 0 8.28 3.7 8.28 8.25 0 4.55-3.7 8.23-8.28 8.23z" />
        </svg>

        {/* Small verified dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#128C7E]" />
        </span>
      </a>
    </div>
  );
};

