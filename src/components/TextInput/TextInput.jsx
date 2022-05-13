import { InputAlert } from '../InputAlert/InputAlert'
import styles from './TextInput.module.css'

export function TextInput (props) {
  const { password, error, icon, placeholder, value, onChange, disabled, register } = props
  return (
    <div>
      <label className={styles.inputContainer}>
        {
          icon && (
            <span className={styles.icon}>
              {icon}
            </span>
          )
        }
        <input
          type={password ? 'password' : 'text'}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...register}
        />
        <span className={`${styles.highlighting} ${error ? styles.error : null}`} />
      </label>
      {
        error && (
          <InputAlert>{error}</InputAlert>
        )
      }
    </div>
  )
}
