import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home/HomePage'
import { RedirectPage } from '../pages/Redirect/RedirectPage'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/:meetingId' element={<RedirectPage />} />
    </Routes>
  )
}
