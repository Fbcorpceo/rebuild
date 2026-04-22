export const site = {
  brand: "FB Corp",
  legalName: "FB Corp, Inc.",
  productLine: "Rebuild Services",
  domain: "fbcorp.io",
  url: "https://www.fbcorp.io",
  tagline: "Storm restoration & home rebuild specialists.",
  description:
    "FB Corp is a licensed, local restoration contractor handling roofing, HVAC, and plumbing rebuilds across Greater Los Angeles. Free inspections, insurance-claim help, fixed-price quotes.",
  phone: "+1-310-499-8716",
  phoneDisplay: "(310) 499-8716",
  email: "drew@fbcorp.io",
  address: {
    street: "1100 S Hope St, Ste 200",
    city: "Los Angeles",
    region: "CA",
    postalCode: "90015",
    country: "US",
  },
  geo: { lat: 34.0522, lng: -118.2437 },
  primaryCity: "Los Angeles",
  serviceAreas: [
    "Los Angeles",
    "Long Beach",
    "Glendale",
    "Pasadena",
    "Burbank",
    "Santa Monica",
    "Inglewood",
    "Torrance",
    "Whittier",
  ],
  hours: [
    { day: ["Mo", "Tu", "We", "Th", "Fr"], opens: "07:00", closes: "21:00" },
    { day: ["Sa", "Su"], opens: "08:00", closes: "18:00" },
  ],
  social: {
    google: "https://www.google.com/search?q=FB+Corp+Los+Angeles",
    facebook: "https://facebook.com/fbcorp",
    instagram: "https://instagram.com/fbcorp",
  },
  licenses: ["CSLB Lic. #1068191 (B · C-20 · C-36 · C-39)", "EPA 608 Certified", "Bonded & Insured"],
  ratings: { google: { stars: 4.9, count: 896 } },
} as const;

export type Site = typeof site;
