import Login from '@/pages/Login';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { withRouter } from 'storybook-addon-react-router-v6';
import { AxiosError } from 'axios';

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

const meta = {
  component: Login,
  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryclient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Login>;
export default meta;
type Story = StoryObj<typeof Login>;
export const Deafult: Story = {
  args: {},
};
