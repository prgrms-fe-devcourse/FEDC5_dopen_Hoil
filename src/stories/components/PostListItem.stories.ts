import PostListItem from '@/components/common/PostListItem';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PostListItem> = {
  component: PostListItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PostListItem>;

export const Deafult: Story = {
  args: {},
};
