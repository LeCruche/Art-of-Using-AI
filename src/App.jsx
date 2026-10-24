import React, { useState, useEffect } from 'react';
import { CURRENCIES, INITIAL_OFFER } from './sampleData';
import TopHeader from './components/TopHeader';
import SidebarForm from './components/SidebarForm';
import OfferPreview from './components/OfferPreview';

export default function App() {
  // Load initial state with localStorage fallback
  const [offer, setOffer] = useState(() => {
    try {
      const saved = localStorage.getItem('geolab_offer_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load offer from localStorage", e);
    }
    return INITIAL_OFFER;
  });

  const [activeTab, setActiveTab] = useState('edit'); // For mobile: 'edit' or 'preview'
  const [zoomLevel, setZoomLevel] = useState(1); // 0.85, 0.95, 1

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('geolab_offer_state', JSON.stringify(offer));
    } catch (e) {
      // ignore
    }
  }, [offer]);

  // Determine active currency metadata
  const activeCurrency = CURRENCIES.find(c => c.code === offer.currency) || CURRENCIES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Application Bar */}
      <TopHeader 
        offer={offer} 
        setOffer={setOffer} 
        onPrint={handlePrint}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-4 md:p-6">
        
        {/* Split Screen Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form Controls (Sidebar) */}
          <div className={`lg:col-span-5 xl:col-span-5 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto pr-1">
              <SidebarForm 
                offer={offer} 
                setOffer={setOffer} 
                activeCurrency={activeCurrency} 
              />
            </div>
          </div>

          {/* Right Column: Real-Time Printable Preview */}
          <div className={`lg:col-span-7 xl:col-span-7 ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
            <div className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl flex flex-col items-center">
              
              {/* Scalable Container for A4 Preview */}
              <div 
                id="offer-printable-area"
                className="w-full transition-transform origin-top flex justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <OfferPreview 
                  offer={offer} 
                  activeCurrency={activeCurrency} 
                />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
