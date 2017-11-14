import React from 'react'
import { StatusBar, View } from 'react-native'
import { Constants } from 'expo'

const AppStatusBar =  ({ backgroundColor }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View>
  )
}

export default AppStatusBar