import React from 'react'
import { Identicon } from '../Identicon/Identicon'
import styles from './Collator.module.css'

export interface Props {
  address: string
  activeSince?: number
}

export const Collator: React.FC<Props> = ({ address, activeSince }) => {
  const shortAddress = `${address.substr(0, 3)}...${address.slice(-3)}`
  return (
    <>
      <span className={styles.identicon}>
        <Identicon address={address} />
      </span>
      <span className={styles.address}>{shortAddress}</span>
    </>
  )
}
