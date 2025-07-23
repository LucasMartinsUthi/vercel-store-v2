export type GroupProjectsStatisticsDto = {
  totalProjects: number
  totalStorageBytes: number
  totalCommits: number
  pipelineStatus: PipelinesStatusDto
  recentActivity: RecentActivityDto[]
  allPipelines: PipelineWithProjectInfoDto[]
}

export type PipelinesStatusDto = {
  totalPipelines: number
  successRate: number | null // percentage of successful pipelines (e.g., 0.85 - which means 85% success rate)
  successfulPipelines: number
  manualPipelines: number
  failedPipelines: number
  runningPipelines: number
  pendingPipelines: number
  canceledPipelines: number
  skippedPipelines: number
  createdPipelines: number
}

export type RecentActivityDto = {
  projectId: number
  projectName: string
  event:
    | {
        action: string // e.g., "pushed", "created", "updated", "deleted", "merged", "commented", "resolved", "reopened", "closed"
        type: string // e.g., "Push", "Issue", "MergeRequest", "Note"
        author: string
        authorName: string
        date: string
        targetTitle?: string // e.g., "Fix bug in feature X"
        branch?: string // e.g., "main", "develop" (branch name)
        message?: string // e.g., "Initial commit", "Updated README"
      }
    | {
        reason: 'no_event' | 'api_error' // in case there is no event
        error?: string // error message if applicable
      }
}

export type PipelineWithProjectInfoDto = {
  projectId: number
  projectName: string
  storageSize: number // in bytes
  pipeline: PipelineDto
}

export type PipelineDto = {
  id: number
  status: string // e.g., "success", "failed", "running", "canceled", "pending", "skipped", "manual", "created"
  ref: string // e.g., "main", "develop" (branch name)
  webUrl: string // URL to the pipeline in GitLab
  createdAt: string // ISO date string
}
