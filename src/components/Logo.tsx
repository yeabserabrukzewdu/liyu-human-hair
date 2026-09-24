import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  layout?: 'horizontal' | 'vertical' | 'mark-only' | 'full-picture';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  layout = 'horizontal',
  showText = true,
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  // Size dimensions
  const sizeMap = {
    xs: { px: 28, fullHeight: 36, text: 'text-sm', sub: 'text-[8px]' },
    sm: { px: 36, fullHeight: 48, text: 'text-base', sub: 'text-[9px]' },
    md: { px: 46, fullHeight: 64, text: 'text-lg', sub: 'text-[10px]' },
    lg: { px: 64, fullHeight: 92, text: 'text-2xl', sub: 'text-xs' },
    xl: { px: 96, fullHeight: 140, text: 'text-3xl', sub: 'text-sm' },
    '2xl': { px: 130, fullHeight: 190, text: 'text-4xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  // Sourcing directly from the public file
  // For dark UI: /logo-dark.png (or /logo-mark-dark.png for circular avatars)
  // For light UI: /logo.png
  const fullImageSrc = variant === 'light' ? '/logo.png' : '/logo-dark.png';
  const markImageSrc = variant === 'light' ? '/logo-mark.png' : '/logo-mark-dark.png';
  const imageSrc = layout === 'mark-only' ? markImageSrc : fullImageSrc;

  const textColorClass =
    variant === 'light'
      ? 'text-black'
      : variant === 'gold'
      ? 'text-[#d4af37]'
      : 'text-white';

  const subColorClass =
    variant === 'light'
      ? 'text-gray-600'
      : variant === 'gold'
      ? 'text-[#e5c76b]'
      : 'text-[#999999]';

  // If layout is 'full-picture', display the entire exact picture sourced from /logo.png or /logo-dark.png
  if (layout === 'full-picture') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center select-none ${
          onClick ? 'cursor-pointer hover:opacity-90' : ''
        } transition-opacity duration-300 ${className}`}
      >
        <img
          src={fullImageSrc}
          alt="Liyu Hair"
          style={{ height: `${currentSize.fullHeight}px`, width: 'auto' }}
          className="object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${
        layout === 'vertical' ? 'flex-col text-center gap-2' : 'gap-3'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Logo Medallion */}
      <div
        style={{ width: `${currentSize.px}px`, height: `${currentSize.px}px` }}
        className={`relative shrink-0 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
          variant === 'light' ? 'bg-white' : 'bg-black ring-1 ring-white/10'
        }`}
      >
        {!imgError ? (
          <img
            src={imageSrc}
            alt="Liyu Hair Logo"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* High quality SVG Fallback reproducing the circular silhouette & leaf */
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full p-1.5 ${textColorClass}`}
            fill="currentColor"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            {/* Woman silhouette & afro curl representation */}
            <path d="M50 18 C36 18 26 28 26 42 C26 48 29 53 32 58 C35 56 38 52 40 48 C43 52 48 54 52 54 C54 54 58 52 61 48 C64 53 70 54 74 49 C76 43 78 35 73 28 C68 21 59 18 50 18 Z" />
            <path
              d="M32 58 C28 62 26 68 28 73 C30 78 37 80 43 79 C42 74 43 68 46 64 C43 62 38 60 32 58 Z"
              opacity="0.8"
            />
            <path
              d="M55 48 C55 48 64 56 65 65 C66 72 63 76 58 80 C65 79 72 73 73 66 C74 58 68 51 61 48 Z"
              opacity="0.85"
            />
            {/* Botanical branch */}
            <path
              d="M20 70 C24 64 28 58 29 50 C26 52 22 55 20 60 C18 64 19 68 20 70 Z"
              fill="currentColor"
            />
            <circle cx="21" cy="46" r="2.5" />
            <circle cx="17" cy="54" r="2" />
          </svg>
        )}
      </div>

      {/* Brand Typography */}
      {showText && layout !== 'mark-only' && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center' : 'items-start'}`}>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-heading font-medium tracking-[0.05em] leading-none ${currentSize.text} ${textColorClass}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Liyu
            </span>
            <span
              className={`font-heading font-bold tracking-[0.22em] uppercase leading-none ${currentSize.sub} ${textColorClass}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              HAIR
            </span>
          </div>
          <span
            className={`tracking-[0.35em] uppercase text-[7px] md:text-[8px] mt-0.5 font-normal ${subColorClass}`}
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            ATELIER • 100% RAW VIRGIN
          </span>
        </div>
      )}
    </div>
  );
};
