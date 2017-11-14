import { Notifications, Permissions } from 'expo'

const notification = {
  title: 'Study',
  body: "Don't forget to study today!",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}

export const setLocalNotification = () => (
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        return Notifications.cancelAllScheduledNotificationsAsync()
          .then(() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            return Notifications.scheduleLocalNotificationAsync(notification, { time: tomorrow, repeat: 'day' })
          })
      }
      return Promise.reject()
    })
)

export const clearLocalNotification  = Notifications.cancelAllScheduledNotificationsAsync
