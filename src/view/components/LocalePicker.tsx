import { Component, For } from "solid-js";

import { Locale, setLocale } from "../../paraglide/runtime";

interface LocalePickerProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

const LOCALES: { value: Locale; flag: string; label: string }[] = [
  { value: "jp", flag: "🇯🇵", label: "日本語" },
  { value: "en", flag: "🇺🇸", label: "English" },
];

export const LocalePicker: Component<LocalePickerProps> = (props) => {
  const pick = (locale: Locale) => {
    Promise.resolve(setLocale(locale, { reload: false })).catch(console.error);
    props.onChange(locale);
    // close the dropdown by blurring the active element
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <div class="flex gap-2">
      <For each={LOCALES}>
        {(l) => (
          <button
            class={`flex w-full items-center gap-2 rounded-md border bg-white/30 px-3 py-2 text-left text-sm hover:bg-white/50 ${l.value === props.locale ? "text-primary bg-white/80 font-semibold" : ""}`}
            onClick={() => pick(l.value)}
          >
            <span class="leading-none">{l.flag}</span>
            <span>{l.label}</span>
          </button>
        )}
      </For>
    </div>
  );
};
