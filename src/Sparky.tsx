import { Container } from '@mui/material';
import { Box } from '@mui/material';
import * as React from 'react';
import { View as CalculatorView } from './calculator/View';
import BackgroundImage from './static/backdrop.webp';

export function Sparky() {
  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="xs">
        <CalculatorView />
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
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};
