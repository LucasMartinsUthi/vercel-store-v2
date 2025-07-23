'use client'

import { BarChart } from '@mui/x-charts'
import { useTheme, Theme } from '@/context/theme'
import { ProjectStatsChartProps, SeriesBarType } from '@/utils/types/charts'
import { SignalCellularNodata } from '@mui/icons-material'
import { Body1 } from '@/components/Typography'

const ProjectStatsChart = ({ labels, series }: ProjectStatsChartProps) => {
  const { theme } = useTheme()

  console.log('ProjectStatsChart', { labels, series })

  if (!labels || !series || series.length === 0 || series.every((s) => !s.data || s.data.length === 0)) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
        <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
        <Body1 state="primary">No commits or merge requests on this period</Body1>
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={series.map((s: SeriesBarType) => ({
          type: 'bar',
          label: s.label,
          data: s.data,
          color: s.color,
        }))}
        height={260}
        grid={{ horizontal: true }}
        margin={{ top: 16, bottom: 16, left: 60, right: 16 }}
        slotProps={{
          legend: {
            position: { vertical: 'bottom' },
          },
        }}
        sx={{
          backgroundColor: 'transparent',
          color: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
          '.MuiChartsLegend-root .MuiChartsLegend-label': {
            color: theme === Theme.Dark ? 'var(--text-primary-dark) !important' : 'var(--text-primary) !important',
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
  )
}

export default ProjectStatsChart
