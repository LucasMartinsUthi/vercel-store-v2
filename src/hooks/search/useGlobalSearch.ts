import { UseQueryResult } from '@tanstack/react-query'
import { performGlobalSearch, SearchResponse } from '@/lib/search'
import { HttpError } from '@/utils/types/error'
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery'

export function useGlobalSearch(
  query: string,
  type: 'all' | 'groups' | 'projects' = 'all',
  maxResults = 5,
  enabled = true
): UseQueryResult<SearchResponse, HttpError> {
  return useAuthenticatedQuery<SearchResponse, HttpError>({
    queryKey: ['globalSearch', query, type, maxResults],
    queryFn: ({ signal }) => performGlobalSearch(query, type, maxResults, signal),
    enabled: enabled && query.trim().length >= 2,
    staleTime: 30 * 1000,
    meta: { friendlyName: 'Global search' },
  })
}
