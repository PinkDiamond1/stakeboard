import React from 'react'
import cx from 'classnames'
import { Collator } from '../Collator/Collator'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import rowStyles from '../../styles/row.module.css'
import { format, leftFillZero } from '../../utils'
import { Data } from '../../types'

export interface Props {
  entry: Data
  rank: number | undefined
  setExpanded: (expanded: boolean) => void
  expanded: boolean
}

export const CollatorRow: React.FC<Props> = ({
  entry,
  rank,
  setExpanded,
  expanded,
}) => {
  return (
    <tr
      className={cx(rowStyles.row, {
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
        {entry.active ? <Icon type="bulb_yellow" /> : <Icon type="bulb_gray" />}
        {entry.activeNext ? (
          <Icon type="next_session_yellow" />
        ) : (
          <Icon type="next_session_gray" />
        )}
      </td>
      <td>
        {format(entry.totalStake)} ({leftFillZero(rank, 3)})
      </td>
      <td></td>
      <td>{leftFillZero(entry.delegators, 2)} / 25</td>
      <td>{entry.lowestStake ? format(entry.lowestStake) : '--'}</td>
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
  )
}
