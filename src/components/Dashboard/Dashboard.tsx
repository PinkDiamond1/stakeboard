import React from 'react'
import styles from './Dashboard.module.css'
import { Account } from '../../types'
import { Accounts } from './Accounts'

export interface Props {
  accounts: Account[]
}

export const Dashboard: React.FC<Props> = ({ accounts }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.accounts}>
        <Accounts accounts={accounts} />
      </div>
    </div>
  )
}
