import GrassCell from '@/components/Grass/GrassCell';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GrassCell> = {
  component: GrassCell,
  argTypes: {
    percentage: {
      control: 'radio',
      options: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GrassCell>;

export const Deafult: Story = {
  args: {},
};
