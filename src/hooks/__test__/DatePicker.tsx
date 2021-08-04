import * as React from 'react'
import { format } from 'date-fns'
// hooks
import { useDatePicker } from '../useDatePicker'
import { useDatePickerState } from '../useDatePickerState'

const DatePicker: React.FunctionComponent<{ initialDate: Date }> = ({
  initialDate,
}) => {
  const datePickerState = useDatePickerState(initialDate)
  const { getCalendarProps, getCalendarViewControllers } = useDatePicker(
    datePickerState,
  )

  const CalendarContainer: React.FC = ({ children }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 40px)',
        gridAutoRows: '40px',
        rowGap: '4px',
      }}
    >
      {children}
    </div>
  )

  const CalendarController: React.FC = ({ children }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px',
      }}
    >
      {children}
    </div>
  )

  const {
    daysOfWeek,
    datesOfMonthBtnProps,
    fillUpDatesOfPrevMonthBtnProps,
    fillUpDatesOfNextMonthBtnProps,
  } = getCalendarProps()

  const {
    goToMonth,
    goToYear,
    goToNextMonth,
    goToPrevMonth,
    goToSelectedDate,
    goToToday,
    resetCalendarView,
  } = getCalendarViewControllers()

  return (
    <div>
      <div>
        <label>
          Selected Date: {format(datePickerState.selectedDate, 'yyyy-MM-dd')}
        </label>
        <label>
          View Date: {format(datePickerState.viewDate, 'yyyy-MM-dd')}
        </label>
      </div>
      <CalendarController>
        <button onClick={() => goToMonth(2)}>Go to February</button>
        <button onClick={() => goToYear(2018)}>Go to 2018</button>
        <button onClick={goToPrevMonth}>Prev Month</button>
        <button onClick={goToNextMonth}>Next Month</button>
        <button onClick={goToSelectedDate}>Go to Selected Date</button>
        <button onClick={goToToday}>Go to Today</button>
        <button onClick={resetCalendarView}>Reset to Initial Date</button>
      </CalendarController>
      <CalendarContainer>
        {/* Sun, Mon, Tue, ..., Sat */}
        {daysOfWeek.map(d => (
          <span key={d.DDDD}>{d.DDD}</span>
        ))}
        {/* Dates In Month */}
        {fillUpDatesOfPrevMonthBtnProps({}).map(
          ({ date, dateString, day, isToday, isSelected, ...d }) => (
            <button {...d} value={JSON.stringify({ isSelected, isToday })} />
          ),
        )}
        {datesOfMonthBtnProps({}).map(
          ({ date, dateString, day, isToday, isSelected, ...d }) => (
            <button
              style={{ width: '40px', height: '40px' }}
              {...d}
              value={JSON.stringify({ isSelected, isToday })}
            />
          ),
        )}
        {fillUpDatesOfNextMonthBtnProps({}).map(
          ({ date, dateString, day, isToday, isSelected, ...d }) => (
            <button {...d} value={JSON.stringify({ isSelected, isToday })} />
          ),
        )}
      </CalendarContainer>
    </div>
  )
}

export { DatePicker }
