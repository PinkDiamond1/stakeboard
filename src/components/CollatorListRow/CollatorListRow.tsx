import React, { useState } from 'react'
import cx from 'classnames'
import { Collator } from '../Collator/Collator'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Data } from '../../types'
import styles from './CollatorListRow.module.css'
import rowStyles from '../../styles/row.module.css'
import { format, leftFillZero } from '../../utils'
import { StakeRow } from '../StakeRow/StakeRow'
import { NewStakeRow } from '../NewStakeRow/NewStakeRow'

export interface Props {
  entry: Data
  rank: number | undefined
}

const COLS = 7

export const CollatorListRow: React.FC<Props> = ({ entry, rank }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <tr className={styles.firstRow}></tr>
      <tr
        className={cx({
          [styles.row]: true,
          [rowStyles.staked]: entry.stakes.length,
        })}
      >
        <td className={rowStyles.spacer}></td>
        <td>
          <Button>
            <Icon type="fav_yellow" />
          </Button>
          <Collator address={entry.collator} />
        </td>
        <td>
          {entry.active ? (
            <Icon type="bulb_yellow" />
          ) : (
            <Icon type="bulb_gray" />
          )}
          {entry.activeNext ? (
            <Icon type="next_session_yellow" />
          ) : (
            <Icon type="next_session_gray" />
          )}
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
            <Button
              onClick={() => {
                setExpanded(!expanded)
              }}
            >
              <Icon type="tokens_gray" />
            </Button>
          )}
        </td>
        <td className={rowStyles.spacer}></td>
      </tr>
      {entry.stakes.length > 0 &&
        entry.stakes.map((stakeInfo) => (
          <StakeRow stakeInfo={stakeInfo} />
        ))}
      {expanded && (
        <NewStakeRow />
      )}
      <tr className={styles.lastRow}>
        <td className={rowStyles.spacer}></td>
        <td colSpan={COLS}></td>
        <td className={rowStyles.spacer}></td>
      </tr>
    </>
  )
}
