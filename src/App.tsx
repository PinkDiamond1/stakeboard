import React, { useContext, useEffect, useState } from 'react'
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
import { getGenesis, getCandidatePool } from './utils'
import { CandidatePool } from './container/CandidatePool/CandidatePool'
import { CandidatesContext } from './utils/CandidatesContext'

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

const Consumer: React.FC = () => {
  const candidates = useContext(CandidatesContext)
  console.log(candidates)
  return <>{Object.values(candidates).map(candidate => (
    <>
    <h3>{candidate.id}</h3>
    <p>Delegators: {candidate.delegators.length}</p>
    <p>Total: {(candidate.total /  10n ** 15n).toString()}</p>
    </>
  ))}</>
}

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
        // TODO: We want to filter the account for the ones usable with the connected chain
        const genesisHash = await getGenesis()
        await getCandidatePool()
        setAllAccounts(
          allAccounts.filter(
            (account) =>
              !account.meta.genesisHash?.length ||
              account.meta.genesisHash === genesisHash
          )
        )
      }
    }
    doEffect()
  }, [web3Enabled])

  return (
    <div className="App">
      <ul>
        {allAccounts.map((account) => (
          <li>
            {account.meta.name} - {account.address}
          </li>
        ))}
      </ul>
      <CandidatePool>
        <Consumer />
      </CandidatePool>
    </div>
  )
}

export default App
