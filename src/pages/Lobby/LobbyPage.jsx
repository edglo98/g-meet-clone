import { useParams } from 'react-router-dom'

export function LobbyPage () {
  const router = useParams()
  console.log(router)
  return (
    <div>
      LobbyPage
    </div>
  )
}
