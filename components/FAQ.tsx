export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h2 className="mb-6 text-2xl font-bold">Common questions</h2>
      <dl className="divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-100">
        {items.map((f) => (
          <details key={f.q} className="group p-5 open:bg-slate-50">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
              {f.q}
              <span className="ml-4 text-slate-400 group-open:rotate-45 transition">+</span>
            </summary>
            <dd className="mt-2 text-slate-700">{f.a}</dd>
          </details>
        ))}
      </dl>
    </section>
  );
}
