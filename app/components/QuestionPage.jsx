'use strict';

import React from 'react';
import {MatchCards} from './MatchCards.jsx'
import {TextToSymbolsQuestionPage} from './TextToSymbolsQuestionPage.jsx'
import {SymbolsToTextQuestionPage} from './SymbolsToTextQuestionPage.jsx'
import {SYMBOLS_TO_TEXT, TEXT_TO_SYMBOLS, MATCH_ITEMS} from './data.jsx'
import {t} from './Quiz.jsx';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';

export class QuestionPage extends React.Component {
  renderSymbolsToText() {
    return(
      <div className='body-container'>
        <SymbolsToTextQuestionPage
          idx={this.props.idx}
          answered={this.props.answered}
          elapsed={this.props.elapsed}
          questions={this.props.questions}
          score={this.props.score}
          onCheckAnswer={this.props.onCheckAnswer}
          title={this.props.title}
          caption={this.props.caption}
        />
      </div>
    );
  }

  renderTextToSymbols() {
    return(
      <div className='body-container'>
        <TextToSymbolsQuestionPage
          idx={this.props.idx}
          answered={this.props.answered}
          elapsed={this.props.elapsed}
          questions={this.props.questions}
          score={this.props.score}
          onCheckAnswer={this.props.onCheckAnswer}
          title={this.props.title}
          caption={this.props.caption}
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
          open={true}
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

export class InfoCard extends React.Component {
  render() {
    return (
      <Card
        style={{width: '120', margin: '16px 0 16px 8px'}}
      >
        <CardText
          style={
            {fontSize: '18px'}}
        >
          {this.props.header}
        </CardText>
        <CardText
          style={
            {fontSize: '24px'}}
        >

          {this.props.body}
        </CardText>
      </Card>
    )
  }
}

export class Score extends React.Component {
  render() {
    return (
      <InfoCard
        header={t('Score')}
        body={this.props.score + '/' + this.props.from}
      />
    )
  }
}

export class Timer extends React.Component {
  render() {
    return (
      <InfoCard
        header={t('Time')}
        body={this.props.elapsed}
      />
    )
  }
}
