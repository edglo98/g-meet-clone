import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button/Button'
import styles from './Dropdown.module.css'

export function Dropdown ({ children, title, buttonStyle, position }) {
  const itemsPosition = {
    top: styles.top,
    bottom: styles.bottom
  }

  return (
    <Menu as='div' className={styles.dropdownContainer}>
      <div>
        <Menu.Button as='div' style={{ padding: 0, margin: 0, border: 'none', borderRadius: 5 }}>
          <Button
            styleType={buttonStyle || 'contained'}
            title={title}
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
        <Menu.Items className={`${styles.menuItemsContainer} ${itemsPosition[position || 'top']}`}>
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function DropdownItem ({ onClick, title, disabled }) {
  return (
    <Menu.Item as='div'>
      <Button
        styleType='text'
        buttonClassName={`${styles.item} ${disabled && styles.disabledItem}`}
        onClick={onClick}
        disabled={disabled}
        title={title}
      />
    </Menu.Item>
  )
}
