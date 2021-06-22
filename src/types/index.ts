export interface Stake {
  stake: number
  account: {
    name: string
    available: number
  }
}

export interface Data {
  collator: string
  stake: number
  delegators: number
  lowestStake: number
  stakes: Array<Stake>
}
