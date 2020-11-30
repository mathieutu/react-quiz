import React, { ReactNode } from 'react'
import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'

type User = {
  id: string,
  email: string,
  name: string
}

type UserContext = { user: User, setUser: (user: User) => void }

const userContext = React.createContext<UserContext | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorageState<User | null>('user', null)

  return <userContext.Provider value={{ user: user!, setUser }}>{children}</userContext.Provider>
}

export const useUser = () => useAndAssertContext(userContext)
