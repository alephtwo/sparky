import { defaultExclude, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";

export default defineConfig({
  base: "/sparky",
  plugins: [
    react(),
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
  ],
  test: {},
});
