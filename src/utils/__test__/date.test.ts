import {
  dateStringZeroPreFixer,
  datesOfMonth,
  fillUpDatesOfPrevMonth,
  fillUpDatesOfNextMonth,
  DateNumber,
} from '../date'

describe('dateStringZeroPreFixer func.', () => {
  it('should prefix zero if date is less than 10', () => {
    let date = 9 as DateNumber
    expect(dateStringZeroPreFixer(date)).toBe('09')
    date = 30
    expect(dateStringZeroPreFixer(date)).toBe('30')
  })
})

describe('datesOfMonth func.', () => {
  it('should get correct dates length.', () => {
    // May 2020
    let dates = datesOfMonth(5, 2020)
    expect(dates.length).toBe(31)
    // Feb 2020
    dates = datesOfMonth(2, 2020)
    expect(dates.length).toBe(29)
    // Jun 2020
    dates = datesOfMonth(6, 2020)
    expect(dates.length).toBe(30)
    // Feb 2019
    dates = datesOfMonth(2, 2019)
    expect(dates.length).toBe(28)
  })
})

describe('fillUpDatesOfPrevMonth func.', () => {
  it("should get correct prev month's last sliced dates.", () => {
    // Apr 2020, Prev month of May 2020
    let dates = fillUpDatesOfPrevMonth(5, 2020)
    expect(dates.length).toBe(5)
    expect(dates).toEqual([
      {
        date: 26,
        dateString: '2020-04-26',
        day: 0,
      },
      {
        date: 27,
        dateString: '2020-04-27',
        day: 1,
      },
      {
        date: 28,
        dateString: '2020-04-28',
        day: 2,
      },
      {
        date: 29,
        dateString: '2020-04-29',
        day: 3,
      },
      {
        date: 30,
        dateString: '2020-04-30',
        day: 4,
      },
    ])
  })
})

describe('fillUpDatesOfNextMonth func.', () => {
  it("should get correct next month's first sliced dates.", () => {
    // Jun 2020, Prev month of May 2020
    let dates = fillUpDatesOfNextMonth(5, 2020)
    expect(dates.length).toBe(6)
    expect(dates).toEqual([
      {
        date: 1,
        dateString: '2020-06-01',
        day: 1,
      },
      {
        date: 2,
        dateString: '2020-06-02',
        day: 2,
      },
      {
        date: 3,
        dateString: '2020-06-03',
        day: 3,
      },
      {
        date: 4,
        dateString: '2020-06-04',
        day: 4,
      },
      {
        date: 5,
        dateString: '2020-06-05',
        day: 5,
      },
      {
        date: 6,
        dateString: '2020-06-06',
        day: 6,
      },
    ])
  })
})
