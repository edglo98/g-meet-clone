import { useEffect, useRef, useState } from 'react'
import styles from './Participant.module.css'
import { motion } from 'framer-motion'

export function Participant ({ participant, muted }) {
  const [videoTracks, setVideoTracks] = useState([])
  const [audioTracks, setAudioTracks] = useState([])
  const [videoVisibility, setVideoVisibility] = useState(true)

  const videoRef = useRef()
  const audioRef = useRef()

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null)

  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track])
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track])
      }
    }

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track))
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track))
      }
    }

    setVideoTracks(trackpubsToTracks(participant.videoTracks))
    setAudioTracks(trackpubsToTracks(participant.audioTracks))

    participant.on('trackSubscribed', trackSubscribed)
    participant.on('trackUnsubscribed', trackUnsubscribed)
    participant.on('trackEnabled', track => {
      if (track.kind === 'video') {
        setVideoVisibility(true)
      }
      // show the track again
    })
    participant.on('trackDisabled', track => {
      if (track.kind === 'video') {
        setVideoVisibility(false)
      }
      // hide or remove the media element related to this track
    })
    return () => {
      setVideoTracks([])
      setAudioTracks([])
      participant.removeAllListeners()
    }
  }, [participant])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTracks])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioTrack) {
      audioTrack.attach(audioRef.current)
      return () => {
        audioTrack.detach()
      }
    }
  }, [videoTracks])

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.15,
        ease: 'easeInOut'
      }}
      className={styles.participant}
    >
      <video style={{ opacity: videoVisibility ? 1 : 0 }} ref={videoRef} autoPlay />
      <audio ref={audioRef} autoPlay muted={muted} />
    </motion.div>
  )
}
