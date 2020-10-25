import React from 'react'
import { formatDistanceStrict } from 'date-fns'
import { fr } from 'date-fns/locale'

type Props = {
  min: number,
  max: number,
  currentValue: number,
}

export const ProgressBar = ({ currentValue, min, max }: Props) => {
  const message = formatDistanceStrict(max, currentValue, { locale: fr, addSuffix: true })

  const ratio = (currentValue - min) / (max - min)

  const getColor = () => {
    if (ratio < 3 / 4) return 'bg-green-300'
    if (ratio < 5 / 6) return 'bg-orange-300'

    return 'bg-red-300'
  }

  return (
    <div className="w-full flex">
      <div className="mx-auto flex">
        <div className="w-64 bg-gray-300 border border-gray-900 rounded overflow-hidden">
          <div style={{ width: `${ratio * 100}%` }} className={`h-full transition-all duration-1000 ease-linear ${getColor()}`} />
        </div>
        <div className="my-auto mx-4 flex">{message}</div>
      </div>
    </div>
  )
}
