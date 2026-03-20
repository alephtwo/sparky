import { ParentComponent } from "solid-js";

export const Paper: ParentComponent = (props) => {
  return <div class="w-full p-4 bg-slate-100/75 border border-slate-500 rounded-sm">{props.children}</div>;
};
