import React from 'react'
import { H6 } from './Typography'
import { ContentPasteOff } from '@mui/icons-material'
import { Theme, useTheme } from '@/context/theme'

interface EmptyListProps {
  message?: string
  icon?: React.ReactNode
}

const EmptyList: React.FC<EmptyListProps> = ({ message = 'No items to display.' }) => {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-2">
      <ContentPasteOff className={theme === Theme.Dark ? 'text-(--text-primary-dark)' : 'text-(--text-primary)'} />
      <H6 state="primary">{message}</H6>
    </div>
  )
}

export default EmptyList
