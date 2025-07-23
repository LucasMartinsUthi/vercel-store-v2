import axios from '@/config/axios'
import { handleHttpError } from '@/utils/handlers/httpError'
import { GitLabEndpoints } from '@/utils/constants/endpoints'
import { GetProjectUsersDto } from '@/dtos/users/GetProjectUsers.dto'

/**
 * Fetches the list of users for a given GitLab project.
 *
 * @param projectId - The ID of the GitLab project.
 * @param signal - Optional AbortSignal to cancel the request.
 * @returns A promise that resolves to the project users data or null if an error occurs.
 */
export async function fetchGitLabUsers(projectId: number | string, signal?: AbortSignal): Promise<GetProjectUsersDto | null> {
  try {
    const response = await axios.get<GetProjectUsersDto | null>(GitLabEndpoints.GET_USERS(projectId), {
      signal,
    })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Users list', err)
    throw httpError
  }
}
