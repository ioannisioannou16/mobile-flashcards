import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import * as colors from '../utils/colors'

class Deck extends React.Component {

  navigate = (route) => () => {
    this.props.navigation.navigate(route, { name: this.props.name })
  }

  render() {
    const disabled = this.props.numOfCards === 0
    const opacity = { opacity: disabled ? 0.6 : 1.0 }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.numOfCards}>{this.props.numOfCards} cards</Text>
        </View>
        <View>
          <TouchableHighlight style={styles.button} onPress={this.navigate('NewCard')} underlayColor={colors.lightPink}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, opacity]} onPress={this.navigate('Quiz')} disabled={disabled} underlayColor={colors.lightPink}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const name = ownProps.navigation.state.params.name
  return { name, numOfCards: state.decks[name].length }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  name: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black
  },
  numOfCards: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.grey
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 2
  },
  buttonText: {
    fontSize: 25,
    color: colors.black,
  }
})