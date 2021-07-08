import React from 'react'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      KILT | <span className={styles.name}>Stakeboard</span>
    </div>
  )
}