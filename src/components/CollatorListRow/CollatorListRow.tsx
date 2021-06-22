import React from 'react'
import { Collator } from '../Collator/Collator'
import { Data } from '../../types'
import styles from './CollatorListRow.module.css'

export interface Props {
  entry: Data,
  rank: number | undefined
}

const leftFillZero = (num: number | undefined, length: number) => {
  if (!num) num = 0
  return num.toString().padStart(length, '0')
}

const numberFormat = new Intl.NumberFormat()

export const CollatorListRow: React.FC<Props> = ({ entry, rank }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.spacer}></td>
      <td>
        <Collator address={entry.collator} />
      </td>
      <td>
        {numberFormat.format(entry.stake)} KLT (
        {leftFillZero(rank, 3)})
      </td>
      <td></td>
      <td>{leftFillZero(entry.delegators, 2)} / 25</td>
      <td>{numberFormat.format(entry.lowestStake)} KLT</td>
      <td>Add Stake</td>
      <td className={styles.spacer}></td>
    </tr>
  )
}
