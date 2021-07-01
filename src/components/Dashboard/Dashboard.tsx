import React from 'react'
import styles from './Dashboard.module.css'
import cx from 'classnames'

export interface Account {
  staked: number,
  stakeable: number
}

const accounts: Account[] = [
  {
    staked: 1_000,
    stakeable: 10_000,
  },{
    staked: 1_000,
    stakeable: 100_000,
  }
]

const divisor = 100

interface BarItemProps {
  style: string
  amount: number
  divisor?: number
}
const BarItem: React.FC<BarItemProps> = ({ style, amount }) => {
  return (
    <div
      className={cx(styles.item, style)}
      style={{ width: amount / divisor }}
    ></div>
  )
}

export interface TokenBarProps {
  account: Account
}
export const TokenBar: React.FC<TokenBarProps> = ({account}) => {
  const { staked, stakeable } = account
  const total = staked + stakeable
  return (
    <div className={styles.container} style={{ width: total / divisor + 1 }}>
      <BarItem style={styles.staked} amount={staked} />
      <div className={cx(styles.item, styles.separator)} />
      <BarItem style={styles.stakeable} amount={stakeable} />
    </div>
  )
}

export interface Props {}
export const Dashboard: React.FC<Props> = () => {
  return (
    <div className={styles.dashboard}>
      {accounts.map(account => (
        <span className={styles.account}>
          <TokenBar account={account}/>
        </span>
      ))}
    </div>
  )
}
