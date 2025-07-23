import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import ProjectsView from './projects'
import { queryClient } from '@/config/queryClient'

export default async function ProjectsPage() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsView />
    </HydrationBoundary>
  )
}
