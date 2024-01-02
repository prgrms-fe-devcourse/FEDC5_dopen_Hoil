import Dday from '@/pages/MainPage/Dday';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dday> = {
  component: Dday,
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dday>;

export const Deafult: Story = {
  args: {
    isLoggedIn: false,
  },
};
