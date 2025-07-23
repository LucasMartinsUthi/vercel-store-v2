export type ProjectDetailsChartTimelineGranularity = 'day' | '3days' | 'week' | 'biweekly' | 'month'

export type ProjectDetailsChartTimelineDto = {
  granularity: ProjectDetailsChartTimelineGranularity
  commits: Record<string, number>
  mergeRequests: Record<string, number>
}
