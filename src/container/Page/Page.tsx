import React from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Account } from '../../components/Dashboard/types'
import styles from './Page.module.css'
import { Data } from '../../types'

export interface Props {
  accounts: Account[]
  dataSet: Data[]
}

export const Page: React.FC<Props> = ({ accounts, dataSet }) => {
  return (
    <>
      <Dashboard accounts={accounts} />
      <CollatorList dataSet={dataSet} />
    </>
  )
}
