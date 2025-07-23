import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { HttpError } from '@/utils/types/error'
import { toast } from 'react-toastify'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error: unknown, query) {
      console.error('[Query error]', query.queryKey, error)

      if (error instanceof HttpError && error.status === 404) return

      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    },
  }),
  mutationCache: new MutationCache({
    onError(error) {
      console.error('[Mutation error]', error)
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    },
  }),
  defaultOptions: {
    queries: {
      retry(failureCount, error: unknown) {
        if (error instanceof HttpError && error.status >= 400 && error.status < 500 && error.status !== 429) {
          return false
        }
        return failureCount < 2
      },
      staleTime: 30_000,
    },
  },
})
