import MyModal from '@/components/common/MyModal';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MyModal> = {
  component: MyModal,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MyModal>;

export const Deafult: Story = {
  args: {},
};
