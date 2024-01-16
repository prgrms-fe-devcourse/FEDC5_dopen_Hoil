import Login from '@/pages/Login';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Login,
  argTypes: {},
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof Login>;

export const Deafult: Story = {
  args: {},
};
