import React from 'react';
import * as FirestoreService from '../services/firestore';
import _ from 'underscore';
import update from 'immutability-helper';
import StartPage from './StartPage.jsx'
import QuestionPage from './QuestionPage.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import {loadAllTimeResults, saveAllTimeResults, loadSettings, saveSettings} from './Persist.jsx'
import Results from './Results.jsx'
import ResultMessage from './ResultMessage.jsx'
import { MATCH_ITEMS, NO_TYPE, quizDefs } from './data.jsx'
import cz from '../lang/cz.js';
import de from '../lang/de.js';
import fi from '../lang/fi.js';
import fr from '../lang/fr.js';
import hu from '../lang/hu.js';
import ja from '../lang/ja.js';
import pl from '../lang/pl.js';

export const ALL_TIME_RESULTS_COUNT = 10;

export const availableLanguages = ['en', 'cz', 'de', 'fi', 'fr', 'hu', 'ja', 'pl'];
const dictionaries = {
  'cz': cz,
  'de': de,
  'fi': fi,
  'fr': fr,
  'hu': hu,
  'ja': ja,
  'pl': pl
};

let dictionary = {};

// translation function
export function t(str) {
  if (dictionary.hasOwnProperty(str)) {
    return dictionary[str];
  }
  // default to hard-coded English
  return str;
}

