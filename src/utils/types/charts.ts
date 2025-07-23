import { BarSeriesType } from '@mui/x-charts'

export type SeriesBarType = Pick<BarSeriesType, 'label' | 'data' | 'color'>

export type ProjectStatsChartProps = {
  labels: string[]
  series: SeriesBarType[]
}
