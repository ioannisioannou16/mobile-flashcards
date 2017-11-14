import { TabNavigator } from 'react-navigation'
import DeckList from '../components/DeckList'
import NewDeck from '../components/NewDeck'
import * as colors from '../utils/colors'

export default TabNavigator({
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