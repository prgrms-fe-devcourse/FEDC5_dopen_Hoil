import React from 'react';
import App from './app/App.tsx';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme/index.ts';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!query.meta?.errorMessage) {
        return;
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 400) {
          return;
        }
      }
      alert(query.meta.errorMessage);
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
