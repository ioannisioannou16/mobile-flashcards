import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight } from 'react-native'
import { saveDeck } from '../actions'
import { connect } from 'react-redux'
import * as colors from '../utils/colors'

class NewDeck extends React.Component {

  constructor(props) {
    super(props)
    this.state = { input: '' }
  }

  handleTextChange = (input) => this.setState({ input })

  handlePress = () => {
    const name = this.state.input
    const { saveDeck, navigation, deckNames } = this.props
    if (deckNames.includes(name)) {
      ToastAndroid.show("Deck already exists. Try a different name.", ToastAndroid.SHORT)
    } else {
      saveDeck(name)
        .then(() => {
          navigation.navigate('Deck', { name })
          ToastAndroid.show('Successfully created new deck.', ToastAndroid.SHORT)
          this.setState({ input: '' })
        })
    }
  }

  render() {
    const disabled = !this.state.input
    const opacity = { opacity: disabled ? 0.6 : 1.0 }
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          value={this.state.input}
          onChangeText={this.handleTextChange}
          style={styles.input}
        />
        <TouchableHighlight disabled={disabled} style={[styles.button, opacity]} onPress={this.handlePress} underlayColor={colors.lightPink}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deckNames: Object.keys(state)
  }
}

export default connect(mapStateToProps, { saveDeck })(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  question: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 20,
    color: colors.black
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 4,
    elevation: 2
  },
  buttonText: {
    fontSize: 25,
    color: colors.black
  }
})
