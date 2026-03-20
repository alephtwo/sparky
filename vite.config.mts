import { defaultExclude, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/sparky",
  plugins: [
    react(),
    tailwindcss(),
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
  ],
  test: {},
});
