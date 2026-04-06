import { ParentComponent } from "solid-js";

export const Paper: ParentComponent = (props) => {
  return <div class="w-full p-4 bg-base-100/75 border border-base-300 rounded-lg">{props.children}</div>;
};
