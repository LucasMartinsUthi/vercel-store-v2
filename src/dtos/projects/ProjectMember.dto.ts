export type ProjectMemberDto = {
  id: number
  name: string
  username: string
  accessLevel: number
  state: string
  avatarUrl: string
  expiresAt: string | null
}
