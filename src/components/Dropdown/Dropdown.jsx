import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button/Button'
import styles from './Dropdown.module.css'

export function Dropdown ({ children }) {
  return (
    <Menu as='div' className={styles.dropdownContainer}>
      <div>
        <Menu.Button as='div' style={{ padding: 0, margin: 0, border: 'none', borderRadius: 5 }}>
          <Button
            title={
              <h3 style={{ margin: 0 }}>
                📹 Nueva reunión
              </h3>
            }
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter={styles.enter}
        enterFrom={styles.enterFrom}
        enterTo={styles.enterTo}
        leave={styles.leave}
        leaveFrom={styles.leaveFrom}
        leaveTo={styles.leaveTo}
      >
        <Menu.Items className={styles.menuItemsContainer}>
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function DropdownItem ({ onClick, title, disabled }) {
  return (
    <Menu.Item>
      <Button
        type='text'
        buttonClassName={`${styles.item} ${disabled && styles.disabledItem}`}
        onClick={onClick}
        disabled={disabled}
        title={
          <h4 style={{ margin: 0 }}>
            {title}
          </h4>
        }
      />
    </Menu.Item>
  )
}
