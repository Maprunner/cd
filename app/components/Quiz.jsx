'use strict';
/*global _*/
import React from 'react';
import {StartPage} from './StartPage.jsx'
import {MenuBar} from './Menu.jsx'
import {QuestionPage} from './QuestionPage.jsx'
import {Results, loadAllTimeResults, saveAllTimeResults, loadName, saveName} from './Results.jsx'
import {Footer} from './Footer.jsx'
import {ResultMessage} from './ResultMessage.jsx'
import {SYMBOLS_TO_TEXT, MATCH_ITEMS, VIEW_RESULTS, buttonDefs} from './data.jsx'

var update = require('react-addons-update');
var logo = require('./img/cdquizlogo.gif');

export const NEW_RESULTS_COUNT = 10;
export const ALL_TIME_RESULTS_COUNT = 10;

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      currentQuestionIdx: 0,
      answered: 0,
      score: 0,
      start: 0,
      elapsed: 1,
      quizRunning: false,
      displayingResult: false,
      type: SYMBOLS_TO_TEXT,
      results: [],
      name: loadName(),
      allTimeResults: loadAllTimeResults()
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.onTick, 1000);
  }

  componentWillUnmount() {
   clearInterval(this.timer);
  }

  onTick = () => {
    if (this.state.quizRunning) {
      this.setState({elapsed: new Date() - this.state.start});
    }
  }

  onResultWindowClose = () => {
    this.setState({
      displayingResult: false
    });
  }

  onSetName = (name) => {
    saveName(name);
    this.setState({
      name: name
    });
  }

  onSelectQuizType = (value) => {
    if (!this.state.quizRunning) {
      this.setState({
        type: value
      });
    }
  }

  onStartNewQuiz = (questions) => {
    if (questions.length > 0) {
      this.setState({
        questions: questions,
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
    var newResults;
    if (validFinish) {
      newResults = this.addNewResult({
        type: this.getTypeText(this.state.type),
        name: this.state.name,
        score: score,
        from: attempts,
        percent: (score * 100/attempts).toFixed(1),
        time: parseInt((this.state.elapsed/1000), 10)
      }),
      this.setState({
        results: newResults.new,
        allTimeResults: newResults.allTime,
        quizRunning: false,
        displayingResult: true,
        score: score,
        answered: attempts
      });
    } else {
      this.setState({
        quizRunning: false
      });
    }
  }

  onCheckAnswer = (answer) => {
    var idx, score, gotIt, q, answered, newResults;
    if (!this.state.quizRunning) {
      return;
    }
    idx = this.state.currentQuestionIdx;
    score = this.state.score;
    gotIt = false;
    if (answer === this.state.questions[idx].question.desc) {
      score = score + 1,
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
      newResults = this.addNewResult({
        type: this.getTypeText(this.state.type),
        name: this.state.name,
        score: score,
        from: answered,
        percent: (score * 100/answered).toFixed(1),
        time: parseInt((this.state.elapsed/1000), 10)
      });
      this.setState({
        results: newResults.new,
        allTimeResults: newResults.allTime,
        quizRunning: false,
        displayingResult: true
      });
    } else {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1});
    }
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
    return _.chain(buttonDefs)
      .where({value: type})
      .pluck('text')
      .value();
  }

  saveResult(results) {
    this.setState({
      results: results
    });
  }

  renderBody() {
    if (this.state.type === VIEW_RESULTS) {
      return(
        <Results
          results={this.state.results}
          a={'a'}
          allTimeResults={this.state.allTimeResults}
        />
      );
    }
    if (!this.state.quizRunning  && !this.state.displayingResult) {
      return(
        <StartPage
          onStart={this.onStartNewQuiz}
          onSetName={this.onSetName}
          type={this.state.type}
          name={this.state.name}
        />
      );
    } else {
      return(
        <QuestionPage
          idx={this.state.currentQuestionIdx}
          type={this.state.type}
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

  render() {
    var message, body;

    message = 'You scored ' + this.state.score + ' out of ' +
      this.state.answered + ' in ' +
      parseInt((this.state.elapsed/1000), 10) + ' seconds.';

    body = this.renderBody();

    return (
      <div>
        <div className='header'>
          <div className='container'>
            <img src={logo}></img>
            <span className='title'>
              {'Maprunner IOF Control Description Quiz'}
            </span>
          </div>
        </div>
        <div className='menu-bar'>
          <MenuBar
            active={this.state.type}
            onSelect={this.onSelectQuizType}
          />
        </div>
        <div className='container'>
          {body}
          {this.state.displayingResult ?
            <ResultMessage
              onClose={this.onResultWindowClose}
              questions={this.state.questions}
              type={this.state.type}
              name={this.state.name}
            >
              {message}
            </ResultMessage>
            :
            null
          }
        </div>
        {!this.state.quizRunning  && !this.state.displayingResult ?
          <Footer /> : null
      }
      </div>
    );
  }
}
