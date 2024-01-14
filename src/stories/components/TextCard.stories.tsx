import { Meta, StoryObj } from '@storybook/react';
import TextCard from '@/pages/ReflectionViewPage/TextCard';

const meta: Meta<typeof TextCard> = {
  component: TextCard,
  argTypes: {
    header: {
      control: 'text',
    },
    body: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextCard>;

export const Default: Story = {
  args: {
    header: 'header 폰트사이즈 xl로 고정',
    body: 'body 폰트사이즈 lg로 고정',
  },
};
