'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
}

const Root = ({ children, className }: Props) => {
  return <div className={clsx('rounded-lg bg-white shadow-md overflow-hidden w-full', 'dark:bg-neutral-900', className)}>{children}</div>
}

const Header = ({ children }: Props) => {
  return (
    <div className="h-36 bg-gradient-to-tr from-neutral-400 to-neutral-200 dark:from-neutral-700 dark:to-neutral-500 flex flex-col justify-end p-4 space-y-2">
      {children}
    </div>
  )
}

const Metadata = ({ children }: Props) => {
  return <div className="px-4 py-4 flex gap-2 text-sm">{children}</div>
}

const ActionButtons = ({ children }: Props) => {
  return <div className="px-4 pb-4 flex items-center gap-3">{children}</div>
}

export const Card = { Root, Header, Metadata, ActionButtons }
