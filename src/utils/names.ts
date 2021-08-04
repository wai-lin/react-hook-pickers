type MMMM =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
type MMM =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec'

type DDDD =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
type DDD = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
type D = 'S' | 'M' | 'T' | 'W' | 'F'

const months: Array<{ MMMM: MMMM; MMM: MMM }> = [
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
]

const daysOfWeek: Array<{ DDDD: DDDD; DDD: DDD; D: D }> = [
  { DDDD: 'Sunday', DDD: 'Sun', D: 'S' },
  { DDDD: 'Monday', DDD: 'Mon', D: 'M' },
  { DDDD: 'Tuesday', DDD: 'Tue', D: 'T' },
  { DDDD: 'Wednesday', DDD: 'Wed', D: 'W' },
  { DDDD: 'Thursday', DDD: 'Thu', D: 'T' },
  { DDDD: 'Friday', DDD: 'Fri', D: 'F' },
  { DDDD: 'Saturday', DDD: 'Sat', D: 'S' },
]

export {
  months,
  daysOfWeek,
  // types
  MMMM,
  MMM,
  DDDD,
  DDD,
  D,
}
