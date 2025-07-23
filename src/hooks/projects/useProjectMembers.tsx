import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabProjectMembers } from '@/lib/projects'
import { ListProjectMembersDto } from '@/dtos/projects/ListProjectMembers.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useProjectMembers(id: string): UseQueryResult<ListProjectMembersDto | null, HttpError> {
  return useAuthenticatedQuery<ListProjectMembersDto | null, HttpError>({
    queryKey: ['project-members', id],
    queryFn: ({ signal }) => fetchGitLabProjectMembers(id, signal),
    meta: { friendlyName: 'Project members' },
  })
}
