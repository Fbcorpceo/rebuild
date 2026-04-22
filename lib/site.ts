export const site = {
  brand: "FB Corp",
  legalName: "FB Corp, LLC",
  productLine: "FBC Rebuild",
  domain: "fbcrebuild.com",
  url: "https://fbcrebuild.com",
  tagline: "Storm restoration & home rebuild specialists.",
  description:
    "FB Corp is a licensed, local restoration contractor handling roofing, HVAC, and plumbing rebuilds across Central Texas. Free inspections, insurance-claim help, fixed-price quotes.",
  phone: "+1-512-555-0199",
  phoneDisplay: "(512) 555-0199",
  email: "hello@fbcrebuild.com",
  address: {
    street: "1208 W Anderson Ln, Ste 210",
    city: "Austin",
    region: "TX",
    postalCode: "78757",
    country: "US",
  },
  geo: { lat: 30.3533, lng: -97.7303 },
  primaryCity: "Austin",
  serviceAreas: [
    "Austin",
    "Round Rock",
    "Pflugerville",
    "Cedar Park",
    "Leander",
    "Georgetown",
    "Kyle",
    "Buda",
    "Dripping Springs",
  ],
  hours: [
    { day: ["Mo", "Tu", "We", "Th", "Fr"], opens: "07:00", closes: "21:00" },
    { day: ["Sa", "Su"], opens: "08:00", closes: "18:00" },
  ],
  social: {
    google: "https://www.google.com/search?q=FBC+Rebuild+Austin",
    facebook: "https://facebook.com/fbcrebuild",
    instagram: "https://instagram.com/fbcrebuild",
  },
  licenses: ["TX RCC-0488213", "TX Master Plumber #M-40112", "EPA 608"],
  ratings: { google: { stars: 4.9, count: 896 } },
} as const;

export type Site = typeof site;
