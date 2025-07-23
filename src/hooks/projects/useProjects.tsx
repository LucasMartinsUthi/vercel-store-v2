import { UseQueryResult } from '@tanstack/react-query'
import { fetchGitLabProjects, ProjectsResponse } from '@/lib/projects'
import { HttpError } from '@/utils/types/error'
import { ITEMS_PER_PAGE } from '@/utils/constants/ui'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useProjects(page = 1, sort = 'desc', perPage = ITEMS_PER_PAGE): UseQueryResult<ProjectsResponse, HttpError> {
  return useAuthenticatedQuery<ProjectsResponse, HttpError>({
    queryKey: ['projects', page, perPage, sort],
    queryFn: ({ signal }) => fetchGitLabProjects(page, perPage, signal, sort),
    meta: { friendlyName: 'Projects list' },
  })
}
