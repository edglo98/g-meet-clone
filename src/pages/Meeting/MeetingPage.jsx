import { useEffect, useState } from 'react'
import { Participant } from '../../components/Participant/Participant'

export function MeetingPage ({ room }) {
  const [participants, setParticipants] = useState([])

  const participantConnected = participant => {
    setParticipants(prevParticipants => [...prevParticipants, participant])
  }

  const participantDisconnected = participant => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    )
  }

  useEffect(() => {
    room.participants.forEach(participantConnected)

    room.on('participantConnected', participant => {
      console.log(`A remote Participant connected: ${participant}`, participant)
      participantConnected(participant)
    })
    room.on('participantDisconnected', participant => {
      console.log(`A remote Participant disconnected: ${participant}`, participant)
      participantDisconnected(participant)
    })
  }, [])

  console.log(room, participants)

  return (
    <div>
      {participants.map(participant => (
        <li key={participant.sid}>
          <Participant participant={participant} />
        </li>
      ))}
    </div>
  )
}
