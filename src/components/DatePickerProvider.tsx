import React from 'react'
import { useDatePicker, useDatePickerState } from '../hooks'

interface DatePickerProviderProps {
  datePickerState: ReturnType<typeof useDatePickerState>
}

const DatePickerContext = React.createContext<
  | ({ datePickerState: ReturnType<typeof useDatePickerState> } & ReturnType<
      typeof useDatePicker
    >)
  | undefined
>(undefined)

const DatePickerProvider: React.FC<DatePickerProviderProps> = ({
  datePickerState,
  children,
}) => {
  const datePickerBlocks = useDatePicker(datePickerState)

  return (
    <DatePickerContext.Provider
      value={{ datePickerState, ...datePickerBlocks }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

const useDatePickerProvider = () => {
  const context = React.useContext(DatePickerContext)
  if (context === undefined)
    throw new Error(
      '`useDatePickerProvider` returns `undefined`. Please use `useDatePickerProvider` inside `DatePickerProvider`.',
    )

  return context
}

export { DatePickerProvider, useDatePickerProvider }
