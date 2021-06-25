export interface Stake {
  stake: number
  account: {
    name: string
    available: number
  }
}

export interface Data {
  collator: string
  active: boolean
  activeNext: boolean
  stake: number
  delegators: number
  lowestStake: number
  stakes: Array<Stake>
}

export interface Candidate {
  id: string
  stake: bigint
  delegators: {
    id: string
    amount: bigint
  }[]
  total: bigint
  isLeaving: bigint | false
  unsub?: () => void
}
