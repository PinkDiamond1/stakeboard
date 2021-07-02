import React from 'react'
import styles from './Dashboard.module.css'
import cx from 'classnames'

export interface Account {
  staked: number
  stakeable: number
}

const accounts: Account[] = [
  {
    staked: 4_000,
    stakeable: 10_000,
  },
  {
    staked: 9_000,
    stakeable: 100_000,
  },
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
export const TokenBar: React.FC<TokenBarProps> = ({ account }) => {
  const { staked, stakeable } = account
  const total = staked + stakeable

  const has_staked = staked > 0
  const has_stakeable = stakeable > 0

  let container_width = total / divisor
  container_width =
    has_staked && has_stakeable ? container_width + 1 : container_width

  return (
    <div className={styles.container} style={{ width: container_width }}>
      {has_staked && <BarItem style={styles.staked} amount={staked} />}
      {has_staked && has_stakeable && (
        <div className={cx(styles.item, styles.separator)} />
      )}
      {has_stakeable && <BarItem style={styles.stakeable} amount={stakeable} />}
    </div>
  )
}

export interface Props {}
export const Dashboard: React.FC<Props> = () => {
  return (
    <div className={styles.dashboard}>
      {accounts.map((account) => (
        <span className={styles.account}>
          <TokenBar account={account} />
        </span>
      ))}
    </div>
  )
}
