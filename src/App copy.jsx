import { useState } from 'react'
import { connect } from 'twilio-video'
import './App.css'
import { Participant } from './components/Participant/Participant'

function App () {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [participants, setParticipants] = useState([])

  const getToken = async (identity, room) => {
    const endpoint = 'https://g-meet-token-services-1659-dev.twil.io/token'
    const res = await window.fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        identity,
        room
      })
    })
    return await res.json()
  }

  const connectToRoom = async (token, roomName) => {
    const room = await connect(token, {
      name: roomName,
      video: true,
      audio: true
    })
    return room
  }

  const participantConnected = participant => {
    setParticipants(prevParticipants => [...prevParticipants, participant])
  }

  const participantDisconnected = participant => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    )
  }

  const joinRoom = async (userName) => {
    try {
      const token = await getToken(userName, 'edgloroom')
      const room = await connectToRoom(token.accessToken, 'edgloroom')
      setRoom(room)
      console.assert(`Successfully joined a Room: ${room}`, room)
      room.participants.forEach(participantConnected)

      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`, participant)
        participantConnected(participant)
      })
      room.on('participantDisconnected', participant => {
        console.log(`A remote Participant disconnected: ${participant}`, participant)
        participantDisconnected(participant)
      })
    } catch (error) {
      console.error(`Unable to connect to Room: ${error.message}`)
    }
  }

  const onInputChange = (e) => {
    const { value } = e.target
    setUserName(value)
  }

  const onsubmit = (e) => {
    e.preventDefault()
    joinRoom(userName)
  }

  return (
    <div className='App'>
      <form onSubmit={onsubmit}>
        <input type='text' name='username' placeholder='Enter your name' onChange={onInputChange} />
        <button type='submit'>Join Room</button>
      </form>
      <h1>edgloroom</h1>
      <section>
        {room && (
          <Participant
            participant={room.localParticipant}
          />
        )}
        {room && (
          <div>
            <h2>Participants</h2>
            <ul>
              {participants.map(participant => (
                <li key={participant.sid}>
                  <Participant participant={participant} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
