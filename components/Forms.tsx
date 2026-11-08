"use client";
import { useState } from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";

type Errors = Record<string, string>;
interface Result { ok: boolean; message: string; errors?: Errors }

async function post(url: string, body: unknown): Promise<Result> {
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return (await r.json()) as Result;
  } catch {
    return { ok: false, message: "Network problem. Please check your connection or call us." };
  }
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="field-error">{error}</p>}
    </div>
  );
}

function Success({ message, onAgain }: { message: string; onAgain: () => void }) {
  return (
    <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
      <CheckCircle2 className="mx-auto text-brand-600" size={44} aria-hidden />
      <p className="mt-3 font-heading text-lg font-semibold text-brand-900">{message}</p>
      <button type="button" onClick={onAgain} className="btn-outline mt-5">Send another</button>
    </div>
  );
}

const types = [
  { v: "product", l: "Product inquiry" },
  { v: "offer", l: "Offer inquiry" },
  { v: "location", l: "Shop location" },
  { v: "general", l: "General question" },
];

export function InquiryForm({ defaultProduct = "", defaultType = "general" }: { defaultProduct?: string; defaultType?: string }) {
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [consent, setConsent] = useState(false);
  const err = res && !res.ok ? res.errors ?? {} : {};

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const r = await post("/api/inquiries", {
      type: f.get("type"), name: f.get("name"), phone: f.get("phone"), email: f.get("email") ?? "",
      product: f.get("product") ?? "", message: f.get("message"), consent, website: f.get("website") ?? "",
    });
    setRes(r);
    setBusy(false);
  }

  if (res?.ok) return <Success message={res.message} onAgain={() => { setRes(null); setConsent(false); }} />;

  return (
    <form onSubmit={submit} className="card space-y-4 p-6" noValidate aria-label="Inquiry form">
      <div aria-hidden className="absolute -left-[9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="type" label="What is this about?" error={err.type}>
          <select id="type" name="type" defaultValue={defaultType} className="input">{types.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}</select>
        </Field>
        <Field id="product" label="Product (optional)" error={err.product}>
          <input id="product" name="product" defaultValue={defaultProduct} maxLength={120} className="input" placeholder="e.g. Digital thermometer" />
        </Field>
        <Field id="name" label="Your name" error={err.name}>
          <input id="name" name="name" autoComplete="name" required aria-describedby={err.name ? "name-err" : undefined} className="input" />
        </Field>
        <Field id="phone" label="Mobile number" error={err.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98XXXXXXXX" aria-describedby={err.phone ? "phone-err" : undefined} className="input" />
        </Field>
      </div>
      <Field id="email" label="E-mail (optional)" error={err.email}>
        <input id="email" name="email" type="email" autoComplete="email" className="input" />
      </Field>
      <Field id="message" label="Your message" error={err.message}>
        <textarea id="message" name="message" rows={4} required maxLength={1000} className="input resize-y" placeholder="Tell us what you are looking for." />
      </Field>
      <div>
        <label className="flex items-start gap-2.5 text-sm text-muted">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-brand-700" />
          <span>I agree that Medical Junction may contact me about this inquiry. See the <a className="font-medium text-brand-700 underline" href="/privacy">privacy policy</a>.</span>
        </label>
        {err.consent && <p role="alert" className="field-error">{err.consent}</p>}
      </div>
      <p className="text-xs text-muted">Please do not share prescriptions, medical history or other sensitive health details in this form.</p>
      {res && !res.ok && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">{res.message}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full sm:w-auto">
        {busy && <Loader2 size={16} className="animate-spin" aria-hidden />} Send inquiry
      </button>
    </form>
  );
}

function StarInput({ name, label, value, onChange, required }: { name: string; label: string; value: number; onChange: (n: number) => void; required?: boolean }) {
  return (
    <fieldset>
      <legend className="label">{label}{required && <span className="text-red-700"> *</span>}</legend>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer">
            <input type="radio" name={name} value={n} checked={value === n} onChange={() => onChange(n)} className="peer sr-only" />
            <Star size={28} aria-label={`${n} star${n > 1 ? "s" : ""}`} className={`transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-600 ${n <= value ? "text-gold" : "text-line"}`} fill="currentColor" strokeWidth={0} />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ReviewForm() {
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [consent, setConsent] = useState(false);
  const [s, setS] = useState({ rating: 0, genuineness: 0, service: 0, cleanliness: 0, value: 0 });
  const err = res && !res.ok ? res.errors ?? {} : {};
  const up = (k: keyof typeof s) => (n: number) => setS((o) => ({ ...o, [k]: n }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const opt = (n: number) => (n > 0 ? n : undefined);
    const r = await post("/api/reviews", {
      name: f.get("name"), rating: s.rating || undefined, comment: f.get("comment"), product: f.get("product") ?? "",
      genuineness: opt(s.genuineness), service: opt(s.service), cleanliness: opt(s.cleanliness), value: opt(s.value),
      consent, website: f.get("website") ?? "",
    });
    setRes(r);
    setBusy(false);
  }

  if (res?.ok) return <Success message={res.message} onAgain={() => { setRes(null); setConsent(false); setS({ rating: 0, genuineness: 0, service: 0, cleanliness: 0, value: 0 }); }} />;

  return (
    <form onSubmit={submit} className="card space-y-5 p-6" noValidate aria-label="Rate and review Medical Junction">
      <div aria-hidden className="absolute -left-[9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div>
        <StarInput name="rating" label="Overall rating" value={s.rating} onChange={up("rating")} required />
        {err.rating && <p role="alert" className="field-error">Please choose an overall rating.</p>}
      </div>
      <div className="rounded-xl bg-brand-50 p-4">
        <p className="mb-3 text-sm font-semibold text-brand-900">Quality feedback <span className="font-normal text-muted">(optional)</span></p>
        <div className="grid gap-4 sm:grid-cols-2">
          <StarInput name="genuineness" label="Genuine products" value={s.genuineness} onChange={up("genuineness")} />
          <StarInput name="service" label="Staff & pharmacist service" value={s.service} onChange={up("service")} />
          <StarInput name="cleanliness" label="Cleanliness & storage" value={s.cleanliness} onChange={up("cleanliness")} />
          <StarInput name="value" label="Value for money" value={s.value} onChange={up("value")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="r-name" label="Your name" error={err.name}><input id="r-name" name="name" autoComplete="name" required className="input" /></Field>
        <Field id="r-product" label="Product / service (optional)" error={err.product}><input id="r-product" name="product" maxLength={120} className="input" /></Field>
      </div>
      <Field id="r-comment" label="Your experience" error={err.comment}>
        <textarea id="r-comment" name="comment" rows={4} required maxLength={800} className="input resize-y" placeholder="What went well? What could be better?" />
      </Field>
      <div>
        <label className="flex items-start gap-2.5 text-sm text-muted">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-brand-700" />
          <span>This review is based on my genuine experience at Medical Junction. I agree it may be shown publicly with my name.</span>
        </label>
        {err.consent && <p role="alert" className="field-error">{err.consent}</p>}
      </div>
      {res && !res.ok && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">{res.message}</p>}
      <button type="submit" disabled={busy} className="btn-primary">
        {busy && <Loader2 size={16} className="animate-spin" aria-hidden />} Submit review
      </button>
      <p className="text-xs text-muted">Reviews are checked by our team before they appear. We never edit ratings.</p>
    </form>
  );
}
