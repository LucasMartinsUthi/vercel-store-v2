'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { CodeOutlined, PeopleOutline, Person4Outlined, TrendingUpOutlined } from '@mui/icons-material'

import UsersHeader from './components/UsersHeader'
import MetricsCard from './components/MetricsCard'
import CompleteUsersTable from './components/CompleteUsersTable'
import RoleDistributionChart from './components/RoleDistributionChart'
import UserActivityDataChart from './components/UserActivityDataChart'

import InfoCard from '@/components/InfoCard'
import Skeleton from '@/components/Skeleton'
import PageWrapper from '@/components/PageWrapper'
import { useProjectById } from '@/hooks/projects/useProjectById'
import { useProjectMembers } from '@/hooks/users/useProjectUsers'

const UsersPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: usersData, isLoading: isUsersDataLoading, isError: isUsersError } = useProjectMembers(id)
  const { data: projectData, isLoading: isProjectDataLoading, isError: isProjectError } = useProjectById(id)

  const projectUsersMetrics = useMemo(() => {
    if (!usersData) return null

    const activeUsers = usersData.users.filter((user) => user.state === 'active').length
    const usersWithCommits = usersData.users.filter((user) => user.commitCount > 0).length
    const avgCommitsPerUser = usersData.users.reduce((sum, user) => sum + user.commitCount, 0) / usersData.users.length

    return {
      totalMembers: usersData.totalMembers,
      activeUsers,
      usersWithCommits,
      avgCommitsPerUser: Math.round(avgCommitsPerUser),
    }
  }, [usersData])

  if (isProjectError) {
    return (
      <div className="py-6 space-y-8 mb-18">
        <div className="text-center text-red-500">Failed to load project details</div>
      </div>
    )
  }

  if (isUsersError) {
    return (
      <div className="py-6 space-y-8 mb-18">
        <div className="text-center text-red-500">Failed to load users data</div>
      </div>
    )
  }

  return (
    <PageWrapper className="mt-4">
      {isProjectDataLoading ? (
        <Skeleton height={192} />
      ) : (
        !!projectData && (
          <UsersHeader
            name={projectData.name || ''}
            description={projectData.description || undefined}
            avatarUrl={null}
            webUrl={projectData.webUrl}
          />
        )
      )}

      <div className="flex w-full gap-8">
        {isUsersDataLoading ? (
          <div className="grid grid-cols-2 gap-4 w-1/3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={132} />
            ))}
          </div>
        ) : (
          !!projectUsersMetrics && (
            <div className="grid grid-cols-2 gap-4 w-1/3">
              <MetricsCard icon={<PeopleOutline />} title="Total Members" value={projectUsersMetrics?.totalMembers || 0} />
              <MetricsCard icon={<Person4Outlined />} title="Active Users" value={projectUsersMetrics?.activeUsers || 0} />
              <MetricsCard icon={<CodeOutlined />} title="Contributors" value={projectUsersMetrics?.usersWithCommits || 0} />
              <MetricsCard icon={<TrendingUpOutlined />} title="Avg Commits" value={projectUsersMetrics?.avgCommitsPerUser || 0} />
            </div>
          )
        )}

        {isUsersDataLoading ? (
          <div className="w-1/3">
            <Skeleton height={400} />
          </div>
        ) : (
          !!usersData && (
            <div className="w-1/3">
              <InfoCard title="Roles distribution">
                <RoleDistributionChart userRoles={usersData.userRoles} />
              </InfoCard>
            </div>
          )
        )}

        {isUsersDataLoading ? (
          <div className="w-1/3">
            <Skeleton height={400} />
          </div>
        ) : (
          !!usersData && (
            <div className="w-1/3">
              <InfoCard title="Top Contributors">
                <UserActivityDataChart users={usersData.users} />
              </InfoCard>
            </div>
          )
        )}
      </div>

      {isUsersDataLoading ? <Skeleton height={400} /> : !!usersData && <CompleteUsersTable users={usersData.users} />}
    </PageWrapper>
  )
}

export default UsersPage
