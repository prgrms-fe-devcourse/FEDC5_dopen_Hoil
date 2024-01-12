import SignUp from '@/pages/SignUp';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: SignUp,
  argTypes: {},
} satisfies Meta<typeof SignUp>;

export default meta;

type Story = StoryObj<typeof SignUp>;

export const Deafult: Story = {
  args: {},
};
