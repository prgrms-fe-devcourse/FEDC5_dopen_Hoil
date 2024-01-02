import TextIconButton from '@/components/common/TextIconButton';
import { Meta, StoryObj } from '@storybook/react';
import { MdEmojiEvents, MdHome } from 'react-icons/md';

const meta: Meta<typeof TextIconButton> = {
  component: TextIconButton,
  argTypes: {
    textContent: {
      control: 'text',
    },
    boxSize: {
      control: 'text',
    },
    textLocation: {
      options: ['top', 'bottom', 'left', 'right'],
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextIconButton>;

export const Deafult: Story = {
  args: {
    textContent: '테스트',
  },
};

export const Home: Story = {
  args: {
    TheIcon: MdHome,
    textContent: '홈',
  },
};

export const Rank: Story = {
  args: {
    TheIcon: MdEmojiEvents,
    textContent: '랭킹',
  },
};
