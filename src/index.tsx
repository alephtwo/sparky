import * as React from "react";
import { createRoot } from "react-dom/client";
import { Sparky } from "./sparky/Sparky";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "page-title": "Sparky",
          crystals: "Crystals",
          tickets: "Draw Tickets",
          tenPartTickets: "Ten Part Draw Tickets",
          sparks: "Cerulean Sparks",
        },
      },
      jp: {
        translation: {
          "page-title": "Sparky",
          crystals: "宝晶石",
          tickets: "ガチャチケ",
          tenPartTickets: "10連チケ",
          sparks: "蒼光の御印",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

const theme = createTheme();

const component = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Sparky />
  </ThemeProvider>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(component);
