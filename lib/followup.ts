import { site } from "./site";
import type { Service } from "./services";

export type Lead = {
  service: string;
  name: string;
  phone: string;
  email: string;
  answers: Record<string, string>;
  consent: boolean;
  sourceUrl?: string;
  utm?: Record<string, string>;
  submittedAt: string;
};

type Result = { ok: true } | { ok: false; error: string };

const TRANSACTIONAL_FROM = `${site.brand} <hello@${site.domain}>`;
const INTERNAL_INBOX = process.env.LEAD_INBOX || `dispatch@${site.domain}`;

async function postJSON(url: string, headers: Record<string, string>, body: unknown): Promise<Result> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `${res.status} ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function sendCustomerEmail(lead: Lead, service: Service): Promise<Result> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[followup:email:customer]", { to: lead.email, lead });
    return { ok: true };
  }
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto">
      <h2>Thanks, ${escape(lead.name)}. We've got your ${escape(service.name.toLowerCase())} request.</h2>
      <p>${escape(service.responseTime)}. In the meantime, here's what happens next:</p>
      <ol>
        <li>A dispatcher reviews your answers and calls you from ${site.phoneDisplay}.</li>
        <li>We confirm a same-day window that works for you.</li>
        <li>A licensed ${escape(service.name.toLowerCase())} tech shows up on time with a fixed-price quote.</li>
      </ol>
      <p>Need us faster? Call ${site.phoneDisplay}.</p>
      <p style="color:#64748b;font-size:12px">${site.legalName} · ${site.address.street}, ${site.address.city} ${site.address.region}</p>
    </div>`;
  return postJSON(
    "https://api.resend.com/emails",
    { Authorization: `Bearer ${key}` },
    {
      from: TRANSACTIONAL_FROM,
      to: [lead.email],
      subject: `We've got your ${service.name.toLowerCase()} request`,
      html,
    },
  );
}

export async function sendInternalAlert(lead: Lead, service: Service): Promise<Result> {
  const key = process.env.RESEND_API_KEY;
  const body = {
    from: TRANSACTIONAL_FROM,
    to: [INTERNAL_INBOX],
    subject: `[NEW LEAD] ${service.name}, ${lead.name}, ${lead.answers.zip || "?"}`,
    html: `<pre style="font-family:ui-monospace">${escape(JSON.stringify(lead, null, 2))}</pre>`,
  };
  if (!key) {
    console.log("[followup:email:internal]", body);
    return { ok: true };
  }
  return postJSON("https://api.resend.com/emails", { Authorization: `Bearer ${key}` }, body);
}

export async function sendCustomerSMS(lead: Lead, service: Service): Promise<Result> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const msg = `${site.brand}: Thanks ${lead.name.split(" ")[0]}! We got your ${service.name.toLowerCase()} request. A dispatcher will call from ${site.phoneDisplay} shortly. Reply STOP to opt out.`;
  if (!sid || !token || !from) {
    console.log("[followup:sms:customer]", { to: lead.phone, msg });
    return { ok: true };
  }
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: lead.phone, Body: msg }),
    });
    if (!res.ok) return { ok: false, error: `${res.status} ${await res.text().catch(() => "")}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function pushToCRM(lead: Lead, service: Service): Promise<Result> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log("[followup:crm]", { service: service.slug, lead });
    return { ok: true };
  }
  return postJSON(url, {}, { ...lead, service: service.slug, serviceName: service.name });
}

export async function runFollowUp(lead: Lead, service: Service) {
  const results = await Promise.allSettled([
    sendCustomerEmail(lead, service),
    sendInternalAlert(lead, service),
    sendCustomerSMS(lead, service),
    pushToCRM(lead, service),
  ]);
  return results.map((r, i) => ({
    step: ["customer_email", "internal_alert", "customer_sms", "crm"][i],
    ok: r.status === "fulfilled" && r.value.ok,
    error: r.status === "rejected" ? (r.reason as Error).message : r.status === "fulfilled" && !r.value.ok ? r.value.error : undefined,
  }));
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
