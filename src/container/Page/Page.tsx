import React from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Header } from '../../components/Header/Header'
import { ChainInfo } from '../../components/ChainInfo/ChainInfo'
import styles from './Page.module.css'
import { Account, Data } from '../../types'

export interface Props {
  accounts: Account[]
  dataSet: Data[]
}

export const Page: React.FC<Props> = ({ accounts, dataSet }) => {
  return (
    <div className={styles.page}>
      <Header />
      <ChainInfo />
      <Dashboard accounts={accounts} />
      <CollatorList dataSet={dataSet} />
    </div>
  )
}
