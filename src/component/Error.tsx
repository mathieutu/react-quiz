import React from 'react'

export const Error = ({ text }: { text: string | undefined }) => {
  if (!text) {
    return null
  }

  return (
    <div className="my-3 text-red-900 bg-red-300 border border-red-600 rounded px-4 py-2">
      Une erreur est survenue : {text}
    </div>
  )
}
