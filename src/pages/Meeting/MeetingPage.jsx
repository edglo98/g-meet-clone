import { useEffect, useState } from 'react'
import { MeetingTools } from '../../components/MeetingTools/MeetingTools'
import { Participant } from '../../components/Participant/Participant'
import { MeetingReady } from '../../components/MeetingReady/MeetingReady'
import { Button } from '../../components/Button/Button'
import { MdHelpOutline } from 'react-icons/md'
import styles from './MeetingPage.module.css'
import { getUserData } from '../../services/auth'
import { useAuth } from '../../hooks/useAuth'

export function MeetingPage ({ room, meetingId }) {
  const [participants, setParticipants] = useState([])
  const [helpModal, setHelpModal] = useState(room.participants.size === 0)
  const { user } = useAuth()

  const participantConnected = async (participant) => {
    const user = await getUserData(participant.identity)
    const data = user.data()
    participant.name = data.name
    setParticipants(prevParticipants => [...prevParticipants, participant])
  }

  const participantDisconnected = participant => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    )
  }

  useEffect(() => {
    room.participants.forEach(participantConnected)
    if (user) {
      room.localParticipant.name = user.name
    }

    room.on('participantConnected', participant => {
      participantConnected(participant)
    })
    room.on('participantDisconnected', participant => {
      participantDisconnected(participant)
    })
  }, [])

  return (
    <div className={styles.meetingContainer}>
      <main className={styles.participantsContainer}>
        {room && (
          <Participant
            participant={room.localParticipant}
          />
        )}
        {participants.map(participant => (
          <Participant key={participant.sid} participant={participant} />
        ))}
      </main>
      {/* <MeetingChat /> */}
      <MeetingTools room={room} />
      <MeetingReady show={helpModal} onClose={() => setHelpModal(false)} meeting={meetingId} />
      <div className={styles.helpButton}>
        <Button styleType='text' title={<MdHelpOutline size={32} />} onClick={() => setHelpModal(true)} />
      </div>
    </div>
  )
}
