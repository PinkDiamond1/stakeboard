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
import { CollatorList } from './components/CollatorList/CollatorList'
import { Data, Candidate } from './types'
import { StateContext, StateProvider } from './utils/StateContext'
import { initialize } from './utils/polling'

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

const femtoToKilt = (big: bigint) => {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

const Consumer: React.FC = () => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [currentCandidates, setCurrentCandidates] = useState<string[]>([])

  const [dataSet, setDataSet] = useState<Data[]>([])
  const { state } = useContext(StateContext)

  useEffect(() => {
    let stop = () => {}

    const doEffect = async () => {
      stop = await initialize(
        5,
        (newCandidates, newSelectedCandidates, newCurrentCandidates) => {
          setCandidates(newCandidates)
          setSelectedCandidates(newSelectedCandidates)
          setCurrentCandidates(newCurrentCandidates)
        }
      )
    }
    doEffect()

    return () => {
      stop()
    }
  }, [])

  useEffect(() => {
    const newDataSet: Data[] = Object.values(candidates).map((candidate) => {
      const totalStake =
        candidate.stake +
        candidate.delegators.reduce(
          (prev, current) => prev + current.amount,
          0n
        )

      const sortedLowestStake = candidate.delegators.sort((a, b) =>
        a.amount >= b.amount ? 1 : -1
      )
      const lowestStake = sortedLowestStake.length
        ? femtoToKilt(sortedLowestStake[0].amount)
        : null

      return {
        active: currentCandidates.includes(candidate.id),
        activeNext: selectedCandidates.includes(candidate.id),
        collator: candidate.id,
        delegators: candidate.delegators.length,
        lowestStake: lowestStake,
        totalStake: femtoToKilt(totalStake),
        stakes: [],
        favorite: state.favorites.includes(candidate.id),
        isLeaving: !!candidate.isLeaving,
      }
    })

    setDataSet(newDataSet)
  }, [candidates, state, selectedCandidates, currentCandidates])

  return <CollatorList dataSet={dataSet} />
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
      <StateProvider>
        <Consumer />
      </StateProvider>
    </div>
  )
}

export default App
