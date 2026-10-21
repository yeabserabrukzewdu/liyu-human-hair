import { Order, EmailRecord } from '../types';

export interface CustomerContactInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}

/**
 * Generates an itemized HTML & Text email for the buyer upon order/reservation confirmation
 */
export function generateBuyerEmail(
  order: Order,
  contact: CustomerContactInfo,
  ownerEmail: string
): { subject: string; html: string; text: string } {
  const subject = `Order Confirmation & Reservation #${order.id} — LIYU Human Hair Atelier`;

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #EFEAE0;">
        <strong style="color: #1B2017; font-size: 14px;">${item.productName}</strong><br/>
        <span style="color: #6A7563; font-size: 12px;">Length: ${item.length}" &nbsp;|&nbsp; Color: ${item.color}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #EFEAE0; text-align: center; color: #1B2017; font-size: 13px;">
        ${item.quantity} ${item.quantity === 1 ? 'bundle' : 'bundles'}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #EFEAE0; text-align: right; color: #1B2017; font-weight: 600; font-size: 14px;">
        $${item.price * item.quantity} USD
      </td>
    </tr>
  `
    )
    .join('');

  const itemsText = order.items
    .map((item) => `- ${item.productName} (${item.length}" / ${item.color}) x${item.quantity} = $${item.price * item.quantity} USD`)
    .join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; margin: 0; padding: 24px; color: #1B2017;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #DDD5C7; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    
    <!-- Luxury Header -->
    <div style="background-color: #1B2017; color: #FAF7F2; padding: 28px 24px; text-align: center;">
      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 22px; letter-spacing: 0.15em; font-weight: 400; text-transform: uppercase;">
        LIYU HUMAN HAIR
      </h1>
      <p style="margin: 6px 0 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #95B373;">
        Raw & Virgin Hair Atelier · Order Reservation Confirmed
      </p>
    </div>

    <!-- Notice Banner -->
    <div style="background-color: #F4EFE6; border-bottom: 1px solid #DDD5C7; padding: 14px 24px; font-size: 12px; color: #55634E; line-height: 1.5;">
      <strong style="color: #2B3E1F;">Zero Upfront Payment Required Today:</strong> Our automated Stripe card processing is currently <em>Coming Soon</em> while our merchant business documents are finalized. Your selected pieces have been securely reserved and held in our atelier vault.
    </div>

    <!-- Main Body -->
    <div style="padding: 28px 24px;">
      <p style="font-size: 15px; margin: 0 0 16px; color: #1B2017;">
        Dear <strong>${contact.name}</strong>,
      </p>
      <p style="font-size: 13px; line-height: 1.6; color: #444E3D; margin: 0 0 20px;">
        Thank you for confirming your order request. We have received your request and your authentic 100% human hair bundles are now held for you under Reservation ID: <strong style="color: #2B3E1F; font-family: monospace;">${order.id}</strong>.
      </p>

      <!-- Order Summary Card -->
      <div style="background-color: #FAF7F2; border: 1px solid #DDD5C7; border-radius: 4px; padding: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #DDD5C7; padding-bottom: 10px; margin-bottom: 12px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6A7563; font-weight: 600;">Reservation ID</span>
          <span style="font-family: monospace; font-weight: bold; font-size: 13px; color: #1B2017;">${order.id}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #55634E;">
          <span>Courier Delivery Service:</span>
          <strong style="color: #1B2017;">DHL Express Worldwide</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #55634E; margin-top: 6px;">
          <span>Estimated Delivery Window:</span>
          <strong style="color: #1B2017;">3 to 5 Business Days</strong>
        </div>
      </div>

      <!-- Itemized Products Table -->
      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: #1B2017; margin: 0 0 12px; font-weight: 700; border-bottom: 1px solid #DDD5C7; padding-bottom: 8px;">
        Reserved Hair Bundles (1 Piece Price)
      </h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #FAF7F2; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6A7563;">
            <th style="padding: 8px 12px;">Product / Specs</th>
            <th style="padding: 8px 12px; text-align: center;">Qty</th>
            <th style="padding: 8px 12px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Calculations -->
      <div style="margin-left: auto; width: 240px; margin-bottom: 24px; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #55634E;">
          <span>Subtotal:</span>
          <span style="font-family: monospace; color: #1B2017;">$${order.subtotal} USD</span>
        </div>
        ${
          order.discount > 0
            ? `<div style="display: flex; justify-content: space-between; padding: 4px 0; color: #2C401D; font-weight: bold;">
                <span>VIP Discount:</span>
                <span style="font-family: monospace;">-$${order.discount} USD</span>
              </div>`
            : ''
        }
        <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #55634E;">
          <span>DHL Shipping:</span>
          <span style="font-family: monospace; color: #2C401D; font-weight: bold;">FREE</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid #DDD5C7; margin-top: 6px; font-weight: bold; font-size: 15px; color: #1B2017;">
          <span>Total Reserved:</span>
          <span style="font-family: monospace;">$${order.total} USD</span>
        </div>
      </div>

      <!-- Delivery & Contact Details -->
      <div style="background-color: #FAF7F2; border: 1px solid #DDD5C7; border-radius: 4px; padding: 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #1B2017;">
          Your Contact & Shipping Information
        </h4>
        <p style="margin: 0 0 4px; font-size: 13px; color: #1B2017;"><strong>Recipient:</strong> ${contact.name}</p>
        <p style="margin: 0 0 4px; font-size: 13px; color: #1B2017;"><strong>Email:</strong> ${contact.email}</p>
        <p style="margin: 0 0 4px; font-size: 13px; color: #1B2017;"><strong>Phone / WhatsApp:</strong> ${contact.phone}</p>
        <p style="margin: 0; font-size: 13px; color: #55634E;">
          <strong>Address:</strong> ${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}, ${contact.address.country}
        </p>
      </div>

      <!-- What Happens Next -->
      <div style="border-left: 3px solid #95B373; padding-left: 14px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px; font-size: 13px; color: #1B2017; font-weight: 700;">
          What Happens Next?
        </h4>
        <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.5; color: #55634E;">
          1. Our master atelier technician is inspecting the hair cuticle alignment and weft integrity for your bundles.
        </p>
        <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.5; color: #55634E;">
          2. Our concierge will contact you via WhatsApp (${contact.phone}) or email to coordinate delivery timing and payment arrangements.
        </p>
        <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #55634E;">
          3. If you have any urgent requests, you can email the store owner directly at <a href="mailto:${ownerEmail}" style="color: #2B3E1F; font-weight: bold;">${ownerEmail}</a>.
        </p>
      </div>

      <p style="font-size: 12px; color: #6A7563; margin: 0; text-align: center;">
        Warm regards,<br/>
        <strong>LIYU Human Hair Atelier Concierge Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #FAF7F2; border-top: 1px solid #DDD5C7; padding: 16px 24px; text-align: center; font-size: 11px; color: #7A8574;">
      LIYU Human Hair Atelier · Bole Brass Flagship Boutique, KKare Building (Addis Ababa)<br/>
      100% Brazilian & Vietnamese Real Virgin Human Hair Bundles · 1 Piece Price
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
LIYU HUMAN HAIR ATELIER
ORDER RESERVATION CONFIRMED: #${order.id}
------------------------------------------------------------
Dear ${contact.name},

Thank you for confirming your order with LIYU Human Hair Atelier.
Because our automated Stripe card gateway is currently Coming Soon while business documentation is completed, your selected bundles have been reserved with zero upfront payment today.

RESERVATION DETAILS:
Order / Reservation ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString()}
Courier: DHL Express Worldwide (Estimated 3-5 business days)

RESERVED ITEMS:
${itemsText}

Subtotal: $${order.subtotal} USD
Discount: -$${order.discount} USD
Shipping (DHL): FREE
TOTAL AMOUNT: $${order.total} USD

CUSTOMER & DELIVERY INFORMATION:
Name: ${contact.name}
Email: ${contact.email}
Phone / WhatsApp: ${contact.phone}
Address: ${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}, ${contact.address.country}

WHAT HAPPENS NEXT:
1. Our atelier team will inspect your hair bundle cuticles and prepare your pieces.
2. Our concierge will contact you on WhatsApp (${contact.phone}) or email to confirm delivery.
3. For any questions, contact us at ${ownerEmail}.

Warm regards,
LIYU Human Hair Atelier Concierge Team
  `.trim();

  return { subject, html, text };
}

/**
 * Generates an alert email for the website owner (yeabserabruk1234@gmail.com)
 * notifying them of the new customer request with customer contact and details.
 */
export function generateOwnerAlertEmail(
  order: Order,
  contact: CustomerContactInfo,
  ownerEmail: string
): { subject: string; html: string; text: string } {
  const subject = `🚨 NEW ORDER REQUEST: #${order.id} from ${contact.name} ($${order.total} USD)`;

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #DDD5C7;">
        <strong style="color: #1B2017; font-size: 13px;">${item.productName}</strong><br/>
        <span style="color: #6A7563; font-size: 12px;">Length: ${item.length}" &nbsp;|&nbsp; Color: ${item.color}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #DDD5C7; text-align: center; font-size: 13px; font-weight: bold;">
        ${item.quantity} bundle(s)
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #DDD5C7; text-align: right; font-size: 13px; font-family: monospace; font-weight: bold;">
        $${item.price * item.quantity} USD
      </td>
    </tr>
  `
    )
    .join('');

  const itemsText = order.items
    .map((item) => `- ${item.productName} (${item.length}" / ${item.color}) x${item.quantity} = $${item.price * item.quantity} USD`)
    .join('\n');

  const customerCleanPhone = contact.phone.replace(/[^0-9+]/g, '');
  const whatsAppDirectUrl = `https://wa.me/${customerCleanPhone.replace('+', '')}?text=${encodeURIComponent(
    `Hello ${contact.name}! This is LIYU Human Hair Atelier regarding your order request #${order.id}.`
  )}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; margin: 0; padding: 24px; color: #1B2017;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #FFFFFF; border: 2px solid #95B373; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
    
    <!-- Urgent Owner Notification Banner -->
    <div style="background-color: #1B2017; color: #FFFFFF; padding: 24px; text-align: left;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="background-color: #95B373; color: #1B2017; font-weight: bold; font-size: 11px; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.1em;">
          New Order Request
        </span>
        <span style="color: #E8E2D5; font-size: 12px; font-family: monospace;">
          ${new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 22px; font-weight: 500;">
        You Have Received a New Customer Request
      </h1>
      <p style="margin: 6px 0 0; font-size: 13px; color: #D0DEB5;">
        A customer has confirmed a product order request on your LIYU Hair website.
      </p>
    </div>

    <!-- Status Alert: Stripe Coming Soon -->
    <div style="background-color: #FFF9E6; border-bottom: 1px solid #FFE082; padding: 12px 24px; font-size: 12px; color: #7A5500;">
      <strong>⚠️ Stripe Card Payments Coming Soon:</strong> As configured, this order was placed as a reservation with zero upfront charge while your business documents are processed. Contact the customer directly to confirm details.
    </div>

    <div style="padding: 24px;">

      <!-- SECTION 1: CUSTOMER CONTACT INFORMATION -->
      <div style="background-color: #FAF7F2; border: 1px solid #DDD5C7; border-radius: 4px; padding: 18px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; color: #1B2017; font-weight: 800; border-bottom: 1px solid #DDD5C7; padding-bottom: 6px;">
          👤 Customer Contact Information
        </h2>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px 0; color: #6A7563; width: 140px; font-weight: 600;">Full Name:</td>
            <td style="padding: 5px 0; color: #1B2017; font-weight: bold; font-size: 14px;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #6A7563; font-weight: 600;">Email Address:</td>
            <td style="padding: 5px 0;">
              <a href="mailto:${contact.email}?subject=${encodeURIComponent(`Regarding your LIYU Hair Order #${order.id}`)}" style="color: #2563EB; font-weight: bold; text-decoration: underline;">
                ${contact.email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #6A7563; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="padding: 5px 0;">
              <strong style="color: #1B2017;">${contact.phone}</strong> &nbsp;
              <a href="${whatsAppDirectUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-size: 11px; padding: 2px 8px; border-radius: 3px; text-decoration: none; font-weight: bold;">
                Chat on WhatsApp
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #6A7563; font-weight: 600; vertical-align: top;">Shipping Address:</td>
            <td style="padding: 5px 0; color: #1B2017; line-height: 1.4;">
              ${contact.address.street}<br/>
              ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}<br/>
              <strong>${contact.address.country}</strong>
            </td>
          </tr>
        </table>
      </div>

      <!-- SECTION 2: CUSTOMER'S REQUEST / ORDER DETAILS -->
      <div style="background-color: #FFFFFF; border: 1px solid #DDD5C7; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #DDD5C7; padding-bottom: 8px; margin-bottom: 12px;">
          <h2 style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; color: #1B2017; font-weight: 800;">
            🛍️ Customer's Request Details
          </h2>
          <span style="font-family: monospace; font-size: 13px; font-weight: bold; color: #95B373;">
            #${order.id}
          </span>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px;">
          <thead>
            <tr style="background-color: #FAF7F2; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #6A7563;">
              <th style="padding: 8px 10px;">Item</th>
              <th style="padding: 8px 10px; text-align: center;">Quantity</th>
              <th style="padding: 8px 10px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; font-size: 14px; border-top: 1px solid #DDD5C7; padding-top: 10px;">
          <span style="color: #6A7563;">Total Request Value:</span>
          <strong style="color: #1B2017; font-size: 18px; margin-left: 8px; font-family: monospace;">
            $${order.total} USD
          </strong>
        </div>
      </div>

      <!-- QUICK ACTION BUTTONS FOR OWNER -->
      <div style="text-align: center; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
        <a href="mailto:${contact.email}?subject=${encodeURIComponent(`LIYU Hair Atelier: Regarding your order #${order.id}`)}" style="display: inline-block; background-color: #1B2017; color: #FFFFFF; padding: 12px 20px; border-radius: 3px; font-size: 12px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
          ✉️ Email Buyer Directly
        </a>
        <a href="${whatsAppDirectUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 12px 20px; border-radius: 3px; font-size: 12px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
          💬 WhatsApp Buyer (${contact.phone})
        </a>
      </div>

      <p style="font-size: 11px; color: #7A8574; text-align: center; margin: 0;">
        This notification was automatically sent to the website owner (<a href="mailto:${ownerEmail}" style="color: #1B2017;">${ownerEmail}</a>) by LIYU Human Hair Atelier.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
🚨 NEW ORDER REQUEST RECEIVED — LIYU ATELIER
============================================================
Order / Reservation ID: #${order.id}
Date & Time: ${new Date(order.createdAt).toLocaleString()}
Total Value: $${order.total} USD

CUSTOMER'S CONTACT INFORMATION:
- Name: ${contact.name}
- Email: ${contact.email}
- Phone / WhatsApp: ${contact.phone}
- Shipping Address: ${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}, ${contact.address.country}

CUSTOMER'S REQUEST DETAILS:
${itemsText}

Subtotal: $${order.subtotal} USD
Total Value: $${order.total} USD

IMPORTANT NOTE:
Stripe online payment is in "Coming Soon" status pending business verification documents. No card was charged.
Please contact the customer directly via WhatsApp (${contact.phone}) or email (${contact.email}) to coordinate order fulfillment.

Alert delivered to website owner: ${ownerEmail}
  `.trim();

  return { subject, html, text };
}

/**
 * Creates mailto URL with pre-filled encoded recipient, subject, and body
 */
export function createMailtoLink(to: string, subject: string, bodyText: string): string {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}
