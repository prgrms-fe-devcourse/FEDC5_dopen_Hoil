import MainHeader from '@/components/Test/MainHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainHeader> = {
  component: MainHeader,
  argTypes: {
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainHeader>;

export const Deafult: Story = {
  args: {
    width: 428,
    height: 80,
  },
};
