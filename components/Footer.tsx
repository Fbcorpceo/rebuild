import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm sm:grid-cols-4">
        <div>
          <div className="mb-3"><BrandLogo height={28} /></div>
          <p className="text-slate-600">{site.tagline}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-700">{site.productLine}</p>
          <p className="mt-3 text-slate-600">
            {site.address.street}<br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </p>
        </div>
        <div>
          <div className="mb-2 font-semibold text-slate-900">Services</div>
          <ul className="space-y-1 text-slate-600">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-slate-900">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold text-slate-900">Service area</div>
          <ul className="space-y-1 text-slate-600">
            {site.serviceAreas.slice(0, 6).map((c) => <li key={c}>{c}, CA</li>)}
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold text-slate-900">Contact</div>
          <ul className="space-y-1 text-slate-600">
            <li><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>Licensed: {site.licenses.join(" · ")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.legalName} · {site.domain}
      </div>
    </footer>
  );
}
