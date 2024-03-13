import { Container, Paper, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { View as CalculatorView } from "../calculator/View";
import { GranblueTheme } from "./themes";
import { useTranslation } from "react-i18next";
import { SupportedLanguage } from "../@types/SupportedLanguages";

// TODO: Eventually make this changeable.
const theme = GranblueTheme;

export function Sparky() {
  const [language, setLanguage] = useState<SupportedLanguage>(navigator.language === "ja-JP" ? "jp" : "en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("page-title");
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language).catch(console.error);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="xs">
        <Stack spacing={1} alignItems="center">
          <CalculatorView theme={theme} />
          <Paper>
            <ToggleButtonGroup
              color="primary"
              size="small"
              exclusive
              value={language}
              onChange={(_, v: SupportedLanguage) => setLanguage(v)}
            >
              <ToggleButton value="en">A</ToggleButton>
              <ToggleButton value="jp">あ</ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

const styles = {
  container: {
    padding: 1,
  },
  bodyProxy: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${theme.backdrop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};
