import PageLayout from '@/components/PageLayout';
import ErrorPage from '@/pages/404Page';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof ErrorPage> = {
  component: ErrorPage,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const Deafult: Story = {};
