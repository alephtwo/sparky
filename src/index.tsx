import { createRoot } from "react-dom/client";

import { Sparky } from "./view/Sparky";

const mount = document.querySelector("#app");
if (mount === null) {
  throw new Error("Unable to find root mount point");
}

// Stryker disable next-line ArrowFunction: Too hard to test honestly
const root = createRoot(mount);
root.render(<Sparky />);
