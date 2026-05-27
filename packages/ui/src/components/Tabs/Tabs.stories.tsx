import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="rounded-lg border p-4 text-sm text-gray-600">
          Update your account details and email address here.
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="rounded-lg border p-4 text-sm text-gray-600">
          Change your password to keep your account secure.
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="rounded-lg border p-4 text-sm text-gray-600">
          Configure notifications and preferences.
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = React.useState('profile')
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-gray-500">Active: <strong>{tab}</strong></p>
        <Tabs value={tab} onValueChange={setTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="rounded-lg border p-4 text-sm text-gray-600">Manage your profile information.</div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="rounded-lg border p-4 text-sm text-gray-600">View invoices and manage subscriptions.</div>
          </TabsContent>
          <TabsContent value="team">
            <div className="rounded-lg border p-4 text-sm text-gray-600">Invite members and assign roles.</div>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
}

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="rounded-lg border p-4 text-sm text-gray-600">Currently active items.</div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="rounded-lg border p-4 text-sm text-gray-600">This tab is disabled.</div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="rounded-lg border p-4 text-sm text-gray-600">Archived items.</div>
      </TabsContent>
    </Tabs>
  ),
}
