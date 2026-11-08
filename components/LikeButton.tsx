"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const KEY = "mj-liked";

export function LikeButton({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try { setLiked(localStorage.getItem(KEY) === "1"); } catch {}
    fetch("/api/like").then((r) => r.json()).then((d) => typeof d.count === "number" && setCount(d.count)).catch(() => {});
  }, []);

  async function like() {
    if (liked || busy) return;
    setBusy(true);
    try {
      const r = await fetch("/api/like", { method: "POST" });
      const d = await r.json();
      if (r.ok && d.ok) {
        setCount(d.count);
        setLiked(true);
        try { localStorage.setItem(KEY, "1"); } catch {}
      }
    } finally { setBusy(false); }
  }

  return (
    <button
      type="button" onClick={like} aria-pressed={liked} disabled={busy}
      className={`btn ${liked ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200" : "btn-outline"}`}
    >
      <Heart size={18} fill={liked ? "currentColor" : "none"} aria-hidden />
      {liked ? "You liked this" : "Like Medical Junction"}
      <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-bold" aria-label={`${count} likes`}>{count}</span>
    </button>
  );
}
