import Link from "next/link";
import { site } from "@/lib/site";
import BrandLogo from "./BrandLogo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.brand} home`}>
          <BrandLogo height={32} />
          <span className="hidden text-sm font-semibold text-slate-500 sm:inline">
            {site.productLine}
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/services/roofing" className="text-slate-700 hover:text-slate-900">Roofing</Link>
          <Link href="/services/hvac" className="text-slate-700 hover:text-slate-900">HVAC</Link>
          <Link href="/services/plumbing" className="text-slate-700 hover:text-slate-900">Plumbing</Link>
          <Link href="/services/electrical" className="text-slate-700 hover:text-slate-900">Electrical</Link>
          <Link href="/services/remodeling" className="text-slate-700 hover:text-slate-900">Remodeling</Link>
          <Link href="/#services" className="font-semibold text-brand-700 hover:text-brand-900">All services →</Link>
        </nav>
        <a href={`tel:${site.phone}`} className="btn-primary text-sm">
          Call {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
