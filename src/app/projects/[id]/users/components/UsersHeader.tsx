import React from 'react'
import { Avatar } from '@mui/material'
import { OpenInNewOutlined } from '@mui/icons-material'

import { Body1, H3, H6 } from '@/components/Typography'
import { stringAvatar } from '@/utils/functions/strings'

type UsersHeaderProps = {
  name: string
  avatarUrl: string | null
  description?: string
  webUrl?: string
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ name, avatarUrl, description = '', webUrl }) => {
  return (
    <div className="w-full flex bg-paper-elevation-24 dark:bg-paper-elevation-24-dark rounded-lg px-8 py-12 dash-card-shadow">
      <div className="flex-1/12">
        {avatarUrl ? (
          <Avatar src={avatarUrl} className="mx-auto my-4" sx={{ width: 87, height: 87 }} />
        ) : (
          <Avatar {...stringAvatar(name)} className="mx-auto my-4" sx={{ width: 87, height: 87 }} />
        )}
      </div>
      <div className="flex-11/12 flex flex-col justify-center items-start px-4">
        <div className="flex items-center gap-3">
          <H3 state="hovers">{name}</H3>
          {webUrl && (
            <a
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              title="Open in GitLab"
            >
              <OpenInNewOutlined fontSize="small" />
            </a>
          )}
        </div>
        <H6 state="primary">{description}</H6>
        <Body1 state="focus" className="mt-4">
          Last activity 1d ago
        </Body1>
      </div>
    </div>
  )
}

export default UsersHeader
