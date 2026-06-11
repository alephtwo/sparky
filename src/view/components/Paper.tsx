import { ParentComponent } from "solid-js";

export const Paper: ParentComponent = (props) => {
  return (
    <div class="bg-base-100/75 border-base-300 w-full rounded-lg border p-4">{props.children}</div>
  );
};
