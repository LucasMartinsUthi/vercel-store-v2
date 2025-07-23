// GitLabNamespace.dto.ts
// -----------------------------------------------------------
// Represents a GitLab namespace object
// -----------------------------------------------------------

export interface GitLabNamespace {
  id: number
  name: string
  path: string
  kind: string
  full_path: string
  parent_id?: number
  avatar_url?: string | null
  web_url?: string
}
