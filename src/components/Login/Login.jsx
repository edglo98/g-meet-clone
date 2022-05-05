import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { TextInput } from '../TextInput/TextInput'
import styles from './Login.module.css'

export function Login () {
  const { isLoading, modalOpen, actions } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isRegister, setIsRegister] = useState(false)

  const onSubmit = data => {
    actions.login(data.email, data.password).then(() => {
      actions.closeModal()
    })
  }

  const openRegister = () => {
    actions.closeModal()
    setIsRegister(true)
  }

  const closeRegister = () => {
    setIsRegister(false)
    actions.openModal()
  }

  return (
    <>
      <Register isOpen={isRegister} onBack={closeRegister} onClose={() => setIsRegister(false)} />
      <Modal onClose={() => actions.closeModal()} isOpen={modalOpen} title='Iniciar sesión'>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextInput
            placeholder='Correo electrónico'
            icon='💌'
            register={register('email', { required: true })}
            error={errors.email && 'This field is required'}
          />
          <TextInput
            placeholder='Contraseña'
            password
            icon='🔒'
            register={register('password', { required: true })}
            error={errors.password && 'This field is required'}
          />
          <Button
            title='Iniciart sesión'
            disabled={isLoading}
          />
        </form>
        <div style={{ textAlign: 'center' }}>
          <Button
            disabled={isLoading}
            onClick={openRegister}
            title='Resgistrate aquí'
            styleType='text'
          />
        </div>
      </Modal>
    </>
  )
}

const Register = ({ isOpen, onClose, onBack }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const { isLoading, actions } = useAuth()

  const onSubmit = data => {
    if (data.password !== data.password2) {
      setError('password2', { type: 'manual', message: 'Las contraseñas no coinciden' })
      setError('password', { type: 'manual', message: 'Las contraseñas no coinciden' })
      return
    }
    const { password2, ...sigupData } = data
    actions.signUp(sigupData).then(() => {
      onClose()
    })
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      title={
        <>
          <Button
            title={
              <h1 style={{ margin: 0 }}>👈🏼</h1>
            }
            onClick={onBack}
            styleType='text'
          />
          Crear cuenta
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextInput
          placeholder='Nombre'
          icon='👨🏻‍💻'
          register={register('name', { required: true })}
          error={errors.name && 'This field is required'}
        />
        <TextInput
          placeholder='Nombred de usuario'
          icon='🏷'
          register={register('username', { required: true })}
          error={errors.username && 'This field is required'}
        />
        <TextInput
          placeholder='Correo electrónico'
          icon='💌'
          register={register('email', { required: true })}
          error={errors.email && 'This field is required'}
        />
        <TextInput
          placeholder='Contraseña'
          password
          icon='🔒'
          register={register('password', { required: true })}
          error={errors.password && (errors.password.message || 'This field is required')}
        />
        <TextInput
          placeholder='Contraseña'
          password
          icon='🔒'
          register={register('password2', { required: true })}
          error={errors.password2 && (errors.password2.message || 'This field is required')}
        />
        <Button
          type='submit'
          title='Crear cuenta'
          disabled={isLoading}
        />
      </form>
    </Modal>
  )
}
