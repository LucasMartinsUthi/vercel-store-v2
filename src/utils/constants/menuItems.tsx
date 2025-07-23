import { FolderOpenOutlined, GroupsOutlined, DashboardOutlined } from '@mui/icons-material'
import { ReactNode } from 'react'

export type MenuSection = {
  label?: string
  items: SidebarItem[]
}

export type SidebarItem = {
  id: string
  label: string
  icon: ReactNode
  isHome?: boolean
}

export const menuSections: MenuSection[] = [
  {
    items: [{ id: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, isHome: true }],
  },
  {
    label: 'APPLICATIONS',
    items: [
      { id: 'projects', label: 'Projects', icon: <FolderOpenOutlined /> },
      { id: 'groups', label: 'Groups', icon: <GroupsOutlined /> },
    ],
  },
]
