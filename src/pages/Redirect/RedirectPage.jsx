import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useConnectToRoom } from '../../hooks/useConnectToRoom'
import { LobbyPage } from '../Lobby/LobbyPage'
import { MeetingPage } from '../Meeting/MeetingPage'

export function RedirectPage () {
  const { meetingId } = useParams()
  const { state } = useLocation()
  const { isLoading: loadingAuthData } = useAuth()
  const { loading, setMeetingToken, room } = useConnectToRoom({
    meetingId,
    defaultMeetingToken: state?.meetingToken
  })

  // TODO: useEffect for redirect to error handler page

  if (loading || loadingAuthData) {
    return <div>Loading...</div>
  } else if (room) {
    return <MeetingPage room={room} />
  } else {
    return <LobbyPage meetingId={meetingId} setMeetingToken={setMeetingToken} />
  }
}
