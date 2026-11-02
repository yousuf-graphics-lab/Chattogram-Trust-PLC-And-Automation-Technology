import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { seoPlugin } from "./scripts/vite-seo";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  let origin = "";
  try {
    const url = new URL((env.VITE_SITE_URL || "").replace(/\/$/, ""));
    if (
      url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
    )
      origin = url.origin;
  } catch {
    /* Route metadata still works without a production origin. */
  }
  return {
    plugins: [react(), seoPlugin(origin)],
    server: { host: "0.0.0.0", port: 5173, allowedHosts: [".e2b.app"] },
    preview: { host: "0.0.0.0", port: 4173, allowedHosts: [".e2b.app"] },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      css: false,
      restoreMocks: true,
      clearMocks: true,
    },
  };
});
