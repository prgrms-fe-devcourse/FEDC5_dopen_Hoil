import Grass from '@/components/Grass';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grass> = {
  component: Grass,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Grass>;

export const Deafult: Story = {
  args: {},
};
