export const getMediaDevices = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  const foundDevices = await navigator.mediaDevices.enumerateDevices()
  const devicesFiltered = {
    cameras: [],
    microphones: [],
    speakers: []
  }
  foundDevices.forEach(device => {
    device.id = device.deviceId
    if (device.kind === 'videoinput') {
      devicesFiltered.cameras = [...devicesFiltered.cameras, device]
    } else if (device.kind === 'audioinput') {
      devicesFiltered.microphones = [...devicesFiltered.microphones, device]
    } else if (device.kind === 'audiooutput') {
      devicesFiltered.speakers = [...devicesFiltered.speakers, device]
    }
  })
  if (devicesFiltered.speakers.length === 0) {
    devicesFiltered.speakers.push({
      id: 'default',
      label: 'Predeterminado'
    })
  }
  return devicesFiltered
}

export const getVideoStream = async (videoId) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: {
        exact: videoId || undefined
      }
    }
  })
  return stream
}

export const getAudioStream = async (audioId) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: {
        exact: audioId || undefined
      }
    }
  })
  return stream
}
