import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border bg-white text-sm text-gray-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus-visible:ring-blue-600',
        error: 'border-red-500 focus-visible:ring-red-500 pr-10',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  label?: string
  hint?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      hint,
      error,
      prefix,
      suffix,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const hasError = !!error
    const resolvedVariant = hasError ? 'error' : variant

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && (
            <span className="pointer-events-none absolute left-3 flex items-center text-gray-400">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            aria-invalid={hasError}
            className={cn(
              inputVariants({ variant: resolvedVariant, size }),
              prefix && 'pl-9',
              suffix && 'pr-9',
              className
            )}
            {...props}
          />

          {suffix && !hasError && (
            <span className="pointer-events-none absolute right-3 flex items-center text-gray-400">
              {suffix}
            </span>
          )}

          {hasError && (
            <span className="pointer-events-none absolute right-3 flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>

        {(hint || error) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-hint`}
            className={cn(
              'text-xs',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
