import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, NotificationItem, BrowsingHistoryItem } from '../types';
import { PRODUCTS, INITIAL_ORDERS } from '../data/products';

export type ComplianceTab = 'compliance' | 'terms' | 'privacy' | 'refund' | 'shipping' | 'security';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;

  // History & Recommendations
  browsingHistory: BrowsingHistoryItem[];
  recordProductView: (product: Product) => void;
  getPersonalizedRecommendations: () => Product[];
  clearBrowsingHistory: () => void;

  // Orders & Real-time Tracking
  orders: Order[];
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'trackingNumber' | 'carrier' | 'createdAt' | 'estimatedDelivery' | 'checkpoints' | 'currentStage' | 'progressPercent' | 'lastUpdated'>) => Order;
  advanceOrderStage: (orderId: string) => void;
  lookupOrder: (query: string) => Order | undefined;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  pushPermissionGranted: boolean;
  requestPushPermission: () => Promise<boolean>;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  activeToast: NotificationItem | null;
  dismissToast: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Website Compliance & Legal Center (Stripe & Card Networks)
  isComplianceOpen: boolean;
  setIsComplianceOpen: (open: boolean) => void;
  complianceTab: ComplianceTab;
  setComplianceTab: (tab: ComplianceTab) => void;
  openComplianceModal: (tab?: ComplianceTab) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  CART: 'liyu_cart_v1',
  WISHLIST: 'liyu_wishlist_v1',
  HISTORY: 'liyu_history_v1',
  ORDERS: 'liyu_orders_v1',
  NOTIFICATIONS: 'liyu_notifications_v1',
  PUSH_PERM: 'liyu_push_perm_v1',
  COUPON: 'liyu_coupon_v1',
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-flash-1',
    title: 'Flash Sale Activated: 15% Off Ocean Wave',
    message: 'Exclusive 24-Hour VIP flash discount applied on Elysian Ocean Wave & Raw Hair Blondes with code LUXE15.',
    timestamp: 'Just now',
    type: 'sale',
    read: false,
    linkText: 'Shop Flash Sale',
    actionType: 'view_sale',
  },
  {
    id: 'notif-order-track-1',
    title: 'Live Tracking: Flight Departure to Leipzig Hub',
    message: 'Order #LIYU-984214-EXP has cleared London customs and is en route via DHL Express Worldwide.',
    timestamp: '15m ago',
    type: 'order',
    read: false,
    orderId: 'LIYU-984214-EXP',
    linkText: 'Track Order Live',
    actionType: 'view_order',
  },
  {
    id: 'notif-vip-drop',
    title: 'New Harvest: Raw Burmese Single-Donor Hair',
    message: 'Strictly limited batch of 100% cuticle-aligned Raw Burmese Virgin hair now available in 18"-28".',
    timestamp: '2h ago',
    type: 'vip',
    read: true,
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Default initial cart item for showcase
    const defaultProduct = PRODUCTS[4]; // Burmese
    const defaultVariant = defaultProduct.variants[2]; // 22 inch $85
    return [
      {
        id: `${defaultProduct.id}-${defaultVariant.id}`,
        product: defaultProduct,
        variant: defaultVariant,
        quantity: 2,
      },
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.COUPON) || null;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['liyu-raw-hair-blondes', 'liyu-ocean-wave'];
    } catch {
      return ['liyu-raw-hair-blondes', 'liyu-ocean-wave'];
    }
  });

  // History State
  const [browsingHistory, setBrowsingHistory] = useState<BrowsingHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [
        { productId: 'liyu-burmese', viewedAt: Date.now() - 3600000, texture: 'Burmese' },
        { productId: 'liyu-ocean-wave', viewedAt: Date.now() - 7200000, texture: 'Ocean Wave' },
      ];
    } catch {
      return [];
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [pushPermissionGranted, setPushPermissionGranted] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.PUSH_PERM) === 'true';
  });

  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Modal / Drawer open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<ComplianceTab>('compliance');

  const openComplianceModal = (tab?: ComplianceTab) => {
    if (tab) setComplianceTab(tab);
    setIsComplianceOpen(true);
  };
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('product');
      if (slug) {
        return PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(browsingHistory));
    } catch (e) {
      console.warn('Failed to save history', e);
    }
  }, [browsingHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications', e);
    }
  }, [notifications]);

  // Cart operations
  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    const itemId = `${product.id}-${variant.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, variant, quantity }];
    });

    // Fire toast alert
    const toastItem: NotificationItem = {
      id: `toast-${Date.now()}`,
      title: 'Added to Bag',
      message: `${product.name} (${variant.length}" / ${variant.color}) added.`,
      timestamp: 'Just now',
      type: 'system',
      read: true,
    };
    setActiveToast(toastItem);
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === toastItem.id ? null : curr));
    }, 3800);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'LUXE15') {
      setAppliedCoupon('LUXE15');
      localStorage.setItem(STORAGE_KEYS.COUPON, 'LUXE15');
      return { success: true, message: 'VIP Promo LUXE15 applied! 15% discount granted.' };
    }
    if (trimmed === 'LIYU10') {
      setAppliedCoupon('LIYU10');
      localStorage.setItem(STORAGE_KEYS.COUPON, 'LIYU10');
      return { success: true, message: 'Welcome voucher LIYU10 applied! 10% discount granted.' };
    }
    return { success: false, message: 'Invalid promo code. Try "LUXE15" or "LIYU10".' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
  };

  const couponRate = appliedCoupon === 'LUXE15' ? 0.15 : appliedCoupon === 'LIYU10' ? 0.10 : 0;
  const cartDiscount = Math.round(cartSubtotal * couponRate * 100) / 100;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      
      const prod = PRODUCTS.find((p) => p.id === productId);
      const toastItem: NotificationItem = {
        id: `toast-${Date.now()}`,
        title: exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: exists
          ? `${prod?.name || 'Item'} removed from your curated list.`
          : `${prod?.name || 'Item'} reserved in your private wishlist.`,
        timestamp: 'Just now',
        type: 'system',
        read: true,
      };
      setActiveToast(toastItem);
      setTimeout(() => {
        setActiveToast((curr) => (curr?.id === toastItem.id ? null : curr));
      }, 3500);

      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // History & Personalized Recommendations Engine
  const recordProductView = (product: Product) => {
    setBrowsingHistory((prev) => {
      const filtered = prev.filter((item) => item.productId !== product.id);
      const newItem: BrowsingHistoryItem = {
        productId: product.id,
        viewedAt: Date.now(),
        texture: product.category,
      };
      return [newItem, ...filtered].slice(0, 10);
    });
  };

  const clearBrowsingHistory = () => {
    setBrowsingHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  };

  const getPersonalizedRecommendations = (): Product[] => {
    if (browsingHistory.length === 0) {
      return PRODUCTS.filter((p) => p.isBestseller || p.isNewArrival).slice(0, 4);
    }
    // Extract preferred textures from history
    const viewedTextureCounts: Record<string, number> = {};
    browsingHistory.forEach((item) => {
      viewedTextureCounts[item.texture] = (viewedTextureCounts[item.texture] || 0) + 1;
    });

    const viewedProductIds = new Set(browsingHistory.map((h) => h.productId));

    // Score products based on similarity
    const scored = PRODUCTS.map((prod) => {
      let score = 0;
      if (viewedTextureCounts[prod.category]) {
        score += viewedTextureCounts[prod.category] * 3;
      }
      if (prod.isBestseller) score += 2;
      if (prod.isFlashSale) score += 1.5;
      // Slight penalty if already in current cart to suggest complementary additions
      if (cart.some((c) => c.product.id === prod.id)) score -= 1;
      return { prod, score, isViewed: viewedProductIds.has(prod.id) };
    });

    // Prioritize high scored items, then fall back to diverse items
    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.prod).slice(0, 4);
  };

  // Push notifications simulation
  const requestPushPermission = async (): Promise<boolean> => {
    setPushPermissionGranted(true);
    localStorage.setItem(STORAGE_KEYS.PUSH_PERM, 'true');

    const welcomeNotif: NotificationItem = {
      id: `push-welcome-${Date.now()}`,
      title: 'LIYU VIP Notifications Enabled',
      message: 'You will receive immediate alerts for order progress, custom dispatch, and private client flash drops.',
      timestamp: 'Just now',
      type: 'vip',
      read: false,
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
    setActiveToast(welcomeNotif);

    return true;
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const dismissToast = () => setActiveToast(null);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Order creation and real-time order tracking simulation
  const createOrder = (
    orderData: Omit<
      Order,
      | 'id'
      | 'trackingNumber'
      | 'carrier'
      | 'createdAt'
      | 'estimatedDelivery'
      | 'checkpoints'
      | 'currentStage'
      | 'progressPercent'
      | 'lastUpdated'
    >
  ): Order => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LIYU-${randomSuffix}-EXP`;
    const trackingNumber = `DHL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
    const now = new Date();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      trackingNumber,
      carrier: 'DHL Express Worldwide',
      createdAt: now.toISOString(),
      estimatedDelivery: estDate.toISOString(),
      currentStage: 'confirmed',
      progressPercent: 20,
      lastUpdated: 'Just now',
      checkpoints: [
        {
          title: 'Payment & Order Verification',
          location: 'LIYU Human Hair Atelier Hub',
          timestamp: 'Just now',
          completed: true,
          current: true,
          note: `Payment authorized securely via ${orderData.paymentMethod.toUpperCase()}. Order in queue for cuticle inspection.`,
        },
        {
          title: 'Cuticle Alignment & Weft Inspection',
          location: 'LIYU Quality Control Lab',
          timestamp: 'Scheduled today',
          completed: false,
          current: false,
        },
        {
          title: 'Dispatched via DHL Express Worldwide',
          location: 'International Logistics Departure',
          timestamp: 'Scheduled tomorrow morning',
          completed: false,
          current: false,
        },
        {
          title: 'In Transit — Sorting Facility',
          location: 'Global Transit Gateway',
          timestamp: 'Estimated +2 business days',
          completed: false,
          current: false,
        },
        {
          title: 'Out for Priority Delivery',
          location: `${orderData.shippingAddress.city} Regional Delivery Center`,
          timestamp: 'Estimated +3 business days',
          completed: false,
          current: false,
        },
        {
          title: 'Delivered — Signature Required',
          location: `${orderData.shippingAddress.street}, ${orderData.shippingAddress.city}`,
          timestamp: 'Final Step',
          completed: false,
          current: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();

    // Trigger Notification for new order
    const orderNotif: NotificationItem = {
      id: `order-created-${Date.now()}`,
      title: `Order Placed: ${orderId}`,
      message: `Your payment was processed. Tracking number ${trackingNumber} has been reserved.`,
      timestamp: 'Just now',
      type: 'order',
      read: false,
      orderId: orderId,
      linkText: 'Track Live',
      actionType: 'view_order',
    };
    setNotifications((prev) => [orderNotif, ...prev]);
    setActiveToast(orderNotif);

    return newOrder;
  };

  // Allows real-time interactive simulation of courier order progression!
  const advanceOrderStage = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id !== orderId) return ord;

        const stages: Order['currentStage'][] = [
          'confirmed',
          'quality_check',
          'weft_prep',
          'dispatched',
          'in_transit',
          'out_for_delivery',
          'delivered',
        ];

        const currentIndex = stages.indexOf(ord.currentStage);
        const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
        const nextStage = stages[nextIndex];

        const checkpointIndex = Math.min(nextIndex, ord.checkpoints.length - 1);

        const updatedCheckpoints = ord.checkpoints.map((cp, idx) => {
          if (idx < checkpointIndex) {
            return { ...cp, completed: true, current: false };
          }
          if (idx === checkpointIndex) {
            return {
              ...cp,
              completed: nextStage === 'delivered',
              current: nextStage !== 'delivered',
              timestamp: 'Updated just now',
            };
          }
          return { ...cp, completed: false, current: false };
        });

        const progressMap: Record<Order['currentStage'], number> = {
          confirmed: 20,
          quality_check: 35,
          weft_prep: 50,
          dispatched: 65,
          in_transit: 80,
          out_for_delivery: 92,
          delivered: 100,
        };

        const updatedOrder: Order = {
          ...ord,
          currentStage: nextStage,
          progressPercent: progressMap[nextStage],
          lastUpdated: 'Just now',
          checkpoints: updatedCheckpoints,
        };

        if (activeTrackingOrder?.id === orderId) {
          setActiveTrackingOrder(updatedOrder);
        }

        // Send alert toast for tracking update
        const stageNames: Record<Order['currentStage'], string> = {
          confirmed: 'Order Confirmed',
          quality_check: 'Quality Inspection Passed',
          weft_prep: 'Double Weft Sealed & Packaged',
          dispatched: 'Dispatched with DHL Express',
          in_transit: 'In Transit at Continental Hub',
          out_for_delivery: 'Out for Courier Delivery',
          delivered: 'Package Delivered & Signed',
        };

        const updateNotif: NotificationItem = {
          id: `order-update-${Date.now()}`,
          title: `Courier Update: ${ord.id}`,
          message: `${stageNames[nextStage]} — Live tracking updated.`,
          timestamp: 'Just now',
          type: 'order',
          read: false,
          orderId: ord.id,
          linkText: 'View Timeline',
          actionType: 'view_order',
        };
        setNotifications((prev) => [updateNotif, ...prev]);
        setActiveToast(updateNotif);

        return updatedOrder;
      })
    );
  };

  const lookupOrder = (query: string): Order | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.trackingNumber.toUpperCase() === clean ||
        o.customerEmail.toLowerCase() === query.trim().toLowerCase()
    );
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    recordProductView(product);
  };

  const closeProductModal = () => setSelectedProduct(null);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,

        browsingHistory,
        recordProductView,
        getPersonalizedRecommendations,
        clearBrowsingHistory,

        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        createOrder,
        advanceOrderStage,
        lookupOrder,

        notifications,
        unreadNotificationCount,
        pushPermissionGranted,
        requestPushPermission,
        markAllNotificationsRead,
        markNotificationRead,
        activeToast,
        dismissToast,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        selectedProduct,
        openProductModal,
        closeProductModal,

        isComplianceOpen,
        setIsComplianceOpen,
        complianceTab,
        setComplianceTab,
        openComplianceModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
