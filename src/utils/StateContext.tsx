import React, { Dispatch, useReducer } from 'react'
import { FavoriteActions, favoriteReducer } from '../state/reducers'

export interface State {
  favorites: string[]
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<FavoriteActions>
}>({ state: { favorites: [] }, dispatch: () => null })

const mainReducer = ({ favorites }: State, action: FavoriteActions) => ({
  favorites: favoriteReducer(favorites, action),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, { favorites: [] })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
