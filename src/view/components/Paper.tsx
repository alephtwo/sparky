import { ParentComponent } from "solid-js";

export const Paper: ParentComponent = (props) => {
  return <div class="w-full rounded-lg border bg-white/50 p-4">{props.children}</div>;
};
