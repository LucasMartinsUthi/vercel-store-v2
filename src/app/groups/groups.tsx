'use client'

import { useEffect } from 'react'

import PageWrapper from '@/components/PageWrapper'
import ResponsiveGrid from '@/components/ResponsiveGrid'
import Pagination, { usePagination } from '@/components/Pagination'

import GroupCard from './components/GroupCard'

import { useGroups } from '@/hooks/groups/useGroups'

export default function GroupsView() {
  const { page, setTotalItems } = usePagination()
  const { data, isPending, error, isError } = useGroups(page)
  const groups = data?.groups || []

  useEffect(() => {
    if (data?.groups) {
      setTotalItems(data.total)
    }
  }, [data, setTotalItems])

  return (
    <PageWrapper className="mt-4">
      <ResponsiveGrid
        items={groups}
        isPending={isPending}
        isError={isError}
        error={error}
        renderItem={(group) => <GroupCard key={group.id} group={group} />}
        emptyMessage="No groups found"
        skeletonHeight={160}
      />

      <Pagination />
    </PageWrapper>
  )
}
