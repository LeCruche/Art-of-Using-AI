import React, { useRef } from 'react';
import { 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Download, 
  Upload, 
  Check, 
  Eye, 
  Edit3, 
  FileDown,
  LayoutTemplate
} from 'lucide-react';
import { PRESETS } from '../sampleData';

export default function TopHeader({ 
  offer, 
  setOffer, 
  onPrint, 
  activeTab, 
  setActiveTab,
  zoomLevel,
  setZoomLevel
}) {
  const fileInputRef = useRef(null);

  const handlePresetSelect = (presetId) => {
    const target = PRESETS.find(p => p.id === presetId);
    if (target) {
      if (window.confirm(`Load preset "${target.name}"? This will replace your current form data.`)) {
        setOffer(target.data);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields to default?")) {
      const blank = PRESETS.find(p => p.id === 'blank');
      if (blank) setOffer(blank.data);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(offer, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `GeoLab_Offer_${offer.offerNumber || 'proposal'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.lineItems && parsed.client) {
            setOffer(parsed);
            alert("Offer data imported successfully!");
          } else {
            alert("Invalid offer file format.");
          }
        } catch (err) {
          alert("Error parsing JSON file.");
        }
      };
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-4 sm:px-6 py-3">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Program Identity */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5">
              <Sparkles className="w-5 h-5 text-indigo-50" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm">GeoLab</span>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  The art of using AI
                </span>
              </div>
              <h1 className="text-xs text-slate-500 font-medium">
                Offer Template (One-Pager) Generator
              </h1>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-md font-medium flex items-center space-x-1 transition-all ${
                activeTab === 'edit'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-md font-medium flex items-center space-x-1 transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
          
          {/* Preset Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-400" />
            <select
              onChange={(e) => handlePresetSelect(e.target.value)}
              defaultValue=""
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="" disabled>Load Demo Preset...</option>
              {PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom controls (desktop only) */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-[11px] text-slate-400 mr-1">Zoom:</span>
            <button 
              onClick={() => setZoomLevel(0.85)} 
              className={`px-1.5 py-0.5 rounded text-[11px] ${zoomLevel === 0.85 ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              85%
            </button>
            <button 
              onClick={() => setZoomLevel(0.95)} 
              className={`px-1.5 py-0.5 rounded text-[11px] ${zoomLevel === 0.95 ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              95%
            </button>
            <button 
              onClick={() => setZoomLevel(1)} 
              className={`px-1.5 py-0.5 rounded text-[11px] ${zoomLevel === 1 ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              100%
            </button>
          </div>

          {/* Data Backup Tools */}
          <div className="hidden sm:flex items-center space-x-1">
            <button
              onClick={handleExportJSON}
              title="Export Offer as JSON file"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Offer from JSON file"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".json" 
              onChange={handleImportJSON} 
              className="hidden" 
            />
            <button
              onClick={handleReset}
              title="Reset Form"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print / Save PDF Button */}
          <button
            onClick={onPrint}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
}
