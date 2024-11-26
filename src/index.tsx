import * as React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Sparky } from "./Sparky";

const mount = document.getElementById("app");
if (mount === null) {
  throw new Error("#app is missing, nothing can be done");
}

const root = createRoot(mount);
root.render(<Sparky />);
