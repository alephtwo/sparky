import * as React from "react";
import { createRoot } from "react-dom/client";
import { Sparky } from "./view/Sparky";

const mount = document.getElementById("app");
if (mount === null) {
  throw new Error("Unable to find root mount point");
}

const root = createRoot(mount);
root.render(<Sparky />);
