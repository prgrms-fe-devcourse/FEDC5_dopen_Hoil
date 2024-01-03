import EnterBoard from '@/pages/MainPage/EnterBoard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EnterBoard> = {
  component: EnterBoard,
};

export default meta;
type Story = StoryObj<typeof EnterBoard>;

export const Deafult: Story = {};
