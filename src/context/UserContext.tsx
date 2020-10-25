import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import React, { ReactNode } from 'react'

type User = {
  id: string,
  email: string,
  name: string
}

type UserContext = { user: User | null, setUser: (user: User) => void }

const userContext = React.createContext<UserContext | undefined>(undefined)

type ChildrenProps = { children: ReactNode }

export const UserProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useLocalStorageState<User | null>('user', null)

  return <userContext.Provider value={{ user, setUser }} children={children} />
}

export const useUser = () => useAndAssertContext(userContext)
