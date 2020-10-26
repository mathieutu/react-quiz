import { formatDuration, intervalToDuration } from 'date-fns'
import { fr as locale } from 'date-fns/locale'

export const formatDurationFromSecToHuman = (duration: number) => {
  const interval = intervalToDuration({ start: 0, end: duration * 1000 })

  const delimiter = '[DEL]'
  const durationArray = formatDuration(interval, { locale, delimiter }).split(delimiter)

  return `${durationArray.slice(0, -1).join(', ')} et ${durationArray.slice(-1)}`
}
