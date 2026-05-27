import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { DateRange } from 'react-day-picker'
import { DatePicker, DateRangePicker } from './DatePicker'

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const WithDisabledPastDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Future dates only"
        disabledDays={(d) => d <= yesterday}
      />
    )
  },
}

export const RangePicker: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return <DateRangePicker value={range} onChange={setRange} />
  },
}

export const Disabled: Story = {
  render: () => <DatePicker disabled />,
}
