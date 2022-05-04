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
import styles from './HomePage.module.css'

export function HomePage () {
  const { user, actions } = useAuth()
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const createMeetings = () => {
    if (!user) {
      actions.openModal()
      return
    }
    const meetingId = uid()
    navigate(`/${meetingId}`)
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
          <Dropdown>
            <DropdownItem
              onClick={() => {}}
              title='🔗   Crear una reunión para más tarde'
              disabled
            />
            <DropdownItem
              onClick={createMeetings}
              title='➕   Iniciar una reunión ahora'
              disabled={false}
            />
            <DropdownItem
              onClick={() => {}}
              title='🗓   Programar en Google Calendar'
              disabled
            />
          </Dropdown>
          <div style={{ maxWidth: 350, display: 'flex' }}>
            <TextInput
              onChange={onChange}
              placeholder='Introduce un código o enlace'
              value={value}
              icon='⌨️'
            />
            <Button
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
