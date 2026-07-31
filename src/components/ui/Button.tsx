import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-chili text-paper hover:bg-ink shadow-[0_6px_0_0_#0D1120] hover:shadow-[0_3px_0_0_#0D1120] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none',
  secondary: 'bg-gold text-ink hover:bg-gold-300 shadow-[0_6px_0_0_#825B09] hover:shadow-[0_3px_0_0_#825B09] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none',
  ghost: 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-paper',
}

const sizes = {
  md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm',
  lg: 'px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
