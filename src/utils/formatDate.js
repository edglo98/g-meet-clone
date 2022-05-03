export const formatDate = (date, format) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
