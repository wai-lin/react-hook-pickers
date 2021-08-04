import { months, daysOfWeek } from '../names'

describe('months object.', () => {
  it('should be in correct array of objects.', () => {
    expect(months).toEqual([
      { MMMM: 'January', MMM: 'Jan' },
      { MMMM: 'February', MMM: 'Feb' },
      { MMMM: 'March', MMM: 'Mar' },
      { MMMM: 'April', MMM: 'Apr' },
      { MMMM: 'May', MMM: 'May' },
      { MMMM: 'June', MMM: 'Jun' },
      { MMMM: 'July', MMM: 'Jul' },
      { MMMM: 'August', MMM: 'Aug' },
      { MMMM: 'September', MMM: 'Sep' },
      { MMMM: 'October', MMM: 'Oct' },
      { MMMM: 'November', MMM: 'Nov' },
      { MMMM: 'December', MMM: 'Dec' },
    ])
  })
})

describe('daysOfWeek object.', () => {
  it('should be in correct array of objects.', () => {
    expect(daysOfWeek).toEqual([
      { DDDD: 'Sunday', DDD: 'Sun', D: 'S' },
      { DDDD: 'Monday', DDD: 'Mon', D: 'M' },
      { DDDD: 'Tuesday', DDD: 'Tue', D: 'T' },
      { DDDD: 'Wednesday', DDD: 'Wed', D: 'W' },
      { DDDD: 'Thursday', DDD: 'Thu', D: 'T' },
      { DDDD: 'Friday', DDD: 'Fri', D: 'F' },
      { DDDD: 'Saturday', DDD: 'Sat', D: 'S' },
    ])
  })
})
