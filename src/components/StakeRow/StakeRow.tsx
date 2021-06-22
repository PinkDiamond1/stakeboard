import React from 'react'
import cx from 'classnames'
import styles from './StakeRow.module.css'
import rowStyles from '../../styles/row.module.css'
import { format } from '../../utils'
import { Stake } from '../../types'
import { Button } from '../Button/Button'

export interface Props {
  stakeInfo: Stake
}

export const StakeRow: React.FC<Props> = ({ stakeInfo }) => {
  return (
    <tr className={cx(rowStyles.row, styles.stakeRow, rowStyles.staked)}>
      <td className={rowStyles.spacer}></td>
      <td></td>
      <td></td>
      <td>{format(stakeInfo.stake)}</td>
      <td colSpan={2}>
        {stakeInfo.account.name} (AVL: {format(stakeInfo.account.available)})
      </td>
      <td>
        <Button label="Edit" />
      </td>
      <td></td>
      <td className={rowStyles.spacer}></td>
    </tr>
  )
}
