// ListProjects.dto.ts
// -----------------------------------------------------------
// Represents the response from the GET /projects/ endpoint
// -----------------------------------------------------------

import { GitLabNamespace } from '../gitlab/GitLabNamespace.dto'

export type ListProjectsDto = {
  id: number
  name: string
  description: string
  namespace: GitLabNamespace
  totalBranches: number
  defaultBranch: string
  totalCommits: number
  lastCommitDate: string | null
  repositorySizeBytes: number
}
