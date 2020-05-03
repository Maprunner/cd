import React from 'react' 
import _ from 'underscore' 
import update from 'immutability-helper' 
import StartPage from './StartPage.jsx'
import QuestionPage from './QuestionPage.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import {loadAllTimeResults, saveAllTimeResults, loadSettings, saveSettings} from './Persist.js'
import Results from './Results.jsx'
import ResultMessage from './ResultMessage.jsx'
import { TYPE_MATCH, TYPE_NONE, quizDefs } from '../data/data.js'
import cz from '../lang/cz.js' 
import de from '../lang/de.js' 
import es from '../lang/es.js' 
import fi from '../lang/fi.js' 
import fr from '../lang/fr.js' 
import hu from '../lang/hu.js' 
import ja from '../lang/ja.js' 
import no from '../lang/no.js' 
import pl from '../lang/pl.js' 

export const NEW_RESULTS_COUNT = 10 
export const ALL_TIME_RESULTS_COUNT = 10 

export const availableLanguages = ['en', 'cz', 'de', 'es', 'fi', 'fr', 'hu', 'ja', 'no','pl'] 
const dictionaries = {
  'cz': cz,
  'de': de,
  'es': es,
  'fi': fi,
  'fr': fr,
  'hu': hu,
  'ja': ja,
  'no': no,
  'pl': pl
} 

let dictionary = {} 

// translation function
export function t(str) {
  if (dictionary.hasOwnProperty(str)) {
    return dictionary[str] 
  }
  // default to hard-coded English
  return str 
}

function setDictionary(dict) {
  dictionary = dict 
}

class Quiz extends React.Component {
  constructor(props) {
    super(props) 
    const settings = loadSettings() 
    this.state = {
      questions: {},
      currentQuestionIdx: 0,
      // how long you have to answer question
      timerOption: settings.timerOption,
      // how long you have left for this question
      countdown: 0,
      answered: 0,
      score: 0,
      start: 0,
      elapsed: 1,
      quizRunning: false,
      displayResultsTable: false,
      displayNewResult: false,
      // definition for active quiz
      quizDef: {},
      results: [],
      name: settings.name,
      allTimeResults: loadAllTimeResults(),
      language: settings.language,
      answersPerQuestion: settings.answersPerQuestion
    }
  }
  componentDidMount() {
    this.onSelectLanguage(this.state.language) 
  }

  componentWillUnmount() {
    // shouldn't need this...
    clearInterval(this.timer) 
    clearInterval(this.questionTimer) 
  }

  onTick = () => {
    if (this.state.quizRunning) {
      this.setState({ 
        elapsed: new Date() - this.state.start,
      }) 
    }
  }

  onQuestionTimer = () => {
    if (this.state.quizRunning) {
      let secsForThisQuestion = this.state.secsForThisQuestion + 1 
      if (secsForThisQuestion >= this.state.timerOption) {
        // simulate an incorrect answer
        this.onCheckAnswer("") 
        secsForThisQuestion = 0 
      }
      this.setState({ 
        secsForThisQuestion: secsForThisQuestion
      }) 
    }
  }

  onCloseNewResult = () => {
    this.setState({
      displayNewResult: false
    }) 
  }

  onShowResultsTable = () => {
    this.setState({
      displayResultsTable: true
    }) 
  }

  onCloseResultsTable = () => {
    this.setState({
      displayResultsTable: false
    }) 
  }

  onSelectLanguage = (lang) => {
    if (dictionaries.hasOwnProperty(lang)) {
      setDictionary(dictionaries[lang][lang]) 
    } else {
      setDictionary({}) 
      lang = 'en'
    }
    saveSettings("language", lang) 
    this.setState({
      language: lang
    }) 
  }

  onTimerClick = (value) => {
    saveSettings("timerOption", parseInt(value, 10))     
    this.setState({ timerOption: parseInt(value, 10) }) 
  }

  onSetName = (name) => {
    saveSettings("name", name) 
    this.setState({
      name: name
    }) 
  }

  onSetAnswersPerQuestion = (value) => {
    saveSettings("answersPerQuestion", parseInt(value, 10)) 
    this.setState({ answersPerQuestion: parseInt(value, 10) }) 
  }

  onStartNewQuiz = (questions, id) => {
    const quizDef = quizDefs[id]
    if (questions.length > 0) {
      this.setState({
        questions: questions,
        quizDef: quizDef,
        currentQuestionIdx: 0,
        quizRunning: true,
        start: new Date().getTime(),
        elapsed: 0,
        answered: 0,
        score: 0,
        secsForThisQuestion: 0
      }) 
    }
    this.timer = setInterval(this.onTick, 1000) 
    if ((this.state.timerOption > 0) && (quizDef.type !== TYPE_MATCH)) {
      this.questionTimer = setInterval(this.onQuestionTimer, 1000) 
    }
  }

