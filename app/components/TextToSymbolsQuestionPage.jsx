'use strict';

import React from 'react';
import {AnswersAsIcons, Score, Timer} from './QuestionPage.jsx'

export class TextToSymbolsQuestionPage extends React.Component {
  render() {
    return(
      <div>
        <div>
          <Score
            score={this.props.score}
            from={this.props.idx}
          />
          <Timer elapsed={this.props.elapsed} />
        </div>
        <QuestionAsText
          description={this.props.questions[this.props.idx].question.desc}
        />
        <div>
          <AnswerListAsSymbols
            answers={this.props.questions[this.props.idx].answers}
            onClick={this.props.onCheckAnswer}
          />
        </div>
        <AnswersAsIcons questions={this.props.questions.slice(0, this.props.answered)} />
      </div>
    );
  }
}

export class QuestionAsText extends React.Component {
  render() {
    return (
      <div className='description-text'>
        {this.props.description}
      </div>
    );
  }
}

export class AnswerAsSymbol extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.answer);
  }

  render() {
    var chr = String.fromCharCode(this.props.code);
    return(
      <div className='big-cd-icon' onClick={this.onClick}>
        <span className='cd'>{chr}</span>
      </div>
    );
  }
}

export class AnswerListAsSymbols extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function(ans, i) {
      return(
        <AnswerAsSymbol
          key={i}
          answer={ans.desc}
          code={ans.code}
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
