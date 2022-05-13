import { Transition as HLTrans } from '@headlessui/react'
import styles from './Transition.module.css'

export function Transition ({show, children, ...props}) {

  return (
    <HLTrans
      appear={true}
      show={show}
      enter={styles.enter}
      enterFrom={styles.enterFrom}
      enterTo={styles.enterTo}
      leave={styles.leave}
      leaveFrom={styles.leaveFrom}
      leaveTo={styles.leaveTo}
      {...props}
    >
      {children}
    </HLTrans>
  )
}