import React from 'react'
import { Select } from '../../components/Select/Select'

export interface Props {}

const options = [
  { value: '5oiuhgc', label: 'KILT Identity 1 (Stakeable: 888,888.88 Y KLT)' },
  { value: '5iojoi', label: 'KILT Identity 2 (Stakeable: 888,888.88 Y KLT)' },
  { value: '5Gasd', label: 'KILT Identity 3 (Stakeable: 888,888.88 Y KLT)' },
]

export const IdentitySelector: React.FC<Props> = () => {
  return <Select options={options} />
}
