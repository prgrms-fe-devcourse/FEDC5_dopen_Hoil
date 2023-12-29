import Footer from '@/components/Footer';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  component: Footer,
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
type Story = StoryObj<typeof Footer>;

export const Deafult: Story = {
  args: {
    width: 428,
    height: 80,
  },
};
