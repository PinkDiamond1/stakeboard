import React from 'react'
import { Candidate } from '../types'

export const CandidatesContext = React.createContext<Record<string, Candidate>>({})
