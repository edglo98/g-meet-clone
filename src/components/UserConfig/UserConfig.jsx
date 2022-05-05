import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { Listbox } from '../Listbox/Listbox'
import styles from './UserConfig.module.css'

const INITIAL_DEVICES_FILTERS = {
  cameras: [],
  microphones: [],
  speakers: []
}

export const UserConfig = () => {
  const [devices, setDevices] = useState(() => INITIAL_DEVICES_FILTERS)

  const videoRef = useRef()
  const audioRef = useRef()

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 340 } })
      .then(stream => {
        const video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch(err => {
        console.error('error:', err)
      })
  }

  const getAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const audio = audioRef.current
        audio.srcObject = stream
        audio.play()
      })
      .catch(err => {
        console.error('error:', err)
      })
  }

  useEffect(() => {
    getVideo()
  }, [videoRef])

  useEffect(() => {
    getAudio()
  }, [audioRef])

  useEffect(() => {
    const getDivices = (devices) => {
      const devicesFiltered = { ...INITIAL_DEVICES_FILTERS }
      devices.forEach(device => {
        device.id = device.deviceId
        if (device.kind === 'videoinput') {
          devicesFiltered.cameras = [...devicesFiltered.cameras, device]
        } else if (device.kind === 'audioinput') {
          devicesFiltered.microphones = [...devicesFiltered.microphones, device]
        } else if (device.kind === 'audiooutput') {
          devicesFiltered.speakers = [...devicesFiltered.speakers, device]
        }
      })

      setDevices(devicesFiltered)
    }

    navigator.mediaDevices.enumerateDevices().then(getDivices)
  }, [setDevices])

  return (
    <div className={styles.configContainer}>
      <section style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <figure>
          <video style={{ borderRadius: 10 }} ref={videoRef} autoPlay />
          <audio ref={audioRef} autoPlay muted />
        </figure>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', width: 320 }}>
        <header>
          <h1 style={{ textAlign: 'center' }}>¿Todo listo para unirte?</h1>
          <h4 style={{ fontWeight: 400, textAlign: 'center' }}>Midu podría estar esperandote...</h4>
        </header>
        <div>
          <h5 style={{ margin: 0 }}>Micrófono</h5>
          <Listbox options={devices.microphones} />
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Altavoces</h5>
          <Listbox options={devices.speakers} />
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Cámara</h5>
          <Listbox options={devices.cameras} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button title='Volver al inicio' styleType='text' />
          {/* perdoname si ves esto midu xd */}
          <Button title={<h4 style={{ margin: 0 }}>🛎 &nbsp;Unirme ahora</h4>} />
        </div>
      </section>
    </div>
  )
}
