import { ReactNode } from 'react'
import Skeleton from './Skeleton'
import EmptyList from './EmptyList'

interface LoadingStateProps {
  isLoading: boolean
  isError?: boolean
  error?: unknown
  isEmpty?: boolean
  emptyMessage?: string
  loadingComponent?: ReactNode
  children: ReactNode
}

export default function LoadingState({
  isLoading,
  isError,
  error,
  isEmpty,
  emptyMessage = 'No data found',
  loadingComponent,
  children,
}: LoadingStateProps) {
  if (isLoading) {
    return loadingComponent || <Skeleton height={200} />
  }

  if (isError) {
    return <EmptyList message={error instanceof Error ? error.message : 'Failed to load data'} />
  }

  if (isEmpty) {
    return <EmptyList message={emptyMessage} />
  }

  return <>{children}</>
}
