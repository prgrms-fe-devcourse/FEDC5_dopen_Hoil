import OnlineUserProfil from '@/components/OnlineUserProfile';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OnlineUserProfil> = {
  component: OnlineUserProfil,
};

export default meta;
type Story = StoryObj<typeof OnlineUserProfil>;

export const Deafult: Story = {};
