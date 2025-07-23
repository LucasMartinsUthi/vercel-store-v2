import { GitLabNamespace } from '../gitlab/GitLabNamespace.dto'

export type GlobalSearchDto = {
  query: string
  totalResults: number
  groups: SearchGroupDto[]
  projects: SearchProjectDto[]
}

export type SearchGroupDto = {
  id: number
  name: string
  fullPath: string
  description?: string
  webUrl: string
  avatarUrl?: string | null
  visibility: 'private' | 'internal' | 'public'
  type: 'group'
}

export type SearchProjectDto = {
  id: number
  name: string
  nameWithNamespace: string
  description?: string | null
  namespace: GitLabNamespace
  webUrl: string
  avatarUrl?: string | null
  visibility: 'private' | 'internal' | 'public'
  lastActivityAt: string
  type: 'project'
}
