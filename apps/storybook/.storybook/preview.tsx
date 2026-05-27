/// <reference types="vite/client" />
import type { Preview } from '@storybook/react'
import '../../../packages/ui/tailwind.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
