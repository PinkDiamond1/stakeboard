import { Vec, Option, BTreeMap, Tuple, u32, u128 } from '@polkadot/types'
import type {
  AccountId,
  Balance,
  BalanceOf,
  BlockNumber,
} from '@polkadot/types/interfaces'
import { Candidate, ChainTypes, StakingRates } from '../types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { getConnection } from './useConnect'
import { StakingRates as StakingRatesChain } from '@kiltprotocol/augment-api'
import { stakingRatesToHuman } from './stakePercentage'

export async function getGenesis() {
  const api = await getConnection()
  // @ts-ignore
  window.api = api
  return api.genesisHash.toHex()
}

export async function getCandidatePool() {
  const api = await getConnection()
  return api.query.parachainStaking.candidatePool.entries<
    Option<ChainTypes.Collator>,
    [AccountId]
  >()
}

export const mapCollatorStateToCandidate = (
  state: ChainTypes.Collator
): Candidate => ({
  id: state.id.toString(),
  stake: state.stake.toBigInt(),
  delegators: state.delegators.map((delegator) => {
    return {
      id: delegator.owner.toString(),
      amount: delegator.amount.toBigInt(),
    }
  }),
  total: state.total.toBigInt(),
  isLeaving: state.status.isLeaving ? state.status.asLeaving.toBigInt() : false,
  userStakes: [],
})

export async function getNextCollators() {
  const api = await getConnection()
  return api.query.session.queuedKeys<Vec<Tuple>>()
}

export async function getCurrentCollators() {
  const api = await getConnection()
  return api.query.session.validators<Vec<AccountId>>()
}

export async function querySessionInfo() {
  const api = await getConnection()
  const roundInfo = api.query.parachainStaking.round<ChainTypes.RoundInfo>()
  return roundInfo
}

export async function queryBestBlock() {
  const api = await getConnection()
  return api.derive.chain.bestNumber()
}

export async function queryBestFinalisedBlock() {
  const api = await getConnection()
  return api.derive.chain.bestNumberFinalized()
}

export async function queryOverallTotalStake() {
  const api = await getConnection()
  return api.query.parachainStaking.totalCollatorStake<ChainTypes.TotalStake>()
}

export async function queryMaxCandidateCount() {
  const api = await getConnection()
  return api.query.parachainStaking.maxSelectedCandidates<u32>()
}

export async function queryTotalIssurance() {
  const api = await getConnection()
  return api.query.balances.totalIssuance<Balance>()
}

export async function queryMinDelegatorStake(): Promise<u128> {
  const api = await getConnection()
  return api.consts.parachainStaking.minDelegatorStake as u128
}

export async function queryStakingRates(): Promise<StakingRates> {
  const api = await getConnection()
  try {
    const rates = await api.call.staking.getStakingRates<StakingRatesChain>()
    return stakingRatesToHuman(rates)
  } catch (e) {
    console.warn(e)
    return {
      collatorRewardRate: 0,
      collatorStakingRate: 0,
      delegatorRewardRate: 0,
      delegatorStakingRate: 0,
    }
  }
}

export async function getUnclaimedStakingRewards(
  account: string
): Promise<Balance> {
  const api = await getConnection()
  return api.call.staking.getUnclaimedStakingRewards<Balance>(account)
}

export async function getMaxNumberDelegators(): Promise<u32> {
  const api = await getConnection()
  return api.consts.parachainStaking.maxDelegatorsPerCollator as u32
}
export async function getBalance(account: string) {
  const api = await getConnection()
  return api.query.system.account(account)
}

export async function getUnstakingAmounts(account: string) {
  const api = await getConnection()
  return api.query.parachainStaking.unstaking<BTreeMap<BlockNumber, BalanceOf>>(
    account
  )
}

export async function getDelegatorStake(account: string) {
  const api = await getConnection()
  return api.query.parachainStaking.delegatorState<
    Option<ChainTypes.Delegator>
  >(account)
}

export async function signAndSend(
  address: string,
  tx: SubmittableExtrinsic,
  onSuccess: (txHash: string) => void,
  onError: (error: Error) => void
) {
  const api = await getConnection()
  const injector = await web3FromAddress(address)

  let hadError = false

  return tx.signAndSend(
    address,
    { signer: injector.signer },
    ({ status, events, dispatchError }) => {
      if (status.isFinalized && !dispatchError) {
        onSuccess(status.asFinalized.toString())
      }
      if (dispatchError && !hadError) {
        hadError = true
        if (dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(dispatchError.asModule)
          const { docs, name, section } = decoded

          const error = new Error(`${section}.${name}: ${docs.join(' ')}`)
          onError(error)
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          const error = new Error(dispatchError.toString())
          onError(error)
        }
      }
    }
  )
}

// Staking features

export async function joinDelegators(collator: string, stake: bigint) {
  const api = await getConnection()
  return api.tx.parachainStaking.joinDelegators(collator, stake)
}
export async function delegatorStakeMore(more: bigint) {
  const api = await getConnection()
  return api.tx.parachainStaking.delegatorStakeMore(more)
}
export async function delegatorStakeLess(less: bigint) {
  const api = await getConnection()
  return api.tx.parachainStaking.delegatorStakeLess(less)
}
export async function leaveDelegators() {
  const api = await getConnection()
  return api.tx.parachainStaking.leaveDelegators()
}

export async function withdrawStake(account: string) {
  const api = await getConnection()
  return api.tx.parachainStaking.unlockUnstaked(account)
}
export async function claimDelegatorRewards() {
  const api = await getConnection()
  const txs = [
    api.tx.parachainStaking.incrementDelegatorRewards(),
    api.tx.parachainStaking.claimRewards(),
  ]
  return api.tx.utility.batch(txs)
}
