import React from 'react'
import cx from 'classnames'
import { Collator } from '../Collator/Collator'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Data } from '../../types'
import styles from './CollatorListRow.module.css'

export interface Props {
  entry: Data
  rank: number | undefined
}

const leftFillZero = (num: number | undefined, length: number) => {
  if (!num) num = 0
  return num.toString().padStart(length, '0')
}

const numberFormat = new Intl.NumberFormat()

const format = (amount: number) => `${numberFormat.format(amount)} KLT`

const COLS = 6

export const CollatorListRow: React.FC<Props> = ({ entry, rank }) => {
  return (
    <>
      <tr className={styles.firstRow}></tr>
      <tr
        className={cx({
          [styles.row]: true,
          [styles.staked]: entry.stakes.length,
        })}
      >
        <td className={styles.spacer}></td>
        <td>
          <span>
            <Icon type="fav_yellow" />
          </span>
          <Collator address={entry.collator} />
        </td>
        <td>
          {format(entry.stake)} ({leftFillZero(rank, 3)})
        </td>
        <td></td>
        <td>{leftFillZero(entry.delegators, 2)} / 25</td>
        <td>{format(entry.lowestStake)}</td>
        <td>
          {entry.stakes.length ? (
            <Icon type="tokens_yellow" />
          ) : (
            <Icon type="tokens_gray" />
          )}
        </td>
        <td className={styles.spacer}></td>
      </tr>
      {entry.stakes.length > 0 &&
        entry.stakes.map((stakeInfo) => (
          <tr
            className={cx({
              [styles.row]: true,
              [styles.stakeRow]: true,
              [styles.staked]: entry.stakes.length,
            })}
          >
            <td className={styles.spacer}></td>
            <td></td>
            <td>{format(stakeInfo.stake)}</td>
            <td colSpan={2}>
              {stakeInfo.account.name} (AVL:{' '}
              {format(stakeInfo.account.available)})
            </td>
            <td>
              <Button label="Edit" />
            </td>
            <td></td>
            <td className={styles.spacer}></td>
          </tr>
        ))}
      <tr className={styles.lastRow}>
        <td className={styles.spacer}></td>
        <td colSpan={COLS}></td>
        <td className={styles.spacer}></td>
      </tr>
    </>
  )
}
