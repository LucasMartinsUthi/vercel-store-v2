import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return <div className={`space-y-6 h-fit ${className}`}>{children}</div>
}
