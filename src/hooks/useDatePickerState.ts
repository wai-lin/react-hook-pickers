import React from 'react'
import { set } from 'date-fns'

const dateReset = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

function useDatePickerState(defaultDate: Date) {
  const [selectedDate, setSelectedDate] = React.useState(() =>
    set(defaultDate, dateReset),
  )
  const [viewDate, setViewDate] = React.useState(() =>
    set(defaultDate, dateReset),
  )

  function reset() {
    setSelectedDate(set(defaultDate, dateReset))
    setViewDate(set(defaultDate, dateReset))
  }

  return { selectedDate, viewDate, setSelectedDate, setViewDate, reset }
}

export { useDatePickerState }
