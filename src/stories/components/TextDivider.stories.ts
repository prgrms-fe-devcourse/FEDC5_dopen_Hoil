import { Meta, StoryObj } from '@storybook/react';
import TextDivider from '@/pages/MessagePage/TextDivider';

const meta: Meta<typeof TextDivider> = {
  component: TextDivider,
  argTypes: {
    dividerColor: {
      control: 'color',
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextDivider>;

export const Default: Story = {
  args: {
    dividerColor: 'gray.300',
    text: 'test중입니다',
  },
};
