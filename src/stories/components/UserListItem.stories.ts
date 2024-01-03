import UserListItem from '@/components/common/UserListItem';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserListItem> = {
  component: UserListItem,
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    username: {
      control: 'text',
    },
    userImageSize: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserListItem>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '40px',
    username: '올챙이',
  },
};
