import type { Review } from "@/lib/services";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">What neighbors are saying</h2>
            <p className="text-slate-600">Verified reviews from homeowners in our service area.</p>
          </div>
          <div className="hidden text-right sm:block">
            <div className="stars text-xl" aria-label="5 stars" />
            <div className="text-sm text-slate-600">4.9 avg · 896 reviews</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.author + r.date} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
              <div className="stars mb-2" aria-label={`${r.rating} stars`} />
              <p className="text-slate-800">“{r.body}”</p>
              <footer className="mt-4 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{r.author} · {r.city}</span>
                <span className="text-slate-500">{r.source}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
