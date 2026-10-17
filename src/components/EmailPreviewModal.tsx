import React, { useState } from 'react';
import { X, Mail, Check, Copy, ExternalLink, ShieldCheck, UserCheck, Bell } from 'lucide-react';
import { EmailRecord } from '../types';
import { createMailtoLink } from '../utils/emailService';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerEmail?: EmailRecord;
  ownerEmail?: EmailRecord;
  initialTab?: 'buyer' | 'owner';
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  buyerEmail,
  ownerEmail,
  initialTab = 'buyer',
}) => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'owner'>(initialTab);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'plain'>('rendered');

  if (!isOpen) return null;

  const currentEmail = activeTab === 'buyer' ? buyerEmail : ownerEmail;

  const handleCopyText = () => {
    if (currentEmail) {
      navigator.clipboard.writeText(currentEmail.textBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenMailClient = () => {
    if (currentEmail) {
      const mailto = createMailtoLink(
        currentEmail.recipientEmail,
        currentEmail.subject,
        currentEmail.textBody
      );
      window.location.href = mailto;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-xs max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[92vh] flex flex-col text-[#1B2017]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#95B373]/15 flex items-center justify-center text-[#2B3E1F] border border-[#95B373]/30">
              <Mail className="w-5 h-5 text-[#95B373]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-[#1B2017]">
                  Dispatched Email Notification Preview
                </h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-[#55634E] mt-0.5">
                Exact email copy generated and logged for this order request.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6A7563] hover:text-[#1B2017] transition-colors cursor-pointer"
            aria-label="Close email modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 pb-3 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'buyer'
                  ? 'bg-[#1B2017] text-white shadow-xs'
                  : 'bg-white text-[#55634E] border border-[#DDD5C7] hover:border-[#95B373]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Buyer Confirmation Email</span>
            </button>
            <button
              onClick={() => setActiveTab('owner')}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'owner'
                  ? 'bg-[#1B2017] text-white shadow-xs'
                  : 'bg-white text-[#55634E] border border-[#DDD5C7] hover:border-[#95B373]'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>Website Owner Alert Email</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'rendered' ? 'plain' : 'rendered')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-[#DDD5C7] text-[#55634E] rounded-xs hover:border-[#95B373] cursor-pointer"
            >
              {viewMode === 'rendered' ? 'View Plain Text' : 'View Formatted HTML'}
            </button>
          </div>
        </div>

        {/* Email Metadata Card */}
        {currentEmail ? (
          <div className="py-3 px-3.5 bg-white border border-[#E8E2D5] rounded-xs my-3 text-xs space-y-1 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[#6A7563] font-medium">To (Recipient):</span>
              <strong className="text-[#1B2017] font-mono">
                {currentEmail.recipientName} &lt;{currentEmail.recipientEmail}&gt;
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6A7563] font-medium">Subject:</span>
              <strong className="text-[#1B2017]">{currentEmail.subject}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6A7563] font-medium">Sent Timestamp:</span>
              <span className="text-[#444E3D] font-mono text-[11px]">
                {new Date(currentEmail.sentAt).toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-[#6A7563]">
            No email record found for this tab.
          </div>
        )}

        {/* Email Body Preview Container */}
        <div className="flex-1 overflow-y-auto border border-[#DDD5C7] rounded-xs bg-white p-3 sm:p-4 min-h-[280px] max-h-[440px]">
          {currentEmail ? (
            viewMode === 'rendered' ? (
              <div
                className="email-rendered-wrapper"
                dangerouslySetInnerHTML={{ __html: currentEmail.htmlBody }}
              />
            ) : (
              <pre className="text-xs font-mono whitespace-pre-wrap text-[#1B2017] leading-relaxed p-2">
                {currentEmail.textBody}
              </pre>
            )
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-2 border-t border-[#E8E2D5]">
          <div className="text-[11px] text-[#6A7563] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#95B373]" />
            <span>Encrypted Atelier Dispatch Log · Stripe Card Coming Soon</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3.5 py-2 bg-white hover:bg-[#FAF7F2] text-[#1B2017] border border-[#DDD5C7] rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6A7563]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenMailClient}
              className="px-4 py-2 bg-[#95B373] hover:bg-[#82A260] text-white rounded-xs text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Email App / Gmail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
