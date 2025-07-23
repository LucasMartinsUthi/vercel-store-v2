'use client'

import React, { useCallback } from 'react'
import { SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material'
import moment, { Moment } from 'moment'

import { Theme, useTheme } from '@/context/theme'

import { Buttons4 } from '@/components/Typography'
import DateRangePicker from '@/components/DateRangePicker'

export enum DateFilter {
  PastWeek = 'Past Week',
  LastMonth = 'Last Month',
  LastYear = 'Last Year',
}

type Props = {
  endDate: Moment
  startDate: Moment
  error?: string | null
  dateFilter: DateFilter | undefined
  onEndDateChange: (date: Moment) => void
  onError?: (error: string | null) => void
  onStartDateChange: (date: Moment) => void
  onDateFilterChange: (filter: DateFilter | undefined) => void
}

const DateFilters = ({
  endDate,
  startDate,
  dateFilter,
  error = null,
  onEndDateChange,
  onStartDateChange,
  onDateFilterChange,
  onError = () => {},
}: Props) => {
  const { theme } = useTheme()
  const globalSx = getGlobalSx(theme)

  const handleChange = useCallback(
    (newFilter: DateFilter) => {
      switch (newFilter) {
        case DateFilter.PastWeek:
          onStartDateChange(moment().subtract(7, 'days'))
          break
        case DateFilter.LastMonth:
          onStartDateChange(moment().subtract(1, 'month'))
          break
        case DateFilter.LastYear:
          onStartDateChange(moment().subtract(1, 'year'))
          break
      }
      onEndDateChange(moment())
      onDateFilterChange(newFilter)
    },
    [onStartDateChange, onEndDateChange]
  )

  const handleStartDateChange = useCallback(
    (date: Moment) => {
      onDateFilterChange(undefined)
      onStartDateChange(date)
    },
    [onStartDateChange]
  )

  const handleEndDateChange = useCallback(
    (date: Moment) => {
      onDateFilterChange(undefined)
      onEndDateChange(date)
    },
    [onEndDateChange]
  )

  return (
    <div className="flex gap-4">
      <DateRangePicker
        startDate={startDate}
        onStartDateChange={handleStartDateChange}
        endDate={endDate}
        onEndDateChange={handleEndDateChange}
        focus={!dateFilter && !error}
        onError={onError}
      />
      <ToggleButtonGroup exclusive value={dateFilter} onChange={(_, value) => handleChange(value)} aria-label="text alignment">
        <ToggleButton sx={globalSx} value={DateFilter.PastWeek} aria-label="past week">
          <Buttons4 state="primary">Past Week</Buttons4>
        </ToggleButton>
        <ToggleButton sx={globalSx} value={DateFilter.LastMonth} aria-label="last month">
          <Buttons4 state="primary">Last Month</Buttons4>
        </ToggleButton>
        <ToggleButton sx={globalSx} value={DateFilter.LastYear} aria-label="last year">
          <Buttons4 state="primary">Last Year</Buttons4>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

const getGlobalSx = (theme: Theme): SxProps => ({
  transition: '0.3s',
  textTransform: 'none',
  borderColor: theme === Theme.Dark ? 'var(--divider-dark)' : 'var(--divider)',
  '&.Mui-selected': {
    color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
    backgroundColor: theme === Theme.Dark ? 'var(--paper-elevation-cards-dark)' : 'var(--paper-elevation-cards)',
    '&:hover': {
      opacity: '50%',
      backgroundColor: theme === Theme.Dark ? 'var(--paper-elevation-cards-dark)' : 'var(--paper-elevation-cards)',
    },
  },
  '&:hover': {
    opacity: '50%',
  },
})

export default DateFilters
