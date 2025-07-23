'use client'

import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { useParams } from 'next/navigation'
import { CodeOutlined, SdCardOutlined, GroupAddOutlined, TimelineOutlined, CheckCircleOutline } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { GroupMemberDto } from '@/dtos/groups/GroupMember.dto'
import { formatRepositorySize } from '@/utils/functions/strings'

import { useGroupById } from '@/hooks/groups/useGroupById'
import { useGroupMembers } from '@/hooks/groups/useGroupMembers'
import { useGroupCommits } from '@/hooks/groups/useGroupCommits'
import { useGroupStatistics } from '@/hooks/groups/useGroupStatistics'

import InfoCard from '@/components/InfoCard'
import Skeleton from '@/components/Skeleton'
import EmptyList from '@/components/EmptyList'
import { Body2 } from '@/components/Typography'
import PageWrapper from '@/components/PageWrapper'
import MembersTable from '@/components/Table/Members'
import DateFilters, { DateFilter } from '@/components/DateFilters'

import GroupHeader from './components/GroupHeader'
import MetricsCard from './components/MetricsCard'
import ActivitiesList from './components/ActivitiesList'
import GroupCommitsChart from './components/GroupCommitsChart'
import PipelineActionsTable from './components/PipelineActionsTable'
import PipelineStatisticsChart from './components/PipelinesStatisticsChart'

