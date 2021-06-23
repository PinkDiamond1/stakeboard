import React from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'

export interface Props {
  staked?: boolean
}

export const NewStakeRow: React.FC<Props> = ({ staked = false }) => {
  return (
    <tr
      className={cx(rowStyles.row, rowStyles.stakeRow, {
        [rowStyles.staked]: staked,
      })}
    >
      <td></td>
      <td></td>
      <td></td>
      <td>
        <Input />
      </td>
      <td colSpan={2} className={rowStyles.column}>
        <IdentitySelector />
      </td>
      <td>
        <Button label="Stake" disabled={true} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
