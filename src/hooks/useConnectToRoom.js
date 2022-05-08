import { useCallback, useEffect, useState } from 'react'
import { getRoom } from '../services/token'
import { useStreamConfig } from './useStreamConfig'

export const useConnectToRoom = ({ meetingId, defaultMeetingToken }) => {
  const [room, setRoom] = useState(null)
  const [meetingToken, setMeetingToken] = useState(defaultMeetingToken || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { streams } = useStreamConfig()

  const connectToRoom = useCallback(async () => {
    if (meetingToken) {
      setLoading(true)
      setError(null)
      try {
        const room = await getRoom({
          token: meetingToken,
          roomName: meetingId,
          videoTrack: streams.video,
          audioTrack: streams.mic
        })
        setRoom(room)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [meetingToken])

  useEffect(() => {
    connectToRoom()
  }, [connectToRoom])

  return { setMeetingToken, meetingToken, loading, error, room }
}
