import { ImageResponse } from "next/og";

export const alt = "Medical Junction - Your Health, Our Priority";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0f4a33,#176b45 55%,#2fa866)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ width: 120, height: 120, borderRadius: 28, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#176b45", fontSize: 96, fontWeight: 800 }}>+</div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 84, fontWeight: 800 }}>Medical</span>
            <span style={{ fontSize: 84, fontWeight: 800, color: "#8fd3ae" }}>Junction</span>
          </div>
        </div>
        <div style={{ marginTop: 48, fontSize: 42, fontWeight: 600 }}>Your Health, Our Priority</div>
        <div style={{ marginTop: 14, fontSize: 28, color: "#c5e8d5" }}>Pharmacy & healthcare store · Jaipur, Rajasthan</div>
      </div>
    ),
    size,
  );
}
