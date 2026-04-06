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
      <div
        tabIndex={0}
        role="button"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-100/80 backdrop-blur-sm border border-base-300 shadow cursor-pointer text-sm select-none"
      >
        <span class="text-base leading-none">{current().flag}</span>
        <span>{current().label}</span>
        <svg class="w-3 h-3 opacity-60" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        class="dropdown-content menu bg-base-100 rounded-lg border border-base-300 shadow-lg mt-1 p-1 w-40 z-10"
      >
        <For each={LOCALES}>
          {(l) => (
            <li>
              <button
                class={`flex items-center gap-2 text-sm w-full text-left px-3 py-2 rounded-md hover:bg-base-200 ${l.value === props.locale ? "font-semibold text-primary" : ""}`}
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
