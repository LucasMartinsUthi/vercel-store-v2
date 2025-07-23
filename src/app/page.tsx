import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { queryClient } from '@/config/queryClient'
import DashboardView from './dashboard'

export default async function ProjectsRoot() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  )
}
