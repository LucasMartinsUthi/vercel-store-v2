import axios from '@/config/axios'
import { GlobalSearchDto } from '@/dtos/search/GlobalSearch.dto'
import { GitLabEndpoints } from '@/utils/constants/endpoints'
import { handleHttpError } from '@/utils/handlers/httpError'

export type SearchResponse = GlobalSearchDto

/**
 * Performs a global search across projects and groups
 * @param query The search query
 * @param type The type of search (all, groups, projects)
 * @param maxResults Maximum number of results per category
 * @param signal AbortSignal for cancelling the request
 * @returns A promise that resolves to search results
 */
export async function performGlobalSearch(
  query: string,
  type: 'all' | 'groups' | 'projects' = 'all',
  maxResults = 5,
  signal?: AbortSignal
): Promise<SearchResponse> {
  try {
    if (!query || query.trim().length < 2) {
      return {
        query: query || '',
        totalResults: 0,
        groups: [],
        projects: [],
      }
    }

    const response = await axios.get<SearchResponse>(GitLabEndpoints.GLOBAL_SEARCH, {
      params: {
        q: query.trim(),
        type,
        max_results: maxResults,
      },
      signal,
    })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Global search', err)
    throw httpError
  }
}
