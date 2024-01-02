import UserList from '@/components/common/UserList';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserList> = {
  component: UserList,
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
type Story = StoryObj<typeof UserList>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '40px',
    username: '올챙이',
  },
};
