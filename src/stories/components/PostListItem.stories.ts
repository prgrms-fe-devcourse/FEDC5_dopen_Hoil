import PostListItem from '@/components/common/PostListItem';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PostListItem> = {
  component: PostListItem,
  argTypes: {
    title: {
      control: 'text',
    },
    body: {
      control: 'text',
    },
    username: {
      control: 'text',
    },
    timeAgo: {
      control: 'text',
    },
    likeCount: {
      control: 'number',
    },
    commentCount: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostListItem>;

export const Deafult: Story = {
  args: {
    title: '제목입니다제목입니다제목입니다제목입니다제목입니다',
    body: '내용이에요내용이에요내용이에요내용이에요내용이에요내용이에',
    username: '올챙이',
    timeAgo: '2일전',
    likeCount: 10,
    commentCount: 20,
  },
};
