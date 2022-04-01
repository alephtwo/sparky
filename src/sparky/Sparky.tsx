import { Container } from '@mui/material';
import { Box } from '@mui/material';
import * as React from 'react';
import { View as CalculatorView } from '../calculator/View';
import themes from './themes';

// TODO: Eventually make this changeable.
const theme = themes.granblue;

export function Sparky() {
  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="xs">
        <CalculatorView theme={theme} />
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
