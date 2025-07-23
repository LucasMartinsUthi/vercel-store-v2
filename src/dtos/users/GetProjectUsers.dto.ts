import { GitLabMember } from './GitLabMember.dto'

export type GetProjectUsersDto = {
  totalMembers: number
  userRoles: UserRolesDto
  users: (GitLabMember & {
    commitCount: number
    lastActivityOn?: string
  })[]
}

export type UserRolesDto = {
  administratorCount: number
  ownerCount: number
  maintainerCount: number
  developerCount: number
  reporterCount: number
}
