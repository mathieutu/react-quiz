import { Context, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

const getValue = <T>(value: T | (() => T)): T => (typeof value === 'function' ? (value as () => T)() : value)

export const useLocalStorageState = <T>(key: string, initialValue: T | (() => T)): [T, SetState<T>] => {
  const prefixedKey = `qcm:${key}`

  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(prefixedKey)

    if (storedValue === null) return getValue(initialValue)

    try {
      return JSON.parse(storedValue)
    } catch (e) {
      return getValue(initialValue)
    }
  })

  useEffect(() => {
    window.localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export const useAndAssertContext = <T>(context: Context<T | undefined>): T => {
  const state = useContext(context)

  if (state === undefined) {
    throw new Error('useAndAssertContext should be used under context provider.')
  }

  return state
}

export const useReRenderComponent = () => {
  const [, setState] = useState<boolean>(false)

  return () => setState(state => !state)
}
