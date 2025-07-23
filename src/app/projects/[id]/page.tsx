'use client'

import { useState } from 'react'
import moment, { Moment } from 'moment'
import { useParams, useRouter } from 'next/navigation'

import Skeleton from '@/components/Skeleton'
import InfoCard from '@/components/InfoCard'
import EmptyList from '@/components/EmptyList'
import PageWrapper from '@/components/PageWrapper'
import MetricsCard from '@/components/MetricsCard'
import MembersTable from '@/components/Table/Members'
import DateFilters, { DateFilter } from '@/components/DateFilters'

import { formatLastActivity } from '@/utils/functions/dates'
import { formatRepositorySize } from '@/utils/functions/strings'
import { formatTimelineToChartData } from '@/utils/helpers/projectDetailsChart'

import { useProjectById } from '@/hooks/projects/useProjectById'
import { useProjectMembers } from '@/hooks/projects/useProjectMembers'
import { useProjectCommits } from '@/hooks/projects/useProjectCommits'

import { ProjectMemberDto } from '@/dtos/projects/ProjectMember.dto'

import ProjectHeader from './components/ProjectDetailsHeader'
import ProjectStatsChart from './components/ProjectDetailsChart'

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  // Date filter handlers
  const [endDate, setEndDate] = useState<Moment>(moment())
  const [dateError, setDateError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Moment>(moment().subtract(7, 'days'))
  const [dateFilter, setDateFilter] = useState<DateFilter | undefined>(undefined)

  const handleViewAllMembers = () => {
    router.push(`/projects/${id}/users`)
  }

  const { data: project, isLoading: isProjectDataLoading } = useProjectById(id)
  const { data: projectMembers, isLoading: isProjectMembersLoading } = useProjectMembers(id)
  const { data: projectCommits, isLoading: isProjectCommitsLoading } = useProjectCommits(id, startDate.toISOString(), endDate.toISOString())

  const { series, labels } = formatTimelineToChartData(
    projectCommits?.commits,
    projectCommits?.mergeRequests,
    startDate.toISOString(),
    endDate.toISOString()
  )

  return !project && !isProjectDataLoading ? (
    <EmptyList message="Project not found" />
  ) : (
    <PageWrapper className="mt-4">
      {isProjectDataLoading ? (
        <Skeleton height={256} />
      ) : (
        !!project && (
          <ProjectHeader
            name={project.name}
            namespace={project.namespace}
            description={project.description ?? ''}
            lastActivityAt={project.lastActivityAt}
            webUrl={project.webUrl}
          />
        )
      )}

      <div className="w-full flex justify-end">
        {isProjectDataLoading ? (
          <Skeleton height={32} width="25%" />
        ) : (
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
        )}
      </div>

      <div className="flex gap-4">
        {isProjectDataLoading ? (
          <div className="grid grid-cols-2 gap-4 w-1/3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={132} />
            ))}
          </div>
        ) : (
          !!project && (
            <div className="grid grid-cols-2 gap-4 w-1/3">
              <MetricsCard title="Commits" value={project.totalCommits} />
              <MetricsCard title="Branches" value={project.totalBranches} />
              <MetricsCard title="Last Updated" value={formatLastActivity(project.lastActivityAt)} />
              <MetricsCard title="Size" value={formatRepositorySize(project.repositorySizeBytes)} />
            </div>
          )
        )}

        <div className="w-2/3">
          {isProjectCommitsLoading ? <Skeleton height={280} /> : <ProjectStatsChart labels={labels} series={series} />}
        </div>
      </div>

      {/* Members Table */}
      {isProjectMembersLoading ? (
        <Skeleton height={280} />
      ) : (
        !!projectMembers && (
          <InfoCard title="Members" onViewAll={handleViewAllMembers}>
            <MembersTable<ProjectMemberDto> members={projectMembers.members} />
          </InfoCard>
        )
      )}
    </PageWrapper>
  )
}

export default ProjectDetailsPage
