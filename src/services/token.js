import { connect } from 'twilio-video'

export const getTwilioToken = async (userName, roomName) => {
  const endpoint = 'https://g-meet-token-services-1659-dev.twil.io/token'
  const res = await window.fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      identity: userName,
      room: roomName
    })
  })
  return await res.json()
}

export const getRoom = async ({ token, roomName, videoTrack, audioTrack }) => {
  try {
    const room = await connect(token, {
      name: roomName,
      tracks: [...audioTrack.getTracks(), ...videoTrack.getTracks()]
    })
    return room
  } catch (error) {
    console.log('error en connect', error)
  }
}
