import { CLEAR_NOTIFICATION, SAVE_CARD, SAVE_DECK, SET_NOTIFICATION } from '../actions/index'

const decks = (state = {}, action) => {
  switch (action.type) {
    case SAVE_DECK:
      const name = action.payload
      return {
        ...state,
        [name]: []
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

const notification = (state = false, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return true
    case CLEAR_NOTIFICATION:
      return false
    default:
      return state
  }
}

export default {
  decks,
  notification
}