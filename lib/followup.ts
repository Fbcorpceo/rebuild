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

// Use Resend's onboarding sender until fbcrebuild.com is verified in
// Resend. Swap to `hello@${site.domain}` once the domain's SPF/DKIM/DMARC
// records are live and Resend shows it as Verified.
const TRANSACTIONAL_FROM = `${site.brand} <onboarding@resend.dev>`;
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

function formatAnswers(answers: Record<string, string>): string {
  return Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${escape(k)}</td><td style="padding:4px 0"><strong>${escape(String(v))}</strong></td></tr>`)
    .join("");
}

export async function sendInternalAlert(lead: Lead, service: Service): Promise<Result> {
  const key = process.env.RESEND_API_KEY;
  const zip = lead.answers.zip || "—";
  const timing = lead.answers.timing || "—";
  const subject = `[NEW LEAD] ${service.name} · ${lead.name} · ${zip} · ${timing}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px;margin:auto;color:#0f172a">
      <h2 style="margin:0 0 4px;color:#1e4dab">New lead: ${escape(service.name)}</h2>
      <p style="margin:0 0 16px;color:#64748b;font-size:13px">Submitted ${escape(lead.submittedAt)}</p>

      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Name</td><td style="padding:4px 0"><strong>${escape(lead.name)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Phone</td><td style="padding:4px 0"><a href="tel:${escape(lead.phone)}">${escape(lead.phone)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Email</td><td style="padding:4px 0"><a href="mailto:${escape(lead.email)}">${escape(lead.email)}</a></td></tr>
      </table>

      <h3 style="margin:16px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b">Answers</h3>
      <table style="border-collapse:collapse">${formatAnswers(lead.answers)}</table>

      ${lead.sourceUrl ? `<p style="margin-top:16px;font-size:13px;color:#64748b">Source: <a href="${escape(lead.sourceUrl)}">${escape(lead.sourceUrl)}</a></p>` : ""}
      ${lead.utm && Object.keys(lead.utm).length ? `<p style="margin:4px 0;font-size:13px;color:#64748b">UTM: ${escape(JSON.stringify(lead.utm))}</p>` : ""}

      <p style="margin-top:24px">
        <a href="tel:${escape(lead.phone)}" style="display:inline-block;background:#f59e0b;color:#0f172a;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:700">Call ${escape(lead.name.split(" ")[0])}</a>
      </p>
    </div>`;

  const body = { from: TRANSACTIONAL_FROM, to: [INTERNAL_INBOX], subject, html };
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

export async function sendTelegram(lead: Lead, service: Service): Promise<Result> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Telegram HTML supports <b>, <i>, <a>, <code>, <pre>. Escape user content.
  const lines: string[] = [
    `🚧 <b>New ${escape(service.name)} lead</b>`,
    "",
    `<b>${escape(lead.name)}</b>`,
    `📞 <a href="tel:${encodeURIComponent(lead.phone)}">${escape(lead.phone)}</a>`,
    `✉️ <a href="mailto:${encodeURIComponent(lead.email)}">${escape(lead.email)}</a>`,
    "",
  ];
  for (const [k, v] of Object.entries(lead.answers)) {
    if (v) lines.push(`• <i>${escape(k)}</i>: <b>${escape(String(v))}</b>`);
  }
  if (lead.sourceUrl) lines.push("", `<a href="${escape(lead.sourceUrl)}">Source page</a>`);

  const text = lines.join("\n");

  if (!token || !chatId) {
    console.log("[followup:telegram]", { chatId, text });
    return { ok: true };
  }

  return postJSON(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {},
    {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    },
  );
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
    sendTelegram(lead, service),
    pushToCRM(lead, service),
  ]);
  return results.map((r, i) => ({
    step: ["customer_email", "internal_alert", "customer_sms", "telegram", "crm"][i],
    ok: r.status === "fulfilled" && r.value.ok,
    error: r.status === "rejected" ? (r.reason as Error).message : r.status === "fulfilled" && !r.value.ok ? r.value.error : undefined,
  }));
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
