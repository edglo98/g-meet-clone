import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { Button } from '../../components/Button/Button'
import { Divider } from '../../components/Divider/Divider'
import { Dropdown, DropdownItem } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import { Login } from '../../components/Login/Login'
import { TextInput } from '../../components/TextInput/TextInput'
import { useAuth } from '../../hooks/useAuth'
import { useTwilioToken } from '../../hooks/useTwilioToken'
import { MdOutlineAddBox, MdBorderColor } from 'react-icons/md'
import styles from './HomePage.module.css'

export function HomePage () {
  const { user, actions } = useAuth()
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { loading, handleGetToken } = useTwilioToken()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleRedirect = () => {
    const id = value.replace('https://g-meet-clone.vercel.app/', '')
    navigate('/' + id)
  }

  const createMeetings = async () => {
    if (!user) {
      actions.openModal()
      return
    }
    const meetingId = uid()
    const token = await handleGetToken(user.uid, meetingId)

    navigate(`/${meetingId}`, {
      state: {
        meetingToken: token
      }
    })
  }

  return (
    <div>
      <Login />
      <Header />
      <section className={styles.descContainer}>
        <h1 className={styles.highlightText}>Videollamadas Premium.</h1>
        <h1 className={styles.highlightText}>Ahora gratis para todos.</h1>
        <span className={styles.description}>
          Hemos rediseñado nuestro servicio de reuniones seguras para empresas, Edglo Meet, para que todo el mundo pueda usarlo de forma gratuita.
        </span>
        <div className={styles.meetingOptions}>
          <Dropdown
            title={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <MdOutlineAddBox size={24} />
                <h3 style={{ margin: 0 }}>
                  Nueva reunión
                </h3>
              </span>
            }
          >
            <DropdownItem
              onClick={() => {}}
              title={<h4 style={{ margin: 0 }}>🔗   Crear una reunión para más tarde</h4>}
              disabled
            />
            <DropdownItem
              onClick={createMeetings}
              title={<h4 style={{ margin: 0 }}>➕   Iniciar una reunión ahora</h4>}
              disabled={loading}
            />
            <DropdownItem
              onClick={() => {}}
              title={<h4 style={{ margin: 0 }}>🗓   Programar en Google Calendar</h4>}
              disabled
            />
          </Dropdown>
          <div style={{ maxWidth: 350, display: 'flex' }}>
            <TextInput
              onChange={onChange}
              placeholder='Introduce un código o enlace'
              value={value}
              icon={<MdBorderColor />}
            />
            <Button
              onClick={handleRedirect}
              title={
                <h4 style={{ margin: 0 }}>
                  Entrar
                </h4>
              }
              styleType='text'
              disabled={!value}
            />
          </div>
        </div>
        <Divider />
      </section>
    </div>
  )
}
