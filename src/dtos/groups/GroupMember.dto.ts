export type GroupMemberDto = {
  id: number
  name: string
  username: string
  state: string // e.g., "active", "blocked", "inactive"
  accessLevel: number // e.g., 10 for Guest, 20 for Reporter, 30 for Developer, 40 for Maintainer, 50 for Owner
  role: string // e.g., "Guest", "Reporter", "Developer", "Maintainer", "Owner"
  webUrl: string
  avatarUrl?: string | null // URL to the user's avatar
}
