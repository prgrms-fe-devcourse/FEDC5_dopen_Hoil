import PageHeader from '@/components/PageHeader';
import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  decorators: [withRouter],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    pageName: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Deafult: Story = {
  args: {
    width: '428px',
    height: '80px',
    pageName: '테스트',
  },
};
