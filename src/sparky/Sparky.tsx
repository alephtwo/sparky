import { Container, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { View as CalculatorView } from '../calculator/View';
import { SupportedLocale } from './SparkyTheme';
import { GranblueTheme } from './themes';

// TODO: Eventually make this changeable.
const theme = GranblueTheme;
const defaultLanguage = navigator.language === 'ja-JP' ? 'ja-JP' : 'en-US';

export function Sparky() {
  const [language, setLanguage] = useState(defaultLanguage);

  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="xs">
        <Stack spacing={1} alignItems="center">
          <CalculatorView theme={theme} language={language as SupportedLocale} />
          <ToggleButtonGroup
            color="primary"
            size="small"
            exclusive
            value={language}
            onChange={(_, v) => setLanguage(v as SupportedLocale)}
          >
            <ToggleButton value="en-US">EN</ToggleButton>
            <ToggleButton value="ja-JP">日本語</ToggleButton>
          </ToggleButtonGroup>
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
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${theme.backdrop})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};
