import SignUp from '@/components/member/SignUp';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof SignUp> = {
  component: SignUp,
  decorators: [withRouter],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SignUp>;

export const Deafult: Story = {};
