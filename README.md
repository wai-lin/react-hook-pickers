# React Hook Pickers

`react-hook-pickers` provide hooks for building Custom Date Picker UI without worrying about handling states. This library is inspired by [`react-hook-form`](https://react-hook-form.com/), [`downshift`](https://www.downshift-js.com/).

---

# Installation

`npm i react-hook-pickers`

# Usage

### DatePicker

`react-hook-pickers` gives two primitive hooks for building date pickers,
`useDatePickerState` and `useDatePicker`.

#### `useDatePickerState`

`useDatePickerState` exposes the necessary states that `useDatePicker` is needed. You can also control the states exposed by `useDatePickerState` hook too.

```tsx
import { useDatePickerState } from 'react-hook-pickers'

const initialDate = new Date()
const datePickerStates = useDatePickerState(initialDate)
```

#### `useDatePicker`

This is the actual UI building block for the date picker. It exposes `getCalendarProps` and `getCalendarViewControllers` functions to build the DatePicker UI. `getCalendarProps` will give you the necessary data and props that is needed to build a Calendar UI. `getCalendarViewControllers` will give you the utilities functions to control the Calendar UI. While `getCalendarViewControllers` is not necessary if you know what you are doing, you can directly control the states given by the `useDatePickerState`.

```tsx
import { useDatePickerState, useDatePicker } from 'react-hook-pickers'

const initialDate = new Date()
const datePickerStates = useDatePickerState(initialDate)
const { getCalendarProps, getCalendarViewControllers } = useDatePicker(
  datePickerStates,
)
```

## Example

[![Edit react-hook-pickers__examples](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hook-pickers-examples-2c7ex?fontsize=14&hidenavigation=1&theme=dark)

<iframe src="https://codesandbox.io/embed/react-hook-pickers-examples-2c7ex?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
  title="react-hook-pickers__examples"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

---

# API

- `useDatePickerState` function, required parameter `Date` object as initial date.

```ts
// useDatePickerState hook return values
selectedDate: Date;
viewDate: Date;
setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
setViewDate: React.Dispatch<React.SetStateAction<Date>>;
reset: () => void;
```

- `useDatePicker` function, required return values of `useDatePickerState`.

```ts
// useDatePicker hook return values
getCalendarProps: () => {
    daysOfWeek: {
        DDDD: DDDD;
        DDD: DDD;
        D: D;
    }[];
    months: {
        MMMM: MMMM;
        MMM: MMM;
    }[];
    datesOfMonthBtnProps: ({ onClick, btnProps }: CalendarBtnProps) => {
      key: string;
      id: string;
      'data-testid': string;
      'data-day': 0 | 1 | 2 | 3 | 4 | 5 | 6;
      'data-date': string;
      children: string;
      isToday: boolean;
      isSelected: boolean;
      ...;
    }[];
    fillUpDatesOfPrevMonthBtnProps: ({ onClick, btnProps, }: CalendarBtnProps) => {
      key: string;
      id: string;
      'data-testid': string;
      'data-day': 0 | 1 | 2 | 3 | 4 | 5 | 6;
      'data-date': string;
      children: string;
      isToday: boolean;
      isSelected: boolean;
      ...;
    }[];
    fillUpDatesOfNextMonthBtnProps: ({ onClick, btnProps, }: CalendarBtnProps) => {
      key: string;
      id: string;
      'data-testid': string;
      'data-day': 0 | 1 | 2 | 3 | 4 | 5 | 6;
      'data-date': string;
      children: string;
      isToday: boolean;
      isSelected: boolean;
      ...;
    }[];
}
getCalendarViewControllers: () => {
  goToMonth: (month: Month) => void;
  goToYear: (year: number) => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  goToSelectedDate: () => void;
  resetCalendarView: () => void;
}
```

### Types

```ts
// date
type D = 'S' | 'M' | 'T' | 'W' | 'F' // days of week shortest name
type DDD = 'Sun' | 'Mon' | ... | 'Sat' // days of week short names
type DDDD = 'Sunday' | 'Monday' | ... | 'Saturday' // days of week full names
type DateNumber = 1 | 2 | 3 | ... | 31 // all available dates
// month
type MMM = 'Jan' | 'Feb' | ... | 'Dec' // month short names
type MMMM = 'January' | 'February' | ... | 'December' // month full names
type Month = 0 | 1 | 2 | ... | 11 // JavaScript month indexes
```

---

# Roadmap

- [x] Date Picker (WIP)
- [ ] Documentation
- [ ] Date Range Picker (although it is possible to build `date range picker` with the current `useDatePickerState` hook, it would be nice to give the pre configured hooks for the date range picker.)
- [ ] Time Picker
- [ ] Primitive UI Components

---
