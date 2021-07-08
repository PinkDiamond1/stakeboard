import React from 'react'
import styles from './ChainInfo.module.css'
import cx from 'classnames'

export const ChainInfo: React.FC = () => {
  return (
    <div className={styles.chaininfo}>
      <div className={styles.container}>
        <span className={styles.label}>Session Countdown</span>
        <span className={styles.countdown}>2:00:00</span>
      </div>
      <div className={styles.container}>
        <span className={styles.label}>Best Block</span>{' '}
        <span className={styles.value} ># 8,888,888</span>
        <span className={cx(styles.label, styles.leftMargin)}>Finalized Block</span>{' '}
        <span className={styles.value} ># 8,888,888</span>
        <span className={cx(styles.label, styles.leftMargin)}>Refresh Every 10 secs on/off</span> 
      </div>
    </div>
  )
}
