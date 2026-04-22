# FB Corp — Lead Capture Funnel

Production-ready lead-gen site for **www.fbcorp.io**. Each service gets its own
landing page optimized for local Google traffic, with a fast qualification form
that triggers immediate follow-up automation (customer email, customer SMS,
internal dispatch alert, and a CRM webhook).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Zod validation on `/api/lead`
- JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList) for Google

## Funnel pieces

| Requirement | Implementation |
| --- | --- |
| Landing page per service | `app/services/[slug]/page.tsx` driven by `lib/services.ts` |
| Fast qualification form | `components/QualificationForm.tsx` (auto-advance, honeypot, UTM capture) |
| Proof-heavy visuals & reviews | `components/ProofGallery.tsx`, `components/Reviews.tsx`, `components/TrustBar.tsx` |
| Local-intent traffic from Google | `components/LocalSchema.tsx`, `app/sitemap.ts`, `app/robots.ts`, city-aware H1s |
| Immediate follow-up automation | `app/api/lead/route.ts` → `lib/followup.ts` (email + SMS + CRM, fires in parallel) |

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without env vars the follow-up steps log to stdout so you can iterate without
hooking up Resend/Twilio/CRM first.

## Adding a service

Append to `services` in `lib/services.ts`. Everything else (routing, sitemap,
JSON-LD, metadata, home page card) picks it up automatically.
