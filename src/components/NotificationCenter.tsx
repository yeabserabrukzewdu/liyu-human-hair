import React, { useState } from 'react';
import { X, Bell, Tag, Truck, Check, ShieldCheck, ArrowRight, CheckCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { NotificationItem } from '../types';
import { Logo } from './Logo';

const NotificationCenterContent: React.FC = () => {
  const {
    setIsNotificationCenterOpen,
    notifications,
    unreadNotificationCount,
    pushPermissionGranted,
    requestPushPermission,
    markAllNotificationsRead,
    markNotificationRead,
    setIsOrderTrackerOpen,
    setActiveTrackingOrder,
    orders,
  } = useStore();

  const [filterType, setFilterType] = useState<'all' | 'order' | 'sale'>('all');
  const [permissionRequested, setPermissionRequested] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationRead(item.id);
    if (item.actionType === 'view_order' && item.orderId) {
      const match = orders.find((o) => o.id === item.orderId);
      if (match) {
        setActiveTrackingOrder(match);
      }
      setIsNotificationCenterOpen(false);
      setIsOrderTrackerOpen(true);
    }
  };

  const handleEnablePush = async () => {
    setPermissionRequested(true);
    await requestPushPermission();
  };

  return (
    <div
      id="notification-center-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsNotificationCenterOpen(false)}
    >
      <div
        id="notification-center-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F2] border-l border-[#DDD5C7] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-[#1B2017]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5DFD2]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Logo size="xs" layout="horizontal" variant="light" />
              <div className="flex items-center gap-1.5 border-l border-[#DDD5C7] pl-3">
                <Bell className="w-3.5 h-3.5 text-[#95B373]" />
                {unreadNotificationCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#95B373] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                    {unreadNotificationCount}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsNotificationCenterOpen(false)}
              className="p-1.5 text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
              aria-label="Close notification center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] transition-colors cursor-pointer font-bold ${
                  filterType === 'all' ? 'bg-[#95B373] text-white shadow-xs' : 'text-[#6A7563] hover:text-[#1B2017]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('order')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] transition-colors cursor-pointer font-bold ${
                  filterType === 'order' ? 'bg-[#95B373] text-white shadow-xs' : 'text-[#6A7563] hover:text-[#1B2017]'
                }`}
              >
                Order Updates
              </button>
              <button
                onClick={() => setFilterType('sale')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] transition-colors cursor-pointer font-bold ${
                  filterType === 'sale' ? 'bg-[#95B373] text-white shadow-xs' : 'text-[#6A7563] hover:text-[#1B2017]'
                }`}
              >
                Flash Sales
              </button>
            </div>

            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-[#6A7563] hover:text-[#1B2017] flex items-center gap-1 font-bold cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>
        </div>

        {/* Push Notification Permission Box */}
        {!pushPermissionGranted && (
          <div className="m-4 p-4 bg-white border border-[#DDD5C7] rounded-xs shadow-xs">
            <div className="flex items-start gap-3">
              <Bell className="w-4 h-4 text-[#95B373] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#1B2017]">Enable Real-Time Push Notifications</h4>
                <p className="text-[11px] text-[#55604E] mt-0.5 leading-relaxed font-light">
                  Receive instant alerts on your lock screen for DHL courier checkpoint dispatch and VIP flash drops.
                </p>
                <button
                  onClick={handleEnablePush}
                  className="mt-2.5 px-3 py-1.5 bg-[#95B373] hover:bg-[#82A260] text-white text-[10px] uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Check className="w-3 h-3" />
                  <span>Allow Push Alerts</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-4 rounded-xs border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-white/70 border-[#DDD5C7] opacity-80'
                    : 'bg-white border-[#95B373] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {item.type === 'order' && <Truck className="w-3.5 h-3.5 text-[#95B373]" />}
                    {item.type === 'sale' && <Tag className="w-3.5 h-3.5 text-[#95B373]" />}
                    {item.type === 'vip' && <ShieldCheck className="w-3.5 h-3.5 text-[#1B2017]" />}
                    <span className="text-[10px] uppercase tracking-wider font-mono text-[#6A7563] font-bold">
                      {item.type} • {item.timestamp}
                    </span>
                  </div>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-[#95B373]" />}
                </div>

                <h4 className="text-xs font-serif text-[#1B2017] font-semibold mb-1">{item.title}</h4>
                <p className="text-[11px] text-[#55604E] font-light leading-relaxed">{item.message}</p>

                {item.linkText && (
                  <div className="mt-2 pt-2 border-t border-[#E5DFD2] flex items-center justify-between text-[11px] text-[#2B401D] font-bold">
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-xs text-[#888888]">
              No notifications in this category.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E5DFD2] bg-[#F2ECE0] text-center text-[10px] text-[#6A7563] font-medium">
          LIYU Push Notification Engine • Browser TLS 1.3 Certified
        </div>
      </div>
    </div>
  );
};

export const NotificationCenter: React.FC = () => {
  const { isNotificationCenterOpen } = useStore();

  if (!isNotificationCenterOpen) return null;

  return <NotificationCenterContent />;
};

