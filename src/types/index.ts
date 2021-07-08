export interface Stake {
  stake: number
  account: {
    name: string
    address: string
    available: number
  }
}

export interface Data {
  collator: string
  active: boolean
  activeNext: boolean
  isLeaving: boolean
  totalStake: number
  delegators: number
  lowestStake: number | null
  stakes: Array<Stake>
  favorite: boolean
}

/* Types for chain data */
export interface Candidate {
  id: string
  stake: bigint
  delegators: {
    id: string
    amount: bigint
  }[]
  total: bigint
  isLeaving: bigint | false
  unsub?: Promise<() => void>
}
