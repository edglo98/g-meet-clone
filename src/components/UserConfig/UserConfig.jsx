import { Button } from '../Button/Button'
import { Listbox } from '../Listbox/Listbox'
import { TextInput } from '../TextInput/TextInput'
import { useMediaConfig } from '../../hooks/useMediaConfig'
import { useAuth } from '../../hooks/useAuth'
import { useSimpleInput } from '../../hooks/useSimpleInput'
import { useNavigate } from 'react-router-dom'
import { useTwilioToken } from '../../hooks/useTwilioToken'
import { addProvisionalUser } from '../../services/auth'
import {
  MdOutlineAdd,
  MdVolumeUp,
  MdVolumeOff,
  MdAccountCircle,
  MdOutlineMicOff,
  MdOutlineMic,
  MdOutlineVideocamOff,
  MdOutlineVideocam
} from 'react-icons/md'
import styles from './UserConfig.module.css'

export const UserConfig = ({ setMeetingToken, meetingId }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    refs,
    actions,
    mediaDevices,
    isAudioTesting,
    isVideoActive,
    isMicActive
  } = useMediaConfig()
  const { value, handleChange } = useSimpleInput(user?.name || '')
  const { loading, handleGetToken } = useTwilioToken()
  const handleCreateToken = async () => {
    let userIdentity
    if (!value) return
    if (user?.uid) {
      userIdentity = user.uid
    } else {
      const data = await addProvisionalUser(value)
      userIdentity = data.id
    }
    const token = await handleGetToken(userIdentity, meetingId)
    setMeetingToken(token)
  }

  return (
    <div className={styles.configContainer}>
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <figure name={value} className={styles.figureFallback}>
          <video ref={refs.video} style={{ opacity: isVideoActive ? 1 : 0, borderRadius: 10, width: 440, aspectRatio: '3/2', objectFit: 'cover', backgroundColor: 'black' }} autoPlay />
          <audio ref={refs.mic} autoPlay muted />
          <div className={styles.figureButtonsContainer}>
            <button onClick={() => actions.toggleActiveMic()} className={`${styles.button} ${!isMicActive && styles.buttonDanger}`}>
              {!isMicActive ? <MdOutlineMicOff /> : <MdOutlineMic />}
            </button>
            <button onClick={() => actions.toggleActiveVideo()} className={`${styles.button} ${!isVideoActive && styles.buttonDanger}`}>
              {!isVideoActive ? <MdOutlineVideocamOff /> : <MdOutlineVideocam />}
            </button>
          </div>
        </figure>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', width: 320, justifyContent: 'center' }}>
        <header>
          <h1 style={{ textAlign: 'center' }}>¿Todo listo para unirte?</h1>
          <h4 style={{ fontWeight: 400, textAlign: 'center' }}>Midu podría estar esperandote...</h4>
        </header>
        <div>
          <TextInput disabled={user?.uid} icon={<MdAccountCircle size={24} />} placeholder='Tu nombre' value={value} onChange={handleChange} />
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Micrófono</h5>
          {mediaDevices.microphones.length > 0 && <Listbox options={mediaDevices.microphones} onChange={(value) => actions.setUpMic(value)} />}
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Cámara</h5>
          {mediaDevices.cameras.length > 0 && <Listbox options={mediaDevices.cameras} onChange={(value) => actions.setUpVideo(value)} />}
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Altavoz</h5>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              {mediaDevices.speakers.length > 0 && <Listbox options={mediaDevices.speakers} onChange={(value) => actions.setUpSpeaker(value)} />}
            </div>
            <Button
              onClick={() => actions.toggleTestingAudio()}
              title={
                <span style={{ margin: 0, fontSize: '.8rem', color: 'gray' }}>
                  {isAudioTesting ? <MdVolumeOff size={22} /> : <MdVolumeUp size={22} />}
                </span>
                  }
              styleType='text'
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={() => navigate('/')} title='Volver al inicio' styleType='text' />
          {/* perdoname si ves el &nbsp; midu xd u otra cosa... */}
          <Button
            disabled={loading || !value}
            onClick={handleCreateToken}
            title={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <MdOutlineAdd size={20} />
                <h4 style={{ margin: 0 }}> &nbsp;Unirme ahora</h4>
              </span>
            }
          />
        </div>
      </section>
    </div>
  )
}
