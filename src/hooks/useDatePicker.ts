// libs
import React from 'react'
import { useDatePickerState } from './useDatePickerState'
import { getMonth, getYear, format, sub, add, set } from 'date-fns'
// helpers
import {
  // types
  Month,
  // date
  dateFormatString,
  resetTimeOfDate,
  datesOfMonth,
  fillUpDatesOfNextMonth,
  fillUpDatesOfPrevMonth,
  // names
  months,
  daysOfWeek,
  dateStringZeroPreFixer,
} from '../utils'

type CalendarBtnProps = {
  onClick?: (d: ReturnType<typeof datesOfMonth>[0]) => void
  btnProps?: Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>
}

function useDatePicker(datePickerState: ReturnType<typeof useDatePickerState>) {
  const {
    selectedDate,
    setSelectedDate,
    viewDate,
    setViewDate,
    reset,
  } = datePickerState

  const today = resetTimeOfDate(new Date())

  /**
   * props for building the Calendar UI
   */
  function getCalendarProps() {
    // viewDate
    const viewDateMonth = getMonth(viewDate) as Month
    const viewDateYear = getYear(viewDate)

    // #region calendar UI providers

    /**
     * Provide button props for all the dates of the current `viewDate`.
     */
    const datesOfMonthBtnProps = (config: CalendarBtnProps = {}) => {
      const { onClick, btnProps } = config
      return datesOfMonth(viewDateMonth, viewDateYear).map(d => ({
        ...btnProps,
        ...d,
        key: d.dateString,
        id: d.dateString,
        'data-testid': d.dateString,
        'data-day': d.day,
        'data-date': d.dateString,
        children: dateStringZeroPreFixer(d.date),
        isToday: format(today, dateFormatString) === d.dateString,
        isSelected: format(selectedDate, dateFormatString) === d.dateString,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          const dataDateAttr = e.currentTarget.getAttribute('data-date')
          const currentBtnDate = dataDateAttr && new Date(dataDateAttr)
          currentBtnDate instanceof Date && setSelectedDate(currentBtnDate)
          onClick && onClick(d)
        },
      }))
    }

    /**
     * Provide button props for the previous month's of current `viewDate`'s month.
     *
     * NOTE: Only return end dates of previous month not the whole month.
     */
    const fillUpDatesOfPrevMonthBtnProps = (config: CalendarBtnProps = {}) => {
      const { onClick, btnProps } = config
      return fillUpDatesOfPrevMonth(viewDateMonth, viewDateYear).map(d => ({
        ...btnProps,
        ...d,
        key: d.dateString,
        id: d.dateString,
        'data-testid': d.dateString,
        'data-day': d.day,
        'data-date': d.dateString,
        children: dateStringZeroPreFixer(d.date),
        isToday: format(today, dateFormatString) === d.dateString,
        isSelected: format(selectedDate, dateFormatString) === d.dateString,
        onClick: () => {
          onClick && onClick(d)
        },
      }))
    }

    /**
     * Provide button props for the next month's of current `viewDate`'s month.
     *
     * NOTE: Only return start dates of next month not the whole month.
     */
    const fillUpDatesOfNextMonthBtnProps = (config: CalendarBtnProps = {}) => {
      const { onClick, btnProps } = config
      return fillUpDatesOfNextMonth(viewDateMonth, viewDateYear).map(d => ({
        ...btnProps,
        ...d,
        key: d.dateString,
        id: d.dateString,
        'data-testid': d.dateString,
        'data-day': d.day,
        'data-date': d.date,
        children: dateStringZeroPreFixer(d.date),
        isToday: format(today, dateFormatString) === d.dateString,
        isSelected: format(selectedDate, dateFormatString) === d.dateString,
        onClick: () => {
          onClick && onClick(d)
        },
      }))
    }
    // #endregion

    return {
      daysOfWeek,
      months,
      datesOfMonthBtnProps,
      fillUpDatesOfPrevMonthBtnProps,
      fillUpDatesOfNextMonthBtnProps,
    }
  }

  /**
   * Functions to control the Calendar UI
   */
  function getCalendarViewControllers() {
    /** set `viewDate` to the provided month */
    const goToMonth = (month: Month) =>
      setViewDate(set(viewDate, { month: month }))
    /** set `viewDate` to the provided year */
    const goToYear = (year: number) =>
      setViewDate(set(viewDate, { year: year }))
    /** set `viewDate` to the previous month */
    const goToPrevMonth = () => setViewDate(sub(viewDate, { months: 1 }))
    /** set `viewDate` to the next month */
    const goToNextMonth = () => setViewDate(add(viewDate, { months: 1 }))
    /** set `viewDate` to `today` */
    const goToToday = () => setViewDate(today)
    /** set `viewDate` to same as `selectedDate` */
    const goToSelectedDate = () => setViewDate(selectedDate)
    /** reset `selectedDate` and `viewDate` to the `initialDate`. */
    const resetCalendarView = () => reset()

    return {
      goToMonth,
      goToYear,
      goToPrevMonth,
      goToNextMonth,
      goToToday,
      goToSelectedDate,
      resetCalendarView,
    }
  }

  return { today, getCalendarProps, getCalendarViewControllers }
}

export { useDatePicker }
