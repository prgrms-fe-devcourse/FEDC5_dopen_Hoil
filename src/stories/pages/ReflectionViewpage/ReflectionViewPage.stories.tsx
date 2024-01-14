import PageLayout from '@/components/PageLayout';
import ReflectionViewPage from '@/pages/ReflectionViewPage';
import { Meta, StoryObj } from '@storybook/react';

import {
  reactRouterNestedAncestors,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta: Meta<typeof ReflectionViewPage> = {
  component: ReflectionViewPage,

  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ReflectionViewPage>;

export const Default: Story = {};
