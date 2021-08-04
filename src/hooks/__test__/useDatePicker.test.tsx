// lib
import React from 'react'
import { format, set } from 'date-fns'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// scripts
import { dateFormatString } from '../../utils'
// mock
import { DatePicker } from '../__mock__/DatePicker'

// 20th May 2020
const initialDate = new Date(2020, 4, 20, 0, 0, 0, 0)

describe('useDatePicker with DatePicker __mock__.', () => {
  describe('Calendar Controller funcs.', () => {
    it('should provide the `initialDate` correctly.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-05-20`)

      expect(screen.getByTestId('2020-05-01').textContent).toBe('01')
      expect(screen.getByTestId('2020-05-31').textContent).toBe('31')
    })

    it('should go to February 2020, on `Go to February` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const goToFebruaryBtn = screen.getByRole('button', {
        name: /go to february/i,
      })

      userEvent.click(goToFebruaryBtn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-02-20`)

      expect(screen.getByTestId('2020-02-01').textContent).toBe('01')
      expect(screen.getByTestId('2020-02-29').textContent).toBe('29')
    })

    it('should go to 2018, on `Go to 2018` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const goTo2018Btn = screen.getByRole('button', {
        name: /go to 2018/i,
      })

      userEvent.click(goTo2018Btn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2018-05-20`)

      expect(screen.getByTestId('2018-05-01').textContent).toBe('01')
      expect(screen.getByTestId('2018-05-31').textContent).toBe('31')
    })

    it('should change to June 2020, on `Next Month` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const nextMonthBtn = screen.getByRole('button', { name: /next month/i })

      userEvent.click(nextMonthBtn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-06-20`)

      expect(screen.getByTestId('2020-06-01').textContent).toBe('01')
      expect(screen.getByTestId('2020-06-30').textContent).toBe('30')
    })

    it('should change to April 2020, on `Prev Month` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const prevMonthBtn = screen.getByRole('button', { name: /prev month/i })

      userEvent.click(prevMonthBtn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-04-20`)

      expect(screen.getByTestId('2020-04-01').textContent).toBe('01')
      expect(screen.getByTestId('2020-04-30').textContent).toBe('30')
    })

    it('should go to May 2020, on `Go to Selected Date` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const goToSelectedDateBtn = screen.getByRole('button', {
        name: /go to selected date/i,
      })

      userEvent.click(goToSelectedDateBtn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-05-20`)

      expect(screen.getByTestId('2020-05-01').textContent).toBe('01')
      expect(screen.getByTestId('2020-05-31').textContent).toBe('31')
    })

    it('should go to `Today` date, on `Go to Today` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      const goToTodayBtn = screen.getByRole('button', {
        name: /go to today/i,
      })

      userEvent.click(goToTodayBtn)
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(
        `View Date: ${format(new Date(), dateFormatString)}`,
      )
    })

    it('should reset `selectedDate` and `viewDate` to `initialDate`, on `Reset to Initial Date` clicked.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      // next month
      userEvent.click(
        screen.getByRole('button', {
          name: /next month/i,
        }),
      )
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-06-20`)

      // reset to initial date
      userEvent.click(
        screen.getByRole('button', {
          name: /reset to initial date/i,
        }),
      )
      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-05-20`)
    })
  })

  describe('Date Buttons props.', () => {
    it('should change `selectedDate` on click and `isSelected` should be true.', () => {
      render(<DatePicker initialDate={initialDate} />)

      const selectedDateLabel = screen.getByText(/selected date:/i)
      const viewDateLabel = screen.getByText(/view date:/i)

      expect(selectedDateLabel.textContent).toBe(`Selected Date: 2020-05-20`)
      expect(viewDateLabel.textContent).toBe(`View Date: 2020-05-20`)

      userEvent.click(screen.getByTestId('2020-05-01'))

      expect(selectedDateLabel.textContent).toBe('Selected Date: 2020-05-01')
      expect(screen.getByTestId('2020-05-01').getAttribute('value')).toBe(
        '{"isSelected":true,"isToday":false}',
      )
    })

    it('`isToday` should be true on today date.', () => {
      const today = set(new Date(), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })
      render(<DatePicker initialDate={today} />)

      expect(
        screen
          .getByTestId(format(today, dateFormatString))
          .getAttribute('value'),
      ).toBe('{"isSelected":true,"isToday":true}')
    })
  })
})
