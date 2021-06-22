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
