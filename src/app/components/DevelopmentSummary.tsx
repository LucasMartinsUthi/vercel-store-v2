import { FC, useMemo, ReactNode } from 'react'
import {
  SpeedOutlined,
  BarChartOutlined,
  InsightsOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  CalendarTodayOutlined,
} from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { monthValueFormatter } from '@/utils/functions/dates'
import { Body2, Body3, Subtitle2, Subtitle1 } from '@/components/Typography'

import { MonthlyIssuesDto } from '@/dtos/analytics/MonthlyIssues.dto'
import { GlobalAnalyticsDto } from '@/dtos/analytics/GlobalAnalytics.dto'
import { MonthlyActivityDto } from '@/dtos/analytics/MonthlyActivity.dto'

interface DevelopmentSummaryData {
  globalAnalytics: GlobalAnalyticsDto
  monthlyActivity: MonthlyActivityDto[]
  monthlyIssues: MonthlyIssuesDto[]
}

interface StatItem {
  label: string
  value: string | number
  className?: string
  icon?: ReactNode
}

interface CardData {
  icon: ReactNode
  title: string
  subtitle: string
  stats: StatItem[]
}

interface SummaryCardProps extends CardData {}

const SummaryCard: FC<SummaryCardProps> = ({ icon, title, subtitle, stats }) => (
  <div className="p-6 bg-paper-elevation-24 dark:bg-paper-elevation-24-dark rounded-xl dash-card-shadow hover:shadow-lg transition-all duration-300 border border-divider dark:border-divider-dark">
    {/* Header Section */}
    <div className="flex items-start space-x-4 mb-4">
      <div className="flex-shrink-0 p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">{icon}</div>
      <div className="min-w-0 flex-1">
        <Subtitle1 state="primary" className="truncate">
          {title}
        </Subtitle1>
        <Body3 state="secondary" className="mt-1">
          {subtitle}
        </Body3>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 gap-3">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between bg-surface-variant dark:bg-surface-variant-dark rounded-lg">
          <div className="flex items-center space-x-2">
            {stat.icon && <div className="flex-shrink-0">{stat.icon}</div>}
            <Subtitle2 state="primary" className="text-sm font-medium">
              {stat.label}
            </Subtitle2>
          </div>
          <Subtitle1 state="primary" className={`font-semibold text-right ${stat.className || ''}`}>
            {stat.value}
          </Subtitle1>
        </div>
      ))}
    </div>
  </div>
)

const DevelopmentSummary: FC<DevelopmentSummaryData> = ({ globalAnalytics, monthlyActivity, monthlyIssues }) => {
  const { theme } = useTheme()

  const iconStyle = {
    color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
    height: 28,
    width: 28,
  }

  const trendIconStyle = { width: 24, height: 24 }

  const cardsData = useMemo((): CardData[] => {
    if (!globalAnalytics || !monthlyActivity || !monthlyIssues) return []

    const currentMonth = {
      commits: monthlyActivity[monthlyActivity.length - 1]?.totalCommits || 0,
      mergeRequests: monthlyActivity[monthlyActivity.length - 1]?.totalMergeRequests || 0,
      issues: monthlyIssues[monthlyIssues.length - 1]
        ? monthlyIssues[monthlyIssues.length - 1].open + monthlyIssues[monthlyIssues.length - 1].closed
        : 0,
    }

    const sixMonthTotals = {
      commits: monthlyActivity.reduce((sum, m) => sum + m.totalCommits, 0),
      mergeRequests: monthlyActivity.reduce((sum, m) => sum + m.totalMergeRequests, 0),
      issues: monthlyIssues.reduce((sum, m) => sum + m.open + m.closed, 0),
    }

    const ratios = {
      commitsPerProject: Math.round(globalAnalytics.totalCommits / globalAnalytics.totalProjects),
      projectsPerGroup: Math.round(globalAnalytics.totalProjects / globalAnalytics.totalGroups),
      usersPerProject: Math.round(globalAnalytics.totalUsers / globalAnalytics.totalProjects),
    }

    const mostActiveMonth = monthlyActivity.reduce((max, current) => (current.totalCommits > max.totalCommits ? current : max))

    const isResolutionTrending =
      monthlyIssues.length >= 2 ? monthlyIssues[monthlyIssues.length - 1].closed > monthlyIssues[monthlyIssues.length - 2].closed : false

    const isDevelopmentAccelerating =
      monthlyActivity.length >= 2
        ? monthlyActivity[monthlyActivity.length - 1].totalCommits > monthlyActivity[monthlyActivity.length - 2].totalCommits
        : false

    return [
      {
        icon: <CalendarTodayOutlined sx={iconStyle} />,
        title: 'This Month',
        subtitle: 'Current Activity',
        stats: [
          { label: 'Commits', value: currentMonth.commits.toLocaleString() },
          { label: 'MRs', value: currentMonth.mergeRequests.toLocaleString() },
          { label: 'Issues', value: currentMonth.issues.toLocaleString() },
        ],
      },
      {
        icon: <BarChartOutlined sx={iconStyle} />,
        title: '6-Month Totals',
        subtitle: 'Cumulative Stats',
        stats: [
          { label: 'Commits', value: sixMonthTotals.commits.toLocaleString() },
          { label: 'MRs', value: sixMonthTotals.mergeRequests.toLocaleString() },
          { label: 'Issues', value: sixMonthTotals.issues.toLocaleString() },
        ],
      },
      {
        icon: <SpeedOutlined sx={iconStyle} />,
        title: 'Activity Ratios',
        subtitle: 'Performance Metrics',
        stats: [
          { label: 'Commits/Project', value: ratios.commitsPerProject },
          { label: 'Projects/Group', value: ratios.projectsPerGroup },
          { label: 'Users/Project', value: ratios.usersPerProject },
        ],
      },
      {
        icon: <InsightsOutlined sx={iconStyle} />,
        title: 'Quick Insights',
        subtitle: 'Key Trends',
        stats: [
          { label: 'Most active', value: monthValueFormatter(mostActiveMonth.month) },
          {
            label: 'Resolution',
            value: isResolutionTrending ? 'Up' : 'Down',
            className: isResolutionTrending ? 'text-success-main dark:text-success-main-dark' : 'text-error-main dark:text-error-main-dark',
            icon: isResolutionTrending ? (
              <TrendingUpOutlined sx={{ ...trendIconStyle, color: 'var(--success-main)' }} />
            ) : (
              <TrendingDownOutlined sx={{ ...trendIconStyle, color: 'var(--error-main)' }} />
            ),
          },
          {
            label: 'Velocity',
            value: isDevelopmentAccelerating ? 'Accelerating' : 'Slowing',
            className: isDevelopmentAccelerating
              ? 'text-success-main dark:text-success-main-dark'
              : 'text-warning-main dark:text-warning-main-dark',
            icon: isDevelopmentAccelerating ? (
              <TrendingUpOutlined sx={{ ...trendIconStyle, color: 'var(--success-main)' }} />
            ) : (
              <TrendingDownOutlined sx={{ ...trendIconStyle, color: 'var(--warning-main)' }} />
            ),
          },
        ],
      },
    ]
  }, [globalAnalytics, monthlyActivity, monthlyIssues, iconStyle])

  return cardsData.length > 0 ? (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        {cardsData.slice(0, 2).map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>
      <div className="space-y-4">
        {cardsData.slice(2, 4).map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-64">
      <Body2 state="disabled">No summary data available</Body2>
    </div>
  )
}

export default DevelopmentSummary
