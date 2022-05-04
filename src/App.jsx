import { Router } from './router/Router'
import './App.css'
import { AuthProvider } from './context/AuthContext'

function App () {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
