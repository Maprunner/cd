'use strict';

import React from 'react';
import {AnswersAsIcons, Score, Timer} from './QuestionPage.jsx'

export class SymbolsToTextQuestionPage extends React.Component {
  render() {
    return(
      <div>
        <div>
          <QuestionAsCD
            code={this.props.questions[this.props.idx].question.code}
          />
          <Score
            score={this.props.score}
            from={this.props.idx}
          />
          <Timer elapsed={this.props.elapsed} />
        </div>
        <div>
          <AnswerListAsText
            answers={this.props.questions[this.props.idx].answers}
            onClick={this.props.onCheckAnswer}
          />
        </div>
        <AnswersAsIcons questions={this.props.questions.slice(0, this.props.answered)} />
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

export class AnswerAsText extends React.Component {
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

export class AnswerListAsText extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function(ans, i) {
      return(
        <AnswerAsText
          key={i}
          number={i + 1}
          answer={ans.desc}
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
