import path from "node:path";

import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defaultExclude, defineConfig } from "vitest/config";

const paths = {
  src: path.join(import.meta.dirname, "src"),
};

export default defineConfig({
  base: "/sparky",
  plugins: [
    react({}),
    tailwindcss(),
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
  ],
  resolve: {
    alias: {
      // keep in line with tsconfig.json
      "@i18n/messages": path.resolve(paths.src, "paraglide", "messages"),
      "@": path.join(import.meta.dirname, "src"),
    },
  },
  test: {
    exclude: [...defaultExclude, ".stryker-tmp"],
  },
});
