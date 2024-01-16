import type { Preview } from '@storybook/react';
import { theme } from '../src/theme';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

const queryclient = new QueryClient({
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
        alert(query.meta?.errorMessage);
      }
    },
  }),
});

const preview: Preview = {
  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryclient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    chakra: {
      theme,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
