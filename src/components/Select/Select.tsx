import React from 'react'
import ReactSelect from 'react-select'
import './ReactSelect.css'

export interface Props {
  options: readonly {
    value: string
    label: string
  }[]
}

const IndicatorSeparator = null

export const Select: React.FC<Props> = ({ options }) => {
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
