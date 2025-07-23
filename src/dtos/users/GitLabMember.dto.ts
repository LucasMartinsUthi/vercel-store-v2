export type GitLabMember = {
  id: number
  username: string
  name: string
  state: 'active' | 'blocked' | 'inactive'
  locked: boolean
  avatar_url: string
  web_url: string
  access_level: number
  created_at: string
  expires_at: string | null
  created_by?: {
    id: number
    username: string
    name: string
    state: 'active' | 'blocked' | 'inactive'
    locked: boolean
    avatar_url: string
    web_url: string
  }
}
