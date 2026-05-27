import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { DayPicker, type DateRange } from 'react-day-picker'
import { cn } from '../../lib/utils'
import { Button } from '../Button/Button'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export interface DatePickerProps {
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  disabledDays?: (date: Date) => boolean
}

function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled,
  disabledDays,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn('w-56 justify-start text-left font-normal', !value && 'text-gray-400')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-gray-400" aria-hidden="true">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
          </svg>
          {value ? formatDate(value) : placeholder}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 rounded-xl border border-gray-200 bg-white p-3 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(day) => {
              onChange?.(day)
              if (day) setOpen(false)
            }}
            disabled={disabledDays}
            classNames={{
              months: 'flex flex-col sm:flex-row gap-4',
              month: 'flex flex-col gap-4',
              caption: 'flex justify-center relative items-center',
              caption_label: 'text-sm font-medium text-gray-900',
              nav: 'flex items-center gap-1',
              nav_button: 'h-7 w-7 bg-transparent p-0 text-gray-500 hover:text-gray-900',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse',
              head_row: 'flex',
              head_cell: 'text-gray-400 rounded-md w-9 font-normal text-xs text-center',
              row: 'flex w-full mt-2',
              cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
              day: 'h-9 w-9 p-0 font-normal rounded-md hover:bg-gray-100 aria-selected:opacity-100',
              day_selected: 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
              day_today: 'bg-gray-100 text-gray-900',
              day_outside: 'text-gray-300',
              day_disabled: 'text-gray-300 opacity-50',
              day_hidden: 'invisible',
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export interface DateRangePickerProps {
  value?: DateRange | undefined
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
}

function DateRangePicker({
  value,
  onChange,
  placeholder = 'Pick a date range',
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const label = value?.from
    ? value.to
      ? `${formatDate(value.from)} – ${formatDate(value.to)}`
      : formatDate(value.from)
    : placeholder

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn('w-72 justify-start text-left font-normal', !value?.from && 'text-gray-400')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-gray-400" aria-hidden="true">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
          </svg>
          {label}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 rounded-xl border border-gray-200 bg-white p-3 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <DayPicker
            mode="range"
            required={false}
            selected={value}
            onSelect={onChange ?? (() => undefined)}
            numberOfMonths={2}
            classNames={{
              months: 'flex flex-col sm:flex-row gap-4',
              month: 'flex flex-col gap-4',
              caption: 'flex justify-center relative items-center',
              caption_label: 'text-sm font-medium text-gray-900',
              nav: 'flex items-center gap-1',
              nav_button: 'h-7 w-7 bg-transparent p-0 text-gray-500 hover:text-gray-900',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse',
              head_row: 'flex',
              head_cell: 'text-gray-400 rounded-md w-9 font-normal text-xs text-center',
              row: 'flex w-full mt-2',
              cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
              day: 'h-9 w-9 p-0 font-normal rounded-md hover:bg-gray-100 aria-selected:opacity-100',
              day_selected: 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white',
              day_range_middle: 'bg-blue-50 text-blue-900 rounded-none',
              day_range_start: 'bg-blue-600 text-white rounded-l-md',
              day_range_end: 'bg-blue-600 text-white rounded-r-md',
              day_today: 'bg-gray-100 text-gray-900',
              day_outside: 'text-gray-300',
              day_disabled: 'text-gray-300 opacity-50',
              day_hidden: 'invisible',
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { DatePicker, DateRangePicker }
