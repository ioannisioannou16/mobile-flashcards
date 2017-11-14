import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import * as colors from '../utils/colors'
import { clearNotification, setNotification } from '../actions'

class Quiz extends React.Component {

  constructor(props) {
    super(props)
    this.state = { currentIndex: 0, correctAnswers: 0, showQuestion: true }
  }

  flip = () => this.setState({ showQuestion: !this.state.showQuestion })

  answerQuestion = (correct) => () => {
    if (correct) {
      this.setState({ correctAnswers: this.state.correctAnswers + 1 })
    }
    const newIndex = this.state.currentIndex + 1
    this.setState({ currentIndex: newIndex, showQuestion: true })
    const finished = newIndex === this.props.numOfCards
    if (finished) {
      this.resetNotification()
    }
  }

  resetNotification = () => this.props.clearNotification().then(() => this.props.setNotification())

  reset = () => this.setState({ currentIndex: 0, correctAnswers: 0, showQuestion: true })

  goBack = () => this.props.navigation.goBack()

  renderCompletedQuiz = () => (
    <View style={[styles.container, { justifyContent: 'space-around' }]}>
      <View>
        <Text style={styles.result}>You scored</Text>
        <Text style={styles.result}>{this.state.correctAnswers} out of {this.props.numOfCards}</Text>
      </View>
      <View>
        <TouchableHighlight style={styles.button} onPress={this.reset} underlayColor={colors.lightPink}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.goBack} underlayColor={colors.lightPink}>
          <Text style={styles.buttonText}>Back to Deck</Text>
        </TouchableHighlight>
      </View>
    </View>
  )

  renderQuiz = () => {
    const currCard = this.props.cards[this.state.currentIndex]
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.currentScore}>{this.state.currentIndex + 1} / {this.props.numOfCards}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <View>
            <Text style={styles.questionOrAnswer}>{this.state.showQuestion ? currCard.question : currCard.answer }</Text>
            <TouchableOpacity onPress={this.flip}>
              <Text style={styles.flipText}>{this.state.showQuestion ? 'Answer' : 'Question'}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableHighlight style={styles.button} onPress={this.answerQuestion(true)} underlayColor={colors.lightPink}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.answerQuestion(false)} underlayColor={colors.lightPink}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const finished = this.state.currentIndex === this.props.numOfCards
    return finished
      ? this.renderCompletedQuiz()
      : this.renderQuiz()
  }
}

const mapStateToProps = (state, ownProps) => {
  const name = ownProps.navigation.state.params.name
  const cards = state.decks[name]
  return { name, cards, numOfCards: cards.length }
}

export default connect(mapStateToProps, { clearNotification, setNotification })(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  currentScore: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.black,
    padding: 5
  },
  questionOrAnswer: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black,
    marginBottom: 10
  },
  flipText: {
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
  },
  result: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black,
    marginBottom: 10
  }
})