import { Candidate } from '../types'
import {
  getAllCollatorState,
  getCurrentCandidates,
  getSelectedCandidates,
  mapCollatorStateToCandidate,
} from './chain'

export const initialize = async (
  interval: number,
  updateCallback: (
    newCandidates: Record<string, Candidate>,
    selectedCandidates: string[],
    currentCandidates: string[]
  ) => void
) => {
  let timer = 0

  const update = async () => {
    const collatorStates = await getAllCollatorState()
    const candidates: Record<string, Candidate> = {}
    collatorStates.forEach(async ([accountId, state]) => {
      if (state.isNone) return
      const unwrapped = state.unwrap()
      const candidateId = unwrapped.id.toString()
      candidates[candidateId] = mapCollatorStateToCandidate(unwrapped)
    })

    const selectedCandidates = (await getSelectedCandidates()).map((selected) =>
      selected.toString()
    )

    const currentCandidates = (await getCurrentCandidates()).map((candidate) =>
      candidate.toString()
    )

    updateCallback(candidates, selectedCandidates, currentCandidates)
  }

  const keepUpdating = () => {
    timer = window.setTimeout(async () => {
      await update()
      keepUpdating()
    }, interval * 1000)
  }

  await update()
  keepUpdating()

  const stop = () => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
  }
  return stop
}
