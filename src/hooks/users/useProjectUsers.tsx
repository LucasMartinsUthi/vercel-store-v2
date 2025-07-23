import { UseQueryResult } from '@tanstack/react-query'
import { fetchGitLabUsers } from '@/lib/users'
import { HttpError } from '@/utils/types/error'
import { GetProjectUsersDto } from '@/dtos/users/GetProjectUsers.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useProjectMembers(id: string): UseQueryResult<GetProjectUsersDto | null, HttpError> {
  return useAuthenticatedQuery<GetProjectUsersDto | null, HttpError>({
    queryKey: ['project-users', id],
    queryFn: ({ signal }) => fetchGitLabUsers(id, signal),
    meta: { friendlyName: 'Project users' },
  })
}
