import { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getRoom } from '../../services/token'
import { LobbyPage } from '../Lobby/LobbyPage'
import { MeetingPage } from '../Meeting/MeetingPage'

export function RedirectPage () {
  const { meetingId } = useParams()
  const { state } = useLocation()
  const [room, setRoom] = useState(null)
  const [meetingToken, setMeetingToken] = useState(state?.meetingToken || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const connectToRoom = useCallback(async () => {
    if (meetingToken) {
      setLoading(true)
      setError(null)
      try {
        const room = await getRoom(meetingToken, meetingId)
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

  // useEffect for redirect to error handler page

  if (loading) {
    return <div>Loading...</div>
  } else if (room) {
    return <MeetingPage room={room} />
  } else {
    return <LobbyPage meetingId={meetingId} setMeetingToken={setMeetingToken} />
  }
}
