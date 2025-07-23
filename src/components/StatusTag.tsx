import React from 'react'
import { Caption } from '@/components/Typography'
import { capitalize } from '@/utils/functions/strings'

export const getStatusState = (status: string): StatusTagState => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'success'
    case 'failed':
      return 'error'
    case 'canceled':
    case 'manual':
      return 'warning'
    case 'running':
    case 'pending':
    case 'created':
    default:
      return 'info'
  }
}

export type StatusTagState = 'info' | 'success' | 'error' | 'warning'

export type StatusTagProps = {
  status: string
  state: StatusTagState
}

const StatusTag: React.FC<StatusTagProps> = ({ status, state }) => {
  const stateBackgroundClasses: Record<StatusTagState, string> = {
    info: 'bg-alert-info-background dark:bg-alert-info-background-dark',
    success: 'bg-alert-success-background dark:bg-alert-success-background-dark',
    error: 'bg-alert-error-background dark:bg-alert-error-background-dark',
    warning: 'bg-alert-warning-background dark:bg-alert-warning-background-dark',
  }

  const stateTextClasses: Record<StatusTagState, string> = {
    info: 'text-alert-info-color dark:text-alert-info-color-dark',
    success: 'text-alert-success-color dark:text-alert-success-color-dark',
    error: 'text-alert-error-color dark:text-alert-error-color-dark',
    warning: 'text-alert-warning-color dark:text-alert-warning-color-dark',
  }

  const stateDotBackgroundClasses: Record<StatusTagState, string> = {
    info: 'bg-alert-info-color dark:bg-alert-info-color-dark',
    success: 'bg-alert-success-color dark:bg-alert-success-color-dark',
    error: 'bg-alert-error-color dark:bg-alert-error-color-dark',
    warning: 'bg-alert-warning-color dark:bg-alert-warning-color-dark',
  }

  return (
    <span className={`px-2 py-0.5 flex gap-1 items-center rounded-2xl ${stateBackgroundClasses[state]}`}>
      <span className={`w-2 aspect-square rounded-full ${stateDotBackgroundClasses[state]}`} />
      <Caption className={`w-full text-center ${stateTextClasses[state]}`}>{capitalize(status)}</Caption>
    </span>
  )
}

export default StatusTag
