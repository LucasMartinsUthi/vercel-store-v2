'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeOutlined, ChevronRightOutlined } from '@mui/icons-material'

import { Body2 } from './Typography'
import { capitalize } from '@/utils/functions/strings'

export type BreadcrumbItem = {
  label: string
  href: string
  isActive?: boolean
}

export type BreadcrumbConfig = {
  [key: string]: {
    label?: string
    href?: string
    hidden?: boolean
    dynamic?: (segment: string) => string
  }
}

interface BreadcrumbProps {
  config?: BreadcrumbConfig
  maxItems?: number
  showHome?: boolean
}

const Breadcrumb = ({ config = {}, maxItems = 5, showHome = true }: BreadcrumbProps) => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  const crumbs: BreadcrumbItem[] = pathSegments
    .map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const segmentConfig = config[segment] || config[`segment_${index}`]

      if (segmentConfig?.hidden) {
        return null
      }

      let label = segment

      if (segmentConfig) {
        if (segmentConfig.dynamic) {
          label = segmentConfig.dynamic(segment)
        } else if (segmentConfig.label) {
          label = segmentConfig.label
        }
      }

      if (!segmentConfig) {
        label = capitalize(segment)
      }

      return {
        label,
        href: segmentConfig?.href || href,
        isActive: index === pathSegments.length - 1,
      }
    })
    .filter(Boolean) as BreadcrumbItem[]

  const displayCrumbs =
    maxItems && crumbs.length > maxItems
      ? [...crumbs.slice(0, 1), { label: '...', href: '', isActive: false }, ...crumbs.slice(-(maxItems - 2))]
      : crumbs

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
      {showHome && (
        <Link href="/" className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors" aria-label="Home">
          <HomeOutlined className="w-5 h-5" />
        </Link>
      )}

      {displayCrumbs.map((item, index) => {
        const isLast = item.isActive
        const isEllipsis = item.label === '...'

        return (
          <div key={`${item.href}-${index}`} className="flex items-center gap-2">
            <ChevronRightOutlined className="w-4 h-4" aria-hidden="true" />

            {isEllipsis ? (
              <span className="px-2 py-1" aria-hidden="true">
                <Body2>...</Body2>
              </span>
            ) : isLast ? (
              <div className="px-2 py-1 rounded bg-blue-100 dark:bg-[#39577b]" aria-current="page">
                <Body2 state="hovers">{item.label}</Body2>
              </div>
            ) : (
              <Link href={item.href} className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                <Body2>{item.label}</Body2>
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
