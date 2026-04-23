export const site = {
  brand: "FB Corp",
  legalName: "Foundational Builders Corp",
  productLine: "Rebuild Services",
  domain: "fbcrebuild.com",
  url: "https://www.fbcrebuild.com",
  tagline: "Storm restoration & home rebuild specialists.",
  description:
    "FB Corp is a licensed, local restoration contractor handling roofing, HVAC, and plumbing rebuilds across Greater Los Angeles. Free inspections, insurance-claim help, fixed-price quotes.",
  phone: "+1-310-499-8716",
  phoneDisplay: "(310) 499-8716",
  email: "drew@fbcorp.io",
  address: {
    street: "1010 S Robertson Blvd",
    city: "Los Angeles",
    region: "CA",
    postalCode: "90035",
    country: "US",
  },
  geo: { lat: 34.0539, lng: -118.3850 },
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
    google: "https://share.google/PKVckzcd2My94Ooyz",
    facebook: "https://facebook.com/fbcorp",
    instagram: "https://instagram.com/fbcorp",
  },
  licenses: ["CSLB Lic. #1068191", "Bonded & Insured"],
  ratings: { google: { stars: 5.0, count: 6 } },
} as const;

export type Site = typeof site;
