import React from 'react'
import * as FirestoreService from '../services/firestore';
import _ from 'underscore' 
import update from 'immutability-helper' 
import StartPage from './StartPage.jsx'
import QuestionPage from './QuestionPage.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import {loadLocalResults, saveLocalResults, loadSettings, saveSettings} from './Persist.js'
import Results from './Results.jsx'
import ResultMessage from './ResultMessage.jsx'
import { TYPE_MATCH, TYPE_NONE, quizDefs } from '../data/data.js'
import entries from '../data/entries.js'
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
      elapsed: 0,
      quizRunning: false,
      displayResultsTable: false,
      displayNewResult: false,
      // definition for active quiz
      quizDef: {},
      localResults: loadLocalResults(),
      webResults: [],
      name: settings.name,
      number: settings.number,
      language: settings.language,
      answersPerQuestion: settings.answersPerQuestion
    }
  }
  componentDidMount() {
    this.onSelectLanguage(this.state.language)
    FirestoreService.authenticateAnonymously().then(() => {
      if (this.state.number > 0) {
        FirestoreService.getWebResults(this.state.number).then((results) => this.handleWebResults(results))
      }
    })
    .catch((error) => {
      console.error("Error reading results: ", error);
    })
  }

  handleWebResults = (results) => {
    let webResults = []
    let number = this.state.number
    results.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let data = doc.data()
      if (number in data) {
        let res = data[number]
        res.title = doc.id
        webResults.push(res)
      }
    })
    this.setState({
      webResults: webResults
    })
  } 

  componentWillUnmount() {
    // shouldn't need this...
    clearInterval(this.timer) 
    clearInterval(this.questionTimer)
    FirestoreService.signOut()
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

  onSetNumber = (num) => {
    // input limits number to 0 to 4 digits
    let number = parseInt(num, 10);
    const entry = this.getEntryForNumber(number);
    if (entry === undefined) {
      this.setState({
        number: num,
        name: ""
      });
      return;
    }
    FirestoreService.getWebResults(number).then((results) => this.handleWebResults(results))
    //console.log("Entry: " + entry.name + ", " + entry.number);
    saveSettings("number", number);
    saveSettings("name", entry.name);
    this.setState({
      number: number,
      name: entry.name
    });
  }

  getEntryForNumber = number => {
    return entries.find(entry => (entry.number === number));
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
    const elapsed = new Date() - this.state.start
    if (validFinish) {
      this.setState({
        answered: attempts,
        score: score,
        elapsed: elapsed
      })
    } else {
      this.setState({
        answered: attempts,
        score: score,
        elapsed: elapsed,
        quizRunning: false,
      }) 
    }
    this.saveResult(elapsed, score, attempts)
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
    let elapsed = this.state.elapsed
    if ((this.state.currentQuestionIdx + 1) === this.state.questions.length) {
      elapsed = new Date() - this.state.start
      clearInterval(this.timer) 
      clearInterval(this.questionTimer) 
      this.saveResult(elapsed, score, answered)
    } else {
      this.setState({ currentQuestionIdx: this.state.currentQuestionIdx + 1 }) 
      if ((this.state.timerOption > 0) && (this.state.id !== TYPE_MATCH)) {
        clearInterval(this.questionTimer) 
        this.questionTimer = setInterval(this.onQuestionTimer, 1000) 
      }
    }
    this.setState({
      questions: update(this.state.questions, { [idx]: { $set: q } }),
      answered: answered,
      score: score,
      secsForThisQuestion: 0,
      elapsed: elapsed
    })

  }

  saveResult(elapsed, score, from) {
    //console.log("New result: ", score, from, elapsed)
    const newResult = {
      title: this.state.quizDef.title,
      name: this.state.name,
      number: this.state.number,
      score: score,
      wrong: from - score,
      time: parseFloat(elapsed / 1000).toFixed(1)
    }
    const newResults = this.adjustResultArray(
      this.state.localResults,
      newResult
    )
    saveLocalResults(newResults)
    const result = {
      time: parseFloat(elapsed / 1000).toFixed(1),
      score: score,
      wrong: from - score
    }
    let webResult = {}
    webResult[this.state.number] = result
    FirestoreService.saveWebResult(this.state.quizDef.title, webResult).then(
      FirestoreService.getWebResults(this.state.number).then((results) => this.handleWebResults(results))
    ).catch((error) => {
      console.error("Error saving results: ", error);
    })
    if (this.state.webResults.length === 1) {
      //console.log("Previous result: ", this.state.webResults[0])
      const res = {
        score: score + this.state.webResults[0].score,
        wrong: from - score + this.state.webResults[0].wrong,
        time: (parseFloat(elapsed / 1000) + parseFloat(this.state.webResults[0].time)).toFixed(1)
      }
      let lockdownResult = {}
      lockdownResult[parseInt(this.state.number, 10)] = res
      //console.log("Lockdown result: ", lockdownResult)
      FirestoreService.saveLockdownResult("e004", "s004", lockdownResult)
    }

    this.setState({
      localResults: newResults,
      quizRunning: false,
      quizDef: {},
      displayNewResult: true,
      type: TYPE_NONE
    }) 
  }

  adjustResultArray(array, result) {
    const newResults = _.chain(array)
      // add new result to array
      .push(result)
      .sortBy('time')
      .reverse()
      .sortBy('score')
      .reverse()
      .sortBy('wrong')
      .reverse()
      .value() 
    return newResults 
  }

  renderBody() {
    if (this.state.displayResultsTable) {
      return (
        <Results
          results={this.state.localResults}
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
          onSetNumber={this.onSetNumber}
          onSelectLanguage={this.onSelectLanguage}
          onTimerClick={this.onTimerClick}
          onSetAnswersPerQuestion={this.onSetAnswersPerQuestion}
          timerOption={this.state.timerOption}
          language={this.state.language}
          answersPerQuestion={this.state.answersPerQuestion}
          name={this.state.name}
          number={this.state.number}
          webResults={this.state.webResults}
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
    return (
      <div>
        <Header
          onShowResultsTable={this.onShowResultsTable}
        />
        <div className='container'>
          {this.renderBody() }
          {this.state.displayNewResult ? this.renderNewResult() : null }
        </div>
        <Footer />
      </div>
    ) 
  }
}

export default Quiz 
