import React, { useState } from 'react'
import styles from './Input.module.css'

export interface Props {}

export const Input: React.FC<Props> = () => {
  const [input, setInput] = useState('')
  return (
    <>
      <input
        type="number"
        className={styles.number}
        placeholder="0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  )
}
