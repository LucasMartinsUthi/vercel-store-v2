import { useSession } from 'next-auth/react'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'

type AuthenticatedQueryOptions<TData, TError = HttpError> = Omit<UseQueryOptions<TData, TError>, 'enabled'> & {
  enabled?: boolean
}

export function useAuthenticatedQuery<TData, TError = HttpError>(
  options: AuthenticatedQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return useQuery({
    ...options,
    enabled: isAuthenticated && options.enabled !== false,
    retry: (failureCount, error) => {
      if (error instanceof HttpError && error.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}
