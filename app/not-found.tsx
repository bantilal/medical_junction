import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x flex flex-col items-center text-center">
        <LogoMark size={72} />
        <h1 className="mt-6 font-heading text-4xl font-extrabold text-brand-900">Page not found</h1>
        <p className="mt-3 max-w-md text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-6 flex gap-3"><Link href="/" className="btn-primary">Go home</Link><Link href="/products" className="btn-outline">Browse products</Link></div>
      </div>
    </section>
  );
}
