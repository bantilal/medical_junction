import Link from "next/link";

/** Cross + leaf mark, redrawn as SVG to match the shop signboard. */
export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="Medical Junction logo" fill="none">
      <defs>
        <linearGradient id="mj-cross" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fa866" />
          <stop offset="1" stopColor="#176b45" />
        </linearGradient>
        <linearGradient id="mj-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0f4a33" />
          <stop offset="1" stopColor="#2c8f8a" />
        </linearGradient>
      </defs>
      <path d="M22 4h14a3 3 0 0 1 3 3v15h15a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H39v15a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V42H4a3 3 0 0 1-3-3V25a3 3 0 0 1 3-3h15V7a3 3 0 0 1 3-3Z" fill="url(#mj-cross)" />
      <path d="M17 52C17 34 30 20 54 14c-1 22-13 36-37 38Z" fill="url(#mj-leaf)" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M22 48C30 38 38 30 49 21" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
    </svg>
  );
}

export function Logo({ light = false, withTagline = true }: { light?: boolean; withTagline?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Medical Junction - home">
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-heading text-[1.35rem] font-bold ${light ? "text-white" : "text-[#34484a]"}`}>Medical</span>
        <span className={`-mt-0.5 block font-heading text-[1.35rem] font-bold ${light ? "text-brand-300" : "text-brand-600"}`}>Junction</span>
        {withTagline && (
          <span className={`mt-1 block text-[0.62rem] font-medium tracking-wide ${light ? "text-brand-200" : "text-muted"}`}>
            Your Health, Our Priority
          </span>
        )}
      </span>
    </Link>
  );
}
