import { FC, useMemo } from 'react'
import { PieChart } from '@mui/x-charts'
import { SignalCellularNodata } from '@mui/icons-material'

import { Body1 } from '@/components/Typography'
import { useTheme, Theme } from '@/context/theme'
import { PipelinesStatusDto } from '@/dtos/groups/GroupProjectsStatistics.dto'

interface PipelineStatisticsChartProps {
  pipelineStatus?: PipelinesStatusDto
}

const PipelineStatisticsChart: FC<PipelineStatisticsChartProps> = ({ pipelineStatus }) => {
  const { theme } = useTheme()

  const pipelineChartData = useMemo(() => {
    if (!pipelineStatus) return []

    const statusColors = {
      success: theme === Theme.Dark ? 'var(--success-main-dark)' : 'var(--success-main)',
      failed: theme === Theme.Dark ? 'var(--error-main-dark)' : 'var(--error-main)',
      running: theme === Theme.Dark ? 'var(--info-main-dark)' : 'var(--info-main)',
      pending: theme === Theme.Dark ? 'var(--warning-main-dark)' : 'var(--warning-main)',
      manual: theme === Theme.Dark ? 'var(--info-light-dark)' : 'var(--info-light)',
      canceled: theme === Theme.Dark ? 'var(--error-light-dark)' : 'var(--error-light)',
      skipped: theme === Theme.Dark ? 'var(--warning-light-dark)' : 'var(--warning-light)',
      created: theme === Theme.Dark ? 'var(--success-light-dark)' : 'var(--success-light)',
    }

    const chartData = [
      {
        label: 'Success',
        value: pipelineStatus.successfulPipelines,
        color: statusColors.success,
      },
      {
        label: 'Failed',
        value: pipelineStatus.failedPipelines,
        color: statusColors.failed,
      },
      {
        label: 'Running',
        value: pipelineStatus.runningPipelines,
        color: statusColors.running,
      },
      {
        label: 'Pending',
        value: pipelineStatus.pendingPipelines,
        color: statusColors.pending,
      },
      {
        label: 'Manual',
        value: pipelineStatus.manualPipelines,
        color: statusColors.manual,
      },
      {
        label: 'Canceled',
        value: pipelineStatus.canceledPipelines,
        color: statusColors.canceled,
      },
      {
        label: 'Skipped',
        value: pipelineStatus.skippedPipelines,
        color: statusColors.skipped,
      },
      {
        label: 'Created',
        value: pipelineStatus.createdPipelines,
        color: statusColors.created,
      },
    ].filter((item) => item.value > 0)

    return chartData
  }, [pipelineStatus])

  return pipelineChartData.length > 0 ? (
    <PieChart
      sx={{
        '& .MuiChartsLabel-root': {
          color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
        },
      }}
      series={[
        {
          innerRadius: 40,
          outerRadius: 80,
          data: pipelineChartData,
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 35,
        },
      ]}
      slotProps={{
        legend: {
          position: { vertical: 'middle', horizontal: 'start' },
        },
      }}
    />
  ) : (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
      <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body1 state="primary">No pipelines data found</Body1>
    </div>
  )
}

export default PipelineStatisticsChart
