import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonSize = "sm" | "md" | "lg"

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs md:text-[13px] gap-1.5",
  md: "px-3 py-2 text-sm md:text-[14px] gap-2.5",
  lg: "px-8 py-4 text-sm md:text-[14px] gap-3",
}

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "w-7 h-7",
  md: "w-8 h-8",
  lg: "w-10 h-10",
}

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  children: ReactNode
}

export function PrimaryButton({
  size = "md",
  loading = false,
  loadingText,
  disabled,
  className = "",
  children,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`
        relative inline-flex items-center rounded-xl font-semibold text-white
        transition-all duration-200 ease-out
        bg-accent hover:bg-accent-light hover:scale-[1.01] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        disabled:hover:bg-accent
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <span className="inline-flex items-center gap-2.5">{children}</span>
      )}
    </button>
  )
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  children: ReactNode
}

export function IconButton({
  size = "md",
  disabled,
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-lg shrink-0
        text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]
        transition-colors duration-200
        disabled:opacity-30 disabled:cursor-not-allowed
        ${iconSizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  active?: boolean
  children: ReactNode
}

export function GhostButton({
  size = "md",
  active = false,
  disabled,
  className = "",
  children,
  ...props
}: GhostButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        inline-flex items-center rounded-md
        font-medium transition-colors duration-200
        disabled:opacity-30 disabled:cursor-not-allowed
        ${
          active
            ? "text-accent"
            : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
        }
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
