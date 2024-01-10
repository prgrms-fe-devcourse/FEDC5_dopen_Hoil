import PageLayout from '@/components/PageLayout';
import BoardPage from '@/pages/BoardPage';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof BoardPage> = {
  component: BoardPage,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
};

export default meta;
type Story = StoryObj<typeof BoardPage>;

export const Deafult: Story = {};
