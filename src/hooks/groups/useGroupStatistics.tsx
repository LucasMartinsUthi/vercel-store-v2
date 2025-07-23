import { UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { fetchGitLabGroupStatistics } from '@/lib/groups'
import { GroupProjectsStatisticsDto } from '@/dtos/groups/GroupProjectsStatistics.dto'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGroupStatistics(id: string): UseQueryResult<GroupProjectsStatisticsDto | null, HttpError> {
  return useAuthenticatedQuery<GroupProjectsStatisticsDto | null, HttpError>({
    queryKey: ['group-statistics', id],
    queryFn: ({ signal }) => fetchGitLabGroupStatistics(id, signal),
    meta: { friendlyName: 'Group statistics' },
  })
}
