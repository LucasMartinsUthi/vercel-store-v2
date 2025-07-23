import axios from '@/config/axios'
import { GitLabGroupDto } from '@/dtos/gitlab/GitLabGroup.dto'
import { GroupProjectsStatisticsDto } from '@/dtos/groups/GroupProjectsStatistics.dto'
import { ListGroupCommitsDto } from '@/dtos/groups/ListGroupCommits.dto'
import { ListGroupMembersDto } from '@/dtos/groups/ListGroupMembers.dto'
import { ListGroupsDto } from '@/dtos/groups/ListGroups.dto'
import { GitLabEndpoints } from '@/utils/constants/endpoints'
import { handleHttpError } from '@/utils/handlers/httpError'

export type GroupsResponse = {
  groups: ListGroupsDto[]
  total: number
  page: number
  perPage: number
}

/**
 * Fetches a list of groups from GitLab matching the given query.
 * @param page The page number.
 * @param perPage The number of items per page.
 * @returns A promise that resolves to an array of Group objects.
 * @throws Error if the request fails.
 */
export async function fetchGitLabGroups(page = 1, perPage = 20, signal?: AbortSignal): Promise<GroupsResponse> {
  try {
    const response = await axios.get<GroupsResponse>(GitLabEndpoints.GET_GROUPS, {
      params: { page, per_page: perPage },
      signal,
    })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Groups list', err)
    throw httpError
  }
}

/**
 * Fetches a single group from GitLab by its ID.
 * @param id The ID of the group to fetch.
 * @returns A promise that resolves to a Group object.
 * @throws Error if the request fails.
 */
export async function fetchGitLabGroupById(id: string | number, signal?: AbortSignal): Promise<GitLabGroupDto | null> {
  try {
    const response = await axios.get<GitLabGroupDto>(GitLabEndpoints.GET_GROUP(id), { signal })

    return response.data
  } catch (err) {
    const httpError = handleHttpError('Group details', err)
    throw httpError
  }
}

/**
 * Fetches statistics for a GitLab group by its ID.
 * @param id The ID of the group.
 * @returns A promise that resolves to the group's statistics object.
 * @throws Error if the request fails.
 */
export async function fetchGitLabGroupStatistics(id: string | number, signal?: AbortSignal): Promise<GroupProjectsStatisticsDto | null> {
  try {
    const response = await axios.get<GroupProjectsStatisticsDto>(GitLabEndpoints.GET_GROUP_STATISTICS(id), { signal })
    return response.data
  } catch (err) {
    const httpError = handleHttpError('Group statistics', err)
    throw httpError
  }
}

/**
 * Fetches members of a GitLab group by its ID.
 * @param id The ID of the group.
 * @returns A promise that resolves to an array of group members.
 * @throws Error if the request fails.
 */
export async function fetchGitLabGroupMembers(id: string | number, signal?: AbortSignal): Promise<ListGroupMembersDto | null> {
  try {
    const response = await axios.get<ListGroupMembersDto>(GitLabEndpoints.GET_GROUP_MEMBERS(id), {
      signal,
    })
    return response.data
  } catch (err) {
    const httpError = handleHttpError('Group members', err)
    throw httpError
  }
}

/**
 * Fetches commits for a GitLab group within a date range.
 * @param id The ID of the group.
 * @param since ISO date string for the start date.
 * @param until ISO date string for the end date.
 * @returns A promise that resolves to an array of commits.
 * @throws Error if the request fails.
 */
export async function fetchGitLabGroupCommits(
  id: string | number,
  since?: string,
  until?: string,
  signal?: AbortSignal
): Promise<ListGroupCommitsDto | null> {
  try {
    const response = await axios.get<ListGroupCommitsDto>(GitLabEndpoints.GET_GROUP_COMMITS(id), {
      params: { since, until },
      signal,
    })
    return response.data
  } catch (err) {
    const httpError = handleHttpError('Group commits', err)
    throw httpError
  }
}
