import React, { ReactNode } from 'react'

export const ErrorAlert = ({ children }: { children: ReactNode }) => {
  if (!children) {
    return null
  }

  return (
    <div className="my-3 text-red-900 bg-red-200 border border-red-600 rounded px-4 py-2">
      {children}
    </div>
  )
}
