import { Timestamp } from 'firebase/firestore'

export const dateFormat = (seconds) => {
  const date = new Date(seconds * 1000)
  return (
    seconds &&
    new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  )
}

export const timestampFormat = (date = new Date()) =>
  new Timestamp(Math.round(date.getTime() / 1000), 0)
