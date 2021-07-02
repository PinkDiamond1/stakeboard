import React from 'react'
import styles from './Dashboard.module.css'
import cx from 'classnames'
import { Identicon } from '../Identicon/Identicon'

export interface Account {
  address: string
  name: string
  staked: number
  stakeable: number
}

const accounts: Account[] = [
  {
    address: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
    name: 'KILT Identity 1',
    staked: 4_000,
    stakeable: 10_000,
  },
  {
    address: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
    name: 'KILT Identity 2',
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
        <>
          <span className={styles.account}>
            <div className={styles.meta}>
              <div className={styles.identicon}>
                <Identicon address={account.address} />
                <div className={styles.line}></div>
              </div>
              <div className={styles.info}>
                <div>{account.name}</div>
                <div>MY STAKE: 100,000.00 KILT</div>
                <div>STAKEABLE: 100,000.00 KILT</div>
              </div>
            </div>
            <TokenBar account={account} />
          </span>
        </>
      ))}
    </div>
  )
}
