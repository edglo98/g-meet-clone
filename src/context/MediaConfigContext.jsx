import { createContext, useEffect, useRef, useState } from 'react'
import { getAudioStream, getMediaDevices, getVideoStream } from '../utils/mediaDevices'
import TEST_TRACK from '../assets/audios/puerco-arana.mp3'

export const MediaConfigContext = createContext()

export const MediaConfigProvider = ({ children }) => {
  const [mediaDevices, setMediaDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: []
  })
  const [testingAudio, setTestingAudio] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const [videoActive, setVideoActive] = useState(false)

  const videoRef = useRef()
  const micRef = useRef()
  const speakerRef = useRef(new window.Audio())

  const stopCurrentAudio = () => {
    if (micRef.current?.srcObject) {
      micRef.current.srcObject.getTracks().forEach(track => {
        track.stop()
        micRef.current.srcObject = null
      })
    }
  }

  const setUpMic = async (mic = undefined) => {
    try {
      stopCurrentAudio()
      const stream = await getAudioStream(mic?.id)
      micRef.current.srcObject = stream
      micRef.current.play()
      setMicActive(true)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleActiveMic = () => {
    if (micActive) {
      stopCurrentAudio()
      setMicActive(false)
    } else {
      setUpMic()
      setMicActive(true)
    }
  }

  const stopCurrentVideo = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => {
        track.stop()
        videoRef.current.srcObject = null
      })
    }
  }

  const setUpVideo = async (video = undefined) => {
    try {
      stopCurrentVideo()
      const stream = await getVideoStream(video?.id)
      videoRef.current.srcObject = stream
      videoRef.current.play()
      setVideoActive(true)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleActiveVideo = () => {
    if (videoActive) {
      stopCurrentVideo()
      setVideoActive(false)
    } else {
      setUpVideo()
      setVideoActive(true)
    }
  }

  const setUpSpeaker = async (speaker) => {
    speakerRef.current.setSinkId(speaker.id)
  }

  const setSpeakerSrc = (src) => {
    speakerRef.current.src = src
    speakerRef.current.play()
  }

  const toggleTestingAudio = () => {
    setTestingAudio(isTesttingAudio => {
      if (isTesttingAudio) {
        speakerRef.current.pause()
        speakerRef.current.currentTime = 0
        speakerRef.current.src = ''
      } else {
        speakerRef.current.src = TEST_TRACK
        speakerRef.current.play()
        speakerRef.current.onended = () => {
          speakerRef.current.src = ''
          setTestingAudio(false)
        }
      }
      return !isTesttingAudio
    })
  }

  useEffect(() => {
    getMediaDevices().then(setMediaDevices)
  }, [setMediaDevices])

  return (
    <MediaConfigContext.Provider value={{
      mediaDevices,
      isAudioTesting: testingAudio,
      isVideoActive: videoActive,
      isMicActive: micActive,
      refs: {
        video: videoRef,
        mic: micRef,
        speaker: speakerRef
      },
      actions: {
        setSpeakerSrc,
        toggleTestingAudio,
        toggleActiveMic,
        toggleActiveVideo,
        setUpSpeaker,
        setUpMic,
        setUpVideo,
        stopCurrentAudio,
        stopCurrentVideo
      }
    }}
    >
      {children}
    </MediaConfigContext.Provider>
  )
}
