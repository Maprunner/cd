'use strict';

import React from 'react';
import {MatchCards} from './MatchCards.jsx'
import {SYMBOLS_TO_TEXT, TEXT_TO_SYMBOLS, MATCH_ITEMS} from './Quiz.jsx'

export class QuestionPage extends React.Component {
  renderSymbolsToText() {
    return(
      <div>
        <SymbolsToTextQuestionPage
          idx={this.props.idx}
          answered={this.props.answered}
          elapsed={this.props.elapsed}
          questions={this.props.questions}
          score={this.props.score}
          onCheckAnswer={this.props.onCheckAnswer}
        />
      </div>
    );
  }

  renderTextToSymbols() {
    return(
      <div>
        <TextToSymbolsQuestionPage
          idx={this.props.idx}
          answered={this.props.answered}
          elapsed={this.props.elapsed}
          questions={this.props.questions}
          score={this.props.score}
          onCheckAnswer={this.props.onCheckAnswer}
        />
      </div>
    );
  }

  renderMatchItems() {
    return(
      <div>
        <MatchCards
          questions={this.props.questions}
          answered={this.props.answered}
          elapsed={this.props.elapsed}
          score={this.props.score}
          onFinished={this.props.onCheckAnswer}
        />
      </div>
    );
  }

  render() {
    switch(this.props.type) {
      case SYMBOLS_TO_TEXT:
        return this.renderSymbolsToText();
      case TEXT_TO_SYMBOLS:
        return this.renderTextToSymbols();
      case MATCH_ITEMS:
        return this.renderMatchItems();
      default:
        return null;
    }
  }
}

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

export class SmallCDIcon extends React.Component {
  render() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div className='small-cd-icon cd'>
        <span
          className={this.props.gotIt ? 'correct-color' : 'wrong-color'}
          title={this.props.desc}
        >
          {chr}
        </span>
      </div>
    );
  }
}

export class AnswersAsIcons extends React.Component {
  render() {
    var icons = this.props.questions.map(function(q, i) {
      return(
        <SmallCDIcon
          key={i}
          code={q.question.code}
          gotIt={q.gotIt}
          desc={q.question.desc}
        />
      );
    });
    return (
      <div className='answer-icon-list'>
        {icons}
      </div>
    )
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
