import React from 'react'
import PropTypes from 'prop-types'
import { TYPE_MATCH, baseCategories, baseData, quizDefs } from '../data/data.js'
import {loadSettings, saveSettings} from './Persist.js'
import NameInput from './NameInput.jsx'
import NumberInput from './NumberInput.jsx';
import LanguageList from './LanguageList.jsx'
import Types from './Types.jsx'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import _ from 'underscore'

class StartPage extends React.Component {
  constructor(props) {
    super(props)
    // use saved settings if available
    let settings = loadSettings()
    baseCategories.forEach(function (item) {
      if (settings.hasOwnProperty(item.name)) {
        item.use = settings[item.name]
      }
    })
    // testing
    baseCategories[0].use = false
    baseCategories[1].use = true
    baseCategories[2].use = false
    baseCategories[3].use = false
    baseCategories[4].use = false
    let questions = this.filterQuestions(baseCategories)
    this.state = {
      questions: questions,
      categories: baseCategories
    }
  }

  onStart = (id) => {
    let questions
    if (quizDefs[id].type === TYPE_MATCH) {
      questions = this.createMatch(quizDefs[id])
    } else {
      questions = this.createQuiz(this.props.answersPerQuestion, quizDefs[id])
    }
    this.props.onStart(questions, id)
  }

  onSetCategory = (category) => {
    let categories = this.state.categories
    categories.forEach(function (item) {
      if (item.name === category) {
        item.use = !item.use
        saveSettings(item.name, item.use)
      }
    })
    this.setState({
      categories: categories,
      questions: this.filterQuestions(categories)
    })
  }

  filterQuestions(categories) {
    // create a list of index values for categories to be used
    const useCategories = _.chain(categories)
      .where({ 'use': true })
      .pluck('index')
      .value()

    const questions = _.filter(this.props.data, function (q) {
      //question id is three digits: first digit is category
      return _.contains(useCategories, parseInt((q.id / 100), 10))
    })
    return questions
  }

  filterOutMapQuestions = (questions, quizDef) => {
    // removes dodgy map symbols posible list of questions
    if ((quizDef.from === "map") || (quizDef.to === "map")) {
      return questions.filter((q) => q.useIfMap === true)
    }
    return questions
  }

  createMatch(quizDef) {
    const shuffled = _.shuffle(this.filterOutMapQuestions(this.state.questions, quizDef))
    let fromCards = []
    let toCards = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      fromCards.push({
        card: quizDef.from,
        id: shuffled[i].id,
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false
      })
      toCards.push({
        card: quizDef.to,
        id: shuffled[i].id,
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false
      })
    }
    // move correct pairs apart
    fromCards = _.shuffle(fromCards)
    // merge from and to arrays
    // by taking cards alternately
    // starting with an empty array
    const questions = _.reduce(fromCards,
      function (questions, fromCard, idx) {
        questions.push(fromCard)
        questions.push(toCards[idx])
        return questions
      },
      []
    )
    return questions
  }

  createQuiz(answersPerQuestion, quizDef) {
    const shuffled = _.shuffle(this.filterOutMapQuestions(this.state.questions, quizDef))
    // extract list of possible answers
    let answers = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      answers.push({
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        id: shuffled[i].id
      })
    }
    // generate question for each entry in shuffled array
    let questions = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      let detail = []
      detail.question = {
        code: shuffled[i].code,
        id: shuffled[i].id,
        desc: shuffled[i].desc
      }
      detail.answers = this.generateAnswers(detail.question, answers, answersPerQuestion)
      detail.gotIt = false
      questions.push(detail)
    }
    return questions
  }

  generateAnswers(question, possible, answersPerQuestion) {
    // add correct answer
    let list = [question]
    // shuffle possible answers
    possible = _.shuffle(possible)
    // add as many incorrect answers as needed/available
    let i = 0
    while ((list.length < answersPerQuestion) && (i < possible.length)) {
      // don't duplicate correct answer, and only use items in same group
      if ((possible[i].desc !== question.desc) &&
        (parseInt((question.id / 100), 10) === parseInt((possible[i].id / 100), 10))) {
        list.push({
          desc: possible[i].desc,
          code: possible[i].code,
          id: possible[i].id
        })
      }
      i = i + 1
    }
    return _.shuffle(list)
  }

  render() {
    return (
      <div>
        <Types
          onStart={this.onStart}
          webResults={this.props.webResults}
        />
        <Card className="m-1">
          <Card.Header className="font-weight-bold">
            Lockdown Classic Orienteering Weekend
          </Card.Header>
          <Card.Body className="m-1 py-1">
            <Form>
              <Form.Group as={Row}>
                <NameInput
                  name={this.props.name}
                  onSetName={this.props.onSetName}
                />
                <NumberInput
                  oldNumber={this.props.number}
                  onSetNumber={this.props.onSetNumber}
                />
                <LanguageList
                  language={this.props.language}
                  onSelectLanguage={this.props.onSelectLanguage}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div >
    )
  }
}

StartPage.defaultProps = {
  data: baseData
}

StartPage.propTypes = {
  onStart: PropTypes.func,
  onSetName: PropTypes.func,
  onSelectLanguage: PropTypes.func,
  language: PropTypes.string,
  name: PropTypes.string
}

export default StartPage