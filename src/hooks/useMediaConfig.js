import { useContext, useEffect } from 'react'
import { MediaConfigContext } from '../context/MediaConfigContext'

export const useMediaConfig = () => {
  const context = useContext(MediaConfigContext)

  if (!context) {
    throw new Error('useMediaConfig must be used within a MediaConfigProvider')
  }

  useEffect(() => {
    context.actions.setUpMic()
    context.actions.setUpVideo()

    return () => {
      context.actions.stopCurrentAudio()
      context.actions.stopCurrentVideo()
    }
  }, [])

  return context
}
