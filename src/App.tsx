import React, { useEffect, useState } from 'react'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3FromSource,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp'
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

import './App.css'
import { connect } from './utils'

async function getGenesis() {
  const api = await connect()

  console.log(api.genesisHash.toHex())
}

async function getAllAccounts() {
  const allInjected = await web3Enable('KILT Staking App')
  console.log('allInjected', allInjected)
  const allAccounts = await web3Accounts()
  console.log('allAccounts', allAccounts)
  const source = allAccounts[0].meta.source
  console.log('source', source)
  const injector = await web3FromSource(source)
  console.log('injector', injector)
  const rpcProviders = await web3ListRpcProviders(source)
  console.log('rpcProviders', rpcProviders)
}

getAllAccounts()

getGenesis()

function App() {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [allAccounts, setAllAccounts] = useState<InjectedAccountWithMeta[]>([])

  useEffect(() => {
    async function doEffect() {
      const allInjected = await web3Enable('KILT Staking App')
      setWeb3Enabled(true)
    }
    doEffect()
  }, [])

  useEffect(() => {
    async function doEffect() {
      if (web3Enabled) {
        const allAccounts = await web3Accounts()
        setAllAccounts(allAccounts)
      }
    }
    doEffect()
  }, [web3Enabled])

  return (
    <div className="App">
      <ul>
        {allAccounts.map((account) => (
          <li>{account.meta.name} - {account.address}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
