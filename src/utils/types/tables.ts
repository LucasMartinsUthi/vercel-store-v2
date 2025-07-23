export type PipelineActionReal = {
  projectId: number
  projectName: string
  storageSize: number
  pipeline: {
    id: number
    status: string
    ref: string
    webUrl: string
    createdAt: string
  }
}
