import MyPage from '@/pages/MyPage';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof MyPage> = {
  component: MyPage,
  decorators: [withRouter],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MyPage>;

export const Deafult: Story = {};
