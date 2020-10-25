import React from 'react'

type Props = {
  max: number,
  currentValue: number,
}

const secondsToTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60)
  return `${hours < 10 ? '0' : ''}${hours} : ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
}

export const ProgressBar = ({ currentValue, max }: Props) => (
  <div className="w-full flex">
    <div className="mx-auto flex">
      <progress
        className="w-64 bg-gray-300 my-auto appearance-none"
        max={max}
        value={currentValue}
      >
        {currentValue}
      </progress>
      <div className="my-auto mx-4 flex">{secondsToTime(max - currentValue)}</div>
    </div>
  </div>
)
