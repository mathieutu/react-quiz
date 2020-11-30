import React, { ReactNode } from 'react'

export const ErrorAlert = ({ children }: { children: ReactNode }) => {
  if (!children) {
    return null
  }

  return (
    <div className="my-3 text-red-900 bg-red-200 border border-red-600 rounded px-4 py-2 flex gap-2 items-center text-sm">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {children}
    </div>
  )
}
