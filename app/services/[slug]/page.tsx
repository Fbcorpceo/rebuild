import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, listServiceSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import ServiceHero from "@/components/ServiceHero";
import TrustBar from "@/components/TrustBar";
import ProofGallery from "@/components/ProofGallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import LocalSchema from "@/components/LocalSchema";

export function generateStaticParams() {
  return listServiceSlugs().map((slug) => ({ slug }));
}

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const title = service.h1.replaceAll("{{city}}", site.primaryCity);
  const desc = `${service.subheadline} Serving ${site.serviceAreas.slice(0, 4).join(", ")} and ${site.serviceAreas.length - 4} more cities.`;
  const canonical = `/services/${service.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: `${site.url}${canonical}`,
    },
    keywords: service.localKeywords.map((k) => k.replaceAll("{{city}}", site.primaryCity)),
  };
}

export default function ServicePage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <LocalSchema service={service} />
      <ServiceHero service={service} city={site.primaryCity} />
      <TrustBar badges={service.trustBadges} />
      <ProofGallery photos={service.proof} />
      <Reviews reviews={service.reviews} />
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="mb-4 text-2xl font-bold">We're the local crew in {site.primaryCity}</h2>
        <p className="max-w-3xl text-slate-700">
          Same crews, same vans, same phone number since we opened our {site.address.city} shop.
          We serve {site.serviceAreas.join(", ")}, and if we can't get to you the same day, we'll tell you up front.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {site.serviceAreas.map((c) => (
            <li key={c} className="chip">{c}, CA</li>
          ))}
        </ul>
      </section>
      <FAQ items={service.faqs} />
      <section className="bg-brand-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ready for a fixed-price {service.name.toLowerCase()} quote?</h2>
            <p className="text-brand-100">{service.responseTime}.</p>
          </div>
          <div className="flex gap-3">
            <a href={`tel:${site.phone}`} className="btn-primary">Call {site.phoneDisplay}</a>
            <a href="#quote" className="btn-ghost text-slate-900">Get it in writing →</a>
          </div>
        </div>
      </section>
    </>
  );
}

export const dynamicParams = false;
