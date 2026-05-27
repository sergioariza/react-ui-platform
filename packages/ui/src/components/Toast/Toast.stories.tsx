import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { toast, Toaster } from './Toast'
import { Button } from '../Button/Button'

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Story />
        <Toaster richColors position="bottom-right" />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('Event has been created.')}>Show toast</Button>
  ),
}

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success('Profile updated successfully.')}>Success</Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button variant="destructive" onClick={() => toast.error('Failed to save changes.')}>Error</Button>
  ),
}

export const Warning: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.warning('Your session will expire in 5 minutes.')}>Warning</Button>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        toast('Scheduled maintenance', {
          description: 'The system will be unavailable on Sunday from 2–4 AM.',
        })
      }
    >
      With description
    </Button>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Item deleted', {
          action: { label: 'Undo', onClick: () => toast.success('Deletion undone!') },
        })
      }
    >
      With action
    </Button>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast('Default message')}>Default</Button>
      <Button onClick={() => toast.success('Success!')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Error!')}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning('Warning!')}>Warning</Button>
      <Button variant="secondary" onClick={() => toast.info('Info message')}>Info</Button>
      <Button variant="ghost" onClick={() => toast.loading('Loading…')}>Loading</Button>
    </div>
  ),
}
