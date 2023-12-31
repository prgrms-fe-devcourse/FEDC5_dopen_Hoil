import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme/index.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { darkModeTheme } from './theme/darkmode.ts';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ColorModeScript
            initialColorMode={darkModeTheme.config.initialColorMode}
          />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
