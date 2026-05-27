import type { Meta, StoryObj } from '@storybook/react'
import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

type Person = { id: number; name: string; email: string; role: string; status: 'active' | 'inactive' }

const columns: ColumnDef<Person>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        ref={(el) => {
          if (el) el.indeterminate = table.getIsSomePageRowsSelected()
        }}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="rounded border-gray-300"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="rounded border-gray-300"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  { accessorKey: 'email', header: 'Email', enableSorting: true },
  { accessorKey: 'role', header: 'Role', enableSorting: true },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true,
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        row.original.status === 'active'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-600'
      }`}>
        {row.original.status}
      </span>
    ),
  },
]

const data: Person[] = [
  { id: 1, name: 'Sergio Ariza', email: 'sergio@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Ana Vaz', email: 'ana@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: 5, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
  { id: 6, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'active' },
]

const meta = {
  title: 'Components/DataTable',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} pageSize={4} />,
}

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} />,
}
