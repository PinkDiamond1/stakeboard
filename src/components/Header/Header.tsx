import React from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Icon type="KILT_logo" width={50} />
      <span className={styles.spacer} />
      <span className={styles.name}>Stakeboard</span>
      <Icon type="skateboarder" width={60} />
    </div>
  )
}
