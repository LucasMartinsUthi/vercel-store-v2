'use client'

import React, { useMemo } from 'react'
import { CodeOutlined, GroupOutlined, PeopleOutlined, CommitOutlined, TrendingUpOutlined, TaskAltOutlined } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { useMonthlyIssues } from '@/hooks/analytics/useMonthlyIssues'
import { useGlobalAnalytics } from '@/hooks/analytics/useGlobalAnalytics'
import { useMonthlyActivity } from '@/hooks/analytics/useMonthlyActivity'

import Skeleton from '@/components/Skeleton'
import InfoCard from '@/components/InfoCard'
import EmptyList from '@/components/EmptyList'
import { H4, Subtitle1 } from '@/components/Typography'

import PageWrapper from '@/components/PageWrapper'
import MetricsCard from './components/MetricsCard'
import IssuesOverviewChart from './components/IssuesOverviewChart'
import MonthlyActivityChart from './components/MonthlyActivityChart'
import DevelopmentSummary from './components/DevelopmentSummary'

export default function DashboardView() {
  const { theme } = useTheme()
  const { data: monthlyIssues, isLoading: isIssuesLoading } = useMonthlyIssues()
  const { data: globalAnalytics, isLoading: isGlobalLoading } = useGlobalAnalytics()
  const { data: monthlyActivity, isLoading: isActivityLoading } = useMonthlyActivity()

  const monthlyGrowthRate = useMemo(() => {
    if (!monthlyActivity || monthlyActivity.length < 2) return 0

    const current = monthlyActivity[monthlyActivity.length - 1]
    const previous = monthlyActivity[monthlyActivity.length - 2]

    const currentTotal = current.totalCommits + current.totalMergeRequests
    const previousTotal = previous.totalCommits + previous.totalMergeRequests

    if (previousTotal === 0) return 100
    return Math.round(((currentTotal - previousTotal) / previousTotal) * 100)
  }, [monthlyActivity])

  const issueResolutionRate = useMemo(() => {
    if (!monthlyIssues || monthlyIssues.length === 0) return 0

    const totalClosed = monthlyIssues.reduce((sum, month) => sum + month.closed, 0)
    const totalOpened = monthlyIssues.reduce((sum, month) => sum + month.open, 0)

    if (totalOpened === 0) return 0
    return Math.round((totalClosed / (totalOpened + totalClosed)) * 100)
  }, [monthlyIssues])

  if (isGlobalLoading || isActivityLoading || isIssuesLoading) {
    return (
      <div className="py-6 space-y-14 mb-18">
        <Skeleton height={60} />
        <div className="grid grid-cols-6 w-full gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={120} />
          ))}
        </div>
        <div className="grid grid-cols-2 w-full gap-8">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
      </div>
    )
  }

  if (!globalAnalytics) {
    return <EmptyList message="Analytics not found" />
  }

  return (
    <PageWrapper className="py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 text-center">
        <H4 state="primary">Project Analytics Dashboard</H4>
        <Subtitle1 state="primary">Overview of your GitLab instance activity and performance</Subtitle1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-6 w-full gap-4">
        <MetricsCard
          title="Total Projects"
          value={globalAnalytics.totalProjects.toLocaleString()}
          icon={
            <CodeOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
        <MetricsCard
          title="Total Groups"
          value={globalAnalytics.totalGroups.toLocaleString()}
          icon={
            <GroupOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
        <MetricsCard
          title="Total Users"
          value={globalAnalytics.totalUsers.toLocaleString()}
          icon={
            <PeopleOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
        <MetricsCard
          title="Total Commits"
          value={globalAnalytics.totalCommits.toLocaleString()}
          subtitle={
            monthlyActivity && monthlyActivity.length >= 2
              ? `${monthlyActivity[monthlyActivity.length - 1].totalCommits >= monthlyActivity[monthlyActivity.length - 2].totalCommits ? '+' : ''}${
                  monthlyActivity[monthlyActivity.length - 1].totalCommits - monthlyActivity[monthlyActivity.length - 2].totalCommits
                } vs last month`
              : undefined
          }
          trend={
            monthlyActivity && monthlyActivity.length >= 2
              ? monthlyActivity[monthlyActivity.length - 1].totalCommits >= monthlyActivity[monthlyActivity.length - 2].totalCommits
                ? 'up'
                : 'down'
              : undefined
          }
          icon={
            <CommitOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
        <MetricsCard
          title="Monthly Growth"
          value={`${monthlyGrowthRate >= 0 ? '+' : ''}${monthlyGrowthRate}%`}
          subtitle="vs last month"
          trend={monthlyGrowthRate >= 0 ? 'up' : 'down'}
          icon={
            <TrendingUpOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
        <MetricsCard
          title="Issue Resolution"
          value={`${issueResolutionRate}%`}
          subtitle={
            monthlyIssues && monthlyIssues.length >= 2
              ? (() => {
                  const currentClosed = monthlyIssues[monthlyIssues.length - 1].closed
                  const previousClosed = monthlyIssues[monthlyIssues.length - 2].closed
                  const diff = currentClosed - previousClosed
                  return `${diff >= 0 ? '+' : ''}${diff} vs last month`
                })()
              : undefined
          }
          trend={
            monthlyIssues && monthlyIssues.length >= 2
              ? monthlyIssues[monthlyIssues.length - 1].closed >= monthlyIssues[monthlyIssues.length - 2].closed
                ? 'up'
                : 'down'
              : undefined
          }
          icon={
            <TaskAltOutlined
              sx={{ color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)', height: 28, width: 28 }}
            />
          }
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-2 w-full gap-4">
        {/* Original Monthly Activity */}
        <InfoCard title="Monthly Development Activity">
          <MonthlyActivityChart monthlyActivity={monthlyActivity || []} />
        </InfoCard>

        {/* Original Monthly Issues */}
        <InfoCard title="Issues Overview">
          <IssuesOverviewChart monthlyIssues={monthlyIssues || []} />
        </InfoCard>
      </div>

      {/* Development Summary Table */}
      <InfoCard title="Development Summary">
        <DevelopmentSummary globalAnalytics={globalAnalytics} monthlyActivity={monthlyActivity || []} monthlyIssues={monthlyIssues || []} />
      </InfoCard>
    </PageWrapper>
  )
}
