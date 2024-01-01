import GuestProfile from '@/pages/MainPage/GuestProfile';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GuestProfile> = {
  component: GuestProfile,
};

export default meta;
type Story = StoryObj<typeof GuestProfile>;

export const Deafult: Story = {};
