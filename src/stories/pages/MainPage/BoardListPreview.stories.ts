import BoardListPreview from '@/pages/MainPage/BoardListPreview';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BoardListPreview> = {
  component: BoardListPreview,
};

export default meta;
type Story = StoryObj<typeof BoardListPreview>;

export const Deafult: Story = {};
