import type { ArtKind } from "@/data/catalog";

/** Original flat illustrations used until real product photos are added (set `image` in data/catalog.ts). */
const G = { d: "#0f4a33", m: "#1f8a58", l: "#8fd3ae", p: "#eaf5ee", w: "#ffffff", b: "#3b82c4", bl: "#bfe0f5", o: "#f59e0b", r: "#dc2f2f", s: "#d5dfe0" };

function Art({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "pills":
      return (
        <>
          <rect x="30" y="92" width="76" height="32" rx="16" transform="rotate(-35 68 108)" fill={G.m} />
          <rect x="30" y="92" width="38" height="32" rx="16" transform="rotate(-35 68 108)" fill={G.w} stroke={G.l} strokeWidth="2" />
          <rect x="96" y="104" width="76" height="32" rx="16" transform="rotate(25 134 120)" fill={G.b} />
          <rect x="96" y="104" width="38" height="32" rx="16" transform="rotate(25 134 120)" fill={G.w} stroke={G.bl} strokeWidth="2" />
          <circle cx="62" cy="150" r="16" fill={G.w} stroke={G.l} strokeWidth="3" /><path d="M52 150h20" stroke={G.l} strokeWidth="3" />
        </>
      );
    case "thermometer":
      return (
        <>
          <rect x="30" y="86" width="140" height="28" rx="14" transform="rotate(-25 100 100)" fill={G.w} stroke={G.s} strokeWidth="3" />
          <rect x="62" y="92" width="48" height="16" rx="4" transform="rotate(-25 100 100)" fill={G.l} />
          <circle cx="42" cy="136" r="9" transform="rotate(-25 100 100)" fill={G.m} />
          <circle cx="150" cy="82" r="6" fill={G.m} />
        </>
      );
    case "sanitizer":
      return (
        <>
          <rect x="62" y="70" width="76" height="100" rx="16" fill={G.bl} stroke={G.b} strokeWidth="3" />
          <rect x="70" y="100" width="60" height="50" rx="8" fill={G.w} />
          <path d="M100 108v34M83 125h34" stroke={G.m} strokeWidth="9" strokeLinecap="round" />
          <rect x="88" y="52" width="24" height="20" rx="4" fill={G.d} />
          <path d="M92 52V38h34a6 6 0 0 1 6 6" stroke={G.d} strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      );
    case "firstaid":
      return (
        <>
          <rect x="36" y="64" width="128" height="96" rx="14" fill={G.r} />
          <path d="M78 64v-12a10 10 0 0 1 10-10h24a10 10 0 0 1 10 10v12" stroke="#a31f1f" strokeWidth="8" fill="none" />
          <path d="M100 90v46M77 113h46" stroke={G.w} strokeWidth="14" strokeLinecap="round" />
          <rect x="36" y="112" width="128" height="4" fill="#a31f1f" opacity=".35" />
        </>
      );
    case "bpmonitor":
      return (
        <>
          <rect x="34" y="60" width="86" height="96" rx="14" fill={G.w} stroke={G.s} strokeWidth="3" />
          <rect x="46" y="74" width="62" height="36" rx="6" fill={G.d} />
          <text x="77" y="100" textAnchor="middle" fontSize="22" fontWeight="700" fill={G.l} fontFamily="monospace">120</text>
          <circle cx="77" cy="132" r="11" fill={G.m} />
          <path d="M120 112h20c18 0 28 12 28 26s-10 26-28 26h-20" fill={G.b} opacity=".85" />
          <path d="M150 100v-14" stroke={G.b} strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case "glucometer":
      return (
        <>
          <rect x="58" y="42" width="84" height="124" rx="16" fill={G.d} />
          <rect x="70" y="56" width="60" height="44" rx="7" fill={G.l} />
          <text x="100" y="88" textAnchor="middle" fontSize="24" fontWeight="700" fill={G.d} fontFamily="monospace">98</text>
          <circle cx="100" cy="124" r="13" fill={G.m} />
          <rect x="88" y="146" width="24" height="6" rx="3" fill={G.l} />
          <rect x="90" y="166" width="20" height="26" rx="4" fill={G.w} stroke={G.s} strokeWidth="2" />
          <circle cx="100" cy="30" r="9" fill={G.r} />
        </>
      );
    case "vitamin":
      return (
        <>
          <circle cx="132" cy="136" r="34" fill={G.o} /><circle cx="132" cy="136" r="24" fill="#fbbf24" />
          <path d="M132 102c4-12 14-16 20-14" stroke={G.m} strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="44" y="64" width="64" height="100" rx="12" fill={G.w} stroke={G.s} strokeWidth="3" />
          <rect x="44" y="48" width="64" height="22" rx="6" fill={G.o} />
          <rect x="52" y="92" width="48" height="44" rx="8" fill={G.p} />
          <text x="76" y="122" textAnchor="middle" fontSize="26" fontWeight="800" fill={G.o} fontFamily="Poppins, sans-serif">C</text>
        </>
      );
    case "mask":
      return (
        <>
          <path d="M42 80c40-18 76-18 116 0v54c-40 22-76 22-116 0Z" fill={G.bl} stroke={G.b} strokeWidth="3" />
          <path d="M52 98c34-12 62-12 96 0M52 116c34-12 62-12 96 0" stroke={G.b} strokeWidth="3" fill="none" opacity=".6" />
          <path d="M42 90c-14 4-20 16-16 30M158 90c14 4 20 16 16 30" stroke={G.s} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      );
    case "bandage":
      return (
        <>
          <rect x="32" y="84" width="136" height="40" rx="20" transform="rotate(-30 100 104)" fill="#f0c9a0" />
          <rect x="74" y="86" width="52" height="36" rx="4" transform="rotate(-30 100 104)" fill={G.w} />
          <circle cx="100" cy="104" r="2" fill="#d6a574" /><circle cx="88" cy="110" r="2" fill="#d6a574" /><circle cx="112" cy="98" r="2" fill="#d6a574" />
          <circle cx="146" cy="150" r="22" fill={G.w} stroke={G.s} strokeWidth="3" /><circle cx="146" cy="150" r="9" fill={G.p} />
        </>
      );
    case "toothpaste":
      return (
        <>
          <path d="M44 128l86-52a12 12 0 0 1 16 4l10 16a12 12 0 0 1-4 16l-86 52Z" fill={G.w} stroke={G.s} strokeWidth="3" />
          <path d="M44 128l-6 34 34-10Z" fill={G.m} />
          <rect x="142" y="70" width="26" height="22" rx="4" transform="rotate(-30 155 81)" fill={G.d} />
          <path d="M60 156c10-6 20-6 30 0" stroke={G.l} strokeWidth="6" strokeLinecap="round" fill="none" />
        </>
      );
    case "soap":
      return (
        <>
          <rect x="44" y="92" width="112" height="64" rx="18" fill={G.l} />
          <rect x="52" y="100" width="96" height="48" rx="12" fill={G.p} opacity=".7" />
          <circle cx="68" cy="68" r="14" fill={G.bl} stroke={G.b} strokeWidth="2" /><circle cx="104" cy="52" r="9" fill={G.bl} stroke={G.b} strokeWidth="2" /><circle cx="136" cy="74" r="18" fill={G.bl} stroke={G.b} strokeWidth="2" />
        </>
      );
    case "ors":
      return (
        <>
          <path d="M52 52h64l8 12v100H44V64Z" fill={G.w} stroke={G.s} strokeWidth="3" />
          <rect x="52" y="86" width="64" height="52" rx="6" fill={G.bl} />
          <path d="M84 94v36M66 112h36" stroke={G.b} strokeWidth="8" strokeLinecap="round" />
          <path d="M128 98h32l-6 62a8 8 0 0 1-8 7h-4a8 8 0 0 1-8-7Z" fill={G.bl} stroke={G.b} strokeWidth="3" />
          <path d="M132 120h24" stroke={G.w} strokeWidth="4" />
        </>
      );
  }
}

export function ProductArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true" fill="none">
      <ellipse cx="100" cy="176" rx="62" ry="8" fill="#0f4a33" opacity=".1" />
      <Art kind={kind} />
    </svg>
  );
}
