import React from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'

export interface Props {
  staked?: boolean
}

export const NewStakeRow: React.FC<Props> = ({ staked = false }) => {
  return (
    <tr className={cx(rowStyles.row, { [rowStyles.staked]: staked })}>
      <td></td>
      <td colSpan={2}></td>
      <td>New Stake</td>
      <td colSpan={2}>Account</td>
      <td>
        <Button label="Stake" disabled={true} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
