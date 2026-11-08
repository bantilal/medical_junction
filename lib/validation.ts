import { z } from "zod";

const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
const text = (min: number, max: number, label: string) =>
  z.string({ error: `${label} is required.` }).transform(clean).pipe(
    z.string().min(min, `${label} is too short.`).max(max, `${label} is too long (max ${max} characters).`),
  );

export const phoneSchema = z
  .string({ error: "Phone number is required." })
  .transform((s) => s.replace(/[\s\-()]/g, ""))
  .pipe(z.string().regex(/^(\+91|91|0)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."));

export const inquirySchema = z.object({
  type: z.enum(["product", "general", "location", "offer"]).default("general"),
  name: text(2, 80, "Name"),
  phone: phoneSchema,
  email: z.union([z.literal(""), z.string().trim().max(120).email("Enter a valid e-mail address.")]).optional(),
  product: z.string().trim().max(120).optional(),
  message: text(5, 1000, "Message"),
  consent: z.literal(true, { error: "Please agree to be contacted about this inquiry." }),
  website: z.string().max(0).optional(), // honeypot - bots fill it
});
export type InquiryInput = z.infer<typeof inquirySchema>;

const star = z.coerce.number().int().min(1).max(5);
export const reviewSchema = z.object({
  name: text(2, 60, "Name"),
  rating: star,
  comment: text(10, 800, "Review"),
  product: z.string().trim().max(120).optional(),
  genuineness: star.optional(),
  service: star.optional(),
  cleanliness: star.optional(),
  value: star.optional(),
  consent: z.literal(true, { error: "Please confirm that this review is your genuine experience." }),
  website: z.string().max(0).optional(),
});
export type ReviewInput = z.infer<typeof reviewSchema>;

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of err.issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
