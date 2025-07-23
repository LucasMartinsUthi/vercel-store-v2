import { UseQueryResult } from '@tanstack/react-query'
import { fetchGitLabGroupById } from '@/lib/groups'
import { GitLabGroupDto } from '@/dtos/gitlab/GitLabGroup.dto'
import { HttpError } from '@/utils/types/error'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGroupById(id: string): UseQueryResult<GitLabGroupDto | null, HttpError> {
  return useAuthenticatedQuery<GitLabGroupDto | null, HttpError>({
    queryKey: ['group', id],
    queryFn: ({ signal }) => fetchGitLabGroupById(id, signal),
    meta: { friendlyName: 'Group details' },
  })
}
