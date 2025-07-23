import { ReactNode } from 'react'
import Skeleton from './Skeleton'
import EmptyList from './EmptyList'
import { ITEMS_PER_PAGE } from '@/utils/constants/ui'

interface ResponsiveGridProps<T> {
  items: T[]
  isPending: boolean
  isError?: boolean
  error?: unknown
  renderItem: (item: T) => ReactNode
  emptyMessage?: string
  skeletonHeight?: number
  className?: string
}

export default function ResponsiveGrid<T extends { id: string | number }>({
  items,
  isPending,
  isError,
  error,
  renderItem,
  emptyMessage = 'No items found',
  skeletonHeight = 200,
  className = 'grid justify-center grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6',
}: ResponsiveGridProps<T>) {
  if (isError) {
    return <EmptyList message={error instanceof Error ? error.message : 'Failed to load items'} />
  }

  const hasNoItems = items.length === 0 && !isPending

  if (hasNoItems) {
    return <EmptyList message={emptyMessage} />
  }

  return (
    <div className={className}>
      {isPending
        ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => <Skeleton key={idx} height={skeletonHeight} />)
        : items.map((item) => <div key={item.id}>{renderItem(item)}</div>)}
    </div>
  )
}
