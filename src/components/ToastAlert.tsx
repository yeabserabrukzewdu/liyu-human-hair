import React from 'react';
import { X, Check, Bell, Truck, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastAlert: React.FC = () => {
  const { activeToast, dismissToast, setIsOrderTrackerOpen, setIsNotificationCenterOpen } = useStore();

  if (!activeToast) return null;

  const handleClick = () => {
    if (activeToast.actionType === 'view_order') {
      setIsOrderTrackerOpen(true);
    } else {
      setIsNotificationCenterOpen(true);
    }
    dismissToast();
  };

  return (
    <div
      id="global-toast-alert"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-full bg-white border border-[#DDD5C7] shadow-2xl rounded-xs p-4 animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3 backdrop-blur-md text-[#1B2017]"
    >
      <div className="p-2 rounded-xs bg-[#95B373]/15 border border-[#95B373]/30 shrink-0 text-[#95B373]">
        {activeToast.type === 'order' ? (
          <Truck className="w-4 h-4 text-[#95B373]" />
        ) : activeToast.type === 'sale' ? (
          <Tag className="w-4 h-4 text-[#95B373]" />
        ) : (
          <Check className="w-4 h-4 text-[#95B373]" />
        )}
      </div>

      <div className="flex-1 min-w-0" onClick={handleClick} role="button">
        <h5 className="text-xs font-serif text-[#1B2017] font-semibold truncate">{activeToast.title}</h5>
        <p className="text-[11px] text-[#55604E] font-light mt-0.5 line-clamp-2 leading-relaxed">
          {activeToast.message}
        </p>
        {activeToast.linkText && (
          <span className="text-[10px] text-[#2B401D] flex items-center gap-1 mt-1.5 uppercase tracking-wider font-bold">
            <span>{activeToast.linkText}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        )}
      </div>

      <button
        onClick={dismissToast}
        className="p-1 text-[#6A7563] hover:text-[#1B2017] transition-colors shrink-0 cursor-pointer"
        aria-label="Dismiss alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
