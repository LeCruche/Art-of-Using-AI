# GeoLab — "The art of using AI" Offer Template Generator

A modern, minimalistic, light-themed single-page web application designed for **GeoLab** to generate high-converting, professional, printable A4 one-pager commercial proposals for **"The art of using AI"** educational program.

---

## 🚀 Features

- **Split-Screen Desktop Architecture**:
  - **Left Sidebar**: Real-time input controls organized into Client Information, Proposal Metadata, Dynamic Line Items, Financial Adjustments, and Sign-off Terms.
  - **Right Canvas**: Pixel-perfect, printable A4/Letter one-pager preview that updates instantaneously.
- **Dynamic Line Items Table**:
  - Add, duplicate, and remove line items seamlessly.
  - Automatic reactive computation of line totals, subtotal, optional partner discount (%), and VAT (18% Georgia / 20% EU / Exempt).
- **Branded Program Aesthetics**:
  - Official GeoLab logo (`logo.png`).
  - Program title: *"The art of using AI"*.
  - Program tagline: *"A curated educational program at the intersection of human creativity and artificial intelligence, designed for curious minds ready to shape the future."*
  - Modern tech-forward aesthetic: Crisp white cards, soft borders, high-contrast typography (Inter / Plus Jakarta Sans), and electric indigo accents.
- **Print & PDF Optimization**:
  - Click **"Print / Save as PDF"** to trigger a dedicated `@media print` stylesheet.
  - Hides all navigation, form controls, and backgrounds, outputting a flawless vector A4 sheet with exact page margins.
- **Data Persistence & Quick Presets**:
  - LocalStorage auto-save so work is never lost.
  - Pre-loaded industry presets (*Bank of Georgia Innovation Hub*, *Leavingstone Creative Agency*, *Silknet Executive Masterclass*).
  - Export and Import proposal configurations as JSON.

---

## 🛠️ Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Creates an optimized, minified production bundle in the `dist/` directory.

---

## 📁 Project Structure

```
Client offer/
├── public/
│   └── logo.png              # Program & organization logo
├── src/
│   ├── components/
│   │   ├── TopHeader.jsx     # Navigation bar, presets & print trigger
│   │   ├── SidebarForm.jsx   # Form controls & dynamic line items
│   │   └── OfferPreview.jsx  # Printable A4 one-pager offer canvas
│   ├── sampleData.js         # Currencies, defaults & industry presets
│   ├── App.jsx               # Split-screen layout & state orchestration
│   ├── index.css             # Tailwind CSS & dedicated A4 print rules
│   └── main.jsx              # React DOM entrypoint
├── package.json
├── tailwind.config.js
└── vite.config.js
```
