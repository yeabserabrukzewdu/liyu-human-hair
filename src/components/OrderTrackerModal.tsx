import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck, AlertCircle, Play, ChevronRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { Logo } from './Logo';

const OrderTrackerContent: React.FC = () => {
  const {
    setIsOrderTrackerOpen,
    activeTrackingOrder,
    setActiveTrackingOrder,
    advanceOrderStage,
    lookupOrder,
    orders,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const currentOrder: Order | null = activeTrackingOrder || orders[0] || null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) return;

    const found = lookupOrder(searchQuery);
    if (found) {
      setActiveTrackingOrder(found);
      setSearchQuery('');
    } else {
      setSearchError(`No order found matching "${searchQuery}". Please check your order ID or tracking number.`);
    }
  };

  const stageLabels = {
    confirmed: 'Order Confirmed',
    quality_check: 'Quality Inspection',
    weft_prep: 'Packaging Hair',
    dispatched: 'Shipped with DHL',
    in_transit: 'On the Way',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  };

  return (
    <div
      id="order-tracker-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setIsOrderTrackerOpen(false)}
    >
      <div
        id="order-tracker-content"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] border border-[#DDD5C7] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl p-6 sm:p-8 text-[#1B2017]"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOrderTrackerOpen(false)}
          className="absolute top-5 right-5 p-2 text-[#55604E] hover:text-[#1B2017] bg-white rounded-full border border-[#DDD5C7] transition-colors cursor-pointer shadow-xs"
          aria-label="Close tracking"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD2] mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" layout="mark-only" variant="light" />
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#95B373] font-bold mb-1">
                <Truck className="w-3.5 h-3.5" />
                <span>DHL Express Tracking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1B2017] font-medium">
                Track Your Order
              </h2>
            </div>
          </div>

          {/* Quick Order Lookup Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-sm">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Order ID (e.g. LIYU-984214-EXP)"
                className="w-full bg-white border border-[#DDD5C7] text-[#1B2017] text-xs pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#95B373] uppercase shadow-xs font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-wider rounded-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Lookup
            </button>
          </form>
        </div>

        {searchError && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xs font-medium">
            {searchError}
          </div>
        )}

        {currentOrder ? (
          <div>
            {/* Top Order Telemetry Bar */}
            <div className="bg-white border border-[#DDD5C7] p-5 rounded-xs mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A7563] block font-bold">Order Identifier</span>
                <span className="font-mono text-sm text-[#1B2017] font-bold">{currentOrder.id}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A7563] block font-bold">Express Carrier</span>
                <span className="text-xs text-[#2B3E1F] font-bold block">{currentOrder.carrier}</span>
                <span className="text-[10px] font-mono text-[#6A7563]">{currentOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A7563] block font-bold">Estimated Delivery</span>
                <span className="text-xs text-[#1B2017] font-medium">
                  {new Date(currentOrder.estimatedDelivery).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A7563] block font-bold">Live Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#243916] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#95B373] animate-ping" />
                  {stageLabels[currentOrder.currentStage]}
                </span>
              </div>
            </div>

            {/* Interactive Real-Time Stage Stepper */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#6A7563] font-bold">
                  Dispatch & Transit Progress
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#2B401D] font-bold">
                    {currentOrder.progressPercent}% Completed
                  </span>
                  {/* Real-time simulation control */}
                  <button
                    onClick={() => advanceOrderStage(currentOrder.id)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white hover:bg-[#95B373] hover:text-white text-[#2C3E1F] border border-[#DDD5C7] rounded-xs transition-all cursor-pointer font-bold shadow-xs"
                    title="Simulate courier moving to the next transit stage"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Advance Live Stage</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full bg-[#EFEAE0] h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-[#95B373] h-full transition-all duration-700 rounded-full"
                  style={{ width: `${currentOrder.progressPercent}%` }}
                />
              </div>

              {/* Horizontal Stepper */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
                {Object.entries(stageLabels).map(([key, label], idx) => {
                  const stageKeys = Object.keys(stageLabels);
                  const currentIndex = stageKeys.indexOf(currentOrder.currentStage);
                  const isDone = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={key} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono mb-1.5 transition-all shadow-xs ${
                          isCurrent
                            ? 'bg-[#95B373] text-white ring-4 ring-[#95B373]/25 font-bold'
                            : isDone
                            ? 'bg-[#95B373] text-white'
                            : 'bg-white text-[#888888] border border-[#DDD5C7]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-white" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] leading-tight transition-colors ${
                          isCurrent ? 'text-[#1B2017] font-bold' : isDone ? 'text-[#3B4833] font-medium' : 'text-[#888888]'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checkpoint Timeline & Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Detailed Location Checkpoints */}
              <div className="lg:col-span-7">
                <h3 className="text-xs uppercase tracking-wider text-[#1B2017] font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#95B373]" />
                  <span>Courier Transit Telemetry Logs</span>
                </h3>

                <div className="space-y-4 border-l border-[#DDD5C7] ml-3 pl-5">
                  {currentOrder.checkpoints.map((cp, idx) => (
                    <div key={idx} className="relative group">
                      {/* Node pin */}
                      <span
                        className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                          cp.current
                            ? 'bg-[#95B373] border-white ring-4 ring-[#95B373]/30'
                            : cp.completed
                            ? 'bg-[#95B373] border-[#FAF7F2]'
                            : 'bg-[#DDD5C7] border-white'
                        }`}
                      />

                      <div className="bg-white p-3.5 rounded-xs border border-[#DDD5C7] shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#1B2017]">{cp.title}</h4>
                          <span className="text-[10px] font-mono text-[#6A7563]">{cp.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-[#55604E] mt-0.5">{cp.location}</p>
                        {cp.note && (
                          <p className="text-[10px] font-mono text-[#2B3E1F] mt-1 bg-[#95B373]/15 p-1.5 rounded-xs border border-[#95B373]/30 font-medium">
                            {cp.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundles inside this order */}
              <div className="lg:col-span-5 bg-white border border-[#DDD5C7] p-5 rounded-xs h-fit shadow-xs">
                <h3 className="text-xs uppercase tracking-wider text-[#1B2017] font-bold mb-3 pb-2 border-b border-[#E5DFD2]">
                  Bundles in this Consignment
                </h3>

                <div className="space-y-3 mb-4">
                  {currentOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-14 object-cover rounded-xs bg-[#FAF7F2] shrink-0 border border-[#DDD5C7]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif text-[#1B2017] font-medium truncate">{item.productName}</p>
                        <p className="text-[10px] text-[#6A7563]">
                          {item.length}" / {item.color}
                        </p>
                        <span className="text-[10px] font-mono text-[#1B2017] font-bold">
                          Qty: {item.quantity} • ${item.price * item.quantity} USD
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E5DFD2] text-xs text-[#6A7563] space-y-1">
                  <div className="flex justify-between">
                    <span>Shipping Address:</span>
                    <span className="text-[#1B2017] text-right font-medium">
                      {currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuticle Guarantee:</span>
                    <span className="text-[#2B3E1F] font-bold">100% Verified Single Donor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <PackageCheck className="w-12 h-12 text-[#999999] mx-auto mb-3" />
            <p className="text-sm text-[#6A7563]">No active orders to track</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const OrderTrackerModal: React.FC = () => {
  const { isOrderTrackerOpen } = useStore();

  if (!isOrderTrackerOpen) return null;

  return <OrderTrackerContent />;
};

