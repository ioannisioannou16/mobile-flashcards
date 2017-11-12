import { saveDeckToStorage, loadDecksFromStorage, saveCardToStorage } from '../utils/api'

export const SAVE_DECK = 'SAVE_DECK'

export const saveDeck = (name) => (dispatch) => {
  const deck = { [name]: [] }
  return saveDeckToStorage(deck)
    .then(() => dispatch({
      type: SAVE_DECK,
      payload: deck
    }))
}

export const LOAD_DECKS = 'LOAD_DECKS'

export const loadDecks = () => (dispatch) => (
  loadDecksFromStorage()
    .then((decks) => dispatch({
      type: LOAD_DECKS,
      payload: decks
    }))
)

export const SAVE_CARD = 'SAVE_CARD'

export const saveCard = (deckId, card) => (dispatch) => (
  saveCardToStorage(deckId, card)
    .then(() => dispatch({
      type: SAVE_CARD,
      payload: { deckId, card }
    }))
)