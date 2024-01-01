import UserContentBlock from '@/components/common/UserContentBlock';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
const meta: Meta<typeof UserContentBlock> = {
  component: UserContentBlock,
  decorators: [withRouter],
  argTypes: {
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    username: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    isOnline: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserContentBlock>;

export const Deafult: Story = {
  args: {
    width: 428,
    height: 80,
    username: '테스트닉',
    content: '테스트용 내용',
    isOnline: true,
  },
};
