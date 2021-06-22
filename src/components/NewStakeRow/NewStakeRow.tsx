import React from 'react'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'

export interface Props {}

export const NewStakeRow: React.FC<Props> = ({}) => {
  return (
    <tr className={`${rowStyles.row}`}>
          <td colSpan={3}></td>
          <td>New Stake</td>
          <td colSpan={2}>Account</td>
          <td>
            <Button label="Stake" disabled={true} />
          </td>
        </tr>
  )
}
