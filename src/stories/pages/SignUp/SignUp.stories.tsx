import SignUp from '@/pages/user/SignUp';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { withRouter } from 'storybook-addon-react-router-v6';

const queryclient = new QueryClient();

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
