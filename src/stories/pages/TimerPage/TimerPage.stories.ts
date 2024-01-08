import TimerPage from '@/pages/TimerPage';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof TimerPage> = {
  component: TimerPage,
  decorators: [withRouter],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimerPage>;

export const Deafult: Story = {};
