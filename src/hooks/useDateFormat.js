import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate'

export const useDateFormat = () => {
  const [date, setDate] = useState(formatDate(new Date()))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(formatDate(new Date()))
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  })

  return date
}
