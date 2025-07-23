import { FC, useMemo } from 'react'
import { BarChart } from '@mui/x-charts'
import { PersonOffOutlined } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { Body1 } from '@/components/Typography'
import { GetProjectUsersDto } from '@/dtos/users/GetProjectUsers.dto'

interface UserActivityDataChartProps {
  users: GetProjectUsersDto['users']
}

const UserActivityDataChart: FC<UserActivityDataChartProps> = ({ users }) => {
  const { theme } = useTheme()

  const userActivityData = useMemo(() => {
    if (!users) return []

    return users
      .filter((user) => user.commitCount > 0)
      .sort((a, b) => b.commitCount - a.commitCount)
      .slice(0, 3)
      .map((user) => ({
        name: user.name.length > 15 ? user.name.substring(0, 15) + '...' : user.name,
        commits: user.commitCount,
        fullName: user.name,
        username: user.username,
      }))
  }, [users])

  return userActivityData.length > 0 ? (
    <div>
      <BarChart
        height={192}
        dataset={userActivityData}
        xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
        series={[
          {
            dataKey: 'commits',
            label: 'Commits',
            color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)',
          },
        ]}
        slotProps={{
          legend: {
            position: { vertical: 'top', horizontal: 'start' },
          },
        }}
        sx={{
          backgroundColor: 'transparent',
          color: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          '.MuiChartsLegend-root .MuiChartsLegend-label': {
            color: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          },
          '.MuiChartsAxis-tick': {
            stroke: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          },
          '.MuiChartsAxis-tickLabel': {
            fill: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          },
          '.MuiChartsAxis-line': {
            stroke: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          },
          '.MuiChartsGrid-horizontalLine': {
            opacity: '25% !important',
            stroke: theme === Theme.Dark ? 'var(--primary-dark) !important' : 'var(--primary) !important',
          },
        }}
      />
    </div>
  ) : (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
      <PersonOffOutlined className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body1 state="primary">No user data found</Body1>
    </div>
  )
}

export default UserActivityDataChart
