import type { Preview } from '@storybook/react';
import {theme} from "../src/theme"

const preview: Preview = {
  parameters: {
    chakra:{
      theme,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
