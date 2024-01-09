import BoardList from '@/components/BoardList';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BoardList> = {
  component: BoardList,
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
type Story = StoryObj<typeof BoardList>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '40px',
  },
};
