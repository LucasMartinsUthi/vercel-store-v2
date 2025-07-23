import React from 'react'
import { Avatar } from '@mui/material'

import { stringAvatar } from '@/utils/functions/strings'

import { Body2 } from '../Typography'
import StatusTag from '../StatusTag'
import GenericTable, { GenericTableColumn } from '.'

export interface MembersTableProps<T> {
  members: T[]
}

export default function MembersTable<T extends object>({ members }: MembersTableProps<T>) {
  const membersTableColumns: GenericTableColumn<T>[] = [
    {
      label: '#',
      dataIndex: 'id' as keyof T,
    },
    {
      label: 'Name',
      dataIndex: 'name' as keyof T,
      render: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          {record.avatarUrl ? (
            <Avatar sx={{ width: 32, height: 32 }} src={record.avatarUrl} />
          ) : (
            <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }} {...stringAvatar(record.name)} />
          )}
          <Body2 state="primary">{value}</Body2>
        </div>
      ),
    },
    {
      label: 'Username',
      dataIndex: 'username' as keyof T,
    },
    {
      label: 'Status',
      dataIndex: 'state' as keyof T,
      render: (value: string) => (
        <StatusTag
          state={value === 'active' ? 'success' : value === 'blocked' ? 'error' : 'warning'}
          status={value.charAt(0).toUpperCase() + value.slice(1)}
        />
      ),
      cellProps: {
        width: '10%',
      },
    },
  ]

  return <GenericTable<T> columns={membersTableColumns} rows={members} />
}
