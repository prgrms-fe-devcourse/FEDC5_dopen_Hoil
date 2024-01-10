import Footer from '@/components/Footer';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof Footer> = {
  component: Footer,
  decorators: [withRouter],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '80px',
  },
};
