export type ProjectMergeRequestDto = {
  id: number
  createdAt: string
  mergedAt: string | null
  sourceBranch: string
  targetBranch: string
}
