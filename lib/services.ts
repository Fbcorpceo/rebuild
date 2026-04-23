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

export type Service = {
  slug: string;
  name: string;
  category: "Trades" | "Construction" | "Project Services";
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
    h1: "Licensed Roofers in {{city}}. Free Inspection in 24 Hours.",
    subheadline:
      "Storm damage, leaks, or a full replacement. Get a fixed-price quote from a local, insured crew. No high-pressure sales.",
    heroImage:
      "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=1600&q=70",
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
        caption: "Full tear-off & replacement, Pasadena",
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
      { q: "Do you handle insurance claims?", a: "Yes, we document damage, meet the adjuster, and only charge your deductible on approved claims." },
      { q: "How long does a replacement take?", a: "Most single-family homes: one day. Larger or steeper roofs: two." },
      { q: "Are you licensed and insured?", a: "CSLB Lic. #1068191. Bonded and insured." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "GAF Master Elite", "4.9★ on Google (412 reviews)"],
    localKeywords: ["roofer near me", "roof repair {{city}}", "storm damage roofer", "insurance claim roofing"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    category: "Trades",
    h1: "Same-Day AC Repair in {{city}}. No Overtime Fees.",
    subheadline:
      "EPA-certified techs, upfront flat pricing, and a 100% satisfaction guarantee. Most repairs finished in a single visit.",
    heroImage: "/hvac-hero.jpg",
    offer: "$59 diagnostic. Waived if you book the repair.",
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
        caption: "16 SEER condenser install, Burbank",
      },
      {
        src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=70",
        alt: "HVAC tech performing diagnostic on exterior unit",
        caption: "Diagnostic service call, Los Angeles",
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
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "EPA 608", "4.9★ on Google (288 reviews)"],
    localKeywords: ["ac repair near me", "hvac {{city}}", "ac not cooling", "emergency ac repair"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    category: "Trades",
    h1: "24/7 Emergency Plumbers in {{city}}. On Your Street in 60 Min.",
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
        caption: "Slab leak re-route, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=70",
        alt: "New tankless water heater on garage wall",
        caption: "Navien tankless install, Torrance",
      },
      {
        src: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?auto=format&fit=crop&w=900&q=70",
        alt: "Camera inspection of sewer line",
        caption: "Camera-verified main line clear",
      },
    ],
    faqs: [
      { q: "Is the trip charge really free?", a: "When you approve any repair, yes. We'll tell you the total before we turn a wrench." },
      { q: "Are you licensed?", a: "CSLB Lic. #1068191. Bonded and insured." },
      { q: "Financing?", a: "0% for 18 months on approved credit for jobs over $1,000." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "24/7 Dispatch", "4.8★ on Google (196 reviews)"],
    localKeywords: ["plumber near me", "emergency plumber {{city}}", "water heater repair", "24/7 plumber"],
  },
  {
    slug: "design-build",
    name: "Design-Build",
    category: "Construction",
    h1: "Design-Build Contractors in {{city}}. One Team, One Schedule, One Budget.",
    subheadline:
      "Architect, designer, and crew under one roof. Fewer change orders, faster timelines, and a single point of accountability from concept to keys.",
    heroImage:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=70",
    offer: "Free 60-minute design consult + budget range in writing",
    priceRange: "$85k ADU – $1.2M+ whole-home rebuild",
    responseTime: "First call within 24 hours, scope meeting within a week",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "projectType",
        label: "What kind of project is it?",
        type: "radio",
        required: true,
        options: [
          { value: "adu", label: "ADU / guest house" },
          { value: "addition", label: "Addition (new square footage)" },
          { value: "whole-home", label: "Whole-home remodel" },
          { value: "new-build", label: "Ground-up new construction" },
        ],
      },
      {
        id: "budget",
        label: "Rough budget range",
        type: "select",
        required: true,
        options: [
          { value: "<150", label: "Under $150k" },
          { value: "150-400", label: "$150k – $400k" },
          { value: "400-800", label: "$400k – $800k" },
          { value: "800+", label: "Over $800k" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
    ],
    reviews: [
      {
        author: "Alicia M.",
        city: "Beverly Hills, CA",
        rating: 5,
        body: "We'd been burned twice trying to coordinate an architect and a GC separately. FB Corp handled both. Budget at kickoff matched the final invoice within 3%.",
        source: "Google",
        date: "2026-02-28",
      },
      {
        author: "Paul K.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Detached ADU in the back yard, permit through ready-to-move-in. Ten months, zero surprise bills. Our project manager answered texts on weekends.",
        source: "Google",
        date: "2026-01-18",
      },
      {
        author: "Dina W.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "Whole-second-story addition over an occupied ground floor. Somehow they made it livable the entire time.",
        source: "Yelp",
        date: "2025-11-04",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=70",
        alt: "Modern design-build home with infinity pool and open indoor-outdoor living",
        caption: "Custom design-build home, Pacific Palisades",
      },
      {
        src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=900&q=70",
        alt: "New mixed-use infill construction complete",
        caption: "Infill new construction, Santa Monica",
      },
      {
        src: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=900&q=70",
        alt: "Completed living room in a design-build home",
        caption: "Concept to completion, Beverly Hills",
      },
    ],
    faqs: [
      { q: "Do we sign one contract or two?", a: "One. Design fees roll into the construction contract once plans are approved, so you only write checks to one team." },
      { q: "How long is the design phase?", a: "Typical single-family remodel: 6–10 weeks from kickoff to permit submittal." },
      { q: "What if we already have plans?", a: "We'll review them free of charge and either build to them or flag anything that'll cause permitting or budget pain." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "AIA-Partner Architects", "4.9★ on Google"],
    localKeywords: ["design build contractor {{city}}", "ADU builder near me", "home addition contractor", "whole home remodel"],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    category: "Construction",
    h1: "Kitchen, Bath & Whole-Home Remodels in {{city}}. Fixed Price, Fixed Schedule.",
    subheadline:
      "Kitchens, bathrooms, additions, and load-bearing changes. We pull the permits, handle the inspections, and protect your floors and furniture the whole way through.",
    heroImage:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=70",
    offer: "Free in-home scope visit + written estimate in 5 business days",
    priceRange: "$35k bath – $250k+ whole-home remodel",
    responseTime: "Call back within 4 business hours",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "scope",
        label: "What's the scope?",
        type: "radio",
        required: true,
        options: [
          { value: "kitchen", label: "Kitchen" },
          { value: "bath", label: "Bathroom" },
          { value: "addition", label: "Addition / new square footage" },
          { value: "whole", label: "Whole-home remodel" },
        ],
      },
      {
        id: "structural",
        label: "Moving or removing any walls?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, load-bearing changes" },
          { value: "maybe", label: "Maybe, not sure yet" },
          { value: "no", label: "No structural changes" },
        ],
      },
    ],
    reviews: [
      {
        author: "Ravi P.",
        city: "Culver City, CA",
        rating: 5,
        body: "Gutted the primary bath down to studs. Finished 4 days ahead of schedule. The tile work is better than the showroom we picked it from.",
        source: "Google",
        date: "2026-03-08",
      },
      {
        author: "Meg L.",
        city: "Glendale, CA",
        rating: 5,
        body: "Took out a load-bearing wall between kitchen and living room. Structural engineer, beam install, and finish work. One crew. Entire process made sense for the first time.",
        source: "Google",
        date: "2026-01-22",
      },
      {
        author: "Tomás R.",
        city: "Long Beach, CA",
        rating: 5,
        body: "Kitchen remodel with a hard deadline before family arrived. They hit it to the day.",
        source: "Yelp",
        date: "2025-12-12",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=70",
        alt: "Whole-home exterior remodel with updated facade and landscaping",
        caption: "Whole-home exterior remodel, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=70",
        alt: "Remodeled primary bathroom with walk-in shower",
        caption: "Primary bath, down-to-studs, Glendale",
      },
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=70",
        alt: "Finished modern bathroom with freestanding tub and dark tile",
        caption: "Primary bath rebuild, Culver City",
      },
    ],
    faqs: [
      { q: "Do you pull the permits?", a: "Always. Permits, inspections, and code compliance are included, you don't talk to LADBS, we do." },
      { q: "Can we live in the house during construction?", a: "For kitchen-only or bath-only: usually yes. For whole-home: we'll tell you honestly before you sign." },
      { q: "What warranty do you offer?", a: "2 years on labor, manufacturer warranties on fixtures and finishes." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "Permit Expediting Included", "2-Year Labor Warranty"],
    localKeywords: ["kitchen remodel {{city}}", "bathroom remodel near me", "home addition contractor", "load bearing wall removal"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    category: "Trades",
    h1: "Licensed Electricians in {{city}}. Same-Day Service Calls, Flat-Rate Pricing.",
    subheadline:
      "Panel upgrades, EV chargers, troubleshooting, rewires. Licensed, bonded and insured, with no markup on parts. You'll see the invoice from the supply house.",
    heroImage:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1600&q=70",
    offer: "$59 diagnostic. Waived when you approve the repair.",
    priceRange: "$149 service call – $4,800 panel upgrade",
    responseTime: "Same-day appointments until 8pm",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "issue",
        label: "What do you need done?",
        type: "radio",
        required: true,
        options: [
          { value: "outage", label: "Outage / breaker tripping" },
          { value: "panel", label: "Panel upgrade or replacement" },
          { value: "ev", label: "EV charger install" },
          { value: "remodel", label: "New circuits for a remodel" },
          { value: "other", label: "Something else" },
        ],
      },
    ],
    reviews: [
      {
        author: "Hannah B.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "Tesla charger install, 60A circuit to the garage. Quoted 4 hours, done in 3. Clean conduit run, labeled panel.",
        source: "Google",
        date: "2026-03-22",
      },
      {
        author: "Greg S.",
        city: "Torrance, CA",
        rating: 5,
        body: "1960s panel upgrade to 200A. Permit, inspection, and a spotless job. Tech explained every change before making it.",
        source: "Google",
        date: "2026-02-09",
      },
      {
        author: "Nora D.",
        city: "Whittier, CA",
        rating: 5,
        body: "Breakers kept tripping on the kitchen circuit. They found a loose neutral in 15 minutes that two other electricians missed.",
        source: "Google",
        date: "2025-12-18",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=70",
        alt: "Electrical rough-in on a new construction deck before concrete pour",
        caption: "New construction electrical rough-in, Torrance",
      },
      {
        src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=70",
        alt: "EV charger installed on garage wall",
        caption: "Level 2 EV charger, 60A circuit, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=900&q=70",
        alt: "Electrician testing circuits with multimeter",
        caption: "Diagnostic + targeted repair, Whittier",
      },
    ],
    faqs: [
      { q: "Do you pull permits for panel work?", a: "Yes, every panel and service upgrade is permitted and inspected. We handle it end-to-end." },
      { q: "Are you licensed?", a: "CSLB Lic. #1068191. Bonded and insured." },
      { q: "Do you charge extra after hours?", a: "Flat rates 7am–8pm, seven days. No overtime surcharge." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "EV Charger Certified", "4.9★ on Google"],
    localKeywords: ["electrician near me", "EV charger installation {{city}}", "panel upgrade", "emergency electrician"],
  },
  {
    slug: "framing",
    name: "Framing",
    category: "Construction",
    h1: "Framing Contractors in {{city}}. Square, Plumb, On-Schedule.",
    subheadline:
      "New construction, second-story additions, and structural reframes by a stable in-house crew. We follow the architect's prints and leave the site broom-clean at shift end.",
    heroImage:
      "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1600&q=70",
    offer: "Free plan takeoff + fixed-price framing bid",
    priceRange: "$12/sqft standard – $22/sqft complex roofs & custom details",
    responseTime: "Bid in 3 business days from plans",
    serviceRadiusMiles: 40,
    qualifying: [
      ...commonQualifying,
      {
        id: "projectType",
        label: "What are we framing?",
        type: "radio",
        required: true,
        options: [
          { value: "addition", label: "Addition to existing home" },
          { value: "adu", label: "ADU / detached structure" },
          { value: "new-build", label: "Ground-up new construction" },
          { value: "reframe", label: "Structural reframe / repair" },
        ],
      },
      {
        id: "plans",
        label: "Do you have architectural plans?",
        type: "radio",
        options: [
          { value: "stamped", label: "Yes, stamped & permit-ready" },
          { value: "draft", label: "Draft plans only" },
          { value: "no", label: "No plans yet" },
        ],
      },
    ],
    reviews: [
      {
        author: "Ben A.",
        city: "Burbank, CA",
        rating: 5,
        body: "Second-story addition framed in 11 days over the rainiest week of the year. Crew tarped and protected everything every single night.",
        source: "Google",
        date: "2026-03-01",
      },
      {
        author: "Rosa M.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "Detached ADU framing came in exactly on the bid. Lead framer walked me through shear wall nailing so I understood what I was paying for.",
        source: "Google",
        date: "2026-01-28",
      },
      {
        author: "Drew K.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Our old GC flaked halfway through framing. FB Corp picked up the job, fixed the mistakes, and got us past rough inspection.",
        source: "Yelp",
        date: "2025-11-15",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=900&q=70",
        alt: "Framer using a circular saw to cut dimensional lumber",
        caption: "Cutting plate runs on-site, Burbank",
      },
      {
        src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=70",
        alt: "Carpenter in full PPE working on a framing deck",
        caption: "ADU framing in progress, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=70",
        alt: "Framers installing roof trusses",
        caption: "Roof truss install, engineered package",
      },
    ],
    faqs: [
      { q: "Do you bid from plans or do a walk-through?", a: "Either. For fastest turnaround, email stamped plans. For existing-structure work we'll do a site visit." },
      { q: "Who coordinates inspections?", a: "We do. Rough framing inspection is on us, and we'll be on-site when the inspector arrives." },
      { q: "Do you work for GCs or only homeowners?", a: "Both. About half our volume is sub work for other licensed GCs." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "In-House Crew (No Day-Labor)", "On-Time Track Record"],
    localKeywords: ["framing contractor {{city}}", "addition framer near me", "ADU framing", "residential framing"],
  },
  {
    slug: "finishes",
    name: "Finishes & Cabinetry",
    category: "Construction",
    h1: "Custom Cabinets, Flooring, Drywall & Paint in {{city}}",
    subheadline:
      "The final 20% of a job is what you actually see. Our finish crew installs cabinetry, countertops, flooring, drywall, and paint, then cleans up after themselves.",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=1600&q=70",
    offer: "Free measure + material allowance estimate",
    priceRange: "$3,200 paint-only refresh – $60,000+ full finish package",
    responseTime: "On-site measure within 5 business days",
    serviceRadiusMiles: 30,
    qualifying: [
      ...commonQualifying,
      {
        id: "scope",
        label: "Which finishes?",
        type: "radio",
        required: true,
        options: [
          { value: "cabinets", label: "Cabinetry / countertops" },
          { value: "flooring", label: "Flooring" },
          { value: "drywall", label: "Drywall / paint" },
          { value: "full", label: "Full finish package (multiple)" },
        ],
      },
      {
        id: "sqft",
        label: "Approximate square footage?",
        type: "select",
        options: [
          { value: "<500", label: "Under 500 sqft" },
          { value: "500-1500", label: "500 – 1,500 sqft" },
          { value: "1500-3000", label: "1,500 – 3,000 sqft" },
          { value: "3000+", label: "Over 3,000 sqft" },
        ],
      },
    ],
    reviews: [
      {
        author: "Kim H.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "Custom walnut cabinets throughout the kitchen and primary closet. Installed on schedule, tuned the doors and drawers twice until everything glided perfectly.",
        source: "Google",
        date: "2026-02-20",
      },
      {
        author: "Marco T.",
        city: "Inglewood, CA",
        rating: 5,
        body: "Engineered hardwood across 1,800 sqft. Not a single gap or creaky board. Baseboards came out so clean my wife still points them out.",
        source: "Google",
        date: "2026-01-10",
      },
      {
        author: "Sasha B.",
        city: "Long Beach, CA",
        rating: 5,
        body: "Interior repaint on a whole house. They covered every fixture, labeled every switch plate, and finished 2 days early.",
        source: "Yelp",
        date: "2025-11-29",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=70",
        alt: "Designer kitchen detail with cutting boards, ceramics, and wood accents",
        caption: "Finish-level kitchen detail, Santa Monica",
      },
      {
        src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=70",
        alt: "Engineered hardwood floor installation",
        caption: "1,800 sqft hardwood install, Inglewood",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=70",
        alt: "Freshly painted bright interior with new cabinetry",
        caption: "Full-home interior repaint, Long Beach",
      },
    ],
    faqs: [
      { q: "Do you source the materials or do we?", a: "Either works. We get trade pricing at most local showrooms, but if you've already bought materials we'll install them." },
      { q: "Any warranty on finish work?", a: "2 years on installation labor. Product warranties pass through from the manufacturer." },
      { q: "How bad is the dust?", a: "We use HEPA vacuums on sanders and zip-wall containment between active and living areas. It's about as clean as construction gets." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "Trade Pricing Passed Through", "2-Year Labor Warranty"],
    localKeywords: ["custom cabinets {{city}}", "finish carpenter near me", "interior painter", "hardwood flooring installer"],
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    category: "Project Services",
    h1: "Interior Designers in {{city}} Who Actually Get It Built",
    subheadline:
      "Cohesive design plans, vendor management, and on-site coordination, so the room looks like the rendering. Works standalone or in lockstep with our build crew.",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=70",
    offer: "Free 30-minute discovery call + style direction deck",
    priceRange: "$150/hr hourly consult – $28,000+ full-home design",
    responseTime: "Reply within 4 business hours",
    serviceRadiusMiles: 25,
    qualifying: [
      ...commonQualifying,
      {
        id: "scope",
        label: "What are we designing?",
        type: "radio",
        required: true,
        options: [
          { value: "room", label: "Single room" },
          { value: "multi", label: "Multiple rooms" },
          { value: "whole", label: "Whole home" },
          { value: "commercial", label: "Commercial space" },
        ],
      },
      {
        id: "style",
        label: "Leaning toward any style?",
        type: "select",
        options: [
          { value: "modern", label: "Modern / minimalist" },
          { value: "traditional", label: "Traditional / classic" },
          { value: "transitional", label: "Transitional / mix" },
          { value: "coastal", label: "Coastal / California" },
          { value: "unsure", label: "Not sure, help me pick" },
        ],
      },
    ],
    reviews: [
      {
        author: "Zoe R.",
        city: "Pacific Palisades, CA",
        rating: 5,
        body: "Designer came with mood boards that actually matched how we live. Every vendor she recommended delivered on time. Our house finally looks like us.",
        source: "Google",
        date: "2026-03-12",
      },
      {
        author: "Andre J.",
        city: "Beverly Hills, CA",
        rating: 5,
        body: "We'd worked with two design-only firms and the install was always chaos. This one ran the install themselves. Flawless.",
        source: "Google",
        date: "2026-02-06",
      },
      {
        author: "Prisha V.",
        city: "Culver City, CA",
        rating: 5,
        body: "Consulted for 4 hours on our new build's kitchen and primary suite. Worth 10x what we paid.",
        source: "Yelp",
        date: "2025-12-01",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1522444195799-478538b28823?auto=format&fit=crop&w=900&q=70",
        alt: "Sunlit living corner with curated sofa, plants, and art",
        caption: "Full-home design + install, Pacific Palisades",
      },
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=70",
        alt: "Styled bedroom with cohesive palette",
        caption: "Primary suite design, Beverly Hills",
      },
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=70",
        alt: "Modern kitchen design renders alongside completed build",
        caption: "Kitchen + dining design consult, Culver City",
      },
    ],
    faqs: [
      { q: "Do you only work on projects you're building?", a: "No, standalone design is our most popular package. If you want us to build it too, we can bundle." },
      { q: "Who buys the furniture?", a: "Your call. We'll handle procurement and delivery coordination if you want, or hand you a shopping list with direct links." },
      { q: "Can we see past work?", a: "Yes, full portfolio with addresses on request (NDA for private clients)." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "Trade-Only Showroom Access", "5.0★ Average Project"],
    localKeywords: ["interior designer {{city}}", "home design consultant", "kitchen designer near me", "whole home interior design"],
  },
  {
    slug: "site-management",
    name: "Site Management",
    category: "Project Services",
    h1: "Construction Site Management for {{city}} Projects. So Your Job Doesn't Stall.",
    subheadline:
      "Material logistics, on-site safety, subcontractor coordination, and daily clean-up. Plug us in when you're self-managing a build or your GC needs backup.",
    heroImage:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1600&q=70",
    offer: "Free site walk + 3-page risk & logistics audit",
    priceRange: "$6,500/mo part-time – $22,000/mo full-time site super",
    responseTime: "First walk-through within 48 hours",
    serviceRadiusMiles: 40,
    qualifying: [
      ...commonQualifying,
      {
        id: "projectStage",
        label: "What stage is the project in?",
        type: "radio",
        required: true,
        options: [
          { value: "pre", label: "Pre-construction" },
          { value: "active", label: "Active construction" },
          { value: "stalled", label: "Stalled / needs rescue" },
        ],
      },
      {
        id: "duration",
        label: "Expected engagement length?",
        type: "select",
        options: [
          { value: "1mo", label: "Under 1 month" },
          { value: "1-3mo", label: "1–3 months" },
          { value: "3-6mo", label: "3–6 months" },
          { value: "6+", label: "6 months or longer" },
        ],
      },
    ],
    reviews: [
      {
        author: "Vincent P.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "Owner-built a duplex and hit a wall coordinating trades. FB Corp stepped in as site super, saved us two months and a small fortune.",
        source: "Google",
        date: "2026-02-25",
      },
      {
        author: "Bethany K.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Our original GC was stretched. Their site super took over daily coordination and the job finished on time without us firing anyone.",
        source: "Google",
        date: "2026-01-14",
      },
      {
        author: "Miles O.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "Materials showed up when they should. Subs knew when to show up. Site was swept every Friday. Worth every dollar.",
        source: "Yelp",
        date: "2025-12-05",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=70",
        alt: "Organized construction site with staged materials",
        caption: "Daily-managed site, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=900&q=70",
        alt: "Laborer moving lumber on-site during active construction",
        caption: "On-site lumber delivery, Pasadena",
      },
      {
        src: "https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=900&q=70",
        alt: "Completed exterior after supervised build",
        caption: "Project walk at completion, Santa Monica",
      },
    ],
    faqs: [
      { q: "Do you replace the GC?", a: "Usually no. We supplement the GC by running the day-to-day on-site while they stay accountable for contracts and pricing." },
      { q: "What do you actually do each day?", a: "First-crew check-in, schedule verification, deliveries, safety/PPE audit, progress photos, and a written daily log." },
      { q: "Can we engage just for crunch weeks?", a: "Yes, short engagements (2–4 weeks) are common for rough-in, inspections, and final push." },
    ],
    trustBadges: ["OSHA 30-Certified", "Insured Site Supers", "Daily Written Logs", "Bilingual Crews (EN/ES)"],
    localKeywords: ["construction site management {{city}}", "site supervisor near me", "project site super", "construction logistics"],
  },
  {
    slug: "project-management",
    name: "Project Management",
    category: "Project Services",
    h1: "Construction Project Managers in {{city}}. One Owner, One Phone Number.",
    subheadline:
      "Scope, schedule, and budget, owned by one person who answers your texts. Ideal when you're managing your own architect, multiple trades, or a complex remodel.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70",
    offer: "Free 45-min strategy call + written scope & risk summary",
    priceRange: "$8,500 pre-construction planning – 5–8% of total build cost",
    responseTime: "Scheduled call within 48 hours",
    serviceRadiusMiles: 40,
    qualifying: [
      ...commonQualifying,
      {
        id: "projectType",
        label: "What kind of project?",
        type: "radio",
        required: true,
        options: [
          { value: "remodel", label: "Remodel / addition" },
          { value: "new-build", label: "New construction" },
          { value: "adu", label: "ADU" },
          { value: "commercial", label: "Commercial tenant improvement" },
        ],
      },
      {
        id: "stage",
        label: "Where are you in the process?",
        type: "radio",
        options: [
          { value: "idea", label: "Just an idea" },
          { value: "design", label: "Design in progress" },
          { value: "bidding", label: "Getting bids" },
          { value: "building", label: "Already under construction" },
        ],
      },
    ],
    reviews: [
      {
        author: "Carla M.",
        city: "Glendale, CA",
        rating: 5,
        body: "Owner-build of our forever home. Having FB Corp run the project meant I didn't have to quit my day job to answer 40 questions a week.",
        source: "Google",
        date: "2026-03-04",
      },
      {
        author: "Jason Y.",
        city: "Long Beach, CA",
        rating: 5,
        body: "They caught a $45,000 structural mistake in the plans before the concrete truck showed up. Already paid for themselves five times over.",
        source: "Google",
        date: "2026-01-26",
      },
      {
        author: "Raúl S.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "My PM flagged scope creep the moment it started. Project came in $12k under budget.",
        source: "Yelp",
        date: "2025-11-20",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=900&q=70",
        alt: "Finished dining room of a professionally-managed remodel",
        caption: "Completed managed remodel, Glendale",
      },
      {
        src: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=900&q=70",
        alt: "Blueprints with notes and annotations",
        caption: "Value engineering pass on stamped plans",
      },
      {
        src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=70",
        alt: "Open-plan dining and living area in a completed owner-rep project",
        caption: "Owner-rep build at handoff, Long Beach",
      },
    ],
    faqs: [
      { q: "Are you an owner's representative?", a: "Yes, we represent your interests, not the GC's or the architect's. Our fee is flat or a percentage, not tied to change orders." },
      { q: "What do you produce each week?", a: "One written status report, one budget snapshot, one schedule update. Plus ad-hoc texts and calls whenever you need us." },
      { q: "Do you bid the job for us?", a: "Yes, we qualify GCs, level bids apples-to-apples, and sit in on negotiations." },
    ],
    trustBadges: ["CSLB #1068191", "Bonded & Insured", "Owner's-Rep Agreements", "Flat-Fee or % Options"],
    localKeywords: ["construction project manager {{city}}", "owners representative near me", "residential construction manager", "home build project management"],
  },
  {
    slug: "permits",
    name: "Permit Expediting",
    category: "Project Services",
    h1: "Permit Expediting in {{city}}. Plans Submitted in 5 Business Days.",
    subheadline:
      "We file with LADBS and local jurisdictions, schedule inspections, and resolve correction notices. You build, we paperwork.",
    heroImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=70",
    offer: "Free plan review + jurisdiction-specific timeline",
    priceRange: "$950 over-the-counter – $8,500+ full project expediting",
    responseTime: "Plan review within 2 business days",
    serviceRadiusMiles: 60,
    qualifying: [
      ...commonQualifying,
      {
        id: "jurisdiction",
        label: "Which jurisdiction?",
        type: "select",
        required: true,
        options: [
          { value: "la-city", label: "City of Los Angeles (LADBS)" },
          { value: "la-county", label: "LA County" },
          { value: "santa-monica", label: "Santa Monica" },
          { value: "beverly-hills", label: "Beverly Hills" },
          { value: "pasadena", label: "Pasadena" },
          { value: "other", label: "Other / not sure" },
        ],
      },
      {
        id: "permitType",
        label: "What kind of permit?",
        type: "radio",
        required: true,
        options: [
          { value: "new-build", label: "New construction" },
          { value: "addition", label: "Addition / ADU" },
          { value: "remodel", label: "Remodel / T.I." },
          { value: "correction", label: "Correction response / re-submittal" },
        ],
      },
    ],
    reviews: [
      {
        author: "Yuki T.",
        city: "Los Angeles, CA",
        rating: 5,
        body: "LADBS corrections that had stalled our project for 6 weeks were resolved in 9 days. Worth every dollar.",
        source: "Google",
        date: "2026-03-19",
      },
      {
        author: "Owen F.",
        city: "Santa Monica, CA",
        rating: 5,
        body: "ADU permit over the counter in Santa Monica. Would've been six weeks solo. They had it in 4 days.",
        source: "Google",
        date: "2026-02-03",
      },
      {
        author: "Maya C.",
        city: "Pasadena, CA",
        rating: 5,
        body: "Knew exactly which planner to talk to, exactly which drawings needed revising. Saved us at least a month.",
        source: "Yelp",
        date: "2025-12-22",
      },
    ],
    proof: [
      {
        src: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=70",
        alt: "Hand signing a stamped permit document",
        caption: "Permit signed and approved, Los Angeles",
      },
      {
        src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=70",
        alt: "Permit expediter organizing submittal package",
        caption: "Full submittal package prep",
      },
      {
        src: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&w=900&q=70",
        alt: "Finished home interior after permitted renovation",
        caption: "Permitted renovation complete, Pasadena",
      },
    ],
    faqs: [
      { q: "How fast is 'fast'?", a: "Over-the-counter permits: 3–5 business days in most LA jurisdictions. Full plan check: we target the 50th percentile review time for that jurisdiction, and reopen when reviewers stall." },
      { q: "Do you file corrections too?", a: "Yes, correction-response is our most common engagement. Send us your notice and we'll quote in 24 hours." },
      { q: "What jurisdictions do you cover?", a: "All LA County cities, Orange County, and Ventura. If you're outside those, ask, we probably know someone." },
    ],
    trustBadges: ["LADBS On-File Expediter", "Jurisdictional Relationships", "Correction-Response Guarantee", "Flat-Fee Packages"],
    localKeywords: ["permit expediter {{city}}", "LADBS permit help", "building permit services", "permit correction response"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const listServiceSlugs = () => services.map((s) => s.slug);
