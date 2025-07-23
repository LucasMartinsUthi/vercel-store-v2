import React from 'react'
import { TrendingDown, TrendingFlat, TrendingUp } from '@mui/icons-material'
import { Body3, Buttons3, H4 } from '@/components/Typography'

interface MetricsCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral' | 'none'
  trendValue?: string
  className?: string
}

const MetricsCard: React.FC<MetricsCardProps> = ({ icon, title, value, subtitle, trend = 'none', trendValue, className = '' }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp sx={{ width: 12, height: 12 }} />
      case 'down':
        return <TrendingDown sx={{ width: 12, height: 12 }} />
      case 'neutral':
        return <TrendingFlat sx={{ width: 12, height: 12 }} />
      default:
        return null
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success-main dark:text-success-main-dark'
      case 'down':
        return 'text-error-main dark:text-error-main-dark'
      case 'neutral':
        return 'text-warning-main dark:text-warning-main-dark'
      default:
        return 'text-text-secondary dark:text-text-secondary-dark'
    }
  }

  return (
    <div
      className={`p-4 space-x-4 flex bg-paper-elevation-24 dark:bg-paper-elevation-24-dark rounded-lg dash-card-shadow hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center">{icon}</div>

      <div className="flex flex-col space-y-2 items-start justify-center">
        <H4 state="primary">{typeof value === 'number' ? value.toLocaleString() : value}</H4>
        <Buttons3 state="primary">{title}</Buttons3>
        {(trendValue || subtitle) && (
          <div className="flex items-center -ml-2 space-x-1">
            {getTrendIcon() && <Body3 className={getTrendColor()}>{getTrendIcon()}</Body3>}
            <Body3 className={`${getTrendColor()}`}>{trendValue || subtitle}</Body3>
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard
