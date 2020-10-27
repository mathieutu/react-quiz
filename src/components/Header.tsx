import React from 'react'
import { useUser } from '../context/UserContext'
import { Logo, TITLE } from '../configuration'

export const Header = () => {
  const { user } = useUser()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo className="h-8 w-auto" />
              <h1 className="text-lg uppercase leading-9 text-gray-800">{TITLE}</h1>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <span className="text-gray-800">{user!.name}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
