import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { useSession } from 'next-auth/react'
import { fetchGitLabMonthlyActivity } from '@/lib/analytics'
import { MonthlyActivityDto } from '@/dtos/analytics/MonthlyActivity.dto'

export function useMonthlyActivity(): UseQueryResult<MonthlyActivityDto[], HttpError> {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return useQuery<MonthlyActivityDto[], HttpError>({
    queryKey: ['monthly-activity'],
    queryFn: ({ signal }) => fetchGitLabMonthlyActivity(signal),
    meta: { friendlyName: 'Monthly activity' },
    throwOnError: false,
    enabled: isAuthenticated,
  })
}
