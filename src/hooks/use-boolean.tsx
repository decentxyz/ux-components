import { useMemo, useState } from 'react'

type ReturnType = [
  value: boolean,
  handler: {
      on: () => void,
      off: () => void,
      toggle: () => void,
  }
]

export function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue)

  const handler = useMemo(() => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue(state => !state)
  }), [])

  return [value, handler]
}