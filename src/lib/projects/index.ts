import axios from '@/config/axios'

import { GetProjectDto } from '@/dtos/projects/GetProject.dto'
import { ListProjectsDto } from '@/dtos/projects/ListProjects.dto'

import { handleHttpError } from '@/utils/handlers/httpError'
import { GitLabEndpoints } from '@/utils/constants/endpoints'
import { ListProjectMembersDto } from '@/dtos/projects/ListProjectMembers.dto'
import { ListProjectCommitsDto } from '@/dtos/projects/ListProjectCommits.dto'

export type ProjectsResponse = {
  projects: ListProjectsDto[]
  total: number
  page: number
  perPage: number
}

/**
 * Fetches a paginated list of projects from GitLab.
 * @param page The page number.
 * @param perPage The number of items per page.
 * @returns A promise that resolves to an array of Project objects.
 * @throws Error if the request fails.
 */
export async function fetchGitLabProjects(page = 1, perPage = 20, signal?: AbortSignal, sort = 'desc'): Promise<ProjectsResponse> {
  try {
    const response = await axios.get<ProjectsResponse>(GitLabEndpoints.GET_PROJECTS, {
      params: { page, per_page: perPage, sort_order: sort },
      signal,
    })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Projects list', err)
    throw httpError
  }
}

/**
 * Fetches a single project from GitLab by its ID.
 * @param id The ID of the project to fetch.
 * @returns A promise that resolves to a Project object.
 * @throws Error if the request fails.
 */
export async function fetchGitLabProjectById(id: string | number, signal?: AbortSignal): Promise<GetProjectDto | null> {
  try {
    const response = await axios.get<GetProjectDto>(GitLabEndpoints.GET_PROJECT(id), { signal })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Project details', err)
    throw httpError
  }
}

/**
 * Fetches a list of project members for a specific project.
 * @param projectId The ID of the project.
 * @returns A promise that resolves to an array of project members.
 * @throws Error if the request fails.
 */
export async function fetchGitLabProjectMembers(projectId: string | number, signal?: AbortSignal): Promise<ListProjectMembersDto | null> {
  try {
    const response = await axios.get<ListProjectMembersDto>(GitLabEndpoints.GET_PROJECT_MEMBERS(projectId), { signal })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Project members', err)
    throw httpError
  }
}

/**
 * Fetches a list of commits for a specific project.
 * @param projectId The ID of the project.
 * @returns A promise that resolves to an array of commits.
 * @throws Error if the request fails.
 */
export async function fetchGitLabProjectCommits(
  projectId: string | number,
  since: string,
  until: string,
  signal?: AbortSignal
): Promise<ListProjectCommitsDto | null> {
  try {
    const response = await axios.get<ListProjectCommitsDto>(GitLabEndpoints.GET_PROJECT_COMMITS(projectId, since, until), { signal })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Project commits', err)
    throw httpError
  }
}
