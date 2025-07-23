import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabGroupMembers } from '@/lib/groups'
import { ListGroupMembersDto } from '@/dtos/groups/ListGroupMembers.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGroupMembers(id: string): UseQueryResult<ListGroupMembersDto | null, HttpError> {
  return useAuthenticatedQuery<ListGroupMembersDto | null, HttpError>({
    queryKey: ['group-members', id],
    queryFn: ({ signal }) => fetchGitLabGroupMembers(id, signal),
    meta: { friendlyName: 'Group members' },
  })
}
