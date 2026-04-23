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
  {
    slug: "electrical",
    name: "Electrical",
    category: "Trades",
    h1: "Licensed Electricians in {{city}} — Same-Day Service, Flat Pricing",
    subheadline:
      "Panel upgrades, EV chargers, rewires, and emergency outages. Master electricians, permits pulled, work guaranteed for 5 years.",
    heroImage:
      "https://images.unsplash.com/photo-1621905252507-c94f4e5b6f4d?auto=format&fit=crop&w=1600&q=70",
    offer: "Free panel safety check + $100 off any install over $500",
    priceRange: "$149 service call – $4,800 full panel upgrade",
    responseTime: "Same-day dispatch, 7am–9pm",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What do you need?",
        type: "radio",
        required: true,
        options: [
          { value: "outage", label: "Power out / breaker tripping" },
          { value: "panel", label: "Panel upgrade or rewire" },
          { value: "ev", label: "EV charger install" },
          { value: "other", label: "Outlets, lighting, or other" },
        ],
      },
    ],
    reviews: [
      {
        author: "Tom R.",
        city: "Culver City, CA",
        rating: 5,
        body:
          "Installed a 60-amp charger for my EV and upgraded my panel to 200A in one day. Permit, inspection, everything. $600 under the next quote.",
        source: "Google",
        date: "2026-03-05",
      },
      {
        author: "Nina B.",
        city: "Los Angeles, CA",
        rating: 5,
        body:
          "Breakers kept tripping every night. They found a buried junction that two other electricians missed. Fixed in an hour, flat $220.",
        source: "Google",
        date: "2026-01-29",
      },
      {
        author: "Rafael C.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Whole-house rewire on a 1940s bungalow. Zero drama, zero wall damage, city inspector signed off first pass.",
        source: "Yelp",
        date: "2025-12-01",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1558389186-438424b00a58?auto=format&fit=crop&w=900&q=70",
        alt: "Clean 200A electrical panel upgrade",
        caption: "200A panel upgrade — Culver City",
      },
      {
        src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=70",
        alt: "Level 2 EV charger mounted in garage",
        caption: "Level 2 EV charger install",
      },
      {
        src: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=900&q=70",
        alt: "Electrician troubleshooting outlet wiring",
        caption: "Knob-and-tube rewire — Pasadena",
      },
    ],
    faqs: [
      { q: "Do you pull permits?", a: "Yes — every panel, sub-panel, and EV install is permitted and inspected. Permit cost included in our quote." },
      { q: "How long does a panel upgrade take?", a: "Most single-family homes: one day, including utility coordination." },
      { q: "Are you licensed?", a: "California C-10 Electrical Contractor License #1068191. $2M liability." },
    ],
    trustBadges: ["CSLB C-10 #1068191", "Tesla Certified Installer", "BBB A+", "4.9★ on Google (221 reviews)"],
    localKeywords: ["electrician near me", "panel upgrade {{city}}", "ev charger install", "emergency electrician"],
  },
  {
    slug: "solar",
    name: "Solar",
    category: "Exterior",
    h1: "Solar Installation in {{city}} — Locked-In Quote, No Sales Gimmicks",
    subheadline:
      "Tier-1 panels, in-house installers (we don't sub out), 25-year production warranty. Typical LA home eliminates 95%+ of their electric bill.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=70",
    offer: "Free savings analysis + $500 off install + battery options",
    priceRange: "$11,400 – $32,500 turnkey, before incentives",
    responseTime: "Quote scheduled in 24 hours",
    serviceRadiusMiles: 50,
    qualifying: [
      ...commonQualifying,
      {
        id: "bill",
        label: "Average monthly electric bill?",
        type: "radio",
        required: true,
        options: [
          { value: "<150", label: "Under $150" },
          { value: "150-300", label: "$150–$300" },
          { value: "300-500", label: "$300–$500" },
          { value: "500+", label: "Over $500" },
        ],
      },
      {
        id: "roofAge",
        label: "How old is your roof?",
        type: "select",
        options: [
          { value: "<5", label: "Under 5 years" },
          { value: "5-15", label: "5–15 years" },
          { value: "15+", label: "Over 15 years" },
          { value: "unknown", label: "Not sure" },
        ],
      },
    ],
    reviews: [
      {
        author: "Dev P.",
        city: "Long Beach, CA",
        rating: 5,
        body:
          "Got five solar quotes. This crew was the only one that walked my attic and checked my panel before quoting. Install was clean and my first true-up was $42.",
        source: "Google",
        date: "2026-02-20",
      },
      {
        author: "Kira T.",
        city: "Torrance, CA",
        rating: 5,
        body:
          "10 kW system with a battery. Permits, interconnection, PTO — they handled it all. No surprise fees, crew was great with my dogs.",
        source: "Google",
        date: "2026-01-07",
      },
      {
        author: "Oscar M.",
        city: "Inglewood, CA",
        rating: 5,
        body: "Bill went from $380/mo to $12. Real numbers, not the fake promises the door-knockers gave me.",
        source: "Facebook",
        date: "2025-11-14",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e09?auto=format&fit=crop&w=900&q=70",
        alt: "Clean rooftop solar array on a ranch home",
        caption: "9.4 kW rooftop array — Long Beach",
      },
      {
        src: "https://images.unsplash.com/photo-1611365892117-bce8f8a6b74f?auto=format&fit=crop&w=900&q=70",
        alt: "Tesla Powerwall mounted in garage",
        caption: "Powerwall 3 install — Torrance",
      },
      {
        src: "https://images.unsplash.com/photo-1559302995-f1d7e5c2b2e5?auto=format&fit=crop&w=900&q=70",
        alt: "Installer mounting solar racking",
        caption: "IronRidge racking, code-compliant attachment",
      },
    ],
    faqs: [
      { q: "Do I qualify for the 30% federal tax credit?", a: "If you owe federal tax, yes — it applies to panels, battery, and labor. We provide IRS Form 5695-ready documentation." },
      { q: "Do you sub out installs?", a: "Never. Every install is done by our W-2 crew under our C-46 solar license." },
      { q: "What happens if my roof needs work?", a: "We coordinate the reroof so your solar warranty isn't voided, and bundle it on one invoice." },
    ],
    trustBadges: ["CSLB C-46 #1068191", "NABCEP Certified", "BBB A+", "4.9★ on Google (147 reviews)"],
    localKeywords: ["solar installer near me", "solar panels {{city}}", "tesla powerwall installer", "solar quote"],
  },
  {
    slug: "windows-doors",
    name: "Windows & Doors",
    category: "Remodeling",
    h1: "Replacement Windows & Doors in {{city}} — Factory-Direct Pricing",
    subheadline:
      "Energy-efficient vinyl and fiberglass, installed by our own crews. Lifetime glass breakage warranty, no middleman markup.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=70",
    offer: "Buy 3 windows, get the 4th free + free in-home quote",
    priceRange: "$550/window installed – $4,200 patio door system",
    responseTime: "Measure appointment within 48 hours",
    serviceRadiusMiles: 40,
    qualifying: [
      ...commonQualifying,
      {
        id: "count",
        label: "Roughly how many openings?",
        type: "radio",
        required: true,
        options: [
          { value: "1-3", label: "1–3" },
          { value: "4-8", label: "4–8" },
          { value: "9-15", label: "9–15" },
          { value: "16+", label: "Whole house (16+)" },
        ],
      },
      {
        id: "scope",
        label: "What's in scope?",
        type: "radio",
        required: true,
        options: [
          { value: "windows", label: "Windows only" },
          { value: "doors", label: "Doors only" },
          { value: "both", label: "Both" },
        ],
      },
    ],
    reviews: [
      {
        author: "Paula G.",
        city: "Glendale, CA",
        rating: 5,
        body:
          "Replaced 14 windows in a 1960s ranch. Crew did it in two days, left zero stucco damage, and my AC bill dropped 22% the first month.",
        source: "Google",
        date: "2026-03-11",
      },
      {
        author: "Hiro S.",
        city: "Santa Monica, CA",
        rating: 5,
        body:
          "Sliding patio door plus a front entry. The quote I got elsewhere was $2,100 higher and didn't include the trim. These guys were up front about everything.",
        source: "Google",
        date: "2026-02-08",
      },
      {
        author: "Megan K.",
        city: "Burbank, CA",
        rating: 5,
        body: "Milgard windows, installed perfectly. They even caulked the old gaps I didn't ask about. Picky crew in the best way.",
        source: "Yelp",
        date: "2025-12-19",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70",
        alt: "New vinyl replacement windows on stucco home",
        caption: "14-window replacement — Glendale",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70",
        alt: "Large sliding patio door opening to backyard",
        caption: "Multi-slide patio door — Santa Monica",
      },
      {
        src: "https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=900&q=70",
        alt: "Fiberglass front entry door",
        caption: "Therma-Tru fiberglass entry",
      },
    ],
    faqs: [
      { q: "What brands do you install?", a: "Milgard, Andersen, Marvin for windows; Therma-Tru and Andersen for doors. We pick based on your climate and budget, not spiffs." },
      { q: "How long does a full-house job take?", a: "Typical LA single-family: 2–3 days. We replace 4–6 openings per crew per day." },
      { q: "Do you handle HOA approvals?", a: "Yes — we provide specs, cut sheets, and photos for your HOA packet, included." },
    ],
    trustBadges: ["CSLB B-1 #1068191", "Milgard Certified Installer", "BBB A+", "4.9★ on Google (184 reviews)"],
    localKeywords: ["window replacement {{city}}", "vinyl windows near me", "patio door install", "entry door replacement"],
  },
  {
    slug: "garage-doors",
    name: "Garage Doors",
    category: "Exterior",
    h1: "Garage Door Repair & Install in {{city}} — On-Site in 90 Minutes",
    subheadline:
      "Broken springs, openers, off-track doors — most repairs done same visit. New doors with lifetime spring warranty and smart-opener included.",
    heroImage:
      "https://images.unsplash.com/photo-1600573472573-d5c24dd2d1d8?auto=format&fit=crop&w=1600&q=70",
    offer: "Free spring inspection + $75 off any repair",
    priceRange: "$189 spring replacement – $2,400 full door + opener",
    responseTime: "Dispatched in 90 minutes, 7 days a week",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What's wrong?",
        type: "radio",
        required: true,
        options: [
          { value: "spring", label: "Broken spring / won't open" },
          { value: "opener", label: "Opener issue" },
          { value: "track", label: "Off-track or damaged panel" },
          { value: "new", label: "Ready for a new door" },
        ],
      },
    ],
    reviews: [
      {
        author: "Luis N.",
        city: "Whittier, CA",
        rating: 5,
        body:
          "Spring snapped Sunday morning, car stuck inside. Tech showed in 70 minutes, replaced both springs and lubed the whole system. $320 flat.",
        source: "Google",
        date: "2026-03-22",
      },
      {
        author: "Cassie M.",
        city: "Long Beach, CA",
        rating: 5,
        body:
          "New Clopay insulated door with a LiftMaster opener. Quote matched the invoice to the dollar. They hauled off the old door at no charge.",
        source: "Google",
        date: "2026-01-30",
      },
      {
        author: "Eli V.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Second company this year, first one that didn't try to upsell me. Just fixed the cable and left.",
        source: "Yelp",
        date: "2025-11-04",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1591472933603-2c8d2e3e6a6e?auto=format&fit=crop&w=900&q=70",
        alt: "New insulated garage door on suburban home",
        caption: "Clopay Gallery insulated door — Long Beach",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=70",
        alt: "Garage door opener unit on ceiling",
        caption: "LiftMaster 8500W jackshaft opener",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=70",
        alt: "Technician installing new garage door torsion spring",
        caption: "Torsion spring replacement",
      },
    ],
    faqs: [
      { q: "Can you come today?", a: "For broken springs and stuck doors, yes — we keep trucks stocked with the 8 most common spring sizes." },
      { q: "Warranty on new doors?", a: "Lifetime on springs and hardware, 10 years on panels, 5 years on openers." },
      { q: "Smart openers?", a: "Every new opener we install is myQ-enabled at no extra cost." },
    ],
    trustBadges: ["IDA Certified", "LiftMaster Pro Dealer", "BBB A+", "4.9★ on Google (312 reviews)"],
    localKeywords: ["garage door repair {{city}}", "broken spring", "new garage door install", "garage opener repair"],
  },
  {
    slug: "painting",
    name: "Painting",
    category: "Remodeling",
    h1: "Interior & Exterior Painters in {{city}} — 2-Coat Minimum, Always",
    subheadline:
      "Sherwin-Williams and Benjamin Moore only. Full prep, masking, and cleanup. Fixed-price quote with a written 5-year workmanship warranty.",
    heroImage:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1600&q=70",
    offer: "Free color consultation + 5-year warranty in writing",
    priceRange: "$420 single room – $11,800 full exterior",
    responseTime: "On-site estimate within 48 hours",
    serviceRadiusMiles: 35,
    qualifying: [
      ...commonQualifying,
      {
        id: "scope",
        label: "Interior or exterior?",
        type: "radio",
        required: true,
        options: [
          { value: "interior", label: "Interior" },
          { value: "exterior", label: "Exterior" },
          { value: "both", label: "Both" },
        ],
      },
      {
        id: "size",
        label: "Approximate size?",
        type: "select",
        options: [
          { value: "1-room", label: "Single room" },
          { value: "multi-room", label: "Several rooms" },
          { value: "whole", label: "Whole house" },
          { value: "exterior", label: "Full exterior" },
        ],
      },
    ],
    reviews: [
      {
        author: "Bianca L.",
        city: "Santa Monica, CA",
        rating: 5,
        body:
          "Painted our whole interior in 4 days. Crew was polite, protected every floor, and patched every nail hole we never got around to. Lines are sharp as a razor.",
        source: "Google",
        date: "2026-03-06",
      },
      {
        author: "Ahmed Q.",
        city: "Los Angeles, CA",
        rating: 5,
        body:
          "Exterior repaint on a two-story stucco. They prepped properly — scraped, patched, primed — and the color match was perfect. Quote held firm.",
        source: "Google",
        date: "2026-02-01",
      },
      {
        author: "Stacy D.",
        city: "Glendale, CA",
        rating: 5,
        body: "Nursery paint job done in a single day. Zero fumes by the time the baby came home. Thoughtful crew.",
        source: "Facebook",
        date: "2025-10-17",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=70",
        alt: "Painter rolling living room ceiling",
        caption: "Whole-interior repaint — Santa Monica",
      },
      {
        src: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=900&q=70",
        alt: "Exterior stucco repaint on two-story home",
        caption: "Stucco exterior — Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?auto=format&fit=crop&w=900&q=70",
        alt: "Fresh cabinet painting with sprayer in kitchen",
        caption: "Sprayed cabinet refinish — Glendale",
      },
    ],
    faqs: [
      { q: "What paint do you use?", a: "Sherwin-Williams Emerald or Benjamin Moore Aura on exteriors; SW Cashmere or BM Regal on interiors. No builder-grade substitutions." },
      { q: "Do you move furniture?", a: "We move it, cover it, and put it back. No extra charge." },
      { q: "Warranty?", a: "5 years on workmanship (peeling, blistering, separation). Transferable if you sell within the window." },
    ],
    trustBadges: ["Sherwin-Williams Preferred Contractor", "EPA RRP Certified", "BBB A+", "4.9★ on Google (276 reviews)"],
    localKeywords: ["house painter {{city}}", "interior painting near me", "exterior repaint", "cabinet painting"],
  },
  {
    slug: "flooring",
    name: "Flooring",
    category: "Remodeling",
    h1: "Hardwood, LVP & Tile Flooring in {{city}} — Installed by Our Own Crew",
    subheadline:
      "Showroom-quality hardwood, water-proof LVP, and tile. Subfloor leveling, moisture barrier, baseboard swap — all in one fixed quote.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=70",
    offer: "Free in-home measure + $1/sq ft off any install over 600 sq ft",
    priceRange: "$6.50/sq ft LVP installed – $18/sq ft white-oak hardwood",
    responseTime: "Measure appointment within 72 hours",
    serviceRadiusMiles: 35,
    qualifying: [
      ...commonQualifying,
      {
        id: "material",
        label: "What kind of flooring?",
        type: "radio",
        required: true,
        options: [
          { value: "hardwood", label: "Hardwood" },
          { value: "lvp", label: "Luxury vinyl plank" },
          { value: "tile", label: "Tile" },
          { value: "unsure", label: "Help me pick" },
        ],
      },
      {
        id: "sqft",
        label: "Approximate square footage?",
        type: "select",
        options: [
          { value: "<500", label: "Under 500" },
          { value: "500-1000", label: "500–1,000" },
          { value: "1000-2000", label: "1,000–2,000" },
          { value: "2000+", label: "Over 2,000" },
        ],
      },
    ],
    reviews: [
      {
        author: "Priscilla A.",
        city: "Burbank, CA",
        rating: 5,
        body:
          "1,400 sq ft of white-oak engineered hardwood. They leveled a hump two other contractors told me to ignore. Finish is glass-flat.",
        source: "Google",
        date: "2026-03-14",
      },
      {
        author: "Roman F.",
        city: "Los Angeles, CA",
        rating: 5,
        body:
          "LVP through kitchen and living. Crew was tidy, baseboards swapped clean, not a single gap. Quote to the dollar.",
        source: "Google",
        date: "2026-01-21",
      },
      {
        author: "Jordan H.",
        city: "Torrance, CA",
        rating: 5,
        body: "Tile shower and floor, perfect grout lines, zero lippage. They let me pick the exact bullnose pattern.",
        source: "Yelp",
        date: "2025-12-04",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=900&q=70",
        alt: "Newly installed white oak hardwood floor in open living area",
        caption: "White-oak engineered hardwood — Burbank",
      },
      {
        src: "https://images.unsplash.com/photo-1598300188480-18b3915ed4d8?auto=format&fit=crop&w=900&q=70",
        alt: "Luxury vinyl plank floor in kitchen",
        caption: "Waterproof LVP — Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=70",
        alt: "Large-format porcelain tile flooring with tight grout",
        caption: "24x48 porcelain tile — Torrance",
      },
    ],
    faqs: [
      { q: "Do you move furniture?", a: "Yes — we move it, floor goes in, we put it back. Pianos and safes quoted separately." },
      { q: "How long does an install take?", a: "1,000 sq ft of LVP: 2–3 days. Same in hardwood: 3–5 days including acclimation." },
      { q: "What warranty?", a: "Lifetime workmanship on install. Material warranty is whatever the manufacturer publishes, registered in your name." },
    ],
    trustBadges: ["CSLB C-15 #1068191", "NWFA Certified Installer", "BBB A+", "4.9★ on Google (158 reviews)"],
    localKeywords: ["flooring installer {{city}}", "hardwood floors near me", "lvp install", "tile installer"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    category: "Exterior",
    h1: "Drought-Smart Landscaping in {{city}} — Design, Install & Maintain",
    subheadline:
      "Water-wise yards, turf replacement, pavers, and drip-irrigation retrofits. DWP-rebate-eligible designs, local native plants, SoCal-ready.",
    heroImage:
      "https://images.unsplash.com/photo-1502943693086-33b5b1cfdf2f?auto=format&fit=crop&w=1600&q=70",
    offer: "Free yard design consult + DWP turf-replacement rebate paperwork handled",
    priceRange: "$2,800 front-yard refresh – $38,000 full design-build",
    responseTime: "Design walkthrough within 5 days",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "goal",
        label: "What do you want?",
        type: "radio",
        required: true,
        options: [
          { value: "turf", label: "Replace lawn / turf" },
          { value: "design", label: "Full yard redesign" },
          { value: "hardscape", label: "Pavers, patio, walls" },
          { value: "maintain", label: "Ongoing maintenance" },
        ],
      },
      {
        id: "yard",
        label: "Which yard?",
        type: "select",
        options: [
          { value: "front", label: "Front" },
          { value: "back", label: "Back" },
          { value: "both", label: "Both" },
        ],
      },
    ],
    reviews: [
      {
        author: "Camila R.",
        city: "Pasadena, CA",
        rating: 5,
        body:
          "Ripped out a dying lawn and put in a native-plant front yard with a gravel path. DWP approved the rebate, designer was patient with my endless revisions.",
        source: "Google",
        date: "2026-03-09",
      },
      {
        author: "Greg V.",
        city: "Long Beach, CA",
        rating: 5,
        body:
          "Paver patio and outdoor kitchen. Crew laid the base right, no settling six months later. Honest about what was in and out of scope.",
        source: "Google",
        date: "2026-02-12",
      },
      {
        author: "Sun L.",
        city: "Inglewood, CA",
        rating: 5,
        body: "Drip-irrigation retrofit cut my water bill 60%. They walked me through the controller so I could actually use it.",
        source: "Facebook",
        date: "2025-11-18",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1598901865264-4f5eaad9c3cf?auto=format&fit=crop&w=900&q=70",
        alt: "Drought-tolerant native landscaping front yard",
        caption: "Native-plant front yard — Pasadena",
      },
      {
        src: "https://images.unsplash.com/photo-1590090136031-11a0e7c2d3fd?auto=format&fit=crop&w=900&q=70",
        alt: "Paver patio with outdoor kitchen",
        caption: "Paver patio + outdoor kitchen — Long Beach",
      },
      {
        src: "https://images.unsplash.com/photo-1585154103874-bce26d3cb67b?auto=format&fit=crop&w=900&q=70",
        alt: "Drip irrigation tubing along garden bed",
        caption: "Drip-irrigation retrofit — Inglewood",
      },
    ],
    faqs: [
      { q: "Do you handle the DWP rebate?", a: "Yes — we photograph before/after, submit the application, and coordinate the inspection. Most homeowners net $3/sq ft back." },
      { q: "Do you use natives?", a: "By default. Our palette leans on California natives (ceanothus, toyon, sages) with drought-adapted support plants." },
      { q: "Ongoing maintenance?", a: "Monthly and bi-weekly plans available — same crew that built the yard keeps it dialed in." },
    ],
    trustBadges: ["CSLB C-27 #1068191", "QWEL Water-Wise Certified", "BBB A+", "4.9★ on Google (129 reviews)"],
    localKeywords: ["landscaper {{city}}", "turf replacement", "drought landscaping", "paver patio installer"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    category: "Home Care",
    h1: "Pest & Rodent Control in {{city}} — Pet-Safe & 100% Guaranteed",
    subheadline:
      "Ants, roaches, rodents, termites, bedbugs. Pet- and kid-safe treatments. If they come back between visits, we come back free.",
    heroImage:
      "https://images.unsplash.com/photo-1606133579867-4ce6f3ff8a22?auto=format&fit=crop&w=1600&q=70",
    offer: "Free inspection + $50 off first treatment",
    priceRange: "$129 initial treatment – $1,450 termite tent",
    responseTime: "Same-day or next-day visit",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "pest",
        label: "What are you dealing with?",
        type: "radio",
        required: true,
        options: [
          { value: "ants-roaches", label: "Ants / roaches" },
          { value: "rodents", label: "Rats or mice" },
          { value: "termites", label: "Termites" },
          { value: "bedbugs", label: "Bedbugs" },
          { value: "other", label: "Something else" },
        ],
      },
    ],
    reviews: [
      {
        author: "Yolanda C.",
        city: "Los Angeles, CA",
        rating: 5,
        body:
          "Rat problem in the attic. Tech found the entry points in 15 minutes and sealed them. Pet-safe bait, no more noises at night.",
        source: "Google",
        date: "2026-03-17",
      },
      {
        author: "Marcus J.",
        city: "Santa Monica, CA",
        rating: 5,
        body:
          "Termite inspection turned into a tent job. They handled the tarps, the neighbors, the paperwork. Price on the quote was the price on the invoice.",
        source: "Google",
        date: "2026-02-04",
      },
      {
        author: "Amaya R.",
        city: "Whittier, CA",
        rating: 5,
        body: "Bedbugs from a hotel. One heat treatment and they were gone. Guarantee meant I slept easy the next month.",
        source: "Yelp",
        date: "2025-11-27",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1604079628033-14b9e52e2b62?auto=format&fit=crop&w=900&q=70",
        alt: "Technician sealing entry points on exterior of home",
        caption: "Rodent exclusion — Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1604147706283-d7119b5b8972?auto=format&fit=crop&w=900&q=70",
        alt: "Termite tent over a single-family home",
        caption: "Fumigation tent — Santa Monica",
      },
      {
        src: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=900&q=70",
        alt: "Tech spraying baseboards during interior treatment",
        caption: "Pet-safe perimeter treatment",
      },
    ],
    faqs: [
      { q: "Is the treatment safe for pets and kids?", a: "Yes — we use EPA-registered products and wait for surfaces to dry before re-entry (usually 1–2 hours)." },
      { q: "How fast will I see results?", a: "Ants and roaches: within 48 hours. Rodents: noise stops once entry points are sealed, usually a week." },
      { q: "Do you offer plans?", a: "Quarterly plans with free re-treats between visits. Cancel anytime, no contract." },
    ],
    trustBadges: ["CA Structural Pest Control Board #PR-1068191", "NPMA Member", "BBB A+", "4.9★ on Google (243 reviews)"],
    localKeywords: ["pest control {{city}}", "rat exterminator near me", "termite inspection", "bedbug treatment"],
  },
  {
    slug: "kitchen-bath",
    name: "Kitchen & Bath",
    category: "Remodeling",
    h1: "Kitchen & Bath Remodeling in {{city}} — Fixed-Price, 3D Design Included",
    subheadline:
      "In-house designers and installers. Every quote starts with a 3D render so you see the space before we swing a hammer. No change-order surprises.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70",
    offer: "Free 3D design + locked-price quote + 10-year warranty",
    priceRange: "$14,500 bath refresh – $78,000 full kitchen",
    responseTime: "Design consult within 1 week",
    serviceRadiusMiles: 35,
    qualifying: [
      ...commonQualifying,
      {
        id: "room",
        label: "Which room?",
        type: "radio",
        required: true,
        options: [
          { value: "kitchen", label: "Kitchen" },
          { value: "primary-bath", label: "Primary bathroom" },
          { value: "guest-bath", label: "Guest / hall bathroom" },
          { value: "multiple", label: "Multiple rooms" },
        ],
      },
      {
        id: "budget",
        label: "Budget range?",
        type: "select",
        options: [
          { value: "<25k", label: "Under $25k" },
          { value: "25-50k", label: "$25k–$50k" },
          { value: "50-100k", label: "$50k–$100k" },
          { value: "100k+", label: "$100k+" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
    ],
    reviews: [
      {
        author: "Dana W.",
        city: "Glendale, CA",
        rating: 5,
        body:
          "Full kitchen gut — walls moved, new island, quartz, custom cabinets. 3D design matched the finish exactly. Five weeks start to finish, no change orders.",
        source: "Google",
        date: "2026-03-25",
      },
      {
        author: "Victor H.",
        city: "Pasadena, CA",
        rating: 5,
        body:
          "Primary bath with a curbless shower and heated floor. Tile work is immaculate, niche alignment is perfect. Quote was locked from day one.",
        source: "Google",
        date: "2026-02-17",
      },
      {
        author: "Aisha M.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "Designer listened more than she talked. Renders helped us kill a bad layout idea before we paid for it.",
        source: "Facebook",
        date: "2025-12-30",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=900&q=70",
        alt: "Modern kitchen remodel with quartz island and custom cabinets",
        caption: "Full kitchen remodel — Glendale",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=70",
        alt: "Curbless walk-in shower with large-format tile",
        caption: "Curbless primary bath — Pasadena",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=70",
        alt: "3D rendered design of kitchen remodel on monitor",
        caption: "3D render included with every quote",
      },
    ],
    faqs: [
      { q: "How long does a kitchen remodel take?", a: "Typical LA single-family kitchen: 5–7 weeks from demo to final walk. We set the schedule at signing and send weekly updates." },
      { q: "How do you handle change orders?", a: "We spec everything at design time so change orders are rare. When they happen, they're written and priced before any work continues." },
      { q: "Warranty?", a: "10 years on workmanship, plus manufacturer warranties registered in your name for every appliance and fixture." },
    ],
    trustBadges: ["CSLB B-1 #1068191", "NKBA Member", "BBB A+", "4.9★ on Google (174 reviews)"],
    localKeywords: ["kitchen remodel {{city}}", "bathroom remodel near me", "kitchen renovation", "bathroom contractor"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const listServiceSlugs = () => services.map((s) => s.slug);

export const categoryOrder: ServiceCategory[] = ["Trades", "Remodeling", "Exterior", "Home Care"];

export const categoryBlurbs: Record<ServiceCategory, string> = {
  Trades: "Licensed trade work — the stuff that keeps the lights on, the water flowing, and the roof overhead.",
  Remodeling: "Plan, design, and finish the rooms and surfaces you actually live in.",
  Exterior: "Curb appeal, energy, and the space that wraps your home.",
  "Home Care": "Ongoing protection so small problems don't turn into expensive ones.",
};

export const servicesByCategory = (): { category: ServiceCategory; items: Service[] }[] =>
  categoryOrder.map((category) => ({
    category,
    items: services.filter((s) => s.category === category),
  }));
