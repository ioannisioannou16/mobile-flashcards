import { StackNavigator } from 'react-navigation'
import Tab from './Tab'
import Deck from '../components/Deck'
import NewCard from "../components/NewCard"
import Quiz from "../components/Quiz"
import * as colors from '../utils/colors'

export default StackNavigator({
  Home: {
    screen: Tab
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
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