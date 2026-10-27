export function Paper(props: React.PropsWithChildren): React.JSX.Element {
  return <div className="w-full rounded-lg border bg-white/50 p-4">{props.children}</div>;
}
