import { NextResponse } from "next/server";
import { z } from "zod";
import { getService } from "@/lib/services";
import { runFollowUp, type Lead } from "@/lib/followup";

export const runtime = "nodejs";

const LeadSchema = z.object({
  service: z.string().min(1),
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  answers: z.record(z.string().max(200)).default({}),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent required" }) }),
  sourceUrl: z.string().url().optional(),
  utm: z.record(z.string()).optional(),
  hp: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // honeypot — silently accept & drop
  if (data.hp) return NextResponse.json({ ok: true });

  const service = getService(data.service);
  if (!service) {
    return NextResponse.json({ ok: false, error: "Unknown service" }, { status: 404 });
  }

  const lead: Lead = {
    service: data.service,
    name: data.name,
    phone: data.phone,
    email: data.email,
    answers: data.answers,
    consent: data.consent,
    sourceUrl: data.sourceUrl,
    utm: data.utm,
    submittedAt: new Date().toISOString(),
  };

  const steps = await runFollowUp(lead, service);

  return NextResponse.json({ ok: true, steps });
}
