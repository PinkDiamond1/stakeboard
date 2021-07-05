import React from 'react'
import styles from './Dashboard.module.css'
import cx from 'classnames'
import { Identicon } from '../Identicon/Identicon'
import { format } from '../../utils'

export interface Account {
  address: string
  name: string
  staked: number
  stakeable: number
}

export interface AccountWithPct extends Account {
  total: number
  stakedPct: string
  stakeablePct: string
}

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
  account: AccountWithPct
  down?: boolean
}
export const TokenBar: React.FC<TokenBarProps> = ({
  account,
  down = false,
}) => {
  const { staked, stakeable, total } = account

  const has_staked = staked > 0
  const has_stakeable = stakeable > 0

  let container_width = total / divisor
  container_width =
    has_staked && has_stakeable ? container_width + 1 : container_width

  return (
    <div
      className={cx(styles.container, { [styles.containerDown]: down })}
      style={{ width: container_width }}
    >
      {has_staked && <BarItem style={styles.staked} amount={staked} />}
      {has_staked && has_stakeable && (
        <div className={cx(styles.item, styles.separator)} />
      )}
      {has_stakeable && <BarItem style={styles.stakeable} amount={stakeable} />}
    </div>
  )
}

export interface AccountInfoProps {
  account: AccountWithPct
}
export const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  return (
    <div className={styles.info}>
      <div className={styles.name}>{account.name}</div>
      <div>
        <span className={styles.stakeLabel}>MY STAKE: </span>
        <span className={styles.stakeValue}>
          {`${account.stakedPct}%`} ({format(account.staked)})
        </span>
      </div>
      <div>
        <span className={styles.stakeLabel}>STAKEABLE: </span>
        <span className={styles.stakeValue}>{`${account.stakeablePct}%`}</span>
      </div>
    </div>
  )
}

export interface MetaProps {
  account: AccountWithPct
}
export const MetaUp: React.FC<MetaProps> = ({ account }) => {
  return (
    <div className={styles.meta}>
      <div className={styles.identicon}>
        <Identicon address={account.address} />
        <div className={styles.line}></div>
      </div>
      <AccountInfo account={account} />
    </div>
  )
}

export const MetaDown: React.FC<MetaProps> = ({ account }) => {
  return (
    <div className={styles.metaDown}>
      <div className={cx(styles.identicon, styles.identiconDown)}>
        <div className={cx(styles.line, styles.lineDown)}></div>
        <Identicon address={account.address} />
      </div>
      <AccountInfo account={account} />
    </div>
  )
}

export interface Props {
  accounts: Account[]
}
export const Dashboard: React.FC<Props> = ({ accounts }) => {
  return (
    <div className={styles.dashboard}>
      {accounts.map((account, index) => {
        const total = account.staked + account.stakeable
        const stakedPct = ((account.staked / total) * 100).toFixed(1)
        const stakeablePct = ((account.stakeable / total) * 100).toFixed(1)
        const accountWithPct: AccountWithPct = {
          ...account,
          total,
          stakedPct,
          stakeablePct,
        }
        return (
          <>
            <span className={styles.account}>
              {index % 2 === 0 && <MetaUp account={accountWithPct} />}
              <TokenBar account={accountWithPct} down={index % 2 !== 0} />
              {index % 2 !== 0 && <MetaDown account={accountWithPct} />}
            </span>
          </>
        )
      })}
    </div>
  )
}
