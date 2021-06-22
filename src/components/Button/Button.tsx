import React from 'react'
import cx from 'classnames'
import styles from './Button.module.css'

export interface ButtonProps {
  /**
   * Label of the button.
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  ...props
}) => {
  if (children && !label) {
    return (
      <span className={cx(styles.buttonRaw)} {...props}>
        {children}
      </span>
    )
  }
  return (
    <button type="button" className={cx(styles.button)} {...props}>
      {label}
    </button>
  )
}
