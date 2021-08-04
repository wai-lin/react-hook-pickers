import {
  getDate,
  getDay,
  setDate,
  startOfMonth,
  endOfMonth,
  format,
  set,
} from 'date-fns'

// #region @types
type DateNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
// #endregion

/** compatible with `date-fns` */
const dateFormatString = 'yyyy-MM-dd'

function tempDateMaker(month: Month, year: number) {
  return new Date(year, month, 1, 0, 0, 0, 0)
}

/**
 * reset {hours,minutes,seconds,milliseconds} of given date to 0
 */
function resetTimeOfDate(date: Date) {
  return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
}

/**
 * prefix date with 0 if date is less than 10
 * @param date 1 - 31
 */
function dateStringZeroPreFixer(date: DateNumber) {
  return date < 10 ? `0${date}` : `${date}`
}

/**
 * get dates array of provided month and year
 * @param month 1 to 12
 * @param year FullYear
 */
function datesOfMonth(month: Month, year: number) {
  const tmpDate = tempDateMaker(month, year)
  const endDate = getDate(endOfMonth(tmpDate))
  return Array(endDate)
    .fill(null)
    .map((_d, idx) => ({
      date: (idx + 1) as DateNumber,
      dateString: format(setDate(tmpDate, idx + 1), dateFormatString),
      day: getDay(setDate(tmpDate, idx + 1)),
    }))
}

/**
 * get last fill up dates of previous month for the provided month and year.
 * Eg.
 * ```
 * fillUpDatesOfPrevMonth(5, 2020) // return `26 to 30 dates of April 2020`
 * ```
 * @param month 1 to 12
 * @param year FullYear
 */
function fillUpDatesOfPrevMonth(month: Month, year: number) {
  const tmpDate = tempDateMaker(month, year)
  const startDay = getDay(startOfMonth(tmpDate))
  if (startDay === 0) return []

  const prevMonth = (month - 1) as Month
  const datesOfPrevMonth = datesOfMonth(prevMonth, year)
  return datesOfPrevMonth.slice(-startDay)
}

/**
 * get first fill up dates of next month for the provided month and year.
 * Eg.
 * ```
 * fillUpDatesOfNextMonth(5, 2020) // return `1 to 6 dates of June 2020`
 * ```
 * @param month 1 to 12
 * @param year FullYear
 */
function fillUpDatesOfNextMonth(month: Month, year: number) {
  const tmpDate = tempDateMaker(month, year)
  const endDay = getDay(endOfMonth(tmpDate))
  if (endDay === 6) return []

  const nextMonth = (month + 1) as Month
  const datesOfPrevMonth = datesOfMonth(nextMonth, year)
  return datesOfPrevMonth.slice(0, 6 - endDay)
}

export {
  dateFormatString,
  resetTimeOfDate,
  dateStringZeroPreFixer,
  datesOfMonth,
  fillUpDatesOfPrevMonth,
  fillUpDatesOfNextMonth,
  // types
  Month,
  DateNumber,
}
