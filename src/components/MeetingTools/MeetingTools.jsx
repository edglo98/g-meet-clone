import styles from './MeetingTools.module.css'
import { MdOutlineVideocamOff, MdOutlineVideocam, MdOutlineMicOff, MdOutlineMic, MdCallEnd, MdOutlineScreenShare, MdOutlineStopScreenShare, MdOutlineChat } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function MeetingTools ({ room }) {
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const navigate = useNavigate()

  const toggleVideo = () => {
    setIsVideoMuted(!isVideoMuted)
    const action = isVideoMuted
      ? publication => publication.track.enable()
      : publication => publication.track.disable()
    room.localParticipant.videoTracks.forEach(action)
  }

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted)
    const action = isAudioMuted
      ? publication => publication.track.enable()
      : publication => publication.track.disable()
    room.localParticipant.audioTracks.forEach(action)
  }

  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing)
    if (isScreenSharing) {
      room.localParticipant.unpublishTrack(room.localParticipant.screenTrack)
    } else {
      room.localParticipant.publishTrack(room.localParticipant.screenTrack)
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const endCall = () => {
    room.disconnect()
    navigate('/')
  }

  return (
    <div className={styles.toolsContainer}>
      <button onClick={toggleVideo} className={`${styles.button} ${isVideoMuted && styles.buttonDanger}`}>
        {isVideoMuted ? <MdOutlineVideocamOff /> : <MdOutlineVideocam />}
        {/* <img src='/images/video.svg' alt='video' /> */}
      </button>
      <button onClick={toggleAudio} className={`${styles.button} ${isAudioMuted && styles.buttonDanger}`}>
        {isAudioMuted ? <MdOutlineMicOff /> : <MdOutlineMic />}
        {/* <img src='/images/audio.svg' alt='audio' /> */}
      </button>
      <button onClick={endCall} className={`${styles.button} ${styles.buttonDanger}`}>
        <MdCallEnd />
        {/* <img src='/images/end.svg' alt='end' /> */}
      </button>
      <button className={styles.button}>
        <MdOutlineScreenShare />
        {/* <img src='/images/screen.svg' alt='screen' /> */}
      </button>
      <button className={styles.button}>
        <MdOutlineChat />
        {/* <img src='/images/chat.svg' alt='chat' /> */}
      </button>
    </div>
  )
}
