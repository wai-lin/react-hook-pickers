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

function useDatePicker({
  selectedDate,
  setSelectedDate,
  viewDate,
  setViewDate,
  reset,
}: ReturnType<typeof useDatePickerState>) {
  const today = resetTimeOfDate(new Date())

  /**
   * props for building the Calendar UI
   */
  function getCalendarProps() {
    // viewDate
    const viewDateMonth = getMonth(viewDate) as Month
    const viewDateYear = getYear(viewDate)

    // #region calendar UI providers
    const datesOfMonthBtnProps = ({ onClick, btnProps }: CalendarBtnProps) => {
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

    const fillUpDatesOfPrevMonthBtnProps = ({
      onClick,
      btnProps,
    }: CalendarBtnProps) => {
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

    const fillUpDatesOfNextMonthBtnProps = ({
      onClick,
      btnProps,
    }: CalendarBtnProps) => {
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
   * funcs to control the Calendar UI
   */
  function getCalendarViewControllers() {
    const goToMonth = (month: Month) =>
      setViewDate(set(viewDate, { month: month }))
    const goToYear = (year: number) =>
      setViewDate(set(viewDate, { year: year }))
    const goToPrevMonth = () => setViewDate(sub(viewDate, { months: 1 }))
    const goToNextMonth = () => setViewDate(add(viewDate, { months: 1 }))
    const goToToday = () => setViewDate(today)
    const goToSelectedDate = () => setViewDate(selectedDate)
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
