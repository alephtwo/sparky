interface SparkyThemeArgs {
  name: string;
  backdrop: string;
  crystalsIcon: string;
  ticketsIcon: string;
  tenPartTicketsIcon: string;
  sparksIcon: string;
  text: TextBundle;
}
export class SparkyTheme {
  #name: string;
  #backdrop: string;
  #crystalsIcon: string;
  #ticketsIcon: string;
  #tenPartTicketsIcon: string;
  #sparksIcon: string;
  #text: TextBundle;

  constructor(args: SparkyThemeArgs) {
    this.#name = args.name;
    this.#backdrop = args.backdrop;
    this.#crystalsIcon = args.crystalsIcon;
    this.#ticketsIcon = args.ticketsIcon;
    this.#tenPartTicketsIcon = args.tenPartTicketsIcon;
    this.#sparksIcon = args.sparksIcon;
    this.#text = args.text;
  }

  get name() {
    return this.#name;
  }

  get backdrop() {
    return this.#backdrop;
  }

  get crystalsIcon() {
    return this.#crystalsIcon;
  }

  get ticketsIcon() {
    return this.#ticketsIcon;
  }

  get tenPartTicketsIcon() {
    return this.#tenPartTicketsIcon;
  }

  get sparksIcon() {
    return this.#sparksIcon;
  }

  getTextBundle(locale: SupportedLocale): LocalizedTextBundle {
    return this.#text[locale];
  }
}

export type SupportedLocale = 'en-US' | 'ja-JP';
type TextBundle = {
  [key in SupportedLocale]: LocalizedTextBundle;
};

interface LocalizedTextBundle {
  crystals: string;
  tickets: string;
  tenPartTickets: string;
  sparks: string;
}
