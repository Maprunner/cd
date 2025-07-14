import React from "react"
import PropTypes from "prop-types"
import { TYPE_MATCH, baseCategories, baseData, quizDefs } from "../data/data.js"
import { loadSettings, saveSettings } from "./Persist.js"
import NameInput from "./NameInput.jsx"
import CategoryList from "./CategoryList.jsx"
import LanguageList from "./LanguageList.jsx"
import AnswerOptionList from "./AnswerOptionList.jsx"
import QuestionsOptionList from "./QuestionsOptionList.jsx"
import TimerOptionList from "./TimerOptionList.jsx"
import Types from "./Types.jsx"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import { t } from "./Quiz.jsx"
import _ from "underscore"

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
      categories: baseCategories,
      questionsToSet: settings["questionsToSet"],
    }
  }

  onStart = (id) => {
    let questions
    if (quizDefs[id].type === TYPE_MATCH) {
      questions = this.createMatch(quizDefs[id], this.state.questionsToSet)
    } else {
      questions = this.createQuiz(
        this.props.answersPerQuestion,
        quizDefs[id],
        this.state.questionsToSet
      )
    }
    this.props.onStart(questions, id)
  }

  onSetNumberOfQuestions = (value) => {
    saveSettings("questionsToSet", parseInt(value, 10))
    this.setState({ questionsToSet: parseInt(value, 10) })
  }

  onSetCategory = (category) => {
    let categories = this.state.categories
    categories.forEach(function (item) {
      if (item.name === category) {
        item.use = !item.use
        saveSettings(item.name, item.use)
      }
    })
    const questions = this.filterQuestions(categories)
    this.setState({
      categories: categories,
      questions: questions,
      questionsToSet: Math.min(questions.length, this.state.questionsToSet),
    })
  }

  filterQuestions(categories) {
    // create a list of index values for categories to be used
    const useCategories = _.chain(categories)
      .where({ use: true })
      .pluck("index")
      .value()

    const questions = _.filter(this.props.data, function (q) {
      //question id is three digits: first digit is category
      return _.contains(useCategories, parseInt(q.id / 100, 10))
    })
    return questions
  }

  filterOutMapQuestions = (questions, quizDef) => {
    // removes dodgy map symbols from posible list of questions
    if (quizDef.from === "map" || quizDef.to === "map") {
      return questions.filter((q) => q.useIfMap === true)
    }
    return questions
  }

  createMatch(quizDef, total) {
    const shuffled = _.shuffle(
      this.filterOutMapQuestions(this.state.questions, quizDef)
    ).slice(0, total)
    let fromCards = []
    let toCards = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      fromCards.push({
        card: quizDef.from,
        id: shuffled[i].id,
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false,
      })
      toCards.push({
        card: quizDef.to,
        id: shuffled[i].id,
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        gotIt: false,
        selected: false,
      })
    }
    // move correct pairs apart
    fromCards = _.shuffle(fromCards)
    // merge from and to arrays
    // by taking cards alternately
    // starting with an empty array
    const questions = _.reduce(
      fromCards,
      function (questions, fromCard, idx) {
        questions.push(fromCard)
        questions.push(toCards[idx])
        return questions
      },
      []
    )
    return questions
  }

  createQuiz(answersPerQuestion, quizDef, total) {
    const shuffled = _.shuffle(
      this.filterOutMapQuestions(this.state.questions, quizDef)
    ).slice(0, total)
    // extract list of possible answers
    let answers = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      answers.push({
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        id: shuffled[i].id,
      })
    }
    // generate question for each entry in shuffled array
    let questions = []
    for (let i = 0; i < shuffled.length; i = i + 1) {
      let detail = []
      detail.question = {
        code: shuffled[i].code,
        id: shuffled[i].id,
        desc: shuffled[i].desc,
      }
      detail.answers = this.generateAnswers(detail.question, answersPerQuestion)
      detail.gotIt = false
      questions.push(detail)
    }
    return questions
  }

  generateAnswers(question, answersPerQuestion) {
    // add correct answer
    let list = [question]
    const itemType = parseInt(list[0].id / 100, 10)
    // shuffle possible answers
    let possible = _.filter(baseData, function (item) {
      return parseInt(item.id / 100) === itemType
    })
    possible = _.shuffle(possible)
    // add as many incorrect answers as needed/available
    let i = 0
    while (list.length < answersPerQuestion && i < possible.length) {
      // don't duplicate correct answer, and only use items in same group and withot dodgy symbols
      if (
        possible[i].desc !== question.desc &&
        parseInt(question.id / 100, 10) ===
          parseInt(possible[i].id / 100, 10) &&
        possible[i].useIfMap
      ) {
        list.push({
          desc: possible[i].desc,
          code: possible[i].code,
          id: possible[i].id,
        })
      }
      i = i + 1
    }
    return _.shuffle(list)
  }

  render() {
    return (
      <div>
        <Types onStart={this.onStart} />
        <Card className="m-1">
          <Card.Header className="font-weight-bold">
            {t("Select options") +
              ": " +
              this.state.questionsToSet +
              "/" +
              this.state.questions.length +
              " " +
              t("questions selected")}
          </Card.Header>
          <Card.Body className="m-1 py-1">
            <Row>
              <NameInput
                name={this.props.name}
                onSetName={this.props.onSetName}
              />
              <QuestionsOptionList
                onSetNumberOfQuestions={this.onSetNumberOfQuestions}
                setting={this.state.questionsToSet}
                max={this.state.questions.length}
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
            </Row>
            <CategoryList
              onClick={this.onSetCategory}
              categories={this.state.categories}
            />
          </Card.Body>
        </Card>
      </div>
    )
  }
}

StartPage.defaultProps = {
  data: baseData,
}

StartPage.propTypes = {
  onStart: PropTypes.func,
  onSetName: PropTypes.func,
  onSelectLanguage: PropTypes.func,
  language: PropTypes.string,
  name: PropTypes.string,
}

export default StartPage
