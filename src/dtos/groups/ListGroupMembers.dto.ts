import { GroupMemberDto } from './GroupMember.dto'

export type ListGroupMembersDto = {
  membersCount: number
  membersData: GroupMemberDto[]
}
