import { GitLabNamespace } from '../gitlab/GitLabNamespace.dto'

export type GetProjectDto = {
  name: string
  description: string | null
  namespace: GitLabNamespace
  webUrl: string
  lastActivityAt: string
  totalCommits: number
  totalBranches: number
  repositorySizeBytes: number
}
