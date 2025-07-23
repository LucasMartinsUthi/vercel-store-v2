import React from 'react'
import { Subtitle1, Subtitle2 } from './Typography'

export interface MetricsCardProps {
  title: string
  value: string | number
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value }) => (
  <div className="flex flex-col gap-5 items-start justify-end py-8 px-6 w-fit bg-paper-elevation-cards dark:bg-paper-elevation-cards-dark min-w-44 min-h-28 rounded-lg">
    <Subtitle1 state="hovers">{title}</Subtitle1>
    <Subtitle2 state="primary">{value}</Subtitle2>
  </div>
)

export default MetricsCard
