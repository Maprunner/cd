import React from 'react'
import PropTypes from 'prop-types'
import { MATCH_ITEMS, baseCategories, baseData } from '../data/data.js'
import {loadSettings, saveSettings} from './Persist.js'
import NameInput from './NameInput.jsx'
import CategoryList from './CategoryList.jsx'
import LanguageList from './LanguageList.jsx'
import AnswerOptionList from './AnswerOptionList.jsx'
import TimerOptionList from './TimerOptionList.jsx'
import Types from './Types.jsx'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { t } from './Quiz.jsx'
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
    let questions = this.filterQuestions(baseCategories)
    this.state = {
      questions: questions,
      categories: baseCategories
    }
  }

  onStart = (type) => {
    let questions
    if (type === MATCH_ITEMS) {
      questions = this.createMatch()
    } else {
      questions = this.createQuiz(this.props.answersPerQuestion)
    }
    this.props.onStart(questions, type)
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

  createMatch() {
    const shuffled = _.shuffle(this.state.questions)
    let text = []
    let symbols = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      text.push({
        type: 'text',
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false
      })
      symbols.push({
        type: 'symbol',
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false
      })
    }
    // move correct pairs apart
    symbols = _.shuffle(symbols)
    // merge symbol and text arrays
    // by taking symbol and text alternately
    // starting with an empty array
    const questions = _.reduce(symbols,
      function (questions, symbol, idx) {
        questions.push(symbol)
        questions.push(text[idx])
        return questions
      },
      []
    )
    return questions
  }

  createQuiz(answersPerQuestion) {
    const shuffled = _.shuffle(this.state.questions)
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
        />
        <Card className="m-1">
          <Card.Header className="font-weight-bold">
            {t('Select options') + ": " + this.state.questions.length + ' ' + t('questions selected')}
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <CategoryList
                  onClick={this.onSetCategory}
                  categories={this.state.categories}
                />
              </Form.Group>
              <Form.Group as={Row}>
                <NameInput
                  name={this.props.name}
                  onSetName={this.props.onSetName}
                />
                <AnswerOptionList
                  possibleAnswers={[1, 2, 3, 4, 5]}
                  onSetAnswersPerQuestion={this.props.onSetAnswersPerQuestion}
                  setting={this.props.answersPerQuestion}
                />
                <LanguageList
                  language={this.props.language}
                  onSelectLanguage={this.props.onSelectLanguage}
                />
                <TimerOptionList
                  possibleTimers={[0, 2, 5, 10]}
                  onChange={this.props.onTimerClick}
                  setting={this.props.timerOption}
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