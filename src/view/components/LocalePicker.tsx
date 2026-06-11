import { Component, For } from "solid-js";

import { Locale, setLocale } from "../../paraglide/runtime";

interface LocalePickerProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

const LOCALES: { value: Locale; flag: string; label: string }[] = [
  { value: "en", flag: "🇺🇸", label: "English" },
  { value: "jp", flag: "🇯🇵", label: "日本語" },
];

export const LocalePicker: Component<LocalePickerProps> = (props) => {
  const current = () => LOCALES.find((l) => l.value === props.locale) ?? LOCALES[0];

  const pick = (locale: Locale) => {
    Promise.resolve(setLocale(locale, { reload: false })).catch(console.error);
    props.onChange(locale);
    // close the dropdown by blurring the active element
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <div class="dropdown dropdown-end">
      <button
        tabIndex={0}
        class="bg-base-100/80 border-base-300 flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm shadow backdrop-blur-sm select-none"
      >
        <span class="text-base leading-none">{current().flag}</span>
        <span>{current().label}</span>
        <svg
          class="h-3 w-3 opacity-60"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <ul class="dropdown-content menu bg-base-100 border-base-300 z-10 mt-1 w-40 rounded-lg border p-1 shadow-lg">
        <For each={LOCALES}>
          {(l) => (
            <li>
              <button
                class={`hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${l.value === props.locale ? "text-primary font-semibold" : ""}`}
                onClick={() => pick(l.value)}
              >
                <span class="text-base leading-none">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
