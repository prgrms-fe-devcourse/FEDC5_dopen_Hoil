import PageLayout from '@/components/PageLayout';
import TimerPage from '@/pages/TimerPage';
import { Meta, StoryObj } from '@storybook/react';
import { AxiosError } from 'axios';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

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
      }
    },
  }),
});

const meta: Meta<typeof TimerPage> = {
  component: TimerPage,
  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryclient}>
        <Story />
      </QueryClientProvider>
    ),
  ],

  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimerPage>;

export const Deafult: Story = {};
