import { Transition } from '../Transition/Transition'
import { TextInput } from '../TextInput/TextInput'
import { Button } from '../Button/Button'
import { Fragment, useState } from 'react'
import styles from './MeetingReady.module.css'
import { MdOutlineClose, MdContentCopy } from 'react-icons/md'

export function MeetingReady ({ show, onClose, meeting }) {
  const [wasCopied, setWasCopied] = useState(false)
  const meetinLink = 'https://g-meet-clone.vercel.app/' + meeting

  const handleCopy = () => {
    navigator.clipboard.writeText(meetinLink)
    setWasCopied(true)
  }

  return (
    <Transition as={Fragment} show={show}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          <MdOutlineClose size={24} />
        </button>
        <h2>Comparte este enlace para que se unan a la llamada</h2>
        <div style={{ maxWidth: 350, display: 'flex' }}>
          <TextInput
            placeholder='meeting'
            value={meetinLink}
            icon={<MdContentCopy />}
          />
          <Button
            title={
              <h4 style={{ margin: 0 }}>
                {wasCopied ? '¡Copiado!' : 'Copiar'}
              </h4>
              }
            styleType='text'
            onClick={handleCopy}
          />
        </div>
      </div>
    </Transition>
  )
}
