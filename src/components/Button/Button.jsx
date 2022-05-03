import styles from './Button.module.css'

export function Button (props) {
  const styleType = {
    text: styles.text,
    contained: styles.contained
  }

  return (
    <button
      className={`
        ${styles.button} 
        ${styleType[props.type || 'contained']} 
        ${props.buttonClassName}
      `}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  )
}
