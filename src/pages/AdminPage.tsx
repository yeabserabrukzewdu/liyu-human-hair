import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Package,
  Layers,
  ClipboardList,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Check,
  X,
  Search,
  SlidersHorizontal,
  ExternalLink,
  MessageCircle,
  Tag,
  ShieldCheck,
  Calendar,
  Clock,
  Phone,
  Mail,
  RotateCcw,
  Upload,
  AlertCircle,
  DollarSign,
  Eye,
  CheckCircle2,
  Sparkles,
  Bell,
  FileText,
  Send,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariant, CustomerRequest, RequestStatus, RequestType, DonorCategory, HairColor, EmailRecord } from '../types';
import { COLOR_SWATCHES } from '../data/products';
import { EmailPreviewModal } from '../components/EmailPreviewModal';

// Authentic bundle images available in /public
const PRESET_BUNDLE_IMAGES = [
  { path: '/18.png', label: 'Wave Human Hair (18.png)' },
  { path: '/17.png', label: 'Burmese Human Hair (17.png)' },
  { path: '/16.png', label: 'Deep Freeze / Deep Frizz (16.png)' },
  { path: '/15.png', label: 'Deep Frizz Alternate (15.png)' },
  { path: '/1.webp', label: 'Wave Hair (1.webp)' },
  { path: '/2.webp', label: 'Ocean Wave (Vietnamese)' },
  { path: '/3.webp', label: 'Fumi Double Drawn' },
  { path: '/4.webp', label: 'Burmese Hair (4.webp)' },
  { path: '/5.webp', label: 'Pixie Curl' },
  { path: '/6.webp', label: 'Deep Frizz Alternate (6.webp)' },
  { path: '/7.png', label: 'Raw Human Hair' },
  { path: '/8.png', label: 'Blonde Bundle' },
  { path: '/9.png', label: 'Mushroom Blonde' },
  { path: '/10.png', label: 'Coffee Brown' },
  { path: '/11.png', label: 'Half Coffee Brown' },
  { path: '/12.png', label: 'Burgundy' },
  { path: '/13.png', label: 'Piano Highlight' },
  { path: '/14.png', label: 'Natural Black Double Drawn' },
];

const STANDARD_COLORS: HairColor[] = [
  'Black',
  'Natural Black',
  'Coffee Brown',
  'Half Coffee Brown',
  'Highlight',
  'Piano',
  'Burgundy',
  'Ash Blonde',
  'Mushroom Blonde',
  'Blonde',
];

