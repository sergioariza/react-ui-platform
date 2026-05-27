import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarProvider,
  AppShell,
  SidebarRoot,
  SidebarHeader,
  SidebarBrand,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarNavItem,
  SidebarToggle,
  SidebarMobileTrigger,
  MainContent,
  TopBar,
  PageContent,
} from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Icons ─────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
      {count}
    </span>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState('dashboard')
    return (
      <SidebarProvider>
        <AppShell>
          <SidebarRoot>
            <SidebarHeader>
              <SidebarBrand>
                <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  DS
                </div>
                <span className="font-semibold text-gray-900 truncate">Design System</span>
              </SidebarBrand>
              <SidebarToggle />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarNavItem icon={<HomeIcon />} label="Dashboard" active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
                <SidebarNavItem icon={<InboxIcon />} label="Inbox" active={active === 'inbox'} onClick={() => setActive('inbox')} badge={<Badge count={4} />} />
                <SidebarNavItem icon={<BarChartIcon />} label="Analytics" active={active === 'analytics'} onClick={() => setActive('analytics')} />
              </SidebarGroup>

              <SidebarGroup label="Manage">
                <SidebarNavItem icon={<UsersIcon />} label="Users" active={active === 'users'} onClick={() => setActive('users')} />
                <SidebarNavItem icon={<SettingsIcon />} label="Settings" active={active === 'settings'} onClick={() => setActive('settings')} />
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-sm font-medium text-gray-900">John Doe</span>
                  <span className="truncate text-xs text-gray-500">john.doe@test.com</span>
                </div>
              </div>
            </SidebarFooter>
          </SidebarRoot>

          <MainContent>
            <TopBar>
              <SidebarMobileTrigger />
              <h1 className="text-base font-semibold text-gray-900 capitalize">{active}</h1>
            </TopBar>
            <PageContent>
              <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
                Page content — <strong className="capitalize">{active}</strong>
              </div>
            </PageContent>
          </MainContent>
        </AppShell>
      </SidebarProvider>
    )
  },
}

export const DefaultCollapsed: Story = {
  render: () => {
    const [active, setActive] = React.useState('dashboard')
    return (
      <SidebarProvider defaultCollapsed>
        <AppShell>
          <SidebarRoot>
            <SidebarHeader>
              <SidebarBrand>
                <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  DS
                </div>
                <span className="font-semibold text-gray-900 truncate">Design System</span>
              </SidebarBrand>
              <SidebarToggle />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarNavItem icon={<HomeIcon />} label="Dashboard" active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
                <SidebarNavItem icon={<InboxIcon />} label="Inbox" active={active === 'inbox'} onClick={() => setActive('inbox')} />
                <SidebarNavItem icon={<BarChartIcon />} label="Analytics" active={active === 'analytics'} onClick={() => setActive('analytics')} />
                <SidebarNavItem icon={<UsersIcon />} label="Users" active={active === 'users'} onClick={() => setActive('users')} />
                <SidebarNavItem icon={<SettingsIcon />} label="Settings" active={active === 'settings'} onClick={() => setActive('settings')} />
              </SidebarGroup>
            </SidebarContent>
          </SidebarRoot>

          <MainContent>
            <TopBar>
              <h1 className="text-base font-semibold text-gray-900 capitalize">{active}</h1>
            </TopBar>
            <PageContent>
              <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
                Sidebar starts collapsed — click the chevron to expand.
              </div>
            </PageContent>
          </MainContent>
        </AppShell>
      </SidebarProvider>
    )
  },
}
