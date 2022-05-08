import { useContext } from 'react'
import { MediaConfigContext } from '../context/MediaConfigContext'

export const useStreamConfig = () => {
  const context = useContext(MediaConfigContext)

  if (!context) {
    throw new Error('useStreamConfig must be used within a MediaConfigProvider')
  }

  return {
    streams: context.streams
  }
}
