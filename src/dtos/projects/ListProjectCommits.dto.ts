import { ProjectCommitDto } from './ProjectCommit.dto'
import { ProjectMergeRequestDto } from './ProjectMergeRequest.dto'

export type ListProjectCommitsDto = {
  since: string
  until: string
  commits: ProjectCommitDto[]
  mergeRequests: ProjectMergeRequestDto[]
}
