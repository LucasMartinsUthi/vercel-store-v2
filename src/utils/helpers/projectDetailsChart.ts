import moment from 'moment'
import { ProjectStatsChartProps } from '../types/charts'
import { ProjectCommitDto } from '@/dtos/projects/ProjectCommit.dto'
import { ProjectMergeRequestDto } from '@/dtos/projects/ProjectMergeRequest.dto'
import { ProjectDetailsChartTimelineGranularity } from '@/dtos/projects/ProjectDetailsChartTimeline.dto'

/**
 * Converts a timeline object with commit and merge request counts into chart data.
 * @param timeline Timeline data with commits and merge requests
 * @returns Object containing labels and series for the chart
 */
export function formatTimelineToChartData(
  commits: ProjectCommitDto[] | undefined,
  mergeRequests: ProjectMergeRequestDto[] | undefined,
  since: string,
  until: string
): ProjectStatsChartProps {
  // Determine granularity based on date range
  const granularity = calculateGranularity(since, until)

  // Ensure arrays are defined
  const safeCommits = Array.isArray(commits) ? commits : []
  const safeMergeRequests = Array.isArray(mergeRequests) ? mergeRequests : []

  // Group commits and merge requests by period
  const commitCounts = groupByPeriod(safeCommits, 'committedDate', granularity)
  const mrCounts = groupByPeriod(safeMergeRequests, 'createdAt', granularity)

  // Collect all period labels and sort them chronologically
  const allLabelsSet = new Set([...Object.keys(commitCounts), ...Object.keys(mrCounts)])
  const allLabels = Array.from(allLabelsSet)

  // Sort labels by date (parse from label using getPeriodLabel's logic)
  allLabels.sort((a, b) => {
    // For ranges like '01–03 Jan', take the first part
    const parseLabel = (label: string) => {
      const firstPart = label.split('–')[0]
      return moment(firstPart + label.slice(-5), ['DD MMM', 'MMM YYYY', 'DD MMM'])
    }
    return parseLabel(a).valueOf() - parseLabel(b).valueOf()
  })

  // Prepare data arrays
  const commitData = allLabels.map((label) => commitCounts[label] || 0)
  const mrData = allLabels.map((label) => mrCounts[label] || 0)

  const series = [
    {
      label: 'Commits',
      data: commitData,
      color: '#D1D5DB',
    },
    {
      label: 'Merge Requests',
      data: mrData,
      color: '#1E3A8A',
    },
  ]

  return { labels: allLabels, series }
}

/**
 * Calculates the appropriate timeline granularity for project details charts based on the date range.
 *
 * @param since - The start date of the range (ISO string).
 * @param until - The end date of the range (ISO string).
 * @returns The timeline granularity as one of: 'day', '3days', 'week', 'biweekly', or 'month'.
 */
export function calculateGranularity(since: string, until: string): ProjectDetailsChartTimelineGranularity {
  const diffInDays = (moment(until).valueOf() - moment(since).valueOf()) / (1000 * 60 * 60 * 24)

  if (diffInDays <= 7) return 'day'
  if (diffInDays <= 14) return '3days'
  if (diffInDays <= 30) return 'week'
  if (diffInDays <= 60) return 'biweekly'
  return 'month'
}

/**
 * Returns a formatted label for a given date string based on the specified granularity.
 *
 * @param dateStr - The date string to format.
 * @param granularity - The granularity of the period. Supported values are:
 *   - 'day': Formats as 'DD MMM'.
 *   - '3days': Formats as a 3-day range, e.g., '01–03 Jan'.
 *   - 'week': Formats as a week range, e.g., '01–07 Jan'.
 *   - 'biweekly': Formats as a half-month range, e.g., '01–15 Jan' or '16–31 Jan'.
 *   - 'month': Formats as 'MMM YYYY'.
 *   - Any other value defaults to 'DD MMM'.
 * @returns The formatted period label as a string.
 */
export function getPeriodLabel(dateStr: string, granularity: string): string {
  const date = moment(dateStr)

  switch (granularity) {
    case 'day': {
      return date.startOf('day').format('DD MMM')
    }
    case '3days': {
      const base = date.clone().startOf('day')
      const day = base.date()
      const offset = Math.floor((day - 1) / 3) * 3 + 1
      const start = base.clone().date(offset)
      const end = start.clone().add(2, 'days')
      return `${start.format('DD')}–${end.format('DD MMM')}`
    }
    case 'week': {
      const start = date.clone().startOf('isoWeek')
      const end = start.clone().add(6, 'days')
      return `${start.format('DD')}–${end.format('DD MMM')}`
    }
    case 'biweekly': {
      const isFirstHalf = date.date() <= 15
      const start = date.clone().date(isFirstHalf ? 1 : 16)
      const end = isFirstHalf ? date.clone().date(15) : date.clone().endOf('month')
      return `${start.format('DD')}–${end.format('DD MMM')}`
    }
    case 'month': {
      return date.clone().startOf('month').format('MMM YYYY')
    }
    default:
      return date.format('DD MMM')
  }
}

/**
 * Groups an array of objects by a specified date field and granularity, returning a record
 * where each key is a period label and each value is the count of items in that period.
 *
 * @template T - The type of objects in the input data array.
 * @param data - The array of objects to group.
 * @param dateField - The key of the date field in each object to use for grouping.
 * @param granularity - The granularity to use for grouping (e.g., 'day', 'month', 'year').
 * @returns A record mapping period labels to the count of items in each period.
 */
export function groupByPeriod<T extends { [key: string]: any }>(
  data: T[],
  dateField: keyof T,
  granularity: string
): Record<string, number> {
  const result: Record<string, number> = {}
  for (const item of data) {
    const rawDate = item[dateField]
    if (typeof rawDate !== 'string') continue
    const label = getPeriodLabel(rawDate, granularity)
    result[label] = (result[label] || 0) + 1
  }
  return result
}
