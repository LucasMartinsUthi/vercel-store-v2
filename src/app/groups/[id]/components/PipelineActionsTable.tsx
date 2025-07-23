import React from 'react'
import { SignalCellularNodata } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'

import { Body1, Caption } from '@/components/Typography'
import StatusTag, { getStatusState } from '@/components/StatusTag'
import GenericTable, { GenericTableColumn } from '@/components/Table'

import { getRelativeTime } from '@/utils/functions/dates'
import { PipelineActionReal } from '@/utils/types/tables'
import { formatRepositorySize } from '@/utils/functions/strings'

const pipelineActionsColumns: GenericTableColumn<PipelineActionReal>[] = [
  {
    label: 'Status',
    dataIndex: 'pipeline',
    cellProps: {
      width: '10%',
      align: 'center',
    },
    headerRender: (label) => <Caption>{label}</Caption>,
    render: (pipeline: PipelineActionReal['pipeline']) => {
      const state = getStatusState(pipeline.status)
      return <StatusTag status={pipeline.status} state={state} />
    },
  },
  {
    label: 'Project',
    dataIndex: 'projectName',
    cellProps: {
      width: '40%',
      align: 'left',
      sx: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' },
    },
    headerRender: (label) => <Caption>{label}</Caption>,
    render: (projectName: string) => <Caption>{projectName}</Caption>,
  },
  {
    label: 'Size',
    dataIndex: 'storageSize',
    cellProps: {
      width: '20%',
      align: 'center',
    },
    headerRender: (label) => <Caption>{label}</Caption>,
    render: (storageSize: number) => <Caption>{formatRepositorySize(storageSize)}</Caption>,
  },
  {
    label: 'Created',
    dataIndex: 'pipeline',
    cellProps: {
      width: '15%',
      align: 'center',
      sx: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' },
    },
    headerRender: (label) => <Caption>{label}</Caption>,
    render: (pipeline: PipelineActionReal['pipeline']) => <Caption>{getRelativeTime(pipeline.createdAt)}</Caption>,
  },
  {
    label: 'Pipeline',
    dataIndex: 'pipeline',
    cellProps: {
      width: '15%',
      align: 'center',
    },
    headerRender: (label) => <Caption>{label}</Caption>,
    render: (pipeline: PipelineActionReal['pipeline']) => (
      <Caption state="hovers">
        <a href={pipeline.webUrl} target="_blank" rel="noopener noreferrer">
          #{pipeline.id}
        </a>
      </Caption>
    ),
  },
]

interface PipelineActionsTableProps {
  pipelines?: PipelineActionReal[]
}

const PipelineActionsTable: React.FC<PipelineActionsTableProps> = ({ pipelines }) => {
  const { theme } = useTheme()

  if (!pipelines || pipelines.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
        <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
        <Body1 state="primary">No pipelines found</Body1>
      </div>
    )
  }

  return (
    <GenericTable<PipelineActionReal>
      disablePagination
      columns={pipelineActionsColumns}
      rows={pipelines.sort((a, b) => new Date(b.pipeline.createdAt).getTime() - new Date(a.pipeline.createdAt).getTime()).slice(0, 4) || []}
      headerRowSx={{
        backgroundColor: theme === Theme.Dark ? 'var(--outlined-border-dark)' : 'var(--outlined-border)',
      }}
    />
  )
}

export default PipelineActionsTable
