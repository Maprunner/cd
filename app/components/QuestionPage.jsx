'use strict';

import React from 'react';
import {MatchCards} from './MatchCards.jsx'
import {TextToSymbolsQuestionPage} from './TextToSymbolsQuestionPage.jsx'
import {SymbolsToTextQuestionPage} from './SymbolsToTextQuestionPage.jsx'
import {SYMBOLS_TO_TEXT, TEXT_TO_SYMBOLS, MATCH_ITEMS} from './data.jsx'

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
