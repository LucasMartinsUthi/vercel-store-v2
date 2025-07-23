import { FC } from 'react'
import { BarChart } from '@mui/x-charts'
import { SignalCellularNodata } from '@mui/icons-material'

import { Body2 } from '@/components/Typography'
import { Theme, useTheme } from '@/context/theme'
import { monthValueFormatter } from '@/utils/functions/dates'
import { MonthlyActivityDto } from '@/dtos/analytics/MonthlyActivity.dto'

interface MonthlyActivityChartProps {
  monthlyActivity: MonthlyActivityDto[]
}

const MonthlyActivityChart: FC<MonthlyActivityChartProps> = ({ monthlyActivity }) => {
  const { theme } = useTheme()

  return monthlyActivity && monthlyActivity.length > 0 ? (
    <BarChart
      height={300}
      grid={{ horizontal: true }}
      xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
      dataset={monthlyActivity.map((m) => ({
        ...m,
        month: monthValueFormatter(m.month),
      }))}
      series={[
        { dataKey: 'totalCommits', label: 'Commits', color: theme === Theme.Dark ? 'var(--info-main-dark)' : 'var(--info-main)' },
        {
          label: 'Merge Requests',
          dataKey: 'totalMergeRequests',
          color: theme === Theme.Dark ? 'var(--success-main-dark)' : 'var(--success-main)',
        },
      ]}
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
  ) : (
    <div className="flex items-center justify-center h-64">
      <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body2 state="disabled">No monthly activity data available</Body2>
    </div>
  )
}

export default MonthlyActivityChart
