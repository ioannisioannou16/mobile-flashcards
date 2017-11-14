import React from 'react'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { setNotification } from '../actions'
import * as colors from '../utils/colors'

class DeckList extends React.Component {

  componentDidMount() {
    this.props.setNotification()
  }

  handlePress = (name) => () => {
    this.props.navigation.navigate('Deck', { name })
  }

  render() {
    const decks = this.props.decks
    if (!decks.length) {
      return (
        <View style={styles.centered}>
          <Text style={styles.noDecksText}>No Decks</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item, index }) => (
            <TouchableHighlight style={[styles.button, { marginTop: !index ? 10 : 0 }]} onPress={this.handlePress(item.name)} underlayColor={colors.lightPink} >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.numOfCards}>{item.numOfCards} cards</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    decks: Object.entries(state.decks)
      .map(([name, cards]) => ({ name, numOfCards: cards.length }))
  }
}

export default connect(mapStateToProps, { setNotification })(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 2
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    color: colors.black
  },
  numOfCards: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.grey
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDecksText: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black
  }
})
