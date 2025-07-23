import { FC, useMemo } from 'react'
import { LineChart } from '@mui/x-charts'
import { SignalCellularNodata } from '@mui/icons-material'

import { Body1 } from '@/components/Typography'
import { useTheme, Theme } from '@/context/theme'
import { ListGroupCommitsDto } from '@/dtos/groups/ListGroupCommits.dto'

interface GroupCommitsChartProps {
  dailyCommits: ListGroupCommitsDto['dailyCommits']
}

const GroupCommitsChart: FC<GroupCommitsChartProps> = ({ dailyCommits }) => {
  const { theme } = useTheme()

  const activeCommitDays = useMemo(() => {
    return dailyCommits.filter((item) => item.count > 0) || []
  }, [dailyCommits])

  return activeCommitDays.length > 0 ? (
    <LineChart
      height={300}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        '& .MuiChartsLegend-root': {
          color: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
        },
        '& .MuiChartsGrid-line': {
          opacity: 0.5,
          stroke: theme === Theme.Dark ? 'var(--divider-dark)' : 'var(--divider)',
        },
        '& .MuiChartsAxis-line': {
          stroke: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
        },
        '& .MuiChartsAxis-tick': {
          stroke: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
        },
        '& .MuiChartsAxis-tickLabel': {
          fill: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
        },
      }}
      xAxis={[
        {
          data: activeCommitDays.map((item) => {
            const date = new Date(item.date)
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          }),
          scaleType: 'point',
          tickLabelStyle: {
            fontSize: 12,
            fill: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          },
        },
      ]}
      series={[
        {
          data: activeCommitDays.map((item) => item.count),
          color: theme === Theme.Dark ? 'var(--primary-dark)' : 'var(--primary)',
          label: 'Commits per day',
        },
      ]}
    />
  ) : (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
      <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body1 state="primary">No commits found for this period</Body1>
    </div>
  )
}

export default GroupCommitsChart
