import * as en from "../static/locales/en.json";
import * as jp from "../static/locales/jp.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      jp: typeof jp;
    };
  }
}
