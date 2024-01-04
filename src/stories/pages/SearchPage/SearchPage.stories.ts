import SearchPage from '@/pages/SearchPage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchPage> = {
  component: SearchPage,
};

export default meta;
type Story = StoryObj<typeof SearchPage>;

export const Deafult: Story = {};
