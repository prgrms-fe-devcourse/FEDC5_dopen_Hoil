import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme/index.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { darkModeTheme } from './theme/darkmode.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript
          initialColorMode={darkModeTheme.config.initialColorMode}
        />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
