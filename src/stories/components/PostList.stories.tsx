import PostList from '@/components/PostList';
import { TEST_CHANNEL_ID } from '@/constants/apiTest';
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
  component: PostList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    keyword: {
      control: 'text',
    },
    channelId: {
      control: 'text',
    },
    offset: {
      control: 'number',
    },
    limit: {
      control: 'number',
    },
  },
} satisfies Meta<typeof PostList>;

export default meta;

type Story = StoryObj<typeof PostList>;

export const Deafult: Story = {
  args: {
    channelId: TEST_CHANNEL_ID,
    keyword: 'test',
  },
};
