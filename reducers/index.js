import {
  SAVE_DECK,
  LOAD_DECKS,
  SAVE_CARD
} from '../actions/index'

const decks = (state = {}, action) => {
  switch (action.type) {
    case LOAD_DECKS:
    case SAVE_DECK:
      return {
        ...state,
        ...action.payload
      }
    case SAVE_CARD: {
      const { deckId, card } = action.payload
      const deckState = state[deckId]
      return {
        ...state,
        [deckId]: deckState.concat(card)
      }
    }
    default:
      return state
  }
}

export default decks