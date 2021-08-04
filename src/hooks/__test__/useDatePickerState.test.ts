import { renderHook, act } from '@testing-library/react-hooks'
import { set, add } from 'date-fns'
import { useDatePickerState } from '../useDatePickerState'

const dateReset = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

describe('useDatePickerState hook.', () => {
  describe('reset func.', () => {
    it('should reset back to provided date.', () => {
      const now = set(new Date(), dateReset)
      const { result } = renderHook(() => useDatePickerState(now))

      expect(result.current.selectedDate.toDateString()).toEqual(
        now.toDateString(),
      )
      expect(result.current.viewDate.toDateString()).toEqual(now.toDateString())

      // add days 1
      const nextDay = add(now, { days: 1 }).toDateString()
      act(() => {
        result.current.setSelectedDate(add(now, { days: 1 }))
        result.current.setViewDate(add(now, { days: 1 }))
      })
      expect(result.current.selectedDate.toDateString()).toEqual(nextDay)
      expect(result.current.viewDate.toDateString()).toEqual(nextDay)

      // reset
      act(() => {
        result.current.reset()
      })
      expect(result.current.selectedDate.toDateString()).toEqual(
        now.toDateString(),
      )
      expect(result.current.viewDate.toDateString()).toEqual(now.toDateString())
    })
  })
})
