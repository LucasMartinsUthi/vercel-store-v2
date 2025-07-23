export type Visibility = 'private' | 'public' | 'internal'

export type ProjectCreationLevel = 'noone' | 'maintainer' | 'developer'

export type SubgroupCreationLevel = 'owner' | 'maintainer'

export type SharedRunnersSetting = 'enabled' | 'disabled' | 'instance_type'

export type GitLabGroupDto = {
  id: number
  web_url: string
  name: string
  path: string
  description: string
  visibility: Visibility
  share_with_group_lock: boolean
  require_two_factor_authentication: boolean
  two_factor_grace_period: number
  project_creation_level: ProjectCreationLevel
  auto_devops_enabled: boolean | null
  subgroup_creation_level: SubgroupCreationLevel
  emails_disabled: boolean
  emails_enabled: boolean
  mentions_disabled: boolean | null
  lfs_enabled: boolean
  math_rendering_limits_enabled: boolean
  lock_math_rendering_limits_enabled: boolean
  default_branch_protection: number
  default_branch_protection_defaults: Record<string, never>
  avatar_url: string | null
  request_access_enabled: boolean
  full_name: string
  full_path: string
  created_at: string
  parent_id: number | null
  organization_id: number
  shared_runners_setting: SharedRunnersSetting
}
