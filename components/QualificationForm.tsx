"use client";

import { useEffect, useMemo, useState } from "react";
import type { Service, QualQuestion } from "@/lib/services";

type Props = { service: Service };

type State = "idle" | "submitting" | "success" | "error";

export default function QualificationForm({ service }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>();

  const totalSteps = service.qualifying.length + 1; // + contact

  const progress = Math.round(((step + (state === "success" ? 1 : 0)) / totalSteps) * 100);

  const current: QualQuestion | undefined = service.qualifying[step];

  const setAnswer = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    // auto-advance on radio for speed
    const q = service.qualifying.find((x) => x.id === id);
    if (q?.type === "radio") {
      setTimeout(() => setStep((s) => Math.min(s + 1, service.qualifying.length)), 120);
    }
  };

  const canContinue = useMemo(() => {
    if (!current) return true;
    if (current.required === false) return true;
    return Boolean(answers[current.id]?.trim());
  }, [current, answers]);

  const phoneValid = /^[\d+()\-.\s]{7,}$/.test(phone);
  const emailValid = /.+@.+\..+/.test(email);
  const nameValid = name.trim().length >= 2;
  const contactReady = nameValid && phoneValid && emailValid && consent;

  function contactError(): string | undefined {
    if (!nameValid) return "Please enter your full name.";
    if (!phoneValid) return "Please enter a valid phone number.";
    if (!emailValid) return "Please enter a valid email address.";
    if (!consent) return "Please check the consent box so we can call or text you back.";
    return undefined;
  }

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
      const v = p.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  async function submit() {
    setState("submitting");
    setError(undefined);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service.slug,
          name,
          phone,
          email,
          answers,
          consent,
          hp,
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
          utm,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Something went wrong");
      setState("success");
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "generate_lead", { service: service.slug });
      }
    } catch (e) {
      setState("error");
      setError((e as Error).message);
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
        <div className="mb-2 text-sm font-semibold text-brand-700">Request received</div>
        <h3 className="text-2xl font-bold">You're on the dispatch board, {name.split(" ")[0]}.</h3>
        <p className="mt-2 text-slate-600">{service.responseTime}. Check your phone. We'll be calling from a local number.</p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <div><span className="font-medium">Need us right now?</span> Call us directly. We'll route you straight to dispatch.</div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < service.qualifying.length) {
          if (canContinue) setStep((s) => s + 1);
          return;
        }
        const msg = contactError();
        if (msg) {
          setState("error");
          setError(msg);
          return;
        }
        submit();
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          Step {Math.min(step + 1, totalSteps)} of {totalSteps}
        </div>
        <div className="text-xs text-slate-500">{service.responseTime}</div>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {current ? (
        <Question key={current.id} q={current} value={answers[current.id] || ""} onChange={(v) => setAnswer(current.id, v)} />
      ) : (
        <ContactStep
          name={name}
          phone={phone}
          email={email}
          consent={consent}
          onName={setName}
          onPhone={setPhone}
          onEmail={setEmail}
          onConsent={setConsent}
        />
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" className="btn-ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        ) : <span />}
        {current ? (
          <button type="submit" className="btn-primary" disabled={!canContinue}>
            Continue →
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={state === "submitting"}>
            {state === "submitting" ? "Sending…" : "Get my free quote"}
          </button>
        )}
      </div>

      {state === "error" && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
      <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
        By submitting you agree to be contacted about your request at the number and email provided. No spam. Msg & data rates may apply. Reply STOP to opt out.
      </p>
    </form>
  );
}

function Question({ q, value, onChange }: { q: QualQuestion; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-3 block text-lg font-semibold text-slate-900">{q.label}</label>
      {q.type === "radio" && q.options && (
        <div className="grid gap-2">
          {q.options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                value === opt.value
                  ? "border-brand-500 bg-brand-50 text-brand-900"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              <span className={`h-4 w-4 rounded-full border ${value === opt.value ? "border-brand-500 bg-brand-500" : "border-slate-300"}`} />
            </button>
          ))}
        </div>
      )}
      {q.type === "select" && q.options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:border-brand-500 focus:outline-none"
        >
          <option value="">Choose…</option>
          {q.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
      {q.type === "text" && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode={q.id === "zip" ? "numeric" : "text"}
          autoComplete={q.id === "zip" ? "postal-code" : "off"}
          placeholder={q.id === "zip" ? "78701" : ""}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:border-brand-500 focus:outline-none"
        />
      )}
    </div>
  );
}

function ContactStep(props: {
  name: string; phone: string; email: string; consent: boolean;
  onName: (v: string) => void; onPhone: (v: string) => void; onEmail: (v: string) => void; onConsent: (v: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-slate-900">Where should we send your quote?</label>
      <input
        value={props.name}
        onChange={(e) => props.onName(e.target.value)}
        placeholder="Full name"
        autoComplete="name"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-brand-500 focus:outline-none"
      />
      <input
        value={props.phone}
        onChange={(e) => props.onPhone(e.target.value)}
        placeholder="Mobile phone"
        inputMode="tel"
        autoComplete="tel"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-brand-500 focus:outline-none"
      />
      <input
        value={props.email}
        onChange={(e) => props.onEmail(e.target.value)}
        placeholder="Email"
        inputMode="email"
        autoComplete="email"
        type="email"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-brand-500 focus:outline-none"
      />
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={props.consent}
          onChange={(e) => props.onConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
        />
        <span>It's okay to call or text me about my request. I can reply STOP anytime.</span>
      </label>
    </div>
  );
}
