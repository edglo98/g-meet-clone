import styles from './Button.module.css'

export function Button (props) {
  const styleType = {
    text: styles.text,
    contained: styles.contained
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`
        ${styles.button} 
        ${styleType[props.styleType || 'contained']} 
        ${props.buttonClassName}
      `}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  )
}
