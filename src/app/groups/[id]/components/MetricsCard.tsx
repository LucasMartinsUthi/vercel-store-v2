import { H4, Overline2 } from '@/components/Typography'
import React from 'react'

type MetricsCardProps = {
  title: string
  value: number | string
  icon: React.ReactNode
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="space-y-2.5 flex flex-col p-6 items-start justify-center bg-paper-elevation-24 dark:bg-paper-elevation-24-dark rounded-lg dash-card-shadow">
      {icon}
      <H4 state="hovers">{value}</H4>
      <Overline2 state="primary">{title}</Overline2>
    </div>
  )
}

export default MetricsCard
