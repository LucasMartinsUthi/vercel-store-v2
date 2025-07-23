import { ProjectMemberDto } from './ProjectMember.dto'

export type ListProjectMembersDto = {
  projectId: string
  members: ProjectMemberDto[]
}
