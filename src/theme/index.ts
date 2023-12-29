import { extendTheme } from '@chakra-ui/react';

// example theme

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: '62.5%',
      },
    },
  },
  colors: {
    pink: {
      100: '#FFE4E1',
      200: '#F5C6C2',
      300: '#F88585',
      400: '#FF4876',
    },
    gray: {
      50: '#FAFAFA',
      100: '#F4F5F6',
      200: '#F0F0F0',
      300: '#ECECEC',
      400: '#D4D4D4',
      450: '#D9D9D9',
      500: '#CECECE',
      600: '#A8A8A8',
      700: '#91949F',
      800: '#666666',
    },
    purple: {
      100: '#A09ABD',
    },
    red: {
      100: '#EF4444',
    },
    black: '#222222',

    white: '#FFFFFF',
  },
  fonts: {},
  fontSizes: {
    xs: '1rem',
    sm: '1.2rem',
    md: '1.5rem',
    lg: '1.6rem',
    xl: '1.8rem',
    '2xl': '2rem',
    '3xl': '2.2rem',
    '4xl': '2.6rem',
    '5xl': '6.6rem',
  },
  fontWeights: {
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  sizes: {
    icon: '2.4rem',
  },
});
