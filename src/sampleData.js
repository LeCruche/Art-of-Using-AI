export const CURRENCIES = [
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari (₾)' },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
];

export const INITIAL_OFFER = {
  // Program Details
  programName: "The art of using AI",
  programTagline: "A curated educational program at the intersection of human creativity and artificial intelligence, designed for curious minds ready to shape the future.",
  organization: "GeoLab",
  offerNumber: "GL-AI-2026/042",
  issueDate: new Date().toISOString().split('T')[0],
  validityDays: "30 Calendar Days",
  currency: "GEL",
  status: "Official Proposal",

  // Client Details
  client: {
    orgName: "Bank of Georgia • Innovation Hub",
    contactPerson: "Nino Beridze",
    contactTitle: "Head of Talent & Organizational Development",
    email: "n.beridze@bog.ge",
    phone: "+995 599 123 456",
    address: "29a Iuri Gagarini St, Tbilisi",
    projectOverview: "An intensive corporate enablement cohort designed to train mid-to-senior product managers, creative directors, and business analysts on leveraging advanced LLMs, multi-modal agents, and prompt systems to automate core workflows and accelerate product delivery."
  },

  // Line Items
  lineItems: [
    {
      id: "item-1",
      name: "Module 1: Foundations of Generative Intelligence & Prompt Craft",
      sku: "AI-EDU-01",
      description: "Interactive lecture and hands-on laboratory covering LLM mechanics, context engineering, and advanced system instructions.",
      unitPrice: 1800,
      quantity: 1,
    },
    {
      id: "item-2",
      name: "Module 2: Autonomous AI Agents & Workflow Automation",
      sku: "AI-EDU-02",
      description: "Deep dive into tool-augmented AI, agentic architectures, automated API integrations, and code generation for non-technical teams.",
      unitPrice: 2400,
      quantity: 1,
    },
    {
      id: "item-3",
      name: "Module 3: Multi-Modal Creative AI & Visual Asset Production",
      sku: "AI-EDU-03",
      description: "Mastery of generative imagery, audio synthesis, and visual brand identity scaling using state-of-the-art diffusion models.",
      unitPrice: 1950,
      quantity: 1,
    },
    {
      id: "item-4",
      name: "Cohort Access: GeoLab AI Compute Sandbox & Pro Mentorship",
      sku: "AI-LAB-SND",
      description: "Dedicated GPU cloud compute access for 25 seats, private lab server, and 12 hours of personalized 1-on-1 team mentoring.",
      unitPrice: 1500,
      quantity: 1,
    }
  ],

  // Financials
  discountType: "percent", // "percent" | "fixed"
  discountValue: 5,
  isDiscountEnabled: true,
  taxRate: 18, // 18% VAT
  isTaxEnabled: true,

  // Terms & Conditions
  paymentTerms: "50% advance payment upon agreement signing; remaining 50% upon completion of Module 3.",
  deliverablesSummary: "Access to online portal, curated workshop materials, live project critique, and GeoLab Certificate of Excellence.",
  signatory: {
    name: "Dr. Giorgi Tsiklauri",
    title: "Program Director, GeoLab AI Initiatives",
    email: "g.tsiklauri@geolab.edu.ge"
  },
  notes: "Includes all educational resources, slide decks, practical code notebooks, and recorded recap sessions available for 12 months."
};

export const PRESETS = [
  {
    id: 'executive',
    name: 'Executive AI Masterclass (Corporate)',
    data: {
      ...INITIAL_OFFER,
      offerNumber: "GL-AI-CORP-2026",
      client: {
        orgName: "Silknet Telecom • Digital Transformation Unit",
        contactPerson: "Davit Kakhidze",
        contactTitle: "Chief Technology Officer",
        email: "davit.k@silknet.com",
        phone: "+995 577 000 111",
        address: "95 Tsinamdzgvrishvili St, Tbilisi",
        projectOverview: "Strategic executive workshop series for 15 senior technology and product leaders focusing on enterprise AI adoption, agent governance, and ROI evaluation."
      },
      lineItems: [
        {
          id: "p1",
          name: "Executive Masterclass: Strategic AI Implementation & Governance",
          sku: "EXE-AI-01",
          description: "High-impact 16-hour weekend sprint for C-suite leaders and division managers.",
          unitPrice: 4500,
          quantity: 1
        },
        {
          id: "p2",
          name: "Enterprise Workflow Audit & Custom AI Roadmap",
          sku: "EXE-AI-AUD",
          description: "Tailored diagnostic session to identify high-leverage AI automation opportunities.",
          unitPrice: 3200,
          quantity: 1
        }
      ],
      discountValue: 0,
      isDiscountEnabled: false
    }
  },
  {
    id: 'creative',
    name: 'Creative Agency AI Sprint (Design & Media)',
    data: {
      ...INITIAL_OFFER,
      offerNumber: "GL-AI-CR8-2026",
      client: {
        orgName: "Leavingstone Creative Agency",
        contactPerson: "Mariam Chkheidze",
        contactTitle: "Creative Director",
        email: "mariam@leavingstone.com",
        phone: "+995 595 222 333",
        address: "Vake District, Chavchavadze Ave, Tbilisi",
        projectOverview: "Intensive 3-week creative residency on Generative AI tooling for art directors, 3D artists, copywriters, and motion designers."
      },
      lineItems: [
        {
          id: "c1",
          name: "Generative Visual Systems & Brand Style Conditioning",
          sku: "CR8-AI-VIS",
          description: "LoRA fine-tuning, consistent character generation, and typography control with modern diffusion models.",
          unitPrice: 2200,
          quantity: 1
        },
        {
          id: "c2",
          name: "AI-Augmented Copywriting & Narrative Architecture",
          sku: "CR8-AI-CPY",
          description: "Tone-of-voice distillation and multi-channel campaign conceptualization.",
          unitPrice: 1750,
          quantity: 1
        },
        {
          id: "c3",
          name: "Video & Motion Generative Synthesis Workshop",
          sku: "CR8-AI-VID",
          description: "Next-generation video synthesis, video-to-video style transfer, and sound design.",
          unitPrice: 2600,
          quantity: 1
        }
      ],
      discountValue: 10,
      isDiscountEnabled: true
    }
  },
  {
    id: 'blank',
    name: 'Blank Template (Start Fresh)',
    data: {
      ...INITIAL_OFFER,
      offerNumber: `GL-AI-${new Date().getFullYear()}/001`,
      client: {
        orgName: "",
        contactPerson: "",
        contactTitle: "",
        email: "",
        phone: "",
        address: "",
        projectOverview: ""
      },
      lineItems: [
        {
          id: "blank-1",
          name: "",
          sku: "",
          description: "",
          unitPrice: 0,
          quantity: 1
        }
      ],
      discountValue: 0,
      isDiscountEnabled: false,
      isTaxEnabled: true
    }
  }
];
