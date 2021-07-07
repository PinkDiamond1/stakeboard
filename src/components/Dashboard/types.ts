export interface Account {
  address: string
  name: string
  staked: number
  stakeable: number
  used?: boolean
}

export interface AccountWithPct extends Account {
  total: number
  stakedPct: string
  stakeablePct: string
}
