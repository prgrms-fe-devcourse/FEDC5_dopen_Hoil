import BoardList from '@/components/common/BoardList';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BoardList> = {
  component: BoardList,
};

export default meta;
type Story = StoryObj<typeof BoardList>;

export const Deafult: Story = {};
