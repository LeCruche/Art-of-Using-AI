import React, { useState } from 'react';
import { 
  Building2,
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  FileCheck2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  Cpu,
  GraduationCap
} from 'lucide-react';

export default function OfferPreview({ offer, activeCurrency }) {
  const [logoError, setLogoError] = useState(false);

  // Calculations
  const subtotal = offer.lineItems.reduce((acc, item) => {
    const price = parseFloat(item.unitPrice) || 0;
    const qty = parseFloat(item.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  const discountAmount = offer.isDiscountEnabled 
    ? (subtotal * (parseFloat(offer.discountValue) || 0)) / 100 
    : 0;

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  const taxAmount = offer.isTaxEnabled 
    ? (taxableAmount * (parseFloat(offer.taxRate) || 0)) / 100 
    : 0;

  const grandTotal = taxableAmount + taxAmount;

  const formatMoney = (amount) => {
    return `${activeCurrency.symbol}${Number(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="a4-page bg-white shadow-page border border-slate-200/80 rounded-sm text-slate-900 flex flex-col justify-between transition-all duration-200 select-text font-sans p-8 sm:p-12 md:p-14 relative overflow-hidden">
      
      {/* Decorative ultra-subtle ambient background aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/40 via-violet-50/20 to-transparent pointer-events-none rounded-bl-full" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500" />

      {/* Main Content Area */}
      <div className="relative z-10 space-y-7">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="border-b border-slate-200/80 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            {/* Logo & GeoLab Badge */}
            <div className="flex items-center space-x-4">
              {!logoError ? (
                <div className="h-14 flex items-center">
                  <img
                    src="/logo.png"
                    alt="GeoLab Logo"
                    onError={() => setLogoError(true)}
                    className="h-12 w-auto max-w-[170px] object-contain drop-shadow-sm"
                  />
                </div>
              ) : (
                <div className="h-12 px-3.5 bg-slate-900 text-white rounded-lg flex items-center space-x-2 font-bold tracking-tight">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-lg">GEOLAB</span>
                </div>
              )}

              <div className="h-9 w-px bg-slate-200 hidden sm:block" />

              <div className="hidden sm:block">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20">
                  Official Proposal
                </span>
                <p className="text-[11px] text-slate-400 font-medium">Educational Initiative</p>
              </div>
            </div>

            {/* Document Reference & Dates */}
            <div className="text-left sm:text-right text-xs space-y-1 bg-slate-50/80 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none w-full sm:w-auto border sm:border-0 border-slate-100">
              <div className="flex sm:justify-end items-center space-x-2">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Offer Ref:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                  {offer.offerNumber || 'GL-AI-2026/001'}
                </span>
              </div>
              <div className="flex sm:justify-end items-center space-x-2 text-slate-600">
                <span className="text-[11px] text-slate-500">Date:</span>
                <span className="font-medium text-slate-800">{offer.issueDate}</span>
              </div>
              <div className="flex sm:justify-end items-center space-x-2 text-slate-600">
                <span className="text-[11px] text-slate-500">Validity:</span>
                <span className="font-medium text-indigo-700 bg-indigo-50/60 px-1.5 py-0.5 rounded">
                  {offer.validityDays}
                </span>
              </div>
            </div>
          </div>

          {/* Program Title & Subtitle / Tagline Banner */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-600 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Featured Program
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-sans">
              {offer.programName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl font-normal">
              {offer.programTagline}
            </p>
          </div>
        </header>

        {/* ================= CLIENT INFO & PROJECT SCOPE ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200/70">
          {/* Recipient Details */}
          <div className="md:col-span-5 space-y-1.5 border-b md:border-b-0 md:border-r border-slate-200/80 pb-3 md:pb-0 md:pr-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-1">
              Offer Prepared For
            </span>
            <div className="text-base font-bold text-slate-900 tracking-tight">
              {offer.client.orgName || 'Client Organization Name'}
            </div>
            {offer.client.contactPerson && (
              <div className="text-xs text-slate-700 font-medium pt-0.5">
                Attn: <span className="text-slate-900 font-semibold">{offer.client.contactPerson}</span>
              </div>
            )}
            {offer.client.email && (
              <div className="text-[11px] text-slate-500 flex items-center">
                <Mail className="w-3 h-3 mr-1 text-slate-400" />
                <span>{offer.client.email}</span>
              </div>
            )}
            {offer.client.address && (
              <div className="text-[11px] text-slate-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                <span>{offer.client.address}</span>
              </div>
            )}
          </div>

          {/* Project Overview */}
          <div className="md:col-span-7 space-y-1.5 pl-0 md:pl-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-700/80 flex items-center mb-1">
              <Cpu className="w-3 h-3 mr-1 text-indigo-600" /> Project Scope & Objectives
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {offer.client.projectOverview || 'Project overview and scope will appear here once entered in the form.'}
            </p>
          </div>
        </section>

        {/* ================= LINE ITEMS TABLE ================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <span>Program Modules & Commercial Inclusions</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">
              Currency: <strong className="text-slate-700">{activeCurrency.code} ({activeCurrency.symbol})</strong>
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-16 text-center">Item</th>
                  <th className="py-2.5 px-3">Description & Scope</th>
                  <th className="py-2.5 px-3 w-28 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                  <th className="py-2.5 px-4 w-28 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {offer.lineItems.map((item, idx) => {
                  const unitP = parseFloat(item.unitPrice) || 0;
                  const q = parseFloat(item.quantity) || 0;
                  const itemTotal = unitP * q;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 text-center align-top">
                        <span className="inline-block font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {item.sku || `#${idx + 1}`}
                        </span>
                      </td>
                      <td className="py-3 px-3 align-top">
                        <div className="font-semibold text-slate-900 text-xs sm:text-[13px]">
                          {item.name || 'Untitled Service/Module'}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700 align-top">
                        {formatMoney(unitP)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-medium text-slate-800 align-top">
                        {q}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 align-top">
                        {formatMoney(itemTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= FINANCIAL TOTALS & TERMS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
          {/* Left: Deliverables & Terms */}
          <div className="md:col-span-7 space-y-3.5">
            {/* Key Inclusions Strip */}
            <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 space-y-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-800 flex items-center">
                <GraduationCap className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                GeoLab Educational Guarantee
              </span>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3 h-3 mr-1.5 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Hands-on interactive lab sessions with industry AI experts.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3 h-3 mr-1.5 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Full access to GeoLab AI compute environment & dedicated sandboxes.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3 h-3 mr-1.5 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Official GeoLab "The art of using AI" Completion Diploma for participants.</span>
                </li>
              </ul>
            </div>

            {/* Terms of Payment & Notes */}
            <div className="space-y-1 text-xs text-slate-600">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block">
                Payment Terms & Conditions
              </span>
              <p className="text-[11px] text-slate-700 leading-snug">
                {offer.paymentTerms}
              </p>
              {offer.notes && (
                <p className="text-[10.5px] text-slate-500 italic pt-1 leading-snug">
                  * Note: {offer.notes}
                </p>
              )}
            </div>
          </div>

          {/* Right: Calculations Box */}
          <div className="md:col-span-5 bg-slate-50/70 rounded-xl p-4 border border-slate-200/90 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-medium text-slate-900">{formatMoney(subtotal)}</span>
            </div>

            {offer.isDiscountEnabled && discountAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-700">
                <span className="flex items-center">
                  <span>Partner Discount ({offer.discountValue}%):</span>
                </span>
                <span className="font-mono font-medium">-{formatMoney(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>
                {offer.isTaxEnabled ? `VAT (${offer.taxRate}%):` : 'VAT / Taxes:'}
              </span>
              <span className="font-mono font-medium text-slate-800">
                {offer.isTaxEnabled ? formatMoney(taxAmount) : 'Exempt (0%)'}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-2.5 mt-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                    Grand Total
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    All taxes & fees included
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black font-mono text-indigo-700 tracking-tight block">
                    {formatMoney(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SIGN-OFF & AUTHORIZATION ================= */}
        <section className="pt-4 border-t border-slate-200/80">
          <div className="grid grid-cols-2 gap-8 items-end">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1">
                Authorized By (GeoLab)
              </span>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                {offer.signatory.name}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium">
                {offer.signatory.title}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-300 w-44">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 block">
                  Signature & Stamp
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1">
                Accepted & Confirmed By (Client)
              </span>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">
                {offer.client.contactPerson || 'Authorized Representative'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {offer.client.orgName || 'Client Organization'}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-300 w-44 ml-auto">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 block">
                  Signature & Date
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ================= FOOTER SECTION ================= */}
      <footer className="relative z-10 pt-6 mt-6 border-t border-slate-200 text-center text-[10px] text-slate-500 space-y-1">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-slate-600 font-medium">
          <span className="flex items-center">
            <Building2 className="w-3 h-3 mr-1 text-slate-400" />
            GeoLab • Mobile & Web Applications Laboratory
          </span>
          <span>•</span>
          <span className="flex items-center">
            <Globe className="w-3 h-3 mr-1 text-slate-400" />
            www.geolab.edu.ge
          </span>
          <span>•</span>
          <span className="flex items-center">
            <Mail className="w-3 h-3 mr-1 text-slate-400" />
            info@geolab.edu.ge
          </span>
          <span>•</span>
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-slate-400" />
            77 Kostava St., Tbilisi, Georgia
          </span>
        </div>
        <p className="text-[9.5px] text-slate-400">
          "The art of using AI" is an educational program proprietary to GeoLab. This commercial document is confidential and designated solely for the named recipient.
        </p>
      </footer>

    </div>
  );
}
