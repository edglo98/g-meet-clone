import { useDateFormat } from '../../hooks/useDateFormat'
import { Button } from '../Button/Button'
import styles from './Header.module.css'

export function Header () {
  const date = useDateFormat()

  return (
    <header className={styles.headerContainer}>
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
        <Button title={<h3 style={{ margin: 0 }}>Iniciar sesión</h3>} />
      </div>
    </header>
  )
}
