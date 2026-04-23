import type { Review } from "@/lib/services";
import { site } from "@/lib/site";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">What neighbors are saying</h2>
            <p className="text-slate-600">Verified reviews from {site.primaryCity}-area homeowners.</p>
          </div>
          <div className="hidden text-right sm:block">
            <div className="stars text-xl" aria-label="5 stars" />
            <div className="text-sm text-slate-600">
              <strong>{site.ratings.google.stars}</strong> on Google
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.author + r.date} className="flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
              <div className="mb-2 flex items-center justify-between">
                <div className="stars" aria-label={`${r.rating} stars`} />
                {r.verified !== false && <VerifiedBadge />}
              </div>
              <p className="flex-1 text-slate-800">“{r.body}”</p>
              <footer className="mt-4 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{r.author}{r.city ? ` · ${r.city}` : ""}</span>
                <span className="text-slate-500">{r.source}</span>
              </footer>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            Read all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200"
      title="Verified Google review"
    >
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="#10b981" />
        <path d="M6 10.2l2.8 2.8L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}