const STANDARD_LENGTHS = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export const AdminPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    toggleProductSale,
    changeProductImage,
    resetProductsToDefault,
    productTypes,
    addProductType,
    removeProductType,
    requests,
    addCustomerRequest,
    updateRequestStatus,
    deleteRequest,
    whatsappConfig,
    updateWhatsAppConfig,
    navigateToPage,
    ownerEmail,
    updateOwnerEmail,
    ownerPhone,
    updateOwnerPhone,
    stripeComingSoon,
    setStripeComingSoon,
    sentEmails,
    sendEmailNotification,
    clearSentEmails,
  } = useStore();

  // Active Main Admin Tab (Products, Types, Requests, Emails, Settings)
  const [activeTab, setActiveTab] = useState<'products' | 'types' | 'requests' | 'emails' | 'settings'>('products');

  // ==========================================
  // PRODUCTS MANAGEMENT STATE
  // ==========================================
  const [productSearch, setProductSearch] = useState('');
  const [productTypeFilter, setProductTypeFilter] = useState('all');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [productSaleFilter, setProductSaleFilter] = useState<'all' | 'on_sale' | 'regular'>('all');

  // Modal States for Products
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [changingPictureProduct, setChangingPictureProduct] = useState<Product | null>(null);

  // Picture Changer State
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New/Edit Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: productTypes[0] || 'Wave',
    donorCategory: 'Double Donor' as DonorCategory,
    basePrice: 80,
    maxPrice: 110,
    inStock: true,
    isFlashSale: false,
    discountPercentage: 15,
    isBestseller: false,
    isNewArrival: true,
    image: '/1.webp',
    availableColors: ['Black'] as string[],
    availableLengths: [20, 22, 24, 26, 28] as number[],
    shortDescription: '100% human hair bundle with aligned cuticles. 1 piece price.',
    description: 'Authentic 100% cuticle-aligned virgin human hair. Double machine-stitched wefts for zero shedding. Suitable for coloring, bleaching, and thermal styling.',
    origin: 'Brazilian Human Hair',
    donorFullness: '85%–90% Equal Length Top to Bottom',
  });

  // ==========================================
  // CATEGORIES / TYPES STATE
  // ==========================================
  const [newTypeName, setNewTypeName] = useState('');

  // ==========================================
  // REQUESTS STATE
  // ==========================================
  const [requestSearch, setRequestSearch] = useState('');
  const [requestTypeFilter, setRequestTypeFilter] = useState<'all' | RequestType>('all');
  const [requestStatusFilter, setRequestStatusFilter] = useState<'all' | RequestStatus>('all');
  const [isAddRequestModalOpen, setIsAddRequestModalOpen] = useState(false);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState<CustomerRequest | null>(null);

  // New Request Form
  const [requestForm, setRequestForm] = useState({
    type: 'custom_inquiry' as RequestType,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    title: '',
    details: '',
    status: 'pending' as RequestStatus,
    appointmentDate: '',
    appointmentTime: '11:00 AM',
    storeLocation: 'Bole Flagship (Addis Ababa)',
  });

  // Settings Form State
  const [phoneSetting, setPhoneSetting] = useState(whatsappConfig.phoneNumber);
  const [greetingSetting, setGreetingSetting] = useState(whatsappConfig.defaultMessage);
  const [hoursSetting, setHoursSetting] = useState(whatsappConfig.businessHours);
  const [toggleVisibleSetting, setToggleVisibleSetting] = useState(whatsappConfig.showToggle);

  // Owner Notification & Stripe Settings State
  const [ownerEmailSetting, setOwnerEmailSetting] = useState(ownerEmail);
  const [ownerPhoneSetting, setOwnerPhoneSetting] = useState(ownerPhone);
  const [stripeComingSoonSetting, setStripeComingSoonSetting] = useState(stripeComingSoon);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState<string | null>(null);

  // Admin Email Preview Modal State
  const [adminEmailPreview, setAdminEmailPreview] = useState<{
    buyer?: EmailRecord;
    owner?: EmailRecord;
    tab: 'buyer' | 'owner';
  } | null>(null);
  const [isAdminEmailModalOpen, setIsAdminEmailModalOpen] = useState(false);
  const [emailFilter, setEmailFilter] = useState<'all' | 'buyer' | 'owner'>('all');
  const [emailSearch, setEmailSearch] = useState('');

  // Calculated Stats
  const totalProductsCount = products.length;
  const inStockCount = products.filter((p) => p.inStock !== false).length;
  const outOfStockCount = totalProductsCount - inStockCount;
  const onSaleCount = products.filter((p) => p.isFlashSale).length;
  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;

  // Filtered Products List
  const filteredProducts = products.filter((p) => {
    if (productSearch) {
      const q = productSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchCat) return false;
    }
    if (productTypeFilter !== 'all' && p.category !== productTypeFilter) {
      return false;
    }
    if (productStockFilter === 'in_stock' && p.inStock === false) {
      return false;
    }
    if (productStockFilter === 'out_of_stock' && p.inStock !== false) {
      return false;
    }
    if (productSaleFilter === 'on_sale' && !p.isFlashSale) {
      return false;
    }
    if (productSaleFilter === 'regular' && p.isFlashSale) {
      return false;
    }
    return true;
  });

  // Filtered Requests List
  const filteredRequests = requests.filter((r) => {
    if (requestSearch) {
      const q = requestSearch.toLowerCase();
      const matchName = r.customerName.toLowerCase().includes(q);
      const matchPhone = r.customerPhone.toLowerCase().includes(q);
      const matchEmail = (r.customerEmail || '').toLowerCase().includes(q);
      const matchTitle = r.title.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchTitle) return false;
    }
    if (requestTypeFilter !== 'all' && r.type !== requestTypeFilter) {
      return false;
    }
    if (requestStatusFilter !== 'all' && r.status !== requestStatusFilter) {
      return false;
    }
    return true;
  });

  // Filtered Sent Emails List
  const filteredEmails = sentEmails.filter((em) => {
    if (emailFilter !== 'all' && em.recipientType !== emailFilter) {
      return false;
    }
    if (emailSearch) {
      const q = emailSearch.toLowerCase();
      const matchSub = em.subject.toLowerCase().includes(q);
      const matchRec = em.recipientEmail.toLowerCase().includes(q);
      const matchName = em.recipientName.toLowerCase().includes(q);
      const matchTxt = em.textBody.toLowerCase().includes(q);
      if (!matchSub && !matchRec && !matchName && !matchTxt) return false;
    }
    return true;
  });

  // Open Picture Change Modal
  const handleOpenPictureChanger = (product: Product) => {
    setChangingPictureProduct(product);
    setSelectedImageSrc(product.images[0] || '/1.webp');
    setCustomImageUrl('');
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Changed Picture
  const handleSavePictureChange = () => {
    if (changingPictureProduct) {
      const targetSrc = customImageUrl.trim() || selectedImageSrc;
      changeProductImage(changingPictureProduct.id, targetSrc);
      setChangingPictureProduct(null);
    }
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    addProduct({
      name: productForm.name.trim(),
      category: productForm.category,
      donorCategory: productForm.donorCategory,
      basePrice: Number(productForm.basePrice),
      maxPrice: Number(productForm.maxPrice),
      inStock: productForm.inStock,
      isFlashSale: productForm.isFlashSale,
      discountPercentage: productForm.isFlashSale ? Number(productForm.discountPercentage) : undefined,
      isBestseller: productForm.isBestseller,
      isNewArrival: productForm.isNewArrival,
      images: [productForm.image],
      availableColors: productForm.availableColors as any,
      availableLengths: productForm.availableLengths,
      shortDescription: productForm.shortDescription,
      description: productForm.description,
      origin: productForm.donorCategory === 'Double Donor' ? 'Brazilian Human Hair' : 'Vietnamese Human Hair',
      donorType: `${productForm.donorCategory} (${productForm.donorCategory === 'Double Donor' ? '85%–90%' : '100%'} Equal Length)`,
      donorFullness: productForm.donorCategory === 'Double Donor' ? '85%–90% Equal Length Top to Bottom' : '100% Full Equal Length Ends',
      cuticleStatus: '100% Intact Unidirectional',
      weightGrams: 100,
      features: [
        `${productForm.donorCategory}: Transparent 1 Piece Price`,
        '100% real human hair with intact cuticles',
        'Double weft reinforced with anti-shedding seal',
      ],
      variants: [],
      catalogNumber: products.length + 1,
    });

    setIsAddProductModalOpen(false);
  };

  // Handle Edit Product Submit
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: productForm.name,
      category: productForm.category,
      donorCategory: productForm.donorCategory,
      basePrice: Number(productForm.basePrice),
      maxPrice: Number(productForm.maxPrice),
      inStock: productForm.inStock,
      isFlashSale: productForm.isFlashSale,
      discountPercentage: productForm.isFlashSale ? Number(productForm.discountPercentage) : undefined,
      isBestseller: productForm.isBestseller,
      isNewArrival: productForm.isNewArrival,
      images: [productForm.image, ...(editingProduct.images.slice(1) || [])],
      availableColors: productForm.availableColors as any,
      availableLengths: productForm.availableLengths,
      shortDescription: productForm.shortDescription,
      description: productForm.description,
    });

    setEditingProduct(null);
  };

  // Populate Edit Modal
  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      donorCategory: product.donorCategory,
      basePrice: product.basePrice,
      maxPrice: product.maxPrice,
      inStock: product.inStock !== false,
      isFlashSale: !!product.isFlashSale,
      discountPercentage: product.discountPercentage || 15,
      isBestseller: !!product.isBestseller,
      isNewArrival: !!product.isNewArrival,
      image: product.images[0] || '/1.webp',
      availableColors: product.availableColors as string[],
      availableLengths: product.availableLengths || [20, 22, 24, 26, 28],
      shortDescription: product.shortDescription,
      description: product.description,
      origin: product.origin,
      donorFullness: product.donorFullness,
    });
  };

  // Handle Add Category Type
  const handleAddTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTypeName.trim()) {
      addProductType(newTypeName.trim());
      setNewTypeName('');
    }
  };

  // Handle Add Request Submit
  const handleAddRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.customerName.trim() || !requestForm.customerPhone.trim()) return;

    addCustomerRequest({
      type: requestForm.type,
      customerName: requestForm.customerName.trim(),
      customerPhone: requestForm.customerPhone.trim(),
      customerEmail: requestForm.customerEmail.trim() || undefined,
      title: requestForm.title.trim() || `${requestForm.type === 'consultation' ? 'VIP Consultation' : 'Custom Hair Request'} (${requestForm.customerName})`,
      details: requestForm.details.trim(),
      status: requestForm.status,
      appointmentDate: requestForm.type === 'consultation' ? requestForm.appointmentDate : undefined,
      appointmentTime: requestForm.type === 'consultation' ? requestForm.appointmentTime : undefined,
      storeLocation: requestForm.type === 'consultation' ? requestForm.storeLocation : undefined,
      adminNotes: 'Logged manually by Atelier Admin.',
    });

    setIsAddRequestModalOpen(false);
    setRequestForm({
      type: 'custom_inquiry',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      title: '',
      details: '',
      status: 'pending',
      appointmentDate: '',
      appointmentTime: '11:00 AM',
      storeLocation: 'Bole Flagship (Addis Ababa)',
    });
  };

  // WhatsApp Customer Chat Trigger
  const handleOpenWhatsAppChat = (req: CustomerRequest) => {
    const cleanNum = req.customerPhone.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      `Hello ${req.customerName}, this is LIYU Human Hair Atelier regarding your ${req.title}. How may we assist you today?`
    );
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  // Save Settings (WhatsApp, Owner Email, Owner Phone, and Stripe status)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsAppConfig({
      phoneNumber: phoneSetting.trim(),
      defaultMessage: greetingSetting.trim(),
      businessHours: hoursSetting.trim(),
      showToggle: toggleVisibleSetting,
    });
    updateOwnerEmail(ownerEmailSetting.trim());
    updateOwnerPhone(ownerPhoneSetting.trim());
    setStripeComingSoon(stripeComingSoonSetting);
    setSettingsSuccessMessage('Settings updated successfully! Owner email and Stripe status saved.');
    setTimeout(() => setSettingsSuccessMessage(null), 4000);
  };

  const handleSendTestOwnerAlert = () => {
    const testRecord: EmailRecord = sendEmailNotification({
      recipientType: 'owner',
      recipientEmail: ownerEmailSetting.trim(),
      recipientName: 'LIYU Website Owner',
      senderEmail: 'orders@liyuhair.com',
      subject: `🚨 [TEST ALERT] New Customer Request from Sara Bruk ($240 USD)`,
      htmlBody: `
        <div style="font-family: sans-serif; padding: 20px; background: #fff; border: 2px solid #95B373; border-radius: 4px;">
          <h2 style="color: #1B2017; margin-top: 0;">🚨 Test Customer Order Request Alert</h2>
          <p style="font-size: 14px; color: #55634E;">This is a test notification confirming that email alerts to the website owner (<strong>${ownerEmailSetting}</strong>) are configured and functioning.</p>
          <div style="background: #FAF7F2; padding: 15px; border: 1px solid #DDD5C7; margin: 15px 0; border-radius: 4px;">
            <p style="margin: 0 0 6px;"><strong>Customer Name:</strong> Sara Bruk</p>
            <p style="margin: 0 0 6px;"><strong>Customer Email:</strong> sara.bruk@example.com</p>
            <p style="margin: 0 0 6px;"><strong>Customer Phone:</strong> +251 911 554 321</p>
            <p style="margin: 0 0 6px;"><strong>Customer Request:</strong> 2 bundles Elysian Ocean Wave 24" (Black)</p>
            <p style="margin: 0 0 6px;"><strong>Total Value:</strong> $240 USD (Zero upfront charge · Stripe Coming Soon)</p>
            <p style="margin: 0;"><strong>Shipping Address:</strong> Bole Sub-City, Addis Ababa, Ethiopia</p>
          </div>
          <p style="color: #7A8574; font-size: 12px; margin-bottom: 0;">Automated alert generated by LIYU Human Hair Atelier.</p>
        </div>
      `,
      textBody: `[TEST ALERT] New Customer Request from Sara Bruk (sara.bruk@example.com / +251 911 554 321).\nItems: 2 bundles Ocean Wave 24". Total: $240 USD.\nOwner Alert delivered to: ${ownerEmailSetting}`,
      orderId: 'LIYU-TEST-001',
      totalAmount: 240,
    });
    setAdminEmailPreview({
      owner: testRecord,
      tab: 'owner',
    });
    setIsAdminEmailModalOpen(true);
  };

  const handleSendTestBuyerConfirmation = () => {
    const testRecord: EmailRecord = sendEmailNotification({
      recipientType: 'buyer',
      recipientEmail: 'client@example.com',
      recipientName: 'Valued Client',
      senderEmail: ownerEmailSetting.trim(),
      subject: `✨ [TEST] Order Confirmation & Reservation #LIYU-TEST-002 — LIYU Atelier`,
      htmlBody: `
        <div style="font-family: sans-serif; padding: 20px; background: #fff; border: 1px solid #DDD5C7; border-radius: 4px;">
          <h2 style="color: #1B2017; margin-top: 0;">LIYU HUMAN HAIR ATELIER</h2>
          <p>Dear Valued Client,</p>
          <p>This is a verified test email confirming how buyer confirmations look. Online card payments (Stripe) are currently Coming Soon, so your pieces are held with zero upfront payment.</p>
          <p><strong>Reserved Bundles:</strong> Burmese Deep Curl 22" (Black) x2 ($170 USD)</p>
          <p>Our concierge will reach out to you directly.</p>
          <p style="color: #7A8574; font-size: 12px;">Contact store owner at: ${ownerEmailSetting}</p>
        </div>
      `,
      textBody: `[TEST] Order Confirmation #LIYU-TEST-002.\nReserved 2 bundles Burmese Deep Curl 22". Total: $170 USD. Zero payment today.\nSupport: ${ownerEmailSetting}`,
      orderId: 'LIYU-TEST-002',
      totalAmount: 170,
    });
    setAdminEmailPreview({
      buyer: testRecord,
      tab: 'buyer',
    });
    setIsAdminEmailModalOpen(true);
  };

  const handlePreviewRequestEmail = (req: CustomerRequest) => {
    const matchedOwner = sentEmails.find(
      (e) => e.recipientType === 'owner' && (e.orderId === req.orderId || e.textBody.includes(req.customerName))
    );
    const matchedBuyer = sentEmails.find(
      (e) => e.recipientType === 'buyer' && (e.orderId === req.orderId || (req.customerEmail && e.recipientEmail === req.customerEmail))
    );

    if (matchedOwner || matchedBuyer) {
      setAdminEmailPreview({
        buyer: matchedBuyer,
        owner: matchedOwner,
        tab: matchedOwner ? 'owner' : 'buyer',
      });
      setIsAdminEmailModalOpen(true);
    } else {
      const synthOwner: EmailRecord = {
        id: `synth-${req.id}`,
        recipientType: 'owner',
        recipientEmail: ownerEmail,
        recipientName: 'LIYU Website Owner',
        senderEmail: 'orders@liyuhair.com',
        subject: `🚨 Customer Request: ${req.title} (${req.customerName})`,
        htmlBody: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #DDD5C7; background: #fff;">
            <h2 style="color: #1B2017; margin-top: 0;">Customer Request Notification</h2>
            <div style="background: #FAF7F2; padding: 14px; border: 1px solid #DDD5C7; margin: 12px 0;">
              <p style="margin: 0 0 6px;"><strong>Customer Name:</strong> ${req.customerName}</p>
              <p style="margin: 0 0 6px;"><strong>Phone / WhatsApp:</strong> ${req.customerPhone}</p>
              <p style="margin: 0 0 6px;"><strong>Email:</strong> ${req.customerEmail || 'Not specified'}</p>
              <p style="margin: 0 0 6px;"><strong>Title:</strong> ${req.title}</p>
              <p style="margin: 0 0 6px;"><strong>Request Details:</strong> ${req.details}</p>
              ${req.itemsSummary ? `<p style="margin: 0 0 6px;"><strong>Items:</strong> ${req.itemsSummary}</p>` : ''}
              ${req.totalAmount ? `<p style="margin: 0 0 6px;"><strong>Total Value:</strong> $${req.totalAmount} USD</p>` : ''}
            </div>
            <p style="color: #7A8574; font-size: 12px; margin: 0;">Delivered to website owner at ${ownerEmail}.</p>
          </div>
        `,
        textBody: `Customer Request: ${req.title}\nName: ${req.customerName}\nPhone: ${req.customerPhone}\nEmail: ${req.customerEmail || 'N/A'}\nDetails: ${req.details}\nTotal: $${req.totalAmount || 0} USD\nOwner Alert: ${ownerEmail}`,
        orderId: req.orderId,
        sentAt: req.createdAt,
        status: 'delivered',
        customerContact: {
          name: req.customerName,
          email: req.customerEmail || '',
          phone: req.customerPhone,
          address: 'Store / Delivery',
        },
      };

      setAdminEmailPreview({
        owner: synthOwner,
        tab: 'owner',
      });
      setIsAdminEmailModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2017] pb-24">
      {/* Top Admin Header Bar */}
      <div className="bg-[#1B2017] text-white border-b border-[#35402D] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateToPage('home')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xs text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Storefront</span>
            </button>
            <div className="border-l border-white/20 pl-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#95B373] block">
                Atelier Management Portal
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                LIYU Hair Admin Suite
              </h1>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 text-xs">
            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#95B373]" />
              <span className="text-white/70">On Sale:</span>
              <span className="font-mono font-bold text-white">{inStockCount}/{totalProductsCount}</span>
            </div>
            {outOfStockCount > 0 && (
              <div className="px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-xs flex items-center gap-2 text-amber-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="font-semibold">{outOfStockCount} Out of Stock</span>
              </div>
            )}
            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xs flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5 text-[#95B373]" />
              <span className="text-white/70">Requests:</span>
              <span className="font-mono font-bold text-white">{pendingRequestsCount} Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-[#E0D8CA] px-4 sm:px-8 shadow-xs sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto scrollbar-none text-xs uppercase tracking-[0.16em] font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'products'
                ? 'border-[#95B373] text-[#1B2017]'
                : 'border-transparent text-[#6A7563] hover:text-[#1B2017]'
            }`}
          >
            <Package className="w-4 h-4 text-[#95B373]" />
            <span>Products & Stock ({totalProductsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('types')}
            className={`py-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'types'
                ? 'border-[#95B373] text-[#1B2017]'
                : 'border-transparent text-[#6A7563] hover:text-[#1B2017]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#95B373]" />
            <span>Product Types ({productTypes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`py-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'requests'
                ? 'border-[#95B373] text-[#1B2017]'
                : 'border-transparent text-[#6A7563] hover:text-[#1B2017]'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-[#95B373]" />
            <span>Customer Requests & Orders ({requests.length})</span>
            {pendingRequestsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#95B373] text-white text-[10px] font-mono flex items-center justify-center">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`py-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'emails'
                ? 'border-[#95B373] text-[#1B2017]'
                : 'border-transparent text-[#6A7563] hover:text-[#1B2017]'
            }`}
          >
            <Mail className="w-4 h-4 text-[#95B373]" />
            <span>Email Logs ({sentEmails.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'settings'
                ? 'border-[#95B373] text-[#1B2017]'
                : 'border-transparent text-[#6A7563] hover:text-[#1B2017]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#95B373]" />
            <span>Settings & Alerts</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ========================================================= */}
        {/* TAB 1: PRODUCTS & INVENTORY MANAGEMENT                     */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header controls & Add Product CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Live Store Catalog
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  Manage Products & Inventory
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Control products on sale, toggle in-stock / out-of-stock instantly, update prices, or replace pictures.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-4 py-2.5 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Product</span>
                </button>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 border border-[#DDD5C7] rounded-xs shadow-xs text-xs">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or texture..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 pl-8 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                />
                <Search className="w-3.5 h-3.5 text-[#778170] absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={productTypeFilter}
                  onChange={(e) => setProductTypeFilter(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Types / Categories ({productTypes.length})</option>
                  {productTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Filter */}
              <div>
                <select
                  value={productStockFilter}
                  onChange={(e) => setProductStockFilter(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="in_stock">In Stock Only ({inStockCount})</option>
                  <option value="out_of_stock">Out of Stock Only ({outOfStockCount})</option>
                </select>
              </div>

              {/* Sale Filter */}
              <div>
                <select
                  value={productSaleFilter}
                  onChange={(e) => setProductSaleFilter(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Sale Statuses</option>
                  <option value="on_sale">On Flash Sale Only ({onSaleCount})</option>
                  <option value="regular">Regular Price Only</option>
                </select>
              </div>
            </div>

            {/* Products List Table / Cards */}
            <div className="bg-white border border-[#DDD5C7] rounded-xs shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#DDD5C7] text-[10px] uppercase tracking-wider text-[#63705C] font-bold">
                      <th className="py-3 px-4">Photo</th>
                      <th className="py-3 px-4">Product Details</th>
                      <th className="py-3 px-4">Type & Donor</th>
                      <th className="py-3 px-4">1 Piece Price</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">On Sale</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D6]">
                    {filteredProducts.map((p) => {
                      const isInStock = p.inStock !== false;
                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-[#FAF7F2]/80 transition-colors"
                        >
                          {/* Image preview with quick change button */}
                          <td className="py-3.5 px-4 w-20">
                            <div className="relative group w-14 h-18 bg-[#F4EFE6] border border-[#DDD5C7] rounded-xs overflow-hidden">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-full h-full object-cover object-center"
                              />
                              <button
                                onClick={() => handleOpenPictureChanger(p)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] uppercase font-bold text-center p-1 cursor-pointer"
                                title="Change picture"
                              >
                                Change Photo
                              </button>
                            </div>
                          </td>

                          {/* Details */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-[#7A8574]">#{String(p.catalogNumber).padStart(2, '0')}</span>
                              <h3 className="font-serif font-bold text-sm text-[#1B2017]">
                                {p.name}
                              </h3>
                            </div>
                            <p className="text-[11px] text-[#606D59] line-clamp-1 mt-0.5">
                              {p.shortDescription}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {p.isBestseller && (
                                <span className="text-[9px] px-1.5 py-0.2 bg-[#E9E4D8] text-[#2F3C28] rounded font-semibold uppercase">
                                  Bestseller
                                </span>
                              )}
                              {p.isNewArrival && (
                                <span className="text-[9px] px-1.5 py-0.2 bg-[#95B373]/20 text-[#2B3E1F] rounded font-semibold uppercase">
                                  New
                                </span>
                              )}
                              <span className="text-[10px] text-[#73806C]">
                                {p.availableColors.length} Colors · {p.availableLengths?.length || 5} Lengths
                              </span>
                            </div>
                          </td>

                          {/* Category and Donor */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-semibold text-[#1B2017] block">
                              {p.category}
                            </span>
                            <span className="text-[11px] text-[#62705D] block">
                              {p.donorCategory}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                            <div className="font-bold text-sm text-[#1B2017]">
                              ${p.basePrice} USD
                            </div>
                            {p.maxPrice && p.maxPrice > p.basePrice && (
                              <span className="text-[10px] text-[#788571] block">
                                up to ${p.maxPrice} USD
                              </span>
                            )}
                          </td>

                          {/* Stock Toggle Switch */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => toggleProductStock(p.id)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                isInStock
                                  ? 'bg-[#95B373]/20 text-[#2B3E1F] border border-[#95B373]/40 hover:bg-[#95B373]/30'
                                  : 'bg-red-100 text-red-800 border border-red-300 hover:bg-red-200'
                              }`}
                              title="Click to toggle In Stock / Out of Stock"
                            >
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isInStock ? 'bg-[#95B373]' : 'bg-red-500'
                                }`}
                              />
                              <span>{isInStock ? 'In Stock' : 'Out of Stock'}</span>
                            </button>
                          </td>

                          {/* On Sale Toggle */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => toggleProductSale(p.id, 15)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                p.isFlashSale
                                  ? 'bg-[#95B373] text-white shadow-xs'
                                  : 'bg-white text-[#56644E] border border-[#DDD5C7] hover:border-[#1B2017]'
                              }`}
                              title="Toggle Flash Sale"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{p.isFlashSale ? `-${p.discountPercentage || 15}% Sale` : 'Regular'}</span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                            <button
                              onClick={() => handleOpenPictureChanger(p)}
                              className="p-1.5 text-[#4D5A46] hover:text-[#1B2017] hover:bg-[#EAE3D6] rounded transition-colors cursor-pointer"
                              title="Change Product Picture"
                            >
                              <ImageIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-[#4D5A46] hover:text-[#1B2017] hover:bg-[#EAE3D6] rounded transition-colors cursor-pointer"
                              title="Edit Details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove "${p.name}" from the store catalog?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="p-12 text-center text-[#6D7A66]">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No products match the selected filters.</p>
                    <button
                      onClick={() => {
                        setProductSearch('');
                        setProductTypeFilter('all');
                        setProductStockFilter('all');
                        setProductSaleFilter('all');
                      }}
                      className="mt-3 text-xs text-[#95B373] font-bold underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCT TYPES / CATEGORIES MANAGEMENT               */}
        {/* ========================================================= */}
        {activeTab === 'types' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Catalog Taxonomy
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  Product Types & Categories
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Add or remove types of products on sale (Wave, Pixie, Burmese, Raw Hair, etc.). Changes instantly update the storefront navigation and filters.
                </p>
              </div>
            </div>

            {/* Add New Type Box */}
            <div className="bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#1B2017] mb-2">
                Add New Product Type
              </h3>
              <form onSubmit={handleAddTypeSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="e.g. Straight Silk, Kinky Curly, Water Wave..."
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  className="w-full sm:flex-1 bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                />
                <button
                  type="submit"
                  disabled={!newTypeName.trim()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1B2017] hover:bg-[#2C3823] disabled:opacity-50 text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#95B373]" />
                  <span>Create Type</span>
                </button>
              </form>
            </div>

            {/* List of current Types with stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {productTypes.map((type) => {
                const count = products.filter((p) => p.category === type).length;
                return (
                  <div
                    key={type}
                    className="bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs flex items-center justify-between group hover:border-[#95B373] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#95B373]" />
                        <h4 className="font-serif text-base font-bold text-[#1B2017]">
                          {type}
                        </h4>
                      </div>
                      <p className="text-xs text-[#63705C] mt-1">
                        {count} {count === 1 ? 'product' : 'products'} currently on sale
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            count > 0
                              ? `Warning: There are ${count} products assigned to "${type}". Are you sure you want to remove this category?`
                              : `Remove category "${type}"?`
                          )
                        ) {
                          removeProductType(type);
                        }
                      }}
                      className="p-2 text-[#7A8574] hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Remove category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CUSTOMER REQUESTS & ORDERS MANAGEMENT               */}
        {/* ========================================================= */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Customer Requests Center
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  Customer Orders & Appointment Requests
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Manage web customer orders, in-store VIP fitting consultations, and custom raw hair sourcing inquiries.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddRequestModalOpen(true)}
                  className="px-4 py-2.5 bg-[#1B2017] hover:bg-[#2C3823] text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#95B373]" />
                  <span>Log Manual Request / Walk-in</span>
                </button>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 border border-[#DDD5C7] rounded-xs shadow-xs text-xs">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by customer name, phone, email, or order..."
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 pl-8 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                />
                <Search className="w-3.5 h-3.5 text-[#778170] absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={requestTypeFilter}
                  onChange={(e) => setRequestTypeFilter(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Request Types</option>
                  <option value="order">Web Order Requests</option>
                  <option value="consultation">In-Store VIP Consultations</option>
                  <option value="custom_inquiry">Custom Hair Sourcing</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={requestStatusFilter}
                  onChange={(e) => setRequestStatusFilter(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing / In Transit</option>
                  <option value="completed">Completed / Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Requests Cards List */}
            <div className="space-y-4">
              {filteredRequests.map((req) => {
                const isPending = req.status === 'pending';
                const isConfirmed = req.status === 'confirmed';
                const isProcessing = req.status === 'processing';
                const isCompleted = req.status === 'completed';

                return (
                  <div
                    key={req.id}
                    className="bg-white border border-[#DDD5C7] p-5 rounded-xs shadow-xs hover:border-[#95B373] transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#EAE3D6]">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                            req.type === 'order'
                              ? 'bg-[#95B373]/20 text-[#2C3F1E]'
                              : req.type === 'consultation'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {req.type === 'order'
                            ? 'Web Order'
                            : req.type === 'consultation'
                            ? 'Boutique Consultation'
                            : 'Custom Hair Sourcing'}
                        </span>

                        <h3 className="font-serif font-bold text-base text-[#1B2017]">
                          {req.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#73806D] font-bold">
                            Status:
                          </span>
                          <select
                            value={req.status}
                            onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                            className={`p-1.5 rounded text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                              isPending
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : isConfirmed
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : isProcessing
                                ? 'bg-[#95B373]/20 text-[#2C3E1F] border-[#95B373]'
                                : isCompleted
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing / In Transit</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Direct WhatsApp Customer button */}
                        <button
                          onClick={() => handleOpenWhatsAppChat(req)}
                          className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          title="Open WhatsApp chat with client"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Customer info */}
                      <div className="space-y-1">
                        <div className="font-semibold text-[#1B2017]">
                          Client: {req.customerName}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#5F6C57]">
                          <Phone className="w-3 h-3 text-[#95B373]" />
                          <span>{req.customerPhone}</span>
                        </div>
                        {req.customerEmail && (
                          <div className="flex items-center gap-1.5 text-[#5F6C57]">
                            <Mail className="w-3 h-3 text-[#95B373]" />
                            <span>{req.customerEmail}</span>
                          </div>
                        )}
                        <div className="text-[10px] text-[#788570]">
                          Received: {new Date(req.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Request specific information */}
                      <div className="space-y-1 md:col-span-2">
                        <p className="text-[#333E2C] leading-relaxed">
                          <strong>Details:</strong> {req.details}
                        </p>
                        {req.itemsSummary && (
                          <p className="text-[#55634E] text-[11px]">
                            <strong>Items:</strong> {req.itemsSummary}
                          </p>
                        )}
                        {req.appointmentDate && (
                          <p className="text-[#2B3E1F] font-medium text-[11px] flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#95B373]" />
                            <span>
                              Scheduled for <strong>{req.appointmentDate} at {req.appointmentTime}</strong> ({req.storeLocation})
                            </span>
                          </p>
                        )}
                        {req.totalAmount && (
                          <div className="text-[#1B2017] font-mono font-bold text-sm pt-1">
                            Total Value: ${req.totalAmount} USD
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email and Concierge Quick Actions Bar */}
                    <div className="mt-3 pt-2.5 pb-2 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Preview Emails button */}
                        <button
                          type="button"
                          onClick={() => handlePreviewRequestEmail(req)}
                          className="px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Preview the exact email dispatched for this request"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#95B373]" />
                          <span>View Sent Emails</span>
                        </button>

                        {/* Email Customer directly */}
                        {req.customerEmail ? (
                          <a
                            href={`mailto:${req.customerEmail}?subject=${encodeURIComponent(`LIYU Hair Atelier: Regarding your request #${req.id}`)}`}
                            className="px-2.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#444E3D] border border-[#DDD5C7] rounded-xs text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#95B373]" />
                            <span>Email Buyer</span>
                          </a>
                        ) : null}

                        {/* WhatsApp customer link */}
                        <a
                          href={`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${req.customerName}! This is LIYU Human Hair Atelier regarding your request ${req.title}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#1EBE5D] border border-[#DDD5C7] rounded-xs text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp ({req.customerPhone})</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-[#717E6A]">
                        <span className="inline-flex items-center gap-1 bg-[#95B373]/10 text-[#2C401D] px-2 py-0.5 rounded font-mono font-medium">
                          <Check className="w-3 h-3 text-[#95B373]" />
                          Owner Alert: {ownerEmail}
                        </span>
                      </div>
                    </div>

                    {/* Admin internal memo notes */}
                    <div className="mt-2 pt-2 border-t border-[#EAE3D6] flex items-center justify-between text-[11px]">
                      <div className="text-[#6D7B64] flex items-center gap-2 flex-1 mr-4">
                        <span className="font-bold uppercase tracking-wider text-[#4E5C46]">Atelier Note:</span>
                        <input
                          type="text"
                          defaultValue={req.adminNotes || ''}
                          placeholder="Type internal note and press Enter to save..."
                          onBlur={(e) => updateRequestStatus(req.id, req.status, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateRequestStatus(req.id, req.status, e.currentTarget.value);
                            }
                          }}
                          className="flex-1 bg-[#FAF7F2] border border-[#DDD5C7] px-2 py-1 rounded text-xs text-[#1B2017]"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this request from history?')) {
                            deleteRequest(req.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                        title="Delete request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredRequests.length === 0 && (
                <div className="p-12 text-center bg-white border border-[#DDD5C7] rounded-xs text-[#6D7A66]">
                  <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">No customer requests match the active filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EMAIL DISPATCH & NOTIFICATIONS LOG                 */}
        {/* ========================================================= */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 border border-[#DDD5C7] rounded-xs shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Automated Communications Log
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  Email Dispatch & Notification History
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Audit itemized confirmation emails sent to buyers and real-time alert notifications dispatched to the website owner (<strong className="text-[#1B2017]">{ownerEmail}</strong>).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSendTestOwnerAlert}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Send Test Owner Alert</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendTestBuyerConfirmation}
                  className="px-3.5 py-2 bg-[#95B373] hover:bg-[#82A260] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Buyer Email</span>
                </button>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 border border-[#DDD5C7] rounded-xs shadow-xs text-xs">
              {/* Search */}
              <div className="relative sm:col-span-2">
                <input
                  type="text"
                  placeholder="Search emails by recipient, subject, customer name, or details..."
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 pl-8 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                />
                <Search className="w-3.5 h-3.5 text-[#778170] absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Recipient Filter */}
              <div>
                <select
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                >
                  <option value="all">All Dispatched Emails ({sentEmails.length})</option>
                  <option value="owner">Sent to Website Owner ({sentEmails.filter((e) => e.recipientType === 'owner').length})</option>
                  <option value="buyer">Sent to Buyers ({sentEmails.filter((e) => e.recipientType === 'buyer').length})</option>
                </select>
              </div>
            </div>

            {/* Emails List */}
            <div className="space-y-3">
              {filteredEmails.map((item) => {
                const isOwner = item.recipientType === 'owner';
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#DDD5C7] p-4 sm:p-5 rounded-xs shadow-xs hover:border-[#95B373] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#EAE3D6]">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            isOwner
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {isOwner ? <Bell className="w-3 h-3 text-amber-600" /> : <Mail className="w-3 h-3 text-emerald-600" />}
                          <span>{isOwner ? 'Alert to Website Owner' : 'Confirmation to Buyer'}</span>
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#1B2017]">
                          To: {item.recipientName} &lt;{item.recipientEmail}&gt;
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#717E6A] font-mono">
                          {new Date(item.sentAt).toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase">
                          Delivered
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5">
                      <h4 className="text-sm font-bold text-[#1B2017] mb-1">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-[#55634E] line-clamp-2 leading-relaxed">
                        {item.textBody}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        {item.orderId && (
                          <span className="font-mono text-[11px] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#DDD5C7] font-semibold text-[#1B2017]">
                            Order: #{item.orderId}
                          </span>
                        )}
                        {item.totalAmount && (
                          <span className="font-mono text-[11px] font-bold text-[#2C401D]">
                            Total: ${item.totalAmount} USD
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setAdminEmailPreview({
                              buyer: isOwner ? undefined : item,
                              owner: isOwner ? item : undefined,
                              tab: isOwner ? 'owner' : 'buyer',
                            });
                            setIsAdminEmailModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#95B373]" />
                          <span>Preview Full Email</span>
                        </button>

                        <a
                          href={`mailto:${item.recipientEmail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.textBody)}`}
                          className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#444E3D] border border-[#DDD5C7] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open in Mail Client</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredEmails.length === 0 && (
                <div className="p-12 text-center bg-white border border-[#DDD5C7] rounded-xs text-[#6D7A66]">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">No emails match the active filter.</p>
                  <p className="text-xs text-[#717E6A] mt-1">
                    When customers confirm order requests, email records will be archived and displayed here automatically.
                  </p>
                </div>
              )}
            </div>

            {sentEmails.length > 0 && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Clear all sent email logs from history?')) {
                      clearSentEmails();
                    }
                  }}
                  className="px-3.5 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                >
                  Clear Email Logs History
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: WEBSITE OWNER ALERTS & STORE SETTINGS              */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            {/* Feedback notification banner */}
            {settingsSuccessMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xs text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{settingsSuccessMessage}</span>
              </div>
            )}

            {/* SECTION 1: WEBSITE OWNER ALERTS & NOTIFICATIONS */}
            <div className="bg-white p-6 border border-[#DDD5C7] rounded-xs shadow-xs space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Notification Center
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  Website Owner Email & Alert Settings
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Set the email address and contact where order requests, customer inquiries, and buyer requests are delivered immediately.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Owner Email Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Website Owner Alert Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={ownerEmailSetting}
                    onChange={(e) => setOwnerEmailSetting(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] font-mono focus:outline-none focus:border-[#95B373]"
                    placeholder="yeabserabruk1234@gmail.com"
                  />
                  <span className="text-[10px] text-[#717E6A] mt-0.5 block">
                    Every time a customer confirms an order request, a notification email with customer contact info & request details will be sent here.
                  </span>
                </div>

                {/* Owner Phone / WhatsApp */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Website Owner Phone Number / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhoneSetting}
                    onChange={(e) => setOwnerPhoneSetting(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] font-mono focus:outline-none focus:border-[#95B373]"
                    placeholder="+251911234567"
                  />
                </div>

                {/* Stripe Payments Coming Soon Toggle */}
                <div className="p-4 bg-[#FFF9E6] border border-[#FFE082] rounded-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#7A5500] uppercase tracking-wider">
                      Stripe Online Card Payments Status
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stripeComingSoonSetting}
                        onChange={(e) => setStripeComingSoonSetting(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-[#8C6D1F] leading-relaxed">
                    <strong>Current status: {stripeComingSoonSetting ? 'Coming Soon (Active)' : 'Live Active'}</strong>.<br />
                    While awaiting business card & documents, keeping this enabled ensures the Order Now page says <em>Coming Soon</em> and customers can submit zero-payment order reservations with instant email alerts.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendTestOwnerAlert}
                    className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-600" />
                    <span>Send Test Alert to {ownerEmailSetting}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestBuyerConfirmation}
                    className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#95B373]" />
                    <span>Send Test Buyer Confirmation</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 2: WHATSAPP SETTINGS */}
            <div className="bg-white p-6 border border-[#DDD5C7] rounded-xs shadow-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D8876]">
                  Integrations
                </span>
                <h2 className="font-serif text-2xl text-[#1B2017]">
                  WhatsApp Direct Concierge Settings
                </h2>
                <p className="text-xs text-[#5C6755]">
                  Configure the WhatsApp floating toggle button that links customers straight to WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {/* Show toggle checkbox */}
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs">
                  <input
                    type="checkbox"
                    id="show-whatsapp-toggle"
                    checked={toggleVisibleSetting}
                    onChange={(e) => setToggleVisibleSetting(e.target.checked)}
                    className="w-4 h-4 text-[#25D366] rounded cursor-pointer"
                  />
                  <label htmlFor="show-whatsapp-toggle" className="cursor-pointer font-semibold text-[#1B2017]">
                    Enable WhatsApp Floating Toggle Button on bottom right of the storefront
                  </label>
                </div>

                {/* WhatsApp Phone Number */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    WhatsApp Business Phone Number (International format with country code)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+251911234567"
                    value={phoneSetting}
                    onChange={(e) => setPhoneSetting(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] font-mono focus:outline-none focus:border-[#25D366]"
                  />
                  <span className="text-[10px] text-[#717E6A] mt-0.5 block">
                    Example: +251 911 234 567 (Ethiopia) or +971 50 123 4567 (Dubai)
                  </span>
                </div>

                {/* Default Greeting Text */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Default Welcome / Inquiry Greeting Text
                  </label>
                  <textarea
                    rows={2}
                    value={greetingSetting}
                    onChange={(e) => setGreetingSetting(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#25D366]"
                  />
                </div>

                {/* Business Hours */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Business Hours Label
                  </label>
                  <input
                    type="text"
                    value={hoursSetting}
                    onChange={(e) => setHoursSetting(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#25D366]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B2017] hover:bg-[#2C3823] text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Save All Settings & Alerts
                  </button>

                  <a
                    href={`https://wa.me/${phoneSetting.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(greetingSetting || 'Hello LIYU Hair Atelier!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#1B2017] border border-[#DDD5C7] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Test Direct WhatsApp Link</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Catalog Reset Safety Box */}
            <div className="bg-white p-6 border border-red-200 rounded-xs shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-red-900">
                Reset Catalog to Original Defaults
              </h3>
              <p className="text-xs text-[#5D6755]">
                If you ever want to revert product catalog changes and restore the pristine 7 bundle products with their original images, click the reset button below.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to restore the default catalog? This will overwrite your custom product edits.')) {
                    resetProductsToDefault();
                  }
                }}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Reset Catalog to Defaults
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: CHANGE PRODUCT PICTURE                             */}
      {/* ========================================================= */}
      {changingPictureProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setChangingPictureProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#56644E] hover:text-[#1B2017] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#95B373] block mb-1">
              Visual Asset Manager
            </span>
            <h3 className="font-serif text-2xl text-[#1B2017] mb-1">
              Change Picture for {changingPictureProduct.name}
            </h3>
            <p className="text-xs text-[#5B6753] mb-5">
              Choose from authentic hair bundle images, upload a new photo from your device, or paste a link.
            </p>

            {/* Current Active Preview */}
            <div className="flex items-center gap-4 p-4 bg-white border border-[#DDD5C7] rounded-xs mb-5">
              <div className="w-20 h-24 bg-[#F4EFE6] border border-[#DDD5C7] rounded-xs overflow-hidden shrink-0">
                <img
                  src={customImageUrl.trim() || selectedImageSrc}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#63705C] block">
                  New Image Preview
                </span>
                <p className="text-xs text-[#20291A] font-semibold break-all">
                  {customImageUrl.trim() || selectedImageSrc}
                </p>
                <span className="text-[10px] text-[#788571] mt-0.5 block">
                  This photo will become the primary product image across cards, search, and details.
                </span>
              </div>
            </div>

            {/* Option A: Preset Authentic Bundle Images Grid */}
            <div className="space-y-2 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#45523D] block">
                Choose from Hair Bundle Images:
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1">
                {PRESET_BUNDLE_IMAGES.map((img) => {
                  const isSelected = selectedImageSrc === img.path && !customImageUrl;
                  return (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => {
                        setSelectedImageSrc(img.path);
                        setCustomImageUrl('');
                      }}
                      className={`relative aspect-[3/4] bg-[#F4EFE6] border-2 rounded-xs overflow-hidden transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#95B373] ring-2 ring-[#95B373]/30 scale-102'
                          : 'border-[#DDD5C7] hover:border-[#95B373]'
                      }`}
                      title={img.label}
                    >
                      <img src={img.path} alt={img.label} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#95B373] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option B: Upload Photo from Device */}
            <div className="p-4 bg-white border border-[#DDD5C7] rounded-xs mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#1B2017] block">
                  Upload Custom Photo from Your Computer
                </span>
                <span className="text-[11px] text-[#63705C]">
                  PNG, JPG, or WebP hair photograph from your local files.
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#95B373]" />
                <span>Select File</span>
              </button>
            </div>

            {/* Option C: Image URL input */}
            <div className="mb-6">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#45523D] mb-1">
                Or Paste Image URL:
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DDD5C7]">
              <button
                type="button"
                onClick={() => setChangingPictureProduct(null)}
                className="px-4 py-2.5 bg-white border border-[#DDD5C7] text-[#55634E] text-xs uppercase tracking-wider rounded-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePictureChange}
                className="px-6 py-2.5 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-[0.16em] rounded-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Apply New Picture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT                                 */}
      {/* ========================================================= */}
      {(isAddProductModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddProductModalOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#56644E] hover:text-[#1B2017] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#95B373] block mb-1">
              Product Editor
            </span>
            <h3 className="font-serif text-2xl text-[#1B2017] mb-1">
              {editingProduct ? `Edit ${editingProduct.name}` : 'Add Another Product to Sale'}
            </h3>
            <p className="text-xs text-[#5B6753] mb-5">
              Fill in the bundle details, pricing, availability, and donor grade.
            </p>

            <form onSubmit={editingProduct ? handleEditProductSubmit : handleAddProductSubmit} className="space-y-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elysian Body Wave Brazilian"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] focus:outline-none focus:border-[#95B373]"
                />
              </div>

              {/* Category/Type and Donor Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Category / Type *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                  >
                    {productTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Donor Fullness Grade *
                  </label>
                  <select
                    value={productForm.donorCategory}
                    onChange={(e) => setProductForm({ ...productForm, donorCategory: e.target.value as DonorCategory })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                  >
                    <option value="Double Donor">Double Donor (85%–90% Equal Length · Brazil)</option>
                    <option value="Super Double Donor">Super Double Donor (100% Equal Length · Vietnam)</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    1 Piece Base Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="1000"
                    required
                    value={productForm.basePrice}
                    onChange={(e) => setProductForm({ ...productForm, basePrice: Number(e.target.value) })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Max Price for Longest Length ($ USD)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="1000"
                    value={productForm.maxPrice}
                    onChange={(e) => setProductForm({ ...productForm, maxPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017] font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 bg-white border border-[#DDD5C7] rounded-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 text-[#95B373] rounded"
                    />
                    <span className="font-bold text-[#1B2017]">Currently In Stock</span>
                  </label>
                </div>
              </div>

              {/* Sale & Badges */}
              <div className="p-3 bg-white border border-[#DDD5C7] rounded-xs space-y-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#1B2017]">
                    <input
                      type="checkbox"
                      checked={productForm.isFlashSale}
                      onChange={(e) => setProductForm({ ...productForm, isFlashSale: e.target.checked })}
                      className="w-4 h-4 text-[#95B373] rounded"
                    />
                    <span>Put On Flash Sale</span>
                  </label>

                  {productForm.isFlashSale && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#64705D]">Discount %:</span>
                      <select
                        value={productForm.discountPercentage}
                        onChange={(e) => setProductForm({ ...productForm, discountPercentage: Number(e.target.value) })}
                        className="bg-[#FAF7F2] border border-[#DDD5C7] px-2 py-1 rounded font-mono font-bold"
                      >
                        <option value="10">10% Off</option>
                        <option value="15">15% Off</option>
                        <option value="20">20% Off</option>
                        <option value="25">25% Off</option>
                        <option value="30">30% Off</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#485340]">
                    <input
                      type="checkbox"
                      checked={productForm.isBestseller}
                      onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                    />
                    <span>Bestseller Badge</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#485340]">
                    <input
                      type="checkbox"
                      checked={productForm.isNewArrival}
                      onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                    />
                    <span>New Arrival Badge</span>
                  </label>
                </div>
              </div>

              {/* Product Picture Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Primary Picture
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-2 bg-white border border-[#DDD5C7] rounded-xs max-h-36 overflow-y-auto mb-2">
                  {PRESET_BUNDLE_IMAGES.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: img.path })}
                      className={`relative aspect-[3/4] bg-[#F4EFE6] border-2 rounded-xs overflow-hidden transition-all cursor-pointer ${
                        productForm.image === img.path
                          ? 'border-[#95B373] ring-2 ring-[#95B373]/30'
                          : 'border-[#DDD5C7]'
                      }`}
                    >
                      <img src={img.path} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom image URL"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2 rounded-xs text-xs text-[#1B2017]"
                />
              </div>

              {/* Short & Detailed Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DDD5C7]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2.5 bg-white border border-[#DDD5C7] text-[#55634E] text-xs uppercase tracking-wider rounded-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#95B373] hover:bg-[#82A260] text-white text-xs uppercase tracking-[0.16em] rounded-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product to Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: LOG MANUAL CUSTOMER REQUEST                        */}
      {/* ========================================================= */}
      {isAddRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddRequestModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#56644E] hover:text-[#1B2017] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#95B373] block mb-1">
              Manual Intake
            </span>
            <h3 className="font-serif text-2xl text-[#1B2017] mb-1">
              Log Customer Request / Walk-in
            </h3>
            <p className="text-xs text-[#5B6753] mb-5">
              Record a phone order, walk-in consultation, or custom sourcing inquiry.
            </p>

            <form onSubmit={handleAddRequestSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Request Type *
                </label>
                <select
                  value={requestForm.type}
                  onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value as RequestType })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                >
                  <option value="custom_inquiry">Custom Hair Sourcing / Wholesale</option>
                  <option value="consultation">In-Store VIP Consultation Appointment</option>
                  <option value="order">Phone / Direct Customer Order</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sara Haile"
                    value={requestForm.customerName}
                    onChange={(e) => setRequestForm({ ...requestForm, customerName: e.target.value })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 911 ..."
                    value={requestForm.customerPhone}
                    onChange={(e) => setRequestForm({ ...requestForm, customerPhone: e.target.value })}
                    className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Title / Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiring for 3 bundles of 26-inch Burmese hair"
                  value={requestForm.title}
                  onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                  Full Details & Specific Requests *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide hair bundle specs, desired delivery location, or appointment requirements..."
                  value={requestForm.details}
                  onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
                  className="w-full bg-white border border-[#DDD5C7] p-2.5 rounded-xs text-xs text-[#1B2017]"
                />
              </div>

              {requestForm.type === 'consultation' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-white border border-[#DDD5C7] rounded-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={requestForm.appointmentDate}
                      onChange={(e) => setRequestForm({ ...requestForm, appointmentDate: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2 rounded-xs text-xs text-[#1B2017]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#44523C] mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="text"
                      value={requestForm.appointmentTime}
                      onChange={(e) => setRequestForm({ ...requestForm, appointmentTime: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DDD5C7] p-2 rounded-xs text-xs text-[#1B2017]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DDD5C7]">
                <button
                  type="button"
                  onClick={() => setIsAddRequestModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-[#DDD5C7] text-[#55634E] text-xs uppercase tracking-wider rounded-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B2017] hover:bg-[#2C3823] text-white text-xs uppercase tracking-[0.16em] rounded-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Save Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispatched Email Notification Preview Modal */}
      <EmailPreviewModal
        isOpen={isAdminEmailModalOpen}
        onClose={() => setIsAdminEmailModalOpen(false)}
        buyerEmail={adminEmailPreview?.buyer}
        ownerEmail={adminEmailPreview?.owner}
        initialTab={adminEmailPreview?.tab || 'owner'}
      />
    </div>
  );
};
