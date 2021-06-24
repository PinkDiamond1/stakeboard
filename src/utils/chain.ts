import { ApiPromise, WsProvider } from '@polkadot/api'
import { types10 as types } from '@kiltprotocol/type-definitions'
import type { Struct, Vec } from '@polkadot/types'
import type { AccountId, Balance } from '@polkadot/types/interfaces'

let cachedApi: ApiPromise | null = null

export async function connect() {
  if (!cachedApi) {
    const wsProvider = new WsProvider('wss://kilt-peregrine-k8s.kilt.io')
    cachedApi = await ApiPromise.create({ provider: wsProvider, types })
  }
  if (!cachedApi.isConnected) {
    await cachedApi.connect()
  }
  return cachedApi
}

export function disconnect() {
  return cachedApi?.disconnect()
}

export async function getGenesis() {
  const api = await connect()
  // @ts-ignore
  window.api = api
  return api.genesisHash.toHex()
}

export interface Stake extends Struct {
  owner: AccountId
  amount: Balance
}
export async function getCandidatePool() {
  const api = await connect()
  const candidatePool = await api.query.parachainStaking.candidatePool<
    Vec<Stake>
  >()

  candidatePool.map((stake) => {
    console.log(stake.owner.toHuman())
    console.log(stake.amount.toBigInt())
  })

  return candidatePool
}

export async function subscribeToCandidatePool(
  listener: (candidatePool: Vec<Stake>) => void
) {
  const api = await connect()
  api.query.parachainStaking.candidatePool<Vec<Stake>>(listener)
}
