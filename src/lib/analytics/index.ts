import axios from '@/config/axios'
import { handleHttpError } from '@/utils/handlers/httpError'
import { GitLabEndpoints } from '@/utils/constants/endpoints'
import { GlobalAnalyticsDto } from '@/dtos/analytics/GlobalAnalytics.dto'
import { MonthlyActivityDto } from '@/dtos/analytics/MonthlyActivity.dto'
import { MonthlyIssuesDto } from '@/dtos/analytics/MonthlyIssues.dto'

export async function fetchGitLabGlobalAnalytics(signal?: AbortSignal): Promise<GlobalAnalyticsDto> {
  try {
    const response = await axios.get<GlobalAnalyticsDto>(GitLabEndpoints.GET_GLOBAL_ANALYTICS, { signal })

    return response.data
  } catch (err) {
    handleHttpError('Global analytics', err)
    return {
      totalProjects: 0,
      totalGroups: 0,
      totalUsers: 0,
      totalCommits: 0,
    }
  }
}

export async function fetchGitLabMonthlyActivity(signal?: AbortSignal): Promise<MonthlyActivityDto[]> {
  try {
    const response = await axios.get<MonthlyActivityDto[]>(GitLabEndpoints.GET_MONTHLY_ACTIVITY, { signal })

    return response.data
  } catch (err) {
    handleHttpError('Monthly activity', err)
    return []
  }
}

export async function fetchGitLabMonthlyIssues(signal?: AbortSignal): Promise<MonthlyIssuesDto[]> {
  try {
    const response = await axios.get<MonthlyIssuesDto[]>(GitLabEndpoints.GET_MONTHLY_ISSUES, { signal })

    return response.data
  } catch (err) {
    handleHttpError('Monthly issues', err)
    return []
  }
}
