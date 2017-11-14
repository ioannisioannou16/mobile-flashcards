import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from "./store/configureStore"
import Stack from './navigators/Stack'
import AppStatusBar from './components/AppStatusBar'
import { View } from 'react-native'
import * as colors from './utils/colors'

const { persistor, store } = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ flex: 1 }}>
            <AppStatusBar backgroundColor={colors.darkPink}/>
            <Stack />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}
