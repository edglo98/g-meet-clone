export const getToken = async (userName, roomName) => {
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
