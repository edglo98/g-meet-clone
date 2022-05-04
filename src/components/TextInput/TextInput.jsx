import { InputAlert } from '../InputAlert/InputAlert'
import styles from './TextInput.module.css'

export function TextInput (props) {
  const { error, icon, placeholder, value, onChange, register } = props
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
          type='text'
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
