import React from 'react';
import _ from 'underscore';
import {StartPage} from './StartPage.jsx'
import {QuestionPage} from './QuestionPage.jsx'
import {Results,
        loadAllTimeResults, saveAllTimeResults,
        loadName, saveName,
        loadLanguage, saveLanguage} from './Results.jsx'
import {ResultMessage} from './ResultMessage.jsx'
import {MATCH_ITEMS, NO_TYPE, quizDefs} from './data.jsx'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import cz from '../lang/cz.js';
import fi from '../lang/fi.js';
import fr from '../lang/fr.js';
import ja from '../lang/ja.js';
import pl from '../lang/pl.js';

var update = require('react-addons-update');
var logo = require('./img/cdquizlogo.gif');

export const NEW_RESULTS_COUNT = 10;
export const ALL_TIME_RESULTS_COUNT = 10;

export const availableLanguages = ['en', 'cz', 'fi', 'fr', 'ja', 'pl'];
const dictionaries = {
  'cz': cz,
  'fi': fi,
  'fr': fr,
  'ja': ja,
  'pl': pl
};

var dictionary;

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

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    setDictionary({});
    this.state = {
      questions: {},
      currentQuestionIdx: 0,
      answered: 0,
      score: 0,
      start: 0,
      elapsed: 1,
      quizRunning: false,
      displayResultsTable: false,
      displayNewResult: false,
      newResultType: NO_TYPE,
      type: NO_TYPE,
      results: [],
      name: loadName(),
      allTimeResults: loadAllTimeResults(),
      language: 'en'
    };
  }

  componentDidMount() {
    // timer runs continuously: count ticks when quiz is running
    this.timer = setInterval(this.onTick, 1000);
    // get saved language
    const lang = loadLanguage();
    if (lang !== 'en') {
      this.onSelectLanguage(lang);
    }
  }

  componentWillUnmount() {
   clearInterval(this.timer);
  }

  onTick = () => {
    if (this.state.quizRunning) {
      this.setState({elapsed: new Date() - this.state.start});
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
    saveLanguage(lang);
    this.setState({
      language: lang
    });
  }
  
  onSetName = (name) => {
    saveName(name);
    this.setState({
      name: name
    });
  }

  onStartNewQuiz = (questions, type) => {
    if (questions.length > 0) {
      this.setState({
        questions: questions,
        type: type,
        currentQuestionIdx: 0,
        quizRunning: true,
        start: new Date().getTime(),
        elapsed: 0,
        answered: 0,
        score: 0
      });
    }
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
    var idx, score, gotIt, q, answered;
    if (!this.state.quizRunning) {
      return;
    }
    idx = this.state.currentQuestionIdx;
    score = this.state.score;
    gotIt = false;
    if (answer === this.state.questions[idx].question.desc) {
      score = score + 1;
      gotIt = true;
    }
    // http://stackoverflow.com/questions/30899454/dynamic-key-in-immutability-update-helper-for-array
    q = this.state.questions[idx];
    q.gotIt = gotIt;
    answered = this.state.answered + 1
    this.setState({
      questions: update(this.state.questions, {[idx]: {$set: q}}),
      answered: answered,
      score: score
    })
    if ((this.state.currentQuestionIdx + 1) === this.state.questions.length) {
      this.saveResult(score, answered);
    } else {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1});
    }
  }

  saveResult(score, from) {
    let newResults = this.addNewResult({
      type: this.getTypeText(this.state.type),
      name: this.state.name,
      score: score,
      from: from,
      percent: (score * 100/from).toFixed(1),
      time: parseInt((this.state.elapsed/1000), 10)
    });
    this.setState({
      results: newResults.new,
      allTimeResults: newResults.allTime,
      quizRunning: false,
      displayNewResult: true,
      newResultType: this.state.type,
      type: NO_TYPE
    });
  }

  adjustResultArray(array, result, length) {
    var newResults;
    newResults = _.chain(array)
      // add new result to array
      .push(result)
      // sort by score DESC percent DESC time ASC
      .sortBy('time')
      .reverse()
      .sortBy(function(r) {return parseFloat(r.percent);})
      .sortBy('score')
      .reverse()
      // truncate
      .first(length)
      .value();
    return newResults;
  }

  addNewResult(result) {
    var newResults, newAllTimeResults;
    newResults = this.adjustResultArray(
      this.state.results,
      result,
      NEW_RESULTS_COUNT
    )
    newAllTimeResults = this.adjustResultArray(
      this.state.allTimeResults,
      result,
      ALL_TIME_RESULTS_COUNT
    );
    saveAllTimeResults(newAllTimeResults);
    return({
      new: newResults,
      allTime: newAllTimeResults
    });
  }

  getTypeText(type) {
    return _.chain(quizDefs)
      .where({value: type})
      .pluck('text')
      .value();
  }

  getCaptionText(type) {
    return _.chain(quizDefs)
      .where({value: type})
      .pluck('caption')
      .value();
  }

  renderBody() {
    if (this.state.displayResultsTable) {
      return(
        <Results
          results={this.state.results}
          allTimeResults={this.state.allTimeResults}
          handleClose={this.onCloseResultsTable}
          open={true}
        />
      );
    }
    if (!this.state.quizRunning) {
      return(
        <StartPage
          onStart={this.onStartNewQuiz}
          onSetName={this.onSetName}
          onSelectLanguage={this.onSelectLanguage}
          language={this.state.language}
          name={this.state.name}
        />
      );
    } else {
      return(
        <QuestionPage
          idx={this.state.currentQuestionIdx}
          type={this.state.type}
          title={this.getTypeText(this.state.type)}
          caption={this.getCaptionText(this.state.type)}
          questions={this.state.questions}
          score={this.state.score}
          answered={this.state.answered}
          elapsed={parseInt((this.state.elapsed/1000), 10)}
          onCheckAnswer={this.state.type === MATCH_ITEMS ?
            this.onMatchFinished
            :
            this.onCheckAnswer
          }
        />
      );
    }
  }

  renderNewResult() {
    let message = t('You scored #1 out #2 in #3 seconds');
    // eslint-disable-next-line
    message = message.replace(/\#1/, this.state.score);
    // eslint-disable-next-line
    message = message.replace(/\#2/, this.state.answered);
    // eslint-disable-next-line
    message = message.replace(/\#3/, parseInt((this.state.elapsed/1000), 10));
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
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <img src={logo} alt='logo' className="logo"></img>
            <Navbar.Brand>
              <a href="https://www.maprunner.co.uk">Maprunner</a>
            </Navbar.Brand>
            <Navbar.Text>{t('IOF Control Description Quiz') + ' 2018'}</Navbar.Text>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.onShowResultsTable}>{t('Results')}</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='container'>
          {body}
          {message}
        </div>
      </div>
    );
  }
}

