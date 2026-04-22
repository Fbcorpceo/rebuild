import type { ProofPhoto } from "@/lib/services";

export default function ProofGallery({ photos }: { photos: ProofPhoto[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="mb-6 text-2xl font-bold">Recent local jobs</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <figure key={p.src} className="overflow-hidden rounded-2xl bg-slate-100 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} className="h-56 w-full object-cover" loading="lazy" />
            {p.caption && (
              <figcaption className="p-3 text-sm text-slate-600">{p.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
