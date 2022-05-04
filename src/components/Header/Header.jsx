import { useAuth } from '../../hooks/useAuth'
import { useDateFormat } from '../../hooks/useDateFormat'
import { Button } from '../Button/Button'
import styles from './Header.module.css'

export function Header () {
  const { user, actions } = useAuth()
  const date = useDateFormat()

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h2>
            📹 Edglo <span className={styles.light}>Meet</span>
          </h2>
        </div>
        <div className={styles.toolsContainer}>
          <h3>
            <span className={styles.light}>
              {date}
            </span>
          </h3>
          {
            user
              ? <h5>Bienvenido {user.name}</h5>
              : <Button onClick={() => actions.openModal()} title={<h3 style={{ margin: 0 }}>Iniciar sesión</h3>} />
          }
        </div>
      </header>
    </div>
  )
}
