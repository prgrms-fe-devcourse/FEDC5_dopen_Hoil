import Comment from '@/components/Comment';
import { Meta, StoryObj } from '@storybook/react';
import { AxiosError } from 'axios';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

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

const meta = {
  component: Comment,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof Comment>;

export default meta;

type Story = StoryObj<typeof Comment>;

export const Deafult: Story = {};
