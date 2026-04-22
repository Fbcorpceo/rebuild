import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: `${site.brand} — Roofing, HVAC & Plumbing in ${site.primaryCity}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <span className="chip">Local · Licensed · {site.ratings.google.stars}★ ({site.ratings.google.count})</span>
        <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-900">
          {site.brand} — {site.primaryCity}'s rebuild crew for roofs, AC, and plumbing.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">{site.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`tel:${site.phone}`} className="btn-primary">Call {site.phoneDisplay}</a>
          <Link href="#services" className="btn-ghost">Pick your service →</Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="mb-6 text-2xl font-bold">What do you need fixed?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-brand-500"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.heroImage} alt="" className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="text-sm font-semibold text-brand-700">{s.name}</div>
                <div className="mt-1 text-xl font-bold text-slate-900">{s.offer}</div>
                <div className="mt-2 text-sm text-slate-600">{s.responseTime}</div>
                <div className="mt-4 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                  Get a quote →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
