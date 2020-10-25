import React from 'react'
import { FaUser } from 'react-icons/all'
import { useUser } from '../context/UserContext'

export default function Header() {
  const { user } = useUser()
  return (
    <div
      className="header sticky flex content-around top-0 bg-gradient-to-r from-teal-400 to-blue-500 relative w-full p-2 text-2xl text-white shadow-md">
      <div className="flex-1 text-center">QCM - React</div>
      <div className="flex-1 text-center flex">
        <div className="mx-auto flex">
          <FaUser className="my-auto mr-2" />
          <div className="my-auto">{user!.name}</div>
        </div>
      </div>
    </div>
  )
}
