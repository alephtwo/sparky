import { Component, ParentComponent } from "solid-js";
import { Locale, setLocale } from "../../paraglide/runtime";

interface LocalePickerProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export const LocalePicker: Component<LocalePickerProps> = (props) => {
  return (
    <div class="join join-horizontal rounded-sm border border-slate-500">
      <LocaleButton locale="en" selected={props.locale === "en"} onChange={props.onChange}>
        A
      </LocaleButton>
      <LocaleButton locale="jp" selected={props.locale === "jp"} onChange={props.onChange}>
        あ
      </LocaleButton>
    </div>
  );
};

interface LocaleButtonProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
  selected: boolean;
}

const LocaleButton: ParentComponent<LocaleButtonProps> = (props) => {
  return (
    <button
      class={`btn join-item ${props.selected ? "bg-primary-content" : ""}`}
      onClick={() => {
        Promise.resolve(setLocale(props.locale, { reload: false })).catch(console.error);
        props.onChange(props.locale);
      }}
    >
      {props.children}
    </button>
  );
};
