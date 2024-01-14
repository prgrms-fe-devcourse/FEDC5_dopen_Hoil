import PageLayout from '@/components/PageLayout';
import ReflectionPostEditPage from '@/pages/ReflectionPostEditPage';
import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterNestedAncestors,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta = {
  component: ReflectionPostEditPage,
  argTypes: {},
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors(<PageLayout />),
    }),
  },
} satisfies Meta<typeof ReflectionPostEditPage>;

export default meta;

type Story = StoryObj<typeof ReflectionPostEditPage>;

export const Deafult: Story = {
  args: {},
};
