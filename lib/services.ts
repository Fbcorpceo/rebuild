export type QualOption = { value: string; label: string };

export type QualQuestion = {
  id: string;
  label: string;
  type: "radio" | "select" | "text";
  options?: QualOption[];
  required?: boolean;
};

export type Review = {
  author: string;
  city: string;
  rating: number;
  body: string;
  source: "Google" | "Yelp" | "Facebook";
  date: string;
};

export type ProofPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type ServiceCategory = "Trades" | "Remodeling" | "Exterior" | "Home Care";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  h1: string;
  subheadline: string;
  heroImage: string;
  offer: string;
  priceRange: string;
  responseTime: string;
  serviceRadiusMiles: number;
  qualifying: QualQuestion[];
  reviews: Review[];
  proof: ProofPhoto[];
  faqs: { q: string; a: string }[];
  trustBadges: string[];
  localKeywords: string[];
};

const commonQualifying: QualQuestion[] = [
  {
    id: "zip",
    label: "ZIP code",
    type: "text",
    required: true,
  },
  {
    id: "timing",
    label: "When do you need this done?",
    type: "radio",
    required: true,
    options: [
      { value: "emergency", label: "ASAP / emergency" },
      { value: "2weeks", label: "Within 2 weeks" },
      { value: "1-3mo", label: "1–3 months" },
      { value: "planning", label: "Just planning" },
    ],
  },
  {
    id: "homeowner",
    label: "Are you the homeowner?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

export const services: Service[] = [
  {
    slug: "roofing",
    name: "Roofing",
    category: "Trades",
    h1: "Licensed Roofers in {{city}} — Free Inspection in 24 Hours",
    subheadline:
      "Storm damage, leaks, or a full replacement. Get a fixed-price quote from a local, insured crew — no high-pressure sales.",
    heroImage:
      "https://images.unsplash.com/photo-1632759145355-8b8f3ab1b95e?auto=format&fit=crop&w=1600&q=70",
    offer: "Free 27-point roof inspection + insurance claim help",
    priceRange: "$450 repairs – $18,500 full replacement",
    responseTime: "Callback in under 12 minutes, 7am–9pm",
    serviceRadiusMiles: 35,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What's going on with your roof?",
        type: "radio",
        required: true,
        options: [
          { value: "leak", label: "Active leak" },
          { value: "storm", label: "Storm / hail damage" },
          { value: "age", label: "Old roof, planning replacement" },
          { value: "inspection", label: "Just want an inspection" },
        ],
      },
    ],
    reviews: [
      {
        author: "Sarah K.",
        city: "Pasadena, CA",
        rating: 5,
        body:
          "Windstorm took out half my shingles. They had a tarp on my roof the same afternoon and walked the insurance adjuster through every item. Replacement looked better than the original.",
        source: "Google",
        date: "2026-02-14",
      },
      {
        author: "Marcus D.",
        city: "Long Beach, CA",
        rating: 5,
        body:
          "Three other companies wanted to sell me a full replacement. These guys found the actual leak in 10 minutes and fixed it for $600. Honest people.",
        source: "Google",
        date: "2026-01-03",
      },
      {
        author: "Lena P.",
        city: "Glendale, CA",
        rating: 5,
        body: "Fixed-price quote up front, crew showed up on time, cleaned every nail off my driveway with a magnet.",
        source: "Yelp",
        date: "2025-11-22",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=900&q=70",
        alt: "New architectural shingle roof installed on a ranch home",
        caption: "Full tear-off & replacement — Pasadena",
      },
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=70",
        alt: "Roof crew installing underlayment",
        caption: "Synthetic underlayment + ice & water shield",
      },
      {
        src: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=900&q=70",
        alt: "Hail damage inspection on asphalt shingles",
        caption: "Documented hail strikes for insurance claim",
      },
    ],
    faqs: [
      { q: "Do you handle insurance claims?", a: "Yes — we document damage, meet the adjuster, and only charge your deductible on approved claims." },
      { q: "How long does a replacement take?", a: "Most single-family homes: one day. Larger or steeper roofs: two." },
      { q: "Are you licensed and insured?", a: "CSLB License #1068191 (C-39 Roofing). $2M general liability and full workers' comp on every crew." },
    ],
    trustBadges: ["Licensed & Insured", "GAF Master Elite", "BBB A+", "4.9★ on Google (412 reviews)"],
    localKeywords: ["roofer near me", "roof repair {{city}}", "storm damage roofer", "insurance claim roofing"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    category: "Trades",
    h1: "Same-Day AC Repair in {{city}} — No Overtime Fees",
    subheadline:
      "EPA-certified techs, upfront flat pricing, and a 100% satisfaction guarantee. Most repairs finished in a single visit.",
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=70",
    offer: "$59 diagnostic — waived if you book the repair",
    priceRange: "$89 service call – $7,200 full system replacement",
    responseTime: "Same-day appointments until 8pm",
    serviceRadiusMiles: 25,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What's happening?",
        type: "radio",
        required: true,
        options: [
          { value: "no-cool", label: "Not cooling" },
          { value: "no-heat", label: "Not heating" },
          { value: "noise", label: "Strange noise / smell" },
          { value: "replace", label: "Ready to replace the system" },
        ],
      },
      {
        id: "systemAge",
        label: "How old is the system?",
        type: "select",
        options: [
          { value: "<5", label: "Under 5 years" },
          { value: "5-10", label: "5–10 years" },
          { value: "10-15", label: "10–15 years" },
          { value: "15+", label: "Over 15 years" },
          { value: "unknown", label: "Not sure" },
        ],
      },
    ],
    reviews: [
      {
        author: "Jerome T.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "Called at 7am when the AC quit. Tech was at my door by 10, had a new capacitor installed by 10:30. $189 flat. No upsell nonsense.",
        source: "Google",
        date: "2026-03-18",
      },
      {
        author: "Priya S.",
        city: "Burbank, CA",
        rating: 5,
        body: "Replaced our 18-year-old unit. Three quotes, theirs was the middle price but the only one that itemized everything. Crew was spotless.",
        source: "Google",
        date: "2026-02-02",
      },
      {
        author: "Evan M.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "Tech talked me out of a $4,200 repair and showed me a $240 fix. I'll call them forever.",
        source: "Facebook",
        date: "2025-12-09",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=70",
        alt: "New condenser unit installed beside home",
        caption: "16 SEER condenser install — Burbank",
      },
      {
        src: "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?auto=format&fit=crop&w=900&q=70",
        alt: "Tech servicing a rooftop HVAC unit",
        caption: "Annual tune-up, 23-point checklist",
      },
      {
        src: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=70",
        alt: "Digital thermostat installed on wall",
        caption: "Smart thermostat install (included free with replacement)",
      },
    ],
    faqs: [
      { q: "Do you charge extra after hours?", a: "No. Flat rates apply 7am–9pm, seven days a week." },
      { q: "How fast can you get here?", a: "Most same-day within 2–4 hours. Emergencies prioritized." },
      { q: "What warranty comes with a new system?", a: "10-year parts, 10-year compressor, 2-year labor." },
    ],
    trustBadges: ["NATE-Certified", "EPA 608", "BBB A+", "4.9★ on Google (288 reviews)"],
    localKeywords: ["ac repair near me", "hvac {{city}}", "ac not cooling", "emergency ac repair"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    category: "Trades",
    h1: "24/7 Emergency Plumbers in {{city}} — On Your Street in 60 Min",
    subheadline:
      "Licensed master plumbers, upfront pricing, no trip charge when we do the work. Drains, leaks, water heaters, repipes.",
    heroImage:
      "https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=1600&q=70",
    offer: "Free leak check + $50 off any repair over $300",
    priceRange: "$129 drain clear – $3,900 tankless water heater",
    responseTime: "Dispatched in 60 minutes, 24/7",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What's the problem?",
        type: "radio",
        required: true,
        options: [
          { value: "leak", label: "Active leak / flooding" },
          { value: "drain", label: "Clogged drain or toilet" },
          { value: "heater", label: "No hot water" },
          { value: "other", label: "Something else" },
        ],
      },
    ],
    reviews: [
      {
        author: "Angela R.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "Midnight pipe burst. On the phone in 90 seconds, plumber in the driveway in 40 minutes. Cut a precise hole, fixed the copper, insured the drywall patch. Lifesavers.",
        source: "Google",
        date: "2026-03-02",
      },
      {
        author: "Dan W.",
        city: "Torrance, CA",
        rating: 5,
        body: "Replaced a 40-gallon tank with a tankless. Came in $800 under the other quote, finished in a day, left the garage cleaner than they found it.",
        source: "Google",
        date: "2026-01-15",
      },
      {
        author: "Maya F.",
        city: "Inglewood, CA",
        rating: 5,
        body: "Cleared a main line clog that two other companies quoted $2k+ for. Theirs was $480 and worked.",
        source: "Yelp",
        date: "2025-10-28",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=70",
        alt: "Plumber repairing copper supply lines under sink",
        caption: "Slab leak re-route — Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=70",
        alt: "New tankless water heater on garage wall",
        caption: "Navien tankless install — Torrance",
      },
      {
        src: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?auto=format&fit=crop&w=900&q=70",
        alt: "Camera inspection of sewer line",
        caption: "Camera-verified main line clear",
      },
    ],
    faqs: [
      { q: "Is the trip charge really free?", a: "When you approve any repair, yes. We'll tell you the total before we turn a wrench." },
      { q: "Are you licensed?", a: "California C-36 Plumbing Contractor License #1068191. $1M liability." },
      { q: "Financing?", a: "0% for 18 months on approved credit for jobs over $1,000." },
    ],
    trustBadges: ["CSLB C-36 #1068191", "24/7 Dispatch", "BBB A+", "4.8★ on Google (196 reviews)"],
    localKeywords: ["plumber near me", "emergency plumber {{city}}", "water heater repair", "24/7 plumber"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const listServiceSlugs = () => services.map((s) => s.slug);
