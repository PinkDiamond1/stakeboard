import { Candidate } from '../types'
import { getAllCollatorState, mapCollatorStateToCandidate } from './chain'

export const initialize = async (
  interval: number,
  updateCallback: (newCandidates: Record<string, Candidate>) => void
) => {
  const update = async () => {
    const collatorStates = await getAllCollatorState()
    const candidates: Record<string, Candidate> = {}
    collatorStates.forEach(async ([accountId, state]) => {
      if (state.isNone) return
      const unwrapped = state.unwrap()
      const candidateId = unwrapped.id.toString()
      candidates[candidateId] = mapCollatorStateToCandidate(unwrapped)
    })
    updateCallback(candidates)
  }
  const keepUpdating = () => {
    setTimeout(async () => {
      await update()
      keepUpdating()
    }, interval * 1000)
  }
  await update()
  keepUpdating()
}
