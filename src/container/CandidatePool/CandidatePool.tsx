import React, { useEffect, useState } from 'react'
import { Candidate } from '../../types'
import { CandidatesContext } from '../../utils/CandidatesContext'
import {
  Collator,
  getAllCollatorState,
  Stake,
  subscribeToCandidatePool,
  subscribeToCollatorState,
} from '../../utils/chain'

export interface Props {}

const mapCollatorStateToCandidate = (state: Collator): Candidate => ({
  id: state.id.toString(),
  stake: state.stake.toBigInt(),
  delegators: state.delegators.map((delegator) => {
    return {
      id: delegator.owner.toHuman(),
      amount: delegator.amount.toBigInt(),
    }
  }),
  total: state.total.toBigInt(),
  isLeaving: state.state.isLeaving ? state.state.asLeaving.toBigInt() : false,
})

export const CandidatePool: React.FC<Props> = ({ children }) => {
  const [candidateIds, setCandidateIds] = useState<string[]>([])
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})

  useEffect(() => {
    getAllCollatorState().then((collatorStates) => {
      const newCandidates: Record<string, Candidate> = {}
      collatorStates.forEach(async ([accountId, state]) => {
        const unwrapped = state.unwrap()
        const candidateId = unwrapped.id.toString()
        newCandidates[candidateId] = mapCollatorStateToCandidate(
          unwrapped
        )
        const unsub = await subscribeToCollatorState(candidateId, (collatorState) => {
          
        })
        newCandidates[candidateId].unsub = unsub
      })
      setCandidates(newCandidates)
    })
    subscribeToCandidatePool((pool) => {
      setCandidateIds(pool.map((stake) => stake.owner.toString()))
    })
  }, [])

  // useEffect(() => {
  //   // const collatorsPromise = getAllCollatorState()
  //   candidateIds.forEach(async (candidateId) => {
  //     if (!candidates.has(candidateId)) {
  //       let unsub
  //       unsub = await subscribeToCollatorState(id, (collatorState) => {})
  //     }
  //   })
  // }, [candidateIds, candidates])

  // useEffect(() => {
  //   subscribeToCollatorState((result) => {
  //     const candidates: Candidate[] = result.map((val) => {
  //       return {
  //         id: val.id.toHuman(),
  //         stake: val.stake.toBigInt(),
  //         delegators: val.delegators.map((delegator) => {
  //           return {
  //             id: delegator.owner.toHuman(),
  //             amount: delegator.amount.toBigInt(),
  //           }
  //         }),
  //         total: val.total.toBigInt(),
  //         state: {
  //           Active: val.state.Active.toJSON(),
  //           Leaving: val.state.Leaving.toBigInt(),
  //         },
  //       }
  //     })
  //     setCandidates(candidates)
  //   })
  // }, [])

  return (
    <CandidatesContext.Provider value={candidates}>
      {children}
    </CandidatesContext.Provider>
  )
}
