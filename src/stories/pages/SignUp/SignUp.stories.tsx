import SignUp from '@/pages/SignUp';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
      }
    },
  }),
});

const meta = {
  component: SignUp,
  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryclient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof SignUp>;
export default meta;
type Story = StoryObj<typeof SignUp>;
export const Deafult: Story = {
  args: {},
};
