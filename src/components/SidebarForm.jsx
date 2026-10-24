import React from 'react';
import { 
  Building2, 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Calendar, 
  DollarSign, 
  Tag, 
  Percent, 
  FileCheck, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { CURRENCIES } from '../sampleData';

export default function SidebarForm({ offer, setOffer, activeCurrency }) {
  // Helpers to update nested state
  const handleClientChange = (field, value) => {
    setOffer(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value
      }
    }));
  };

  const handleSignatoryChange = (field, value) => {
    setOffer(prev => ({
      ...prev,
      signatory: {
        ...prev.signatory,
        [field]: value
      }
    }));
  };

  const handleLineItemChange = (id, field, value) => {
    setOffer(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          // If unitPrice or quantity changed, keep numbers clean
          if (field === 'unitPrice' || field === 'quantity') {
            const numericVal = parseFloat(value);
            updated[field] = isNaN(numericVal) ? '' : (numericVal < 0 ? 0 : numericVal);
          }
          return updated;
        }
        return item;
      })
    }));
  };

  const addLineItem = () => {
    const newItem = {
      id: 'item-' + Date.now(),
      name: 'New AI Workshop / Service',
      sku: 'AI-SRV-' + String(offer.lineItems.length + 1).padStart(2, '0'),
      description: 'Hands-on practical session with customized curriculum and mentor guidance.',
      unitPrice: 1500,
      quantity: 1
    };
    setOffer(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const duplicateLineItem = (index) => {
    const target = offer.lineItems[index];
    const duplicated = {
      ...target,
      id: 'item-' + Date.now(),
      name: `${target.name} (Copy)`
    };
    const updated = [...offer.lineItems];
    updated.splice(index + 1, 0, duplicated);
    setOffer(prev => ({ ...prev, lineItems: updated }));
  };

  const removeLineItem = (id) => {
    if (offer.lineItems.length <= 1) {
      alert("An offer must contain at least one line item.");
      return;
    }
    setOffer(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Client Information Section */}
      <section className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-500/10">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">1. Client Information</h2>
              <p className="text-xs text-slate-500">Recipient organization & project scope</p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Required</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client Organization Name <span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              value={offer.client.orgName}
              onChange={(e) => handleClientChange('orgName', e.target.value)}
              placeholder="e.g. Bank of Georgia • Innovation Hub"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Description / Project Overview <span className="text-indigo-600">*</span>
            </label>
            <textarea
              rows={3}
              value={offer.client.projectOverview}
              onChange={(e) => handleClientChange('projectOverview', e.target.value)}
              placeholder="Provide a concise summary of the tailored AI training goals, cohort target, and core outcomes..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center">
                <User className="w-3 h-3 mr-1 text-slate-400" /> Contact Person
              </label>
              <input
                type="text"
                value={offer.client.contactPerson}
                onChange={(e) => handleClientChange('contactPerson', e.target.value)}
                placeholder="e.g. Nino Beridze"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center">
                <Mail className="w-3 h-3 mr-1 text-slate-400" /> Email Address
              </label>
              <input
                type="email"
                value={offer.client.email}
                onChange={(e) => handleClientChange('email', e.target.value)}
                placeholder="e.g. n.beridze@partner.ge"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Proposal Metadata & Settings */}
      <section className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-500/10">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">2. Proposal Metadata</h2>
              <p className="text-xs text-slate-500">Dates, reference code & currency</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Offer Reference #
            </label>
            <input
              type="text"
              value={offer.offerNumber}
              onChange={(e) => setOffer(prev => ({ ...prev, offerNumber: e.target.value }))}
              placeholder="e.g. GL-AI-2026/042"
              className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              value={offer.issueDate}
              onChange={(e) => setOffer(prev => ({ ...prev, issueDate: e.target.value }))}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Offer Validity
            </label>
            <select
              value={offer.validityDays}
              onChange={(e) => setOffer(prev => ({ ...prev, validityDays: e.target.value }))}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            >
              <option value="14 Calendar Days">14 Calendar Days</option>
              <option value="30 Calendar Days">30 Calendar Days (Standard)</option>
              <option value="60 Calendar Days">60 Calendar Days</option>
              <option value="90 Calendar Days">90 Calendar Days</option>
              <option value="End of Current Month">End of Current Month</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Currency
            </label>
            <select
              value={offer.currency}
              onChange={(e) => setOffer(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            >
              {CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. Dynamic Line Items Table (Products/Services) */}
      <section className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-500/10">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">3. Products & Services</h2>
              <p className="text-xs text-slate-500">Modules, lab compute & deliverables</p>
            </div>
          </div>
          <button
            onClick={addLineItem}
            className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
          </button>
        </div>

        <div className="space-y-4">
          {offer.lineItems.map((item, index) => {
            const lineTotal = (parseFloat(item.unitPrice) || 0) * (parseFloat(item.quantity) || 0);
            return (
              <div 
                key={item.id} 
                className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 transition-all hover:bg-slate-50 hover:border-slate-300 relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Line Item #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => duplicateLineItem(index)}
                      title="Duplicate this item"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeLineItem(item.id)}
                      title="Remove this item"
                      className="p-1 rounded text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                        Product / Module Name <span className="text-indigo-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleLineItemChange(item.id, 'name', e.target.value)}
                        placeholder="e.g. Generative AI Prompt Mastery"
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                        Product # (SKU/Code)
                      </label>
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => handleLineItemChange(item.id, 'sku', e.target.value)}
                        placeholder="e.g. AI-MOD-01"
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                      Description & Scope
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                      placeholder="Key syllabus topics, duration, or deliverables included..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 items-center">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                        Unit Price ({activeCurrency.symbol})
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={item.unitPrice}
                        onChange={(e) => handleLineItemChange(item.id, 'unitPrice', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-medium bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={(e) => handleLineItemChange(item.id, 'quantity', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-medium bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900"
                      />
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-semibold text-slate-400">
                        Line Total
                      </span>
                      <span className="text-xs font-bold font-mono text-indigo-700">
                        {activeCurrency.symbol}{lineTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={addLineItem}
          className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Line Item</span>
        </button>
      </section>

      {/* 4. Financial Calculations & Discounts */}
      <section className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-500/10">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">4. Adjustments & Taxes</h2>
              <p className="text-xs text-slate-500">Partner discounts & VAT</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Discount Toggle */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offer.isDiscountEnabled}
                  onChange={(e) => setOffer(prev => ({ ...prev, isDiscountEnabled: e.target.checked }))}
                  className="rounded text-indigo-600 focus:ring-indigo-500 mr-2 h-4 w-4"
                />
                Apply Special Partner Discount
              </label>
              {offer.isDiscountEnabled && (
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Active
                </span>
              )}
            </div>

            {offer.isDiscountEnabled && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="block text-[10px] text-slate-500 mb-0.5">Discount Rate (%)</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={offer.discountValue}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setOffer(prev => ({ ...prev, discountValue: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs font-mono font-medium bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">%</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Subtracted directly before VAT calculation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tax / VAT Toggle */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offer.isTaxEnabled}
                  onChange={(e) => setOffer(prev => ({ ...prev, isTaxEnabled: e.target.checked }))}
                  className="rounded text-indigo-600 focus:ring-indigo-500 mr-2 h-4 w-4"
                />
                Include Value Added Tax (VAT)
              </label>
              <span className="text-[11px] font-mono text-slate-600">
                {offer.isTaxEnabled ? `${offer.taxRate}% VAT` : 'Tax Exempt'}
              </span>
            </div>

            {offer.isTaxEnabled && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="block text-[10px] text-slate-500 mb-0.5">Tax Rate (%)</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={offer.taxRate}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setOffer(prev => ({ ...prev, taxRate: isNaN(val) ? 0 : val }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs font-mono font-medium bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setOffer(prev => ({ ...prev, taxRate: 18 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    18% (Georgia)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOffer(prev => ({ ...prev, taxRate: 20 }))}
                    className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    20% (EU)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Terms, Conditions & Signatory */}
      <section className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-500/10">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">5. Terms & Sign-off</h2>
              <p className="text-xs text-slate-500">Commercial terms & representative</p>
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment & Milestones Terms
            </label>
            <input
              type="text"
              value={offer.paymentTerms}
              onChange={(e) => setOffer(prev => ({ ...prev, paymentTerms: e.target.value }))}
              placeholder="e.g. 50% upon signing, 50% upon program completion"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Authorized Signatory
              </label>
              <input
                type="text"
                value={offer.signatory.name}
                onChange={(e) => handleSignatoryChange('name', e.target.value)}
                placeholder="Dr. Giorgi Tsiklauri"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Signatory Title
              </label>
              <input
                type="text"
                value={offer.signatory.title}
                onChange={(e) => handleSignatoryChange('title', e.target.value)}
                placeholder="Program Director, GeoLab AI Initiatives"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Notes / Educational Package Inclusions
            </label>
            <textarea
              rows={2}
              value={offer.notes}
              onChange={(e) => setOffer(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="e.g. Includes GeoLab AI sandbox access, lecture recordings, and certificates..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
