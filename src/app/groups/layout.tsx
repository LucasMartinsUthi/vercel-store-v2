import Breadcrumb, { BreadcrumbConfig } from '@/components/Breadcrumb'

export default function GroupsLayoutSimple({ children }: { children: React.ReactNode }) {
  const breadcrumbConfig: BreadcrumbConfig = {
    groups: {
      label: 'Groups',
      href: '/groups',
    },
    segment_1: {
      label: 'Group Details',
    },
  }

  return (
    <div>
      <Breadcrumb config={breadcrumbConfig} />
      {children}
    </div>
  )
}
