import styles from './Button.module.css'

export function Button (props) {
  const styleType = {
    text: styles.text,
    contained: styles.contained
  }

  return (
    <button className={`${styles.button} ${styleType[props.type || 'contained']}`} disabled={props.disabled}>
      {props.title}
    </button>
  )
}