function setDictionary(dict) {
  dictionary = dict;
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    const settings = loadSettings();
    this.state = {
      questions: {},
      currentQuestionIdx: 0,
      // how long you have to answer question
      timerOption: 0,
      // how long you have left for this question
      countdown: 0,
      answered: 0,
      score: 0,
      start: 0,
      elapsed: 1,
      quizRunning: false,
      displayResultsTable: false,
      displayNewResult: false,
      newResultType: NO_TYPE,
      type: NO_TYPE,
      name: settings.name,
      number: settings.number,
      allTimeResults: loadAllTimeResults(settings.name, settings.number),
      language: settings.language,
      answersPerQuestion: 3,
      canStart: this.canStart(settings.name, settings.number)
    }
  }
  componentDidMount() {
    this.onSelectLanguage(this.state.language);
    FirestoreService.authenticateAnonymously();
    FirestoreService.getWebResults(this.handleWebResults);
  }

  componentWillUnmount() {
    // shouldn't need this...
    clearInterval(this.timer);
    clearInterval(this.questionTimer);
  }

  handleWebResults = (snapshot) => {
    console.log(snapshot);
  } 

  onTick = () => {
    if (this.state.quizRunning) {
      this.setState({ 
        elapsed: new Date() - this.state.start,
      });
    }
  }

  onQuestionTimer = () => {
    if (this.state.quizRunning) {
      let secsForThisQuestion = this.state.secsForThisQuestion + 1;
      if (secsForThisQuestion >= this.state.timerOption) {
        // simulate an incorrect answer
        this.onCheckAnswer("");
        secsForThisQuestion = 0;
      }
      this.setState({ 
        secsForThisQuestion: secsForThisQuestion
      });
    }
  }

  onCloseNewResult = () => {
    this.setState({
      displayNewResult: false
    });
  }

  onShowResultsTable = () => {
    this.setState({
      displayResultsTable: true
    });
  }

  onCloseResultsTable = () => {
    this.setState({
      displayResultsTable: false
    });
  }

  onSelectLanguage = (lang) => {
    if (dictionaries.hasOwnProperty(lang)) {
      setDictionary(dictionaries[lang][lang]);
    } else {
      setDictionary({});
      lang = 'en'
    }
    saveSettings("language", lang);
    this.setState({
      language: lang
    });
  }

  onSetName = (name) => {
    saveSettings("name", name);
    this.setState({
      name: name,
      canStart: this.canStart(name, this.state.number),
      allTimeResults: loadAllTimeResults(name, this.state.number)
    });
  }

  onSetNumber = (number) => {
    saveSettings("number", number);
    this.setState({
      number: number,
      canStart: this.canStart(this.state.name, number),
      allTimeResults: loadAllTimeResults(this.state.name, number)
    });
  }

  onStartNewQuiz = (questions, type) => {
    if (!this.state.canStart) {
      return;
    }
    if (questions.length > 0) {
      this.setState({
        questions: questions,
        type: type,
        currentQuestionIdx: 0,
        quizRunning: true,
        start: new Date().getTime(),
        elapsed: 0,
        answered: 0,
        score: 0,
        secsForThisQuestion: 0
      });
    }
    this.timer = setInterval(this.onTick, 1000);
    if ((this.state.timerOption > 0) && (type !== MATCH_ITEMS)) {
      this.questionTimer = setInterval(this.onQuestionTimer, 1000);
    }
  }

  canStart = (name, number) => {
    return ((name !== "") && (number !== "") ? true: false);
  }

  onMatchFinished = (validFinish, score, attempts) => {
    if (validFinish) {
      this.setState({
        answered: attempts,
        score: score
      })
      this.saveResult(score, attempts);
    } else {
      this.setState({
        quizRunning: false,
        type: NO_TYPE
      });
    }
  }

  onCheckAnswer = (answer) => {
    if (!this.state.quizRunning) {
      return;
    }
    const idx = this.state.currentQuestionIdx;
    let score = this.state.score;
    let gotIt = false;
    if (answer === this.state.questions[idx].question.desc) {
      score = score + 1;
      gotIt = true;
    }
    let q = this.state.questions[idx];
    q.gotIt = gotIt;
    const answered = this.state.answered + 1;
    this.setState({
      questions: update(this.state.questions, { [idx]: { $set: q } }),
      answered: answered,
      score: score,
      secsForThisQuestion: 0
    })
    // if ((this.state.currentQuestionIdx + 1) === this.state.questions.length) {
    if ((this.state.currentQuestionIdx + 1) === 5) {
      clearInterval(this.timer);
      clearInterval(this.questionTimer);
      this.saveResult(score, answered - score);
    } else {
      this.setState({ currentQuestionIdx: this.state.currentQuestionIdx + 1 });
      if ((this.state.timerOption > 0) && (this.state.type !== MATCH_ITEMS)) {
        clearInterval(this.questionTimer);
        this.questionTimer = setInterval(this.onQuestionTimer, 1000);
      }
    }
  }

  saveResult(score, wrong) {
    const newResults = this.addNewResult({
      type: this.state.type,
      name: this.state.name,
      number: this.state.number,
      score: score,
      wrong: wrong,
      time: parseInt((this.state.elapsed / 1000), 10)
    });
    this.setState({
      allTimeResults: newResults.allTime,
      quizRunning: false,
      displayNewResult: true,
      newResultType: this.state.type,
      type: NO_TYPE
    });
  }

 addNewResult(result) {
    let newAllTimeResults = this.state.allTimeResults;
    newAllTimeResults[result.type] = result;
    saveAllTimeResults(newAllTimeResults, this.state.name, this.state.number);
    FirestoreService.saveWebResult(result)
    return ({
      allTime: newAllTimeResults
    });
  }

  getTypeText(type) {
    return _.chain(quizDefs)
      .where({ value: type })
      .pluck('text')
      .value();
  }

  getCaptionText(type) {
    return _.chain(quizDefs)
      .where({ value: type })
      .pluck('caption')
      .value();
  }

  renderBody() {
    if (this.state.displayResultsTable) {
      return (
        <Results
          allTimeResults={this.state.allTimeResults}
          handleClose={this.onCloseResultsTable}
          open={true}
        />
      );
    }
    if (!this.state.quizRunning) {
      return (
        <StartPage
          onStart={this.onStartNewQuiz}
          onSetName={this.onSetName}
          onSetNumber={this.onSetNumber}
          onSelectLanguage={this.onSelectLanguage}
          timerOption={this.state.timerOption}
          language={this.state.language}
          answersPerQuestion={this.state.answersPerQuestion}
          name={this.state.name}
          number={this.state.number}
          canStart={this.state.canStart}
          results={this.state.allTimeResults}
        />
      );
    }
    return (
      <QuestionPage
        idx={this.state.currentQuestionIdx}
        type={this.state.type}
        title={this.getTypeText(this.state.type)}
        caption={this.getCaptionText(this.state.type)}
        questions={this.state.questions}
        score={this.state.score}
        answered={this.state.answered}
        canStart={this.state.canStart}
        elapsed={parseInt((this.state.elapsed / 1000), 10)}
        timerOption={this.state.timerOption}
        countdown={this.state.timerOption - this.state.secsForThisQuestion}
        onCheckAnswer={this.state.type === MATCH_ITEMS ?
          this.onMatchFinished
          :
          this.onCheckAnswer
        }
      />
    );
  }

  renderNewResult() {
    let message = t('You scored #1 out #2 in #3 seconds');
    // eslint-disable-next-line
    message = message.replace(/\#1/, this.state.score);
    // eslint-disable-next-line
    message = message.replace(/\#2/, this.state.answered);
    // eslint-disable-next-line
    message = message.replace(/\#3/, parseInt((this.state.elapsed / 1000), 10));
    return (
      <ResultMessage
        handleClose={this.onCloseNewResult}
        open={true}
        type={this.state.newResultType}
        name={this.state.name}
        questions={this.state.questions}
      >
        {message}
      </ResultMessage>
    );
  }

  render() {

    let body = this.renderBody();
    let message = this.state.displayNewResult ? this.renderNewResult() : null;

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
    );
  }
}

export default Quiz;
