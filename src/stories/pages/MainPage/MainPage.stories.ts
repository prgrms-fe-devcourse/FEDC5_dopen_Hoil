import MainPage from '@/pages/MainPage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainPage> = {
  component: MainPage,
  argTypes: {
    isLogin: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Deafult: Story = {
  args: {
    isLogin: false,
  },
};
