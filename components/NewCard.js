import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ToastAndroid } from 'react-native'
import { saveCard } from '../actions'
import * as colors from '../utils/colors'

class NewCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { question: '', answer: '' }
  }

  handleQuestionChange = (question) => this.setState({ question })

  handleAnswerChange = (answer) => this.setState({ answer })

  handlePress = () => {
    const { question, answer } = this.state
    const { navigation, saveCard } = this.props
    saveCard(navigation.state.params.name, { question, answer })
      .then(() => {
        navigation.goBack()
        ToastAndroid.show('Successfully created new card.', ToastAndroid.SHORT)
      })
  }

  render() {
    const disabled = !this.state.question || !this.state.answer
    const opacity = { opacity: disabled ? 0.6 : 1.0 }
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.question}
          onChangeText={this.handleQuestionChange}
          style={styles.input}
          placeholder='type your question here..'
          placeholderTextColor={colors.grey}
        />
        <TextInput
          value={this.state.answer}
          onChangeText={this.handleAnswerChange}
          style={styles.input}
          placeholder='type your answer here..'
          placeholderTextColor={colors.grey}
        />
        <TouchableHighlight disabled={disabled} style={[styles.submitButton, opacity]} onPress={this.handlePress} underlayColor="#E79794">
          <Text style={styles.submitText}>Create card</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 20,
    color: colors.black,
    marginBottom: 10
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 4,
    elevation: 2
  },
  submitText: {
    fontSize: 25,
    color: colors.black
  }
})

export default connect(null, { saveCard })(NewCard)
