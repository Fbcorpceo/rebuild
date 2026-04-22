import { site } from "@/lib/site";
import type { Service } from "@/lib/services";

type Props = { service?: Service };

export default function LocalSchema({ service }: Props) {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#business`,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logo.svg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.ratings.google.stars,
      reviewCount: site.ratings.google.count,
    },
    sameAs: [site.social.facebook, site.social.instagram],
  };

  const jsonLdBlocks: object[] = [business];

  if (service) {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.name,
      provider: { "@id": `${site.url}#business` },
      areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
      offers: {
        "@type": "Offer",
        description: service.offer,
        priceSpecification: { "@type": "PriceSpecification", description: service.priceRange },
      },
      url: `${site.url}/services/${service.slug}`,
    });

    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });

    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${site.url}/services/${service.slug}` },
      ],
    });
  }

  return (
    <>
      {jsonLdBlocks.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
