import PageLayout from '@/components/PageLayout';
import BoardEnterPage from '@/pages/BoardEnterPage';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof BoardEnterPage> = {
  component: BoardEnterPage,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
};

export default meta;
type Story = StoryObj<typeof BoardEnterPage>;

export const Deafult: Story = {};
