import * as en from "../../public/locales/en.json";
import * as jp from "../../public/locales/jp.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      jp: typeof jp;
    };
  }
}
