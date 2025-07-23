import { H6 } from '@/components/Typography'
import PSButton from '@/components/PSButton'
import React from 'react'

type InfoCardProps = {
  title: string
  className?: string
  children: React.ReactNode
  onViewAll?: () => void
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className, onViewAll }) => {
  return (
    <div
      className={`bg-paper-elevation-24 dark:bg-paper-elevation-24-dark flex flex-col rounded-lg dash-card-shadow p-6 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <H6 state="primary">{title}</H6>
        {onViewAll && <PSButton label="View All" variant="secondary" onClick={onViewAll} />}
      </div>
      {children}
    </div>
  )
}

export default InfoCard
