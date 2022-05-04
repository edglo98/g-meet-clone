import { useAuth } from '../../hooks/useAuth'
import { useDateFormat } from '../../hooks/useDateFormat'
import { Button } from '../Button/Button'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'
import styles from './Header.module.css'

export function Header () {
  const { user, actions } = useAuth()
  const date = useDateFormat()

  const logout = async () => {
    await actions.logout()
  }

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
              ? (
                <Dropdown
                  title={<h5 style={{ margin: 0 }}>{user.name}</h5>}
                  buttonStyle='text'
                  position='bottom'
                >
                  <DropdownItem
                    onClick={logout}
                    title={<h5 style={{ margin: 0, color: 'brown' }}>Cerrar sesión</h5>}
                  />
                </Dropdown>
                )
              : <Button onClick={() => actions.openModal()} title={<h3 style={{ margin: 0 }}>Iniciar sesión</h3>} />
          }
        </div>
      </header>
    </div>
  )
}
