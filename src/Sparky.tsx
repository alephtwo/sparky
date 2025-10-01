import { Box, Container, Paper, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { View as CalculatorView } from "./calculator/View";
import Backdrop from "./images/backdrop.webp";
import { m } from "./paraglide/messages";
import { getLocale, setLocale, Locale } from "./paraglide/runtime";

export function Sparky() {
  const [statefulLocale, setStatefulLocale] = useState<Locale>(getLocale());

  useEffect(() => {
    document.title = m["page-title"]();
  }, []);

  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="xs">
        <Stack spacing={1} alignItems="center">
          <CalculatorView />
          <Paper>
            <ToggleButtonGroup
              color="primary"
              size="small"
              exclusive
              value={statefulLocale}
              onChange={(_, v: Locale) => {
                if (v === null) {
                  return;
                }
                Promise.resolve(setLocale(v, { reload: false })).catch(console.error);
                setStatefulLocale(v);
              }}
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
    backgroundImage: `url(${Backdrop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};
