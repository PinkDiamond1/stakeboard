import React, { useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'

export interface Props {
  staked?: boolean
}

export const NewStakeRow: React.FC<Props> = ({ staked = false }) => {
  const [newStake, setNewStake] = useState('')
  const [account, setAccount] = useState('')
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
        <Input
          number
          value={newStake}
          onInput={(e) => setNewStake(e.currentTarget.value)}
        />
      </td>
      <td colSpan={2} className={rowStyles.column}>
        <IdentitySelector onChange={(val) => setAccount(val?.value || '')} />
      </td>
      <td>
        <Button label="Stake" disabled={!(newStake && account)} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
