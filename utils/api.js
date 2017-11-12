import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECKS = 'DECKS'
const NOTIFICATION = 'NOTIFICATION'

export const saveDeckToStorage = (deck) => (
  AsyncStorage.mergeItem(DECKS, JSON.stringify(deck))
)

export const loadDecksFromStorage = () => (
  AsyncStorage.getItem(DECKS)
    .then(x => JSON.parse(x) || {})
)

export const saveCardToStorage = (deckId, card) => (
  AsyncStorage.getItem(DECKS)
    .then(decks => {
      const parsedDecks = JSON.parse(decks) || {}
      const modifiedDecks = {
        ...parsedDecks,
        [deckId]: parsedDecks[deckId].concat(card)
      }
      return AsyncStorage.setItem(DECKS, JSON.stringify(modifiedDecks))
    })
)

const notification = {
  title: 'Study!',
  body: "Don't forget to study today!",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}

export const setLocalNotification = () => (
  AsyncStorage.getItem(NOTIFICATION)
    .then(JSON.parse)
    .then(data => {
      if (!data) {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              return Notifications.cancelAllScheduledNotificationsAsync()
                .then(() => {
                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)
                  return Notifications.scheduleLocalNotificationAsync(notification, { time: tomorrow, repeat: 'day' })
                    .then(() => AsyncStorage.setItem(NOTIFICATION, JSON.stringify(true)))
                })
            }
          })
      }
    })
)

export const clearLocalNotification  = () => {
  return AsyncStorage.removeItem(NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
