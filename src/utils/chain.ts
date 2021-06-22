import { ApiPromise, WsProvider } from '@polkadot/api'

let cachedApi: ApiPromise | null = null;

export async function connect() {
  if (!cachedApi) {
    const wsProvider = new WsProvider('wss://kilt-peregrine-k8s.kilt.io')
    cachedApi = await ApiPromise.create({ provider: wsProvider })
  }
  if (!cachedApi.isConnected) {
    await cachedApi.connect()
  }
  return cachedApi
}

export function disconnect() {
  return cachedApi?.disconnect()
}
