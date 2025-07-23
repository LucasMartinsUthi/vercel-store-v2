import Breadcrumb, { BreadcrumbConfig } from '@/components/Breadcrumb'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbConfig: BreadcrumbConfig = {
    groups: {
      label: 'Projects',
      href: '/projects',
    },
    segment_1: {
      label: 'Project Details',
    },
  }

  return (
    <div>
      <Breadcrumb config={breadcrumbConfig} />
      {children}
    </div>
  )
}
