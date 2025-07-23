import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import GroupsView from './groups'
import { queryClient } from '@/config/queryClient'

export default async function GroupsPage() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupsView />
    </HydrationBoundary>
  )
}