  onMatchFinished = (validFinish, score, attempts) => {
    if (validFinish) {
      this.setState({
        answered: attempts,
        score: score
      })
      this.saveResult(score, attempts) 
    } else {
      this.setState({
        quizRunning: false,
        quizDef: {}
      }) 
    }
  }

  onCheckAnswer = (answer) => {
    if (!this.state.quizRunning) {
      return 
    }
    const idx = this.state.currentQuestionIdx 
    let score = this.state.score 
    let gotIt = false 
    if (answer === this.state.questions[idx].question.desc) {
      score = score + 1 
      gotIt = true 
    }
    let q = this.state.questions[idx] 
    q.gotIt = gotIt 
    const answered = this.state.answered + 1 
    this.setState({
      questions: update(this.state.questions, { [idx]: { $set: q } }),
      answered: answered,
      score: score,
      secsForThisQuestion: 0
    })
    if ((this.state.currentQuestionIdx + 1) === this.state.questions.length) {
      clearInterval(this.timer) 
      clearInterval(this.questionTimer) 
      this.saveResult(score, answered) 
    } else {
      this.setState({ currentQuestionIdx: this.state.currentQuestionIdx + 1 }) 
      if ((this.state.timerOption > 0) && (this.state.id !== TYPE_MATCH)) {
        clearInterval(this.questionTimer) 
        this.questionTimer = setInterval(this.onQuestionTimer, 1000) 
      }
    }
  }

  saveResult(score, from) {
    const newResults = this.addNewResult({
      title: this.state.quizDef.title,
      name: this.state.name,
      score: score,
      from: from,
      percent: (score * 100 / from).toFixed(1),
      time: parseInt((this.state.elapsed / 1000), 10)
    }) 
    this.setState({
      results: newResults.new,
      allTimeResults: newResults.allTime,
      quizRunning: false,
      displayNewResult: true,
      type: TYPE_NONE
    }) 
  }

  adjustResultArray(array, result, length) {
    const newResults = _.chain(array)
      // add new result to array
      .push(result)
      // sort by score DESC percent DESC time ASC
      .sortBy('time')
      .reverse()
      .sortBy(function (r) { return parseFloat(r.percent)  })
      .sortBy('score')
      .reverse()
      // truncate
      .first(length)
      .value() 
    return newResults 
  }

  addNewResult(result) {
    const newResults = this.adjustResultArray(
      this.state.results,
      result,
      NEW_RESULTS_COUNT
    ) 
    const newAllTimeResults = this.adjustResultArray(
      this.state.allTimeResults,
      result,
      ALL_TIME_RESULTS_COUNT
    ) 
    saveAllTimeResults(newAllTimeResults) 
    return ({
      new: newResults,
      allTime: newAllTimeResults
    }) 
  }

  renderBody() {
    if (this.state.displayResultsTable) {
      return (
        <Results
          results={this.state.results}
          allTimeResults={this.state.allTimeResults}
          handleClose={this.onCloseResultsTable}
          open={true}
        />
      ) 
    }
    if (!this.state.quizRunning) {
      return (
        <StartPage
          onStart={this.onStartNewQuiz}
          onSetName={this.onSetName}
          onSelectLanguage={this.onSelectLanguage}
          onTimerClick={this.onTimerClick}
          onSetAnswersPerQuestion={this.onSetAnswersPerQuestion}
          timerOption={this.state.timerOption}
          language={this.state.language}
          answersPerQuestion={this.state.answersPerQuestion}
          name={this.state.name}
        />
      ) 
    }
    return (
      <QuestionPage
        idx={this.state.currentQuestionIdx}
        quizDef={this.state.quizDef}
        questions={this.state.questions}
        score={this.state.score}
        answered={this.state.answered}
        elapsed={parseInt((this.state.elapsed / 1000), 10)}
        timerOption={this.state.timerOption}
        countdown={this.state.timerOption - this.state.secsForThisQuestion}
        onCheckAnswer={this.state.quizDef.type === TYPE_MATCH ?
          this.onMatchFinished
          :
          this.onCheckAnswer
        }
      />
    ) 
  }

  renderNewResult() {
    let message = t('You scored #1 out of #2 in #3 seconds') 
    // eslint-disable-next-line
    message = message.replace(/\#1/, this.state.score) 
    // eslint-disable-next-line
    message = message.replace(/\#2/, this.state.answered) 
    // eslint-disable-next-line
    message = message.replace(/\#3/, parseInt((this.state.elapsed / 1000), 10)) 
    return (
      <ResultMessage
        handleClose={this.onCloseNewResult}
        open={true}
        type={this.state.quizDef.type}
        name={this.state.name}
        questions={this.state.questions}
      >
        {message}
      </ResultMessage>
    ) 
  }

  render() {

    let body = this.renderBody() 
    let message = this.state.displayNewResult ? this.renderNewResult() : null 

    return (
      <div>
        <Header
          onShowResultsTable={this.onShowResultsTable}
        />
        <div className='container'>
          {body}
          {message}
        </div>
        <Footer />
      </div>
    ) 
  }
}

export default Quiz 
