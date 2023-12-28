import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
} from '@chakra-ui/react';
import { theme } from './theme/index.ts';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const darkModeTheme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript
        initialColorMode={darkModeTheme.config.initialColorMode}
      />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
