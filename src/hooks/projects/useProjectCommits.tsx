import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabProjectCommits } from '@/lib/projects'
import { ListProjectCommitsDto } from '@/dtos/projects/ListProjectCommits.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useProjectCommits(id: string, since: string, until: string): UseQueryResult<ListProjectCommitsDto | null, HttpError> {
  return useAuthenticatedQuery<ListProjectCommitsDto | null, HttpError>({
    queryKey: ['project-commits', id, since, until],
    queryFn: ({ signal }) => fetchGitLabProjectCommits(id, since, until, signal),
    meta: { friendlyName: 'Project Commits' },
  })
}
