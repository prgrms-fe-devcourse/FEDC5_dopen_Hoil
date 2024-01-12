import MyPage from '@/pages/MyPage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MyPage> = {
  component: MyPage,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MyPage>;

export const Deafult: Story = {};
