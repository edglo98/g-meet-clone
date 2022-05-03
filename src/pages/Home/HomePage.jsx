import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Divider } from '../../components/Divider/Divider'
import { Dropdown, DropdownItem } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import { TextInput } from '../../components/TextInput/TextInput'
import styles from './HomePage.module.css'

export function HomePage () {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
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
              onClick={() => {}}
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
            <TextInput onChange={onChange} placeholder='Introduce un código o enlace' />
            <Button
              title={
                <h4 style={{ margin: 0 }}>
                  Entrar
                </h4>
              }
              type='text'
              disabled={!value}
            />
          </div>
        </div>
        <Divider />
      </section>
    </div>
  )
}
