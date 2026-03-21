import { render } from "solid-js/web";
import { Sparky } from "./view/Sparky";

const mount = document.getElementById("app");
if (mount === null) {
  throw new Error("Unable to find root mount point");
}

// Stryker disable next-line ArrowFunction: Too hard to test honestly
render(() => <Sparky />, mount);
