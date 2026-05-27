import * as React from 'react'
import { cn } from '../../lib/utils'

// ── Context ───────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within <SidebarProvider>')
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface SidebarProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

// ── App Shell ─────────────────────────────────────────────────────────────────

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function AppShell({ children, className, ...props }: AppShellProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden bg-gray-50', className)} {...props}>
      {children}
    </div>
  )
}

// ── Sidebar Root ──────────────────────────────────────────────────────────────

interface SidebarRootProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function SidebarRoot({ children, className, ...props }: SidebarRootProps) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar()

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden bg-white border-r border-gray-200 transition-all duration-300 md:relative md:translate-x-0',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

// ── Sidebar Header ────────────────────────────────────────────────────────────

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarHeader({ children, className, ...props }: SidebarHeaderProps) {
  const { collapsed } = useSidebar()
  return (
    <div
      className={cn(
        'flex h-16 items-center overflow-hidden border-b border-gray-200',
        collapsed ? 'justify-center px-2' : 'px-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Sidebar Brand ─────────────────────────────────────────────────────────────

interface SidebarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarBrand({ children, className, ...props }: SidebarBrandProps) {
  const { collapsed } = useSidebar()
  if (collapsed) return null
  return (
    <div
      className={cn('flex flex-1 items-center gap-2 min-w-0 overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Sidebar Footer ────────────────────────────────────────────────────────────

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarFooter({ children, className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn('mt-auto border-t border-gray-200 p-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Sidebar Content ───────────────────────────────────────────────────────────

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarContent({ children, className, ...props }: SidebarContentProps) {
  return (
    <div className={cn('flex flex-col gap-1 overflow-y-auto p-2 flex-1', className)} {...props}>
      {children}
    </div>
  )
}

// ── Sidebar Group ─────────────────────────────────────────────────────────────

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  label?: string
}

function SidebarGroup({ children, label, className, ...props }: SidebarGroupProps) {
  const { collapsed } = useSidebar()
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {label && !collapsed && (
        <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

// ── Sidebar Nav Item ──────────────────────────────────────────────────────────

interface SidebarNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  badge?: React.ReactNode
}

function SidebarNavItem({ icon, label, active, badge, className, ...props }: SidebarNavItemProps) {
  const { collapsed } = useSidebar()

  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      className={cn(
        'group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        collapsed && 'justify-center px-2',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={cn('flex-shrink-0', active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600')}>
          {icon}
        </span>
      )}
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      {!collapsed && badge && <span>{badge}</span>}
    </button>
  )
}

// ── Sidebar Toggle ────────────────────────────────────────────────────────────

interface SidebarToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

function SidebarToggle({ className, ...props }: SidebarToggleProps) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <button
      type="button"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        'hidden md:flex shrink-0 items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors',
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('transition-transform duration-300', collapsed ? 'rotate-180' : '')}
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  )
}

// ── Mobile Trigger ────────────────────────────────────────────────────────────

interface SidebarMobileTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

function SidebarMobileTrigger({ className, ...props }: SidebarMobileTriggerProps) {
  const { setMobileOpen } = useSidebar()

  return (
    <button
      type="button"
      aria-label="Open navigation"
      onClick={() => setMobileOpen(true)}
      className={cn(
        'flex md:hidden items-center justify-center h-9 w-9 rounded-md text-gray-600 hover:bg-gray-100',
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  )
}

// ── Main Content ──────────────────────────────────────────────────────────────

interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function MainContent({ children, className, ...props }: MainContentProps) {
  return (
    <div className={cn('flex flex-1 flex-col overflow-hidden', className)} {...props}>
      {children}
    </div>
  )
}

// ── Top Bar ───────────────────────────────────────────────────────────────────

interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function TopBar({ children, className, ...props }: TopBarProps) {
  return (
    <header
      className={cn('flex h-16 items-center border-b border-gray-200 bg-white px-4 gap-3', className)}
      {...props}
    >
      {children}
    </header>
  )
}

// ── Page Content ──────────────────────────────────────────────────────────────

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function PageContent({ children, className, ...props }: PageContentProps) {
  return (
    <main className={cn('flex-1 overflow-y-auto p-6', className)} {...props}>
      {children}
    </main>
  )
}

export {
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
  useSidebar,
}
