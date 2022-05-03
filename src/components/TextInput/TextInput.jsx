import styles from './TextInput.module.css'

export function TextInput (props) {
  return (
    <label className={styles.inputContainer}>
      <i className={styles.icon}>
        ⌨️
      </i>
      <input
        className={styles.input}
        type='text'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        id='input'
      />
      <span className={styles.highlighting} />
    </label>
  )
}
