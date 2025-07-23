// ListGroups.dto.ts
// -----------------------------------------------------------
// Represents the response from the GET /groups/ endpoint
// -----------------------------------------------------------

export type ListGroupsDto = {
  id: number
  name: string
  fullPath: string
  description?: string
  webUrl: string
  membersCount: number
  projectsCount: number
  activeProjectsCount: number
  lastActivity: string | null
  publicProjectsCount: number
}