const GroupDetailsPage = () => {
  const { theme } = useTheme()
  const { id } = useParams<{ id: string }>()

  // Date filter handlers
  const [endDate, setEndDate] = useState<Moment>(moment())
  const [dateError, setDateError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Moment>(moment().subtract(7, 'days'))
  const [dateFilter, setDateFilter] = useState<DateFilter | undefined>(undefined)

  const { data: groupMembers, isLoading: isGroupMembersLoading, isError: isMembersError } = useGroupMembers(id)
  const { data: group, isLoading: isGroupDetailsLoading, error: groupError, isError: isGroupError } = useGroupById(id)
  const { data: groupStatistics, isLoading: isGroupStatisticsLoading, isError: isStatisticsError } = useGroupStatistics(id)
  const {
    data: groupCommits,
    isError: isCommitsError,
    isLoading: isGroupCommitsLoading,
  } = useGroupCommits(id, startDate.toISOString(), endDate.toISOString())

  if (isGroupError) {
    return <EmptyList message={groupError instanceof Error ? groupError.message : 'Failed to load group details'} />
  }

  return !group && !isGroupDetailsLoading ? (
    <EmptyList message="Group not found" />
  ) : (
    <PageWrapper className="mt-4">
      {isGroupDetailsLoading ? (
        <Skeleton height={192} />
      ) : (
        !!group && (
          <GroupHeader name={group.name} avatarUrl={group.avatar_url} description={group.description ?? ''} webUrl={group.web_url} />
        )
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-5 w-full gap-8">
        {isGroupStatisticsLoading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} height={156} />)
        ) : isStatisticsError ? (
          <div className="col-span-5 text-center text-red-500">Failed to load statistics</div>
        ) : (
          !!groupStatistics && (
            <>
              <MetricsCard
                title="Total Projects"
                value={groupStatistics.totalProjects}
                icon={<CodeOutlined sx={{ color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)' }} />}
              />
              <MetricsCard
                title="Active Contributors"
                icon={<GroupAddOutlined sx={{ color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)' }} />}
                value={(() => {
                  const uniqueAuthors = new Set()
                  groupStatistics.recentActivity.forEach((activity) => {
                    if ('author' in activity.event && activity.event.author) {
                      uniqueAuthors.add(activity.event.author)
                    }
                  })
                  return uniqueAuthors.size
                })()}
              />
              <MetricsCard
                title="Success Rate"
                icon={<CheckCircleOutline sx={{ color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)' }} />}
                value={
                  groupStatistics.pipelineStatus.successRate ? `${Math.round(groupStatistics.pipelineStatus.successRate * 100)}%` : 'N/A'
                }
              />
              <MetricsCard
                title="Total Commits"
                value={groupStatistics.totalCommits}
                icon={<TimelineOutlined sx={{ color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)' }} />}
              />
              <MetricsCard
                title="Storage Usage"
                value={formatRepositorySize(groupStatistics.totalStorageBytes)}
                icon={<SdCardOutlined sx={{ color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)' }} />}
              />
            </>
          )
        )}
      </div>

      {/* Pipeline Actions and Recent Activities */}
      <div className="grid grid-cols-2 w-full gap-8">
        {isGroupStatisticsLoading ? (
          <Skeleton height={256} />
        ) : isStatisticsError ? (
          <InfoCard title="Pipeline Actions">
            <div className="p-4 text-center text-red-500">Failed to load pipeline data</div>
          </InfoCard>
        ) : (
          <InfoCard title="Pipeline Actions">
            <PipelineActionsTable pipelines={groupStatistics?.allPipelines || []} />
          </InfoCard>
        )}

        {isGroupStatisticsLoading ? (
          <Skeleton height={256} />
        ) : isStatisticsError ? (
          <InfoCard title="Recent Activities">
            <div className="p-4 text-center text-red-500">Failed to load activities</div>
          </InfoCard>
        ) : groupStatistics?.recentActivity?.length ? (
          <InfoCard title="Recent Activities">
            <ActivitiesList
              activities={groupStatistics.recentActivity
                .filter((activity) => {
                  return 'date' in activity.event && activity.event.date
                })
                .sort((a, b) => {
                  if ('date' in a.event && 'date' in b.event) {
                    return new Date(b.event.date).getTime() - new Date(a.event.date).getTime()
                  }
                  return 0
                })
                .slice(0, 5)}
            />
          </InfoCard>
        ) : (
          <InfoCard title="Recent Activities">
            <div className="p-4 text-center">
              <Body2 state="disabled">No recent activities found</Body2>
            </div>
          </InfoCard>
        )}
      </div>

      <div className="w-full flex mb-3">
        <DateFilters
          error={dateError}
          endDate={endDate}
          startDate={startDate}
          dateFilter={dateFilter}
          onError={setDateError}
          onEndDateChange={setEndDate}
          onStartDateChange={setStartDate}
          onDateFilterChange={setDateFilter}
        />
      </div>

      {/* Group Commits Chart and Pipeline Statistics */}
      <div className="grid grid-cols-2 w-full gap-8">
        {isGroupCommitsLoading ? (
          <Skeleton height={420} />
        ) : isCommitsError ? (
          <InfoCard title="Group Commits">
            <div className="flex items-center justify-center h-64 text-red-500">Failed to load commits data</div>
          </InfoCard>
        ) : groupCommits?.dailyCommits?.length ? (
          <InfoCard title="Group Commits">
            <GroupCommitsChart dailyCommits={groupCommits.dailyCommits} />
          </InfoCard>
        ) : (
          <InfoCard title="Group Commits">
            <div className="flex items-center justify-center h-64">
              <Body2 state="disabled">No commits found for this period</Body2>
            </div>
          </InfoCard>
        )}

        {isGroupStatisticsLoading ? (
          <Skeleton height={420} />
        ) : (
          !!groupStatistics && (
            <InfoCard title="Pipeline Statistics">
              <PipelineStatisticsChart pipelineStatus={groupStatistics.pipelineStatus} />
            </InfoCard>
          )
        )}
      </div>

      {/* Group Members */}
      {isGroupMembersLoading ? (
        <Skeleton height={280} />
      ) : isMembersError ? (
        <InfoCard title="Group Members">
          <div className="p-4 text-center text-red-500">Failed to load group members</div>
        </InfoCard>
      ) : (
        !!groupMembers && (
          <InfoCard title="Group Members">
            <MembersTable<GroupMemberDto> members={groupMembers.membersData} />
          </InfoCard>
        )
      )}
    </PageWrapper>
  )
}

export default GroupDetailsPage
