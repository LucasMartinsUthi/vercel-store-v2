import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabGroupCommits } from '@/lib/groups'
import { ListGroupCommitsDto } from '@/dtos/groups/ListGroupCommits.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGroupCommits(id: string, since: string, until: string): UseQueryResult<ListGroupCommitsDto | null, HttpError> {
  return useAuthenticatedQuery<ListGroupCommitsDto | null, HttpError>({
    queryKey: ['group-commits', id, since, until],
    queryFn: ({ signal }) => fetchGitLabGroupCommits(id, since, until, signal),
    meta: { friendlyName: 'Group commits' },
  })
}
