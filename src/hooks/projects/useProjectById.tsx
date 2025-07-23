import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabProjectById } from '@/lib/projects'
import { GetProjectDto } from '@/dtos/projects/GetProject.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useProjectById(id: string): UseQueryResult<GetProjectDto | null, HttpError> {
  return useAuthenticatedQuery<GetProjectDto | null, HttpError>({
    queryKey: ['project', id],
    queryFn: ({ signal }) => fetchGitLabProjectById(id, signal),
    meta: { friendlyName: 'Project details' },
  })
}
