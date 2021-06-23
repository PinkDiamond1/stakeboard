import React from 'react'
import ReactSelect from 'react-select'
import './ReactSelect.css'

export interface Props {}

const options = [
  { value: '5oiuhgc', label: 'KILT Identity 1 (Stakeable: 888,888.88 Y KLT)' },
  { value: '5iojoi', label: 'KILT Identity 2 (Stakeable: 888,888.88 Y KLT)' },
  { value: '5Gasd', label: 'KILT Identity 3 (Stakeable: 888,888.88 Y KLT)' },
]

const IndicatorSeparator = null

export const Select: React.FC<Props> = () => {
  return (
    <ReactSelect
      options={options}
      components={{ IndicatorSeparator }}
      placeholder="Select KILT Identity"
      className={'Select'}
      classNamePrefix="s"
    />
  )
}
