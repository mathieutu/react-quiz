import React, { ReactNode } from 'react'

type LoadingIconProps = { loading: boolean, children: ReactNode, className: string }

export const LoadingIcon = ({ loading, children, className }: LoadingIconProps) => {
  if (loading) {
    return (
      <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path className="opacity-75" strokeWidth="2" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    )
  }

  return <>{children}</>
}
