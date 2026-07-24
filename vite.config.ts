import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split stable vendor libs into cacheable chunks so app code changes
        // don't invalidate the long-lived vendor cache.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || /[\\/]react[\\/]/.test(id)) {
              return "react-vendor";
            }
            if (id.includes("react-router")) return "router-vendor";
            if (id.includes("@tanstack")) return "query-vendor";
            if (id.includes("react-helmet")) return "helmet-vendor";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("@radix-ui") || id.includes("sonner")) {
              return "radix-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
}));