import PageLayout from '@/components/PageLayout';
import TimerPage from '@/pages/TimerPage';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof TimerPage> = {
  component: TimerPage,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimerPage>;

export const Deafult: Story = {};
