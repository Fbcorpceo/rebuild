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
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/services/roofing" className="text-slate-700 hover:text-slate-900">Roofing</Link>
          <Link href="/services/hvac" className="text-slate-700 hover:text-slate-900">HVAC</Link>
          <Link href="/services/plumbing" className="text-slate-700 hover:text-slate-900">Plumbing</Link>
        </nav>
        <a href={`tel:${site.phone}`} className="btn-primary text-sm">
          Call {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
