import UserList from '@/components/UserList';
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
  component: UserList,
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
    offset: {
      control: 'number',
    },
    limit: {
      control: 'number',
    },
    isDivider: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof UserList>;

export default meta;

type Story = StoryObj<typeof UserList>;

export const Deafult: Story = {
  args: {
    keyword: 'test',
    isDivider: true,
  },
};
