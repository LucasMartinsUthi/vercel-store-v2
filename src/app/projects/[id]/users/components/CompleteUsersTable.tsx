import { FC } from 'react'
import { Avatar } from '@mui/material'
import { PersonOffOutlined } from '@mui/icons-material'

import StatusTag from '@/components/StatusTag'
import { Body1, Body2, Caption } from '@/components/Typography'
import GenericTable, { GenericTableColumn } from '@/components/Table'

import { Theme, useTheme } from '@/context/theme'
import { stringAvatar } from '@/utils/functions/strings'
import { getRelativeTime } from '@/utils/functions/dates'

type CompleteUsersTableType = {
  id: number
  username: string
  name: string
  state: 'active' | 'blocked' | 'inactive'
  locked: boolean
  avatar_url: string
  web_url: string
  access_level: number
  created_at: string
  expires_at: string | null
  created_by?: {
    id: number
    username: string
    name: string
    state: 'active' | 'blocked' | 'inactive'
    locked: boolean
    avatar_url: string
    web_url: string
  }
  commitCount: number
  lastActivityOn?: string
}

interface CompleteUsersTableProps {
  users: CompleteUsersTableType[]
}

const CompleteUsersTable: FC<CompleteUsersTableProps> = ({ users }) => {
  const { theme } = useTheme()

  const usersTableColumns: GenericTableColumn<CompleteUsersTableType>[] = [
    {
      label: 'User',
      dataIndex: 'name',
      render: (value: string, record: CompleteUsersTableType) => (
        <div className="flex items-center gap-3">
          {record.avatar_url ? (
            <Avatar sx={{ width: 32, height: 32 }} src={record.avatar_url} />
          ) : (
            <Avatar sx={{ width: 32, height: 32, fontSize: '1rem' }} {...stringAvatar(record.name)} />
          )}
          <div>
            <Body2 state="primary" className="font-medium">
              {value}
            </Body2>
            <Caption state="secondary">@{record.username}</Caption>
          </div>
        </div>
      ),
      cellProps: { width: '25%' },
    },
    {
      label: 'Status',
      dataIndex: 'state',
      render: (value: string) => (
        <StatusTag status={value.charAt(0).toUpperCase() + value.slice(1)} state={value === 'active' ? 'success' : 'error'} />
      ),
      cellProps: { width: '10%', align: 'center' },
    },
    {
      label: 'Commits',
      dataIndex: 'commitCount',
      render: (value: number) => (
        <div className="text-center">
          <Body2 state="primary" className="font-bold">
            {value}
          </Body2>
          {value > 0 && <Caption state="secondary">contributor</Caption>}
        </div>
      ),
      cellProps: { width: '10%', align: 'center' },
    },
    {
      label: 'Last Activity',
      dataIndex: 'lastActivityOn',
      render: (value: string | null) => (
        <div className="text-center">
          {value ? (
            <>
              <Body2 state="primary">{getRelativeTime(value)}</Body2>
              <Caption state="secondary">{new Date(value).toLocaleDateString()}</Caption>
            </>
          ) : (
            <Body2 state="disabled">Never</Body2>
          )}
        </div>
      ),
      cellProps: { width: '20%', align: 'center' },
    },
    {
      label: 'Last Activity',
      dataIndex: 'lastActivityOn',
      render: (value: string | null) => (
        <div className="text-center">
          {value ? (
            <>
              <Body2 state="primary">{getRelativeTime(value)}</Body2>
              <Caption state="secondary">{new Date(value).toLocaleDateString()}</Caption>
            </>
          ) : (
            <Body2 state="disabled">Never</Body2>
          )}
        </div>
      ),
      cellProps: { width: '20%', align: 'center' },
    },
    {
      label: 'Expires',
      dataIndex: 'expires_at',
      render: (value: string | null) => (
        <div className="text-center">
          {value ? (
            <>
              <Body2 state="primary">{getRelativeTime(value)}</Body2>
              <Caption state="secondary">{new Date(value).toLocaleDateString()}</Caption>
            </>
          ) : (
            <Body2 state="secondary">Never</Body2>
          )}
        </div>
      ),
      cellProps: { width: '15%', align: 'center' },
    },
  ]

  return users.length > 0 ? (
    <GenericTable<CompleteUsersTableType>
      columns={usersTableColumns}
      rows={users}
      headerRowSx={{
        backgroundColor: theme === Theme.Dark ? 'var(--outlined-border-dark)' : 'var(--outlined-border)',
      }}
    />
  ) : (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
      <PersonOffOutlined className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body1 state="primary">No user data found</Body1>
    </div>
  )
}

export default CompleteUsersTable
