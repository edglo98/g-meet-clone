import { useState } from 'react'
import { getTwilioToken } from '../services/token'

export const useTwilioToken = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetToken = async (indetity, meetingId) => {
    setLoading(true)
    setError(null)
    try {
      const twilioToken = await getTwilioToken(indetity, meetingId)
      return twilioToken.accessToken
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return { loading, error, handleGetToken }
}
