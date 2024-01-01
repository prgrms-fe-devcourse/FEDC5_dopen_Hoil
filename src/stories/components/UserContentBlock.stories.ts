import UserContentBlock from '@/components/common/UserContentBlock';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserContentBlock> = {
  component: UserContentBlock,
  argTypes: {
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserContentBlock>;

export const Deafult: Story = {
  args: {
    width: 428,
    height: 80,
    content: '테스트용 내용',
  },
};
