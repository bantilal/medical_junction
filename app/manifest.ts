import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Medical Junction",
    short_name: "Medical Junction",
    description: "Your Health, Our Priority - pharmacy and healthcare store in Jaipur.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#176b45",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
