import { render } from "solid-js/web";
import { Sparky } from "./view/Sparky";

const mount = document.getElementById("app");
if (mount === null) {
  throw new Error("Unable to find root mount point");
}

render(() => <Sparky />, mount);
