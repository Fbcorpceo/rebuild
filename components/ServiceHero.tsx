import type { Service } from "@/lib/services";
import { site } from "@/lib/site";
import QualificationForm from "./QualificationForm";

export default function ServiceHero({ service, city }: { service: Service; city: string }) {
  const h1 = service.h1.replaceAll("{{city}}", city);
  return (
    <section className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={service.heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <span className="chip">Serving {city} & {site.serviceAreas.length - 1}+ nearby cities</span>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {h1}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-700">{service.subheadline}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent-500/15 px-3 py-1 text-sm font-semibold text-accent-600">
              {service.offer}
            </span>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
              {service.priceRange}
            </span>
          </div>

          <ul className="mt-6 grid gap-2 text-slate-700 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Check /> {service.responseTime}
            </li>
            <li className="flex items-center gap-2">
              <Check /> Fixed-price quote, not a range
            </li>
            <li className="flex items-center gap-2">
              <Check /> Licensed & insured crew
            </li>
            <li className="flex items-center gap-2">
              <Check /> No-pressure sales, ever
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <a href={`tel:${site.phone}`} className="btn-primary">
              Call {site.phoneDisplay}
            </a>
            <a href="#quote" className="btn-ghost">Or get it in writing →</a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
            <span className="stars" aria-label="5 stars" />
            <span><strong>{site.ratings.google.stars}</strong> · {site.ratings.google.count} Google reviews</span>
          </div>
        </div>

        <div id="quote" className="lg:pl-8">
          <QualificationForm service={service} />
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#0ea5e9" opacity="0.15" />
      <path d="M6 10.5l2.8 2.8L14 7.5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
