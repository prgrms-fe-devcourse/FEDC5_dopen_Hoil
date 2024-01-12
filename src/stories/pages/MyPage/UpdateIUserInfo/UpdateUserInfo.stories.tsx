import UpdateUserInfo from '@/pages/MyPage/UpdateUserInfo';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: UpdateUserInfo,

  argTypes: {},
} satisfies Meta<typeof UpdateUserInfo>;

export default meta;

type Story = StoryObj<typeof UpdateUserInfo>;

export const Deafult: Story = {
  args: {},
};
