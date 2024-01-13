import Grass from '@/components/Grass';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grass> = {
  component: Grass,
  argTypes: {
    timerPosts: {
      control: 'array',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grass>;

export const Deafult: Story = {
  args: {
    timerPosts: [
      { time: '06:07:00', createdAt: '2024-01-01T20:48:19.816Z' },
      { time: '02:00:00', createdAt: '2024-01-04T20:48:19.816Z' },
      { time: '05:07:00', createdAt: '2024-01-05T20:48:19.816Z' },
      { time: '12:07:00', createdAt: '2024-01-10T20:48:19.816Z' },
    ],
  },
};
