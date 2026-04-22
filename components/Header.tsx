import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="inline-block h-8 w-8 rounded-lg bg-brand-600 text-center leading-8 text-white">F</span>
          <span>{site.brand}</span>
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
