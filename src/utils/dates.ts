import { formatDuration, intervalToDuration } from 'date-fns'
import { fr as locale } from 'date-fns/locale'

export const formatIntervalForHuman = (start: number, end: number) => {
  const interval = intervalToDuration({ start, end })

  const delimiter = '[DEL]'
  const durationArray = formatDuration(interval, { locale, delimiter }).split(delimiter)

  return `${durationArray.slice(0, -1).join(', ')} et ${durationArray.slice(-1)}`
}

export const formatDurationForHuman = (duration: number) => formatIntervalForHuman(0, duration * 1000)
