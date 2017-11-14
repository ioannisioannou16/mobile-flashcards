import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

export const SAVE_DECK = 'SAVE_DECK'

export const saveDeck = (name) => ({
  type: SAVE_DECK,
  payload: name
})

export const SAVE_CARD = 'SAVE_CARD'

export const saveCard = (deckId, card) => ({
  type: SAVE_CARD,
  payload: { deckId, card }
})

export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const setNotification = () => (dispatch, getState) => {
  if (!getState().notification) {
    return setLocalNotification().then(() => dispatch({
      type: SET_NOTIFICATION
    }))
  }
  return Promise.resolve()
}

export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

export const clearNotification = () => (dispatch, getState) => {
  if (getState().notification) {
    return clearLocalNotification().then(() => dispatch({
      type: CLEAR_NOTIFICATION
    }))
  }
  return Promise.resolve()
}

