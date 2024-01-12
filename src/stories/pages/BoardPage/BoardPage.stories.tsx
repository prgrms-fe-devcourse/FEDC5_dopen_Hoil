import PageLayout from '@/components/PageLayout';
import BoardPage from '@/pages/BoardPage';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof BoardPage> = {
  component: BoardPage,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
};

export default meta;
type Story = StoryObj<typeof BoardPage>;

export const Deafult: Story = {};
