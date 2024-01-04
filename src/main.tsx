import React from 'react';
import App from './app/App.tsx';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme/index.ts';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { darkModeTheme } from './theme/darkmode.ts';
import { BrowserRouter } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
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

        alert(error.message);
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <ColorModeScript
              initialColorMode={darkModeTheme.config.initialColorMode}
            />
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
