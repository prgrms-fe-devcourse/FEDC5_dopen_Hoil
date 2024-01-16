import LoginProfile from '@/pages/MainPage/LoginProfile';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoginProfile> = {
  component: LoginProfile,
};

export default meta;
type Story = StoryObj<typeof LoginProfile>;

export const Deafult: Story = {};
