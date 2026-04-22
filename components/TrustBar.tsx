export default function TrustBar({ badges }: { badges: string[] }) {
  return (
    <div className="border-y border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-4 text-sm text-slate-600">
        {badges.map((b) => (
          <span key={b} className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2l2.39 4.84L18 7.64l-4 3.9.95 5.54L10 14.9l-4.95 2.18L6 11.54 2 7.64l5.61-.8L10 2z" fill="#f59e0b" />
            </svg>
            <span className="font-medium text-slate-800">{b}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
