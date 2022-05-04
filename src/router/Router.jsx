import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home/HomePage'
import { LobbyPage } from '../pages/Lobby/LobbyPage'

export function Router () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<LobbyPage />} />
      </Routes>
    </div>
  )
}
