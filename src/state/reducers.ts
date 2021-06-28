export type FavoriteActions =
  | { type: 'favorize'; id: string }
  | { type: 'unfavorize'; id: string }

export const favoriteReducer = (state: string[], action: FavoriteActions) => {
  switch (action.type) {
    case 'favorize':
      return [...state, action.id]
    case 'unfavorize':
      return [...state.filter(id => id !== action.id)]
    default:
      return state
  }
}
