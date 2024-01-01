import PageHeader from '@/components/PageHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
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
type Story = StoryObj<typeof PageHeader>;

export const Deafult: Story = {
  args: {
    width: 428,
    height: 80,
  },
};
