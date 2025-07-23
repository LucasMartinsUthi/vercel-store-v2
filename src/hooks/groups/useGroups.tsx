import { UseQueryResult } from '@tanstack/react-query'
import { fetchGitLabGroups, GroupsResponse } from '@/lib/groups'
import { HttpError } from '@/utils/types/error'
import { ITEMS_PER_PAGE } from '@/utils/constants/ui'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGroups(page = 1, perPage = ITEMS_PER_PAGE): UseQueryResult<GroupsResponse, HttpError> {
  return useAuthenticatedQuery<GroupsResponse, HttpError>({
    queryKey: ['groups', page, perPage],
    queryFn: ({ signal }) => fetchGitLabGroups(page, perPage, signal),
    meta: { friendlyName: 'Groups list' },
  })
}
