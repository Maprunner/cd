'use strict';
/*global $*/
import React from 'react';
import ReactDOM from 'react-dom';
import {StartPage} from './StartPage.jsx'

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
        state: 'selecting'
      };
  }

  componentDidMount() {
    this.timer = setInterval(this.onTick, 500);
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
    if (this.state.state !== 'running') {
      return;
    }
    this.setState({answered: this.state.answered + 1});
    if (answer === this.state.questions[this.state.currentQuestionIdx].correct) {
      this.setState({score : this.state.score + 1});
    }

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

    message = 'You scored ' + this.state.score + ' out of ' + this.state.answered + ' in ' + parseInt((this.state.elapsed/1000), 10) + ' seconds.';

    return (
      <div>
        <div className='header'>
          <div className='container'>{'Maprunner IOF Control Description Quiz'}</div>
        </div>
        <div className='container'>
          {this.state.state === 'selecting' ?
          <div>
            <StartPage onStart={this.onStartNewQuiz} />
          </div>
          :
          <div>
            <div>
              <QuestionAsCD
                number={this.state.currentQuestionIdx + 1}
                code={this.state.questions[this.state.currentQuestionIdx].code}
              />
              <Score
                score={this.state.score}
                from={this.state.currentQuestionIdx}
              />
              <Timer elapsed={parseInt((this.state.elapsed/1000), 10)} />
            </div>
            <div>
              <AnswerList
                answers={this.state.questions[this.state.currentQuestionIdx].answers}
                onClick={this.onCheckAnswer}
              />
            </div>
          </div>
          }
          {this.state.state === 'displayingResult' ?
            <ResultMessage onClose={this.onResultWindowClose}>
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

export class QuestionAsCD extends React.Component {
  render() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div className='question-cell'>
        <span className='cd'>{chr}</span>
      </div>
    );
  }
}

export class Score extends React.Component {
  render() {
    return (
      <div className='panel panel-primary score'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Score</h3>
        </div>
        <div className='panel-body'>
          {this.props.score}/{this.props.from}
        </div>
      </div>
    )
  }
}

export class Timer extends React.Component {
  render() {
    return (
      <div className='panel panel-primary time'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Time</h3>
        </div>
        <div className='panel-body'>
          {this.props.elapsed}
        </div>
      </div>
    )
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
    <div ref='resultMessage' className='modal fade' role='dialog'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>Congratulations</h4>
          </div>
          <div className='modal-body'>
            {this.props.children}
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

export class Answer extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.answer);
  }

  render() {
    return (
      <button className='answer' onClick={this.onClick}>
        {this.props.number}) {this.props.answer}
      </button>
    )
  }
}

export class AnswerList extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function(ans, i) {
      return(
        <Answer
          key={i}
          number={i + 1}
          answer={ans}
          onClick={self.props.onClick}
        />
      );
    });
    if(!answers.length) {
      return null;
    }
    return (
      <div>
        {answers}
      </div>
    )
  }
}
