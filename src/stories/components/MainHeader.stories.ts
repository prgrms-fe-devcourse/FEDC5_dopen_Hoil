import MainHeader from '@/components/MainHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainHeader> = {
  component: MainHeader,
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainHeader>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '80px',
  },
};
