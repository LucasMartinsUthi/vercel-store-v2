export const GITLAB_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export const GitLabEndpoints = {
  // ------------ Projects ------------
  GET_PROJECTS: `${GITLAB_API_BASE}/projects`,
  /** Project details */
  GET_PROJECT: (projectId: number | string) => `${GITLAB_API_BASE}/projects/${projectId}`,
  /** Project members */
  GET_PROJECT_MEMBERS: (projectId: number | string) => `${GITLAB_API_BASE}/projects/${projectId}/members`,
  /** Project commits */
  GET_PROJECT_COMMITS: (projectId: number | string, since: string, until: string) =>
    `${GITLAB_API_BASE}/projects/${projectId}/commits?since=${since}&until=${until}`,

  // ------------ Groups ------------
  GET_GROUPS: `${GITLAB_API_BASE}/groups`,
  /** Group details */
  GET_GROUP: (groupId: number | string) => `${GITLAB_API_BASE}/groups/${groupId}/details`,
  /** Group members */
  GET_GROUP_MEMBERS: (groupId: number | string) => `${GITLAB_API_BASE}/groups/${groupId}/members`,
  /** Group statistics */
  GET_GROUP_STATISTICS: (groupId: number | string) => `${GITLAB_API_BASE}/groups/${groupId}/projects/statistics`,
  /** Group commits */
  GET_GROUP_COMMITS: (groupId: number | string) => `${GITLAB_API_BASE}/groups/${groupId}/commits`,

  // ------------ Users ------------
  GET_USERS: (projectId: number | string) => `${GITLAB_API_BASE}/users/${projectId}`,

  // ------------ Search ------------
  GLOBAL_SEARCH: '/search',

  // ------------ Analytics ------------
  GET_GLOBAL_ANALYTICS: `${GITLAB_API_BASE}/analytics/global`,
  /** Monthly analytics */
  GET_MONTHLY_ACTIVITY: `${GITLAB_API_BASE}/analytics/monthly-activity`,
  /** Monthly issues */
  GET_MONTHLY_ISSUES: `${GITLAB_API_BASE}/analytics/monthly-issues`,
} as const
