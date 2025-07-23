import moment from 'moment'

/**
 * Converts a number of days ago to a Date object.
 * @param daysAgo Number of days ago (0 = today)
 * @returns Date object representing that day
 */
export function daysAgoToDate(daysAgo: number): Date {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - daysAgo)
  return date
}

/**
 * Calculates how many days ago a given date was from today.
 * @param date Date to compare
 * @returns Number of days ago (0 = today)
 */
export function dateToDaysAgo(date: Date): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = new Date(date)
  compareDate.setHours(0, 0, 0, 0)
  const diffMs = today.getTime() - compareDate.getTime()
  return `${Math.floor(diffMs / (1000 * 60 * 60 * 24))}d ago`
}

/**
 * Formats a last activity date string into a human-readable format.
 * @param lastActivity ISO date string or null
 * @returns Formatted string (e.g. "Today", "1d ago", "2mo ago", etc.)
 */
export const formatLastActivity = (lastActivity: string | null) => {
  if (!lastActivity) return 'N/A'

  const now = new Date()
  const diffInMs = now.getTime() - new Date(lastActivity).getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return '1d ago'
  if (diffInDays < 30) return `${diffInDays}d ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`
  return `${Math.floor(diffInDays / 365)}y ago`
}

export const monthValueFormatter = (value: string) => moment(value, 'YYYY-MM').format('MMM')

/**
 * Returns a human-readable relative time string (e.g., "2d ago", "5h ago", "10m ago", "Just now")
 * based on the difference between the current time and the provided date string.
 *
 * @param dateString - The date string to compare with the current time.
 * @returns A string representing the relative time since the given date.
 */
export const getRelativeTime = (dateString: string): string => {
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
