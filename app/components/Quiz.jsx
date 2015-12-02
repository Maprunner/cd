'use strict';
/*global $*/
import React from 'react';
import ReactDOM from 'react-dom';
import {StartPage} from './StartPage.jsx'
import {QuestionPage} from './QuestionPage.jsx'
import {AnswersAsIcons} from './QuestionPage.jsx'

var update = require('react-addons-update');

export const SYMBOLS_TO_TEXT = 1;
export const TEXT_TO_SYMBOLS = 2;

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    // possible states: selecting, running, displayingResult
    this.state = {
        questions: {},
        currentQuestionIdx: 0,
        answered: 0,
        score: 0,
        start: 0,
        elapsed: 0,
        state: 'selecting',
        type: SYMBOLS_TO_TEXT
      };
  }

  componentDidMount() {
    this.timer = setInterval(this.onTick, 1000);
  }

  componentWillUnmount() {
   clearInterval(this.timer);
  }

  onTick = () => {
    if (this.state.state === 'running') {
      this.setState({elapsed: new Date() - this.state.start});
    }
  }

  onResultWindowClose = () => {
    this.setState({
      state: 'selecting'
    });
  }

  onSelectQuizType = (value) => {
    if (this.state.state === 'selecting') {
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
        state: 'running',
        start: new Date().getTime(),
        elapsed: 0,
        answered: 0,
        score: 0
      });
    }
  }

  onCheckAnswer = (answer) => {
    var idx, score, gotIt, q;
    if (this.state.state !== 'running') {
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
    this.setState({
      questions: update(this.state.questions, {[idx]: {$set: q}}),
      answered: this.state.answered + 1,
      score: score
    })


    if ((this.state.currentQuestionIdx + 1) === this.state.questions.length) {
      this.setState({
        state: 'displayingResult'
      });
    } else {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1});
    }
  }

  render() {
    var message;

    message = 'You scored ' + this.state.score + ' out of ' +
      this.state.answered + ' in ' +
      parseInt((this.state.elapsed/1000), 10) + ' seconds.';

    return (
      <div>
        <div className='header'>
          <div className='container'>{'Maprunner IOF Control Description Quiz'}</div>
        </div>
        <div className='menu-bar'>
          <MenuBar
            type={this.state.type}
            onSelect={this.onSelectQuizType}
          />
        </div>
        <div className='container'>
          {this.state.state === 'selecting' ?
          <div>
            <StartPage onStart={this.onStartNewQuiz} />
          </div>
          :
          <div>
            <QuestionPage
              idx={this.state.currentQuestionIdx}
              type={this.state.type}
              questions={this.state.questions}
              score={this.state.score}
              answered={this.state.answered}
              elapsed={parseInt((this.state.elapsed/1000), 10)}
              onCheckAnswer={this.onCheckAnswer}
            />
          </div>
          }
          {this.state.state === 'displayingResult' ?
            <ResultMessage
              onClose={this.onResultWindowClose}
              questions={this.state.questions}
            >
              {message}
            </ResultMessage>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export class MenuBar extends React.Component {
  onSelectSymbolsToText = () => {
    this.props.onSelect(SYMBOLS_TO_TEXT);
  }

  onSelectTextToSymbols = () => {
    this.props.onSelect(TEXT_TO_SYMBOLS);
  }

  render() {
    var caption;
    caption = (this.props.type === SYMBOLS_TO_TEXT ?
      'Identify the text description for a given symbol' :
      'Identify the symbol for a given text description'
    );
    return (
      <div className='container'>
        <div>
        <ul className='nav nav-pills'>
          <li className={this.props.type === SYMBOLS_TO_TEXT ? 'active' : null}
            onClick={this.onSelectSymbolsToText}
            title={caption}
          >
            <a href='#'>Symbols</a>
          </li>
          <li className={this.props.type === TEXT_TO_SYMBOLS ? 'active' : null}
            onClick={this.onSelectTextToSymbols}
            title={caption}
          >
            <a href='#'>Text</a>
          </li>
        </ul>
      </div>
      <div className='menu-text'>{caption}</div>
      </div>
    );
  }
}


export class ResultMessage extends React.Component {
  componentDidMount() {
    //var node = React.findDOMNode(this.refs.resultMessage);
    var node = ReactDOM.findDOMNode(this.refs.resultMessage);
    $(node).modal('show');
    // use event triggered when modal is hidden to reset visibility flag
    $(node).on('hidden.bs.modal', this.props.onClose);
  }

  render() {
    return (
    <div
      ref='resultMessage'
      className='modal fade'
      role='dialog'
      data-backdrop='static'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>Congratulations</h4>
          </div>
          <div className='modal-body'>
            {this.props.children}
            <AnswersAsIcons questions={this.props.questions} />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
    );
  }

}
