import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { StatusBar, View } from 'react-native'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from "./components/NewCard"
import Quiz from "./components/Quiz"
import * as colors from './utils/colors'
import { setLocalNotification } from './utils/api'

const AppStatusBar =  ({ backgroundColor }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: colors.white,
    indicatorStyle: {
      backgroundColor: colors.white
    },
    style: {
      backgroundColor: colors.pink
    }
  }
})

const Stack = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.pink,
      }
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.pink,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.pink,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={colors.darkPink}/>
          <Stack />
        </View>
      </Provider>
    )
  }
}
