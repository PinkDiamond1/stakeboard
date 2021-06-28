import React, { useEffect, useState } from 'react'
import { Candidate } from '../../types'
import { CandidatesContext } from '../../utils/CandidatesContext'
import { initialize } from '../../utils/polling'

export interface Props {}

export const CandidatePool: React.FC<Props> = ({ children }) => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})

  useEffect(() => {
    initialize(5, (newCandidates) => {
      setCandidates(newCandidates)
    })
  }, [])

  return (
    <CandidatesContext.Provider value={candidates}>
      {children}
    </CandidatesContext.Provider>
  )
}
