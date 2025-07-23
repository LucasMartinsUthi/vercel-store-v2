import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { useSession } from 'next-auth/react'
import { fetchGitLabMonthlyIssues } from '@/lib/analytics'
import { MonthlyIssuesDto } from '@/dtos/analytics/MonthlyIssues.dto'

export function useMonthlyIssues(): UseQueryResult<MonthlyIssuesDto[], HttpError> {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return useQuery<MonthlyIssuesDto[], HttpError>({
    queryKey: ['monthly-issues'],
    queryFn: ({ signal }) => fetchGitLabMonthlyIssues(signal),
    meta: { friendlyName: 'Monthly issues' },
    throwOnError: false,
    enabled: isAuthenticated,
  })
}
