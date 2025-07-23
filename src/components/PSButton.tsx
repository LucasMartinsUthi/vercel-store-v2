'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'
import { Buttons3 } from './Typography'

interface PSButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  onClick?: () => void
}

const PSButton = ({ label, icon, variant = 'primary', onClick }: PSButtonProps) => {
  const baseClasses =
    'flex items-center gap-2 px-4 py-1.5 rounded-md hover:opacity-90 active:scale-[.97] transition cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none'

  const variantClasses = clsx({
    'border border-[#80819166] text-[#808191] bg-white dark:bg-white/10 focus-visible:ring-[#80819166]': variant === 'primary',
    'text-[#619CE4] bg-[#619CE433] focus-visible:ring-[#619CE433]': variant === 'secondary',
  })

  return (
    <button type="button" className={clsx(baseClasses, variantClasses)} aria-pressed="false" onClick={onClick}>
      <Buttons3>{label}</Buttons3>
      {icon}
    </button>
  )
}

export default PSButton
