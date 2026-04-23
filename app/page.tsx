import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { services, type Service } from "@/lib/services";

export const metadata: Metadata = {
  title: `${site.brand} — Roofing, HVAC, Plumbing & General Contracting in ${site.primaryCity}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const CATEGORY_ORDER: Service["category"][] = ["Trades", "Construction", "Project Services"];

const CATEGORY_COPY: Record<Service["category"], { title: string; blurb: string }> = {
  Trades: {
    title: "Trades — fix it fast",
    blurb: "Licensed crews for roofing, HVAC, plumbing, and electrical. Same-day or next-morning in most of LA.",
  },
  Construction: {
    title: "Construction & Remodeling",
    blurb: "Design-build, framing, finishes, and structural remodels. One team, one schedule, one budget.",
  },
  "Project Services": {
    title: "Project Services",
    blurb: "Interior design, project management, site management, and permit expediting — plug us in where you need help.",
  },
};

export default function HomePage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    services: services.filter((s) => s.category === cat),
  })).filter((g) => g.services.length > 0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <span className="chip">Local · Licensed · {site.ratings.google.stars}★ ({site.ratings.google.count})</span>
        <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-900">
          {site.brand} — {site.primaryCity}'s crew for everything from the roof to the remodel.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">{site.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`tel:${site.phone}`} className="btn-primary">Call {site.phoneDisplay}</a>
          <Link href="#services" className="btn-ghost">Pick your service →</Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 pb-16">
        {grouped.map(({ category, services: list }) => (
          <div key={category} className="mb-12 last:mb-0">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-slate-900">{CATEGORY_COPY[category].title}</h2>
              <p className="max-w-xl text-sm text-slate-600">{CATEGORY_COPY[category].blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-brand-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.heroImage} alt="" className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <div className="text-sm font-semibold text-brand-700">{s.name}</div>
                    <div className="mt-1 text-lg font-bold leading-snug text-slate-900">{s.offer}</div>
                    <div className="mt-2 text-xs text-slate-600">{s.responseTime}</div>
                    <div className="mt-4 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                      Get a quote →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
