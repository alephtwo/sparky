import * as React from "react";
import { Locale, setLocale } from "../../paraglide/runtime";

interface LocalePickerProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export function LocalePicker(props: LocalePickerProps): React.JSX.Element {
  return (
    <div className="join join-horizontal rounded-sm border border-slate-500">
      <LocaleButton locale="en" selected={props.locale === "en"} onChange={props.onChange}>
        A
      </LocaleButton>
      <LocaleButton locale="jp" selected={props.locale === "jp"} onChange={props.onChange}>
        あ
      </LocaleButton>
    </div>
  );
}

interface LocaleButtonProps extends React.PropsWithChildren {
  locale: Locale;
  onChange: (locale: Locale) => void;
  selected: boolean;
}

function LocaleButton(props: LocaleButtonProps) {
  return (
    <button
      className={`btn join-item ${props.selected ? "bg-primary-content" : ""}`}
      onClick={() => {
        Promise.resolve(setLocale(props.locale, { reload: false })).catch(console.error);
        props.onChange(props.locale);
      }}
    >
      {props.children}
    </button>
  );
}
