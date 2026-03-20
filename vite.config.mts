import { defaultExclude, defineConfig } from "vitest/config";
import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

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
  test: {
    environment: "jsdom",
    exclude: defaultExclude.concat([".stryker-tmp/**"]),
    setupFiles: path.join(import.meta.dirname, "vitest.setup.mts"),
  },
});
