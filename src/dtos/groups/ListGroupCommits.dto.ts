export type ListGroupCommitsDto = {
  groupId: string
  since: string
  until: string
  totalCommits: number // total number of commits in the group *during the specified time interval*
  dailyCommits: {
    date: string // e.g., "2025-07-07"
    count: number // number of commits on that date for the entire group
  }[]
}
