import { Header } from '../../components/Header/Header'
import { Login } from '../../components/Login/Login'
import { UserConfig } from '../../components/UserConfig/UserConfig'

export function LobbyPage ({ setMeetingToken, meetingId }) {
  return (
    <div>
      <Login />
      <Header />
      <UserConfig setMeetingToken={setMeetingToken} meetingId={meetingId} />
    </div>
  )
}
