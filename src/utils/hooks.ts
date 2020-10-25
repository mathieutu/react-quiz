import { Context, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export const useLocalStorageState = <T>(key: string, initialValue: T): [T, SetState<T>] => {
  const prefixedKey = `qcm:${key}`

  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(prefixedKey)

    return storedValue !== null ? JSON.parse(storedValue) : initialValue
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
