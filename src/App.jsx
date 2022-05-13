import { Router } from './router/Router'
import { AuthProvider } from './context/AuthContext'
import { MediaConfigProvider } from './context/MediaConfigContext'
import './App.css'
import './services/firebaseConfig'

function App () {
  return (
    <MediaConfigProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MediaConfigProvider>
  )
}

export default App
