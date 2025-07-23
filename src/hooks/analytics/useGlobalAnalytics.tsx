import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { useSession } from 'next-auth/react'
import { fetchGitLabGlobalAnalytics } from '@/lib/analytics'
import { GlobalAnalyticsDto } from '@/dtos/analytics/GlobalAnalytics.dto'

export function useGlobalAnalytics(): UseQueryResult<GlobalAnalyticsDto, HttpError> {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return useQuery<GlobalAnalyticsDto, HttpError>({
    queryKey: ['global-analytics'],
    queryFn: ({ signal }) => fetchGitLabGlobalAnalytics(signal),
    meta: { friendlyName: 'Global analytics' },
    throwOnError: false,
    enabled: isAuthenticated,
  })
}
