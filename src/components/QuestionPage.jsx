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
          title={this.props.title}
          caption={this.props.caption}
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

