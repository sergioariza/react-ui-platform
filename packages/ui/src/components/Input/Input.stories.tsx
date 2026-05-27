import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Enter text…' },
}

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com', type: 'email' },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'Here it goes the username',
    hint: 'Only letters, numbers and underscores.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
}

export const WithPrefix: Story = {
  args: {
    label: 'Website',
    placeholder: 'yoursite.com',
    prefix: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10 1a9 9 0 1 0 0 18A9 9 0 0 0 10 1ZM6.27 14.87A7 7 0 0 1 3.06 10H5c.05 1.6.38 3.07.9 4.3-.56-.1-1.1-.25-1.63-.43Zm-3.21-6.87a7 7 0 0 1 3.21-3.87c-.52-.18-1.07-.33-1.63-.43A7 7 0 0 0 3.06 8Zm13.88 0h-1.94a15.7 15.7 0 0 0-.9-4.3c.56.1 1.1.25 1.63.43A7 7 0 0 1 16.94 8Zm-3.21 6.87c.52.18 1.07.33 1.63.43A7 7 0 0 0 16.94 12h-1.94a15.7 15.7 0 0 1-.9 4.3l.63-.43ZM10 17c-.83 0-1.96-1.8-2.44-5H12.44C11.96 15.2 10.83 17 10 17Zm-2.56-7c.1-1.7.54-3.2 1.19-4.3.43-.73.88-1.2 1.37-1.2s.94.47 1.37 1.2c.65 1.1 1.09 2.6 1.19 4.3H7.44ZM7.44 12c.48 3.2 1.61 5 2.56 5s2.08-1.8 2.56-5H7.44ZM13.73 14.87c-.53.18-1.07.33-1.63.43.52-1.23.85-2.7.9-4.3h1.94a7 7 0 0 1-1.21 3.87Z" />
      </svg>
    ),
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { label: 'Disabled field', defaultValue: 'Cannot edit this', disabled: true },
}
