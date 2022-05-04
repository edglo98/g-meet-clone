import { createContext, useEffect, useState } from 'react'
import { getUserData, loginWithEmail, signOutUser, signUpWithEmail, verifyUserAuth } from '../services/auth'
import { auth } from '../services/firebaseConfig'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(() => auth.currentUser)
  const [isLoading, setIsLoading] = useState(() => !auth.currentUser)
  const [error, setError] = useState(null)

  useEffect(() => {
    const setValue = async (value) => {
      setError(null)
      if (value) {
        const user = await getUserData(value.uid)
        setUser(user.data())
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    }
    const setErrorValue = (error) => {
      setError(error)
      setUser(undefined)
      setIsLoggedIn(false)
      setIsLoading(false)
    }
    return verifyUserAuth(setValue, setErrorValue)
  }, [auth])

  const signUp = async (data) => {
    setIsLoading(true)
    try {
      await signUpWithEmail(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const userData = await loginWithEmail(email, password)
      setUser(userData)
    } catch (error) {
      console.log('error', error)
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await signOutUser()
    setUser(null)
    setIsLoggedIn(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        modalOpen,
        user,
        isLoading,
        error,
        actions: {
          openModal,
          closeModal,
          signUp,
          logout,
          login
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
