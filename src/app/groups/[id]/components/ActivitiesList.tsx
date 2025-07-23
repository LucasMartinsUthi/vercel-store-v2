import React from 'react'
import { Tooltip } from '@mui/material'
import {
  CodeOutlined,
  TimelineOutlined,
  CallMergeOutlined,
  BugReportOutlined,
  ErrorOutlineOutlined,
  BookmarkBorderOutlined,
  ChatBubbleOutlineOutlined,
} from '@mui/icons-material'

import { Body2, Subtitle2 } from '@/components/Typography'
import { RecentActivityDto } from '@/dtos/groups/GroupProjectsStatistics.dto'

const getActivityIcon = (activity: RecentActivityDto): React.ReactNode => {
  if ('reason' in activity.event) {
    return <ErrorOutlineOutlined className="text-alert-error-color dark:text-alert-error-color-dark" />
  }

  const { type } = activity.event

  switch (type.toLowerCase()) {
    case 'mergerequest':
    case 'merge_request':
      return <CallMergeOutlined className="text-alert-info-color dark:text-alert-info-color-dark" />

    case 'issue':
      return <BugReportOutlined className="text-alert-error-color dark:text-alert-error-color-dark" />

    case 'note':
    case 'comment':
      return <ChatBubbleOutlineOutlined className="text-alert-warning-color dark:text-alert-warning-color-dark" />

    case 'push':
      return <TimelineOutlined className="text-alert-success-color dark:text-alert-success-color-dark" />

    case 'tag':
      return <BookmarkBorderOutlined className="text-alert-warning-color dark:text-alert-warning-color-dark" />

    default:
      return <CodeOutlined className="text-alert-info-color dark:text-alert-info-color-dark" />
  }
}

const formatActivityMessage = (activity: RecentActivityDto): string => {
  if ('reason' in activity.event) {
    return activity.event.error || 'Error loading activity'
  }

  const { action, type, author, authorName, targetTitle, message, branch } = activity.event
  const displayName = authorName || author
  const projectName = activity.projectName

  switch (type.toLowerCase()) {
    case 'push':
      const branchText = branch ? ` to ${branch}` : ''
      const commitMessage = message ? `: ${message}` : ''
      return `${displayName} pushed${branchText} in ${projectName}${commitMessage}`

    case 'mergerequest':
    case 'merge_request':
      const mrTitle = targetTitle ? `: ${targetTitle}` : ''
      return `${displayName} ${action} merge request in ${projectName}${mrTitle}`

    case 'issue':
      const issueTitle = targetTitle ? `: ${targetTitle}` : ''
      return `${displayName} ${action} issue in ${projectName}${issueTitle}`

    case 'note':
    case 'comment':
      const noteContext = targetTitle ? ` on ${targetTitle}` : ''
      return `${displayName} commented${noteContext} in ${projectName}`

    case 'tag':
      return `${displayName} created tag in ${projectName}`

    default:
      return `${displayName} ${action} in ${projectName}`
  }
}

const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `${diffInDays}d ago`
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`
  } else {
    return 'Just now'
  }
}

const ActivitiesList: React.FC<{ activities: RecentActivityDto[] }> = ({ activities }) => {
  return (
    <div>
      {activities.length === 0 ? (
        <div className="p-4 text-center">
          <Body2 state="disabled">No recent activities found</Body2>
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={`${activity.projectId}-${activity.projectName}`}
            className="flex border-b border-divider dark:border-divider-dark hover:bg-paper-elevation-2 dark:hover:bg-paper-elevation-2-dark"
          >
            <div className="p-4 w-1/12 flex items-center justify-center">{getActivityIcon(activity)}</div>
            <Tooltip title={formatActivityMessage(activity)} arrow placement="top-start" enterDelay={500} leaveDelay={200}>
              <div className="py-4 px-6 w-8/12">
                <Subtitle2 state="primary" className="overflow-hidden whitespace-nowrap text-ellipsis block">
                  {formatActivityMessage(activity)}
                </Subtitle2>
              </div>
            </Tooltip>
            <div className="py-4 px-3 w-3/12 flex items-center">
              <Body2 state="tags">{'reason' in activity.event ? 'Error' : getRelativeTime(activity.event.date)}</Body2>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ActivitiesList
