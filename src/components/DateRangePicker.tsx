'use client'

import React, { useEffect } from 'react'
import { Theme, useTheme } from '@/context/theme'
import { DatePicker } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'

type Props = {
  startDate: Moment
  endDate: Moment
  onStartDateChange: (date: Moment) => void
  onEndDateChange: (date: Moment) => void
  onError?: (error: string | null) => void
  focus?: boolean
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  focus = false,
  onError = () => {},
}: Props) {
  const { theme } = useTheme()
  const slotPropsSx = getDatePickerSx(theme, focus)
  const [startDateError, setStartDateError] = React.useState<string | null>(null)
  const [endDateError, setEndDateError] = React.useState<string | null>(null)

  useEffect(() => {
    const erros = [startDateError, endDateError].filter(Boolean)
    if (erros.length > 0) {
      onError(erros.join(', '))
    } else {
      onError(null)
    }
  }, [startDateError, endDateError, onError])

  return (
    <>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(date) => onStartDateChange(moment(date))}
        disableFuture
        maxDate={endDate}
        slotProps={slotPropsSx}
        showDaysOutsideCurrentMonth={false}
        onError={setStartDateError}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(date) => onEndDateChange(moment(date))}
        disableFuture
        minDate={startDate}
        slotProps={slotPropsSx}
        showDaysOutsideCurrentMonth={false}
        onError={setEndDateError}
      />
    </>
  )
}

const getDatePickerSx = (theme: Theme, focus: boolean) => {
  const inputSx = {
    transition: '0.3s',
    textTransform: 'none',
    ...(focus && {
      '& .MuiPickersInputBase-root': {
        backgroundColor: 'var(--paper-elevation-cards)',
      },
    }),
    ...(theme === Theme.Dark && {
      '& .MuiInputLabel-root:not(.Mui-error)': {
        color: 'var(--text-primary-dark)',
        '&.Mui-focused:not(.Mui-error)': {
          color: 'var(--primary-dark)',
        },
      },
      '& .MuiPickersInputBase-root': {
        color: 'var(--text-primary-dark)',
        backgroundColor: focus ? 'var(--paper-elevation-cards-dark)' : '',
      },
      '& .MuiButtonBase-root': {
        color: 'var(--text-primary-dark)',
        '&:hover': {
          backgroundColor: 'var(--icon-button-hover)',
          color: 'var(--text-primary-dark)',
        },
      },
      '& .MuiPickersOutlinedInput-notchedOutline': {
        borderColor: 'var(--divider-dark)',
      },
      '& .MuiPickersOutlinedInput-root': {
        '&.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: 'var(--primary-dark)',
        },
        '&:hover:not(.Mui-error,.Mui-focused) .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: 'var(--paper-elevation-16)',
        },
      },
    }),
  }

  const popperSx = {
    ...(theme === Theme.Dark && {
      '& .MuiPaper-root': {
        backgroundColor: 'var(--paper-elevation-2-dark)',
        color: 'var(--text-white)',
        borderRadius: '6px',
      },
      '& .MuiPickersCalendarHeader-label': {
        fontWeight: 500,
      },
      '& .MuiButtonBase-root': {
        color: 'var(--text-white)',
        '&:hover': {
          backgroundColor: 'var(--icon-button-hover)',
        },
        '&.MuiPickersDay-root': {
          '&.Mui-selected': {
            borderColor: 'var(--text-black)',
            backgroundColor: 'var(--primary-dark)',
            color: 'var(--text-black)',
            '&:hover': {
              backgroundColor: 'var(--primary)',
            },
          },
        },
        '&.MuiPickersDay-today': {
          borderColor: 'var(--white)',
        },
        '&.Mui-disabled': {
          color: 'var(--text-grey)',
        },
      },
      '& .MuiDayCalendar-weekDayLabel': {
        color: 'var(--text-primary-dark)',
      },
    }),
  }

  return {
    textField: {
      sx: inputSx,
    },
    popper: {
      sx: popperSx,
    },
  }
}
