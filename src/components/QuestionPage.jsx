import React from 'react';
import MatchCards from './MatchCards.jsx'
import TextToSymbolsQuestionPage from './TextToSymbolsQuestionPage.jsx'
import SymbolsToTextQuestionPage from './SymbolsToTextQuestionPage.jsx'
import { SYMBOLS_TO_TEXT, TEXT_TO_SYMBOLS, MATCH_ITEMS } from '../data/data.js'

class QuestionPage extends React.Component {
  renderSymbolsToText() {
    return (
      <SymbolsToTextQuestionPage
        idx={this.props.idx}
        answered={this.props.answered}
        elapsed={this.props.elapsed}
        countdown={this.props.countdown}
        timerOption={this.props.timerOption}
        questions={this.props.questions}
        score={this.props.score}
        onCheckAnswer={this.props.onCheckAnswer}
        title={this.props.title}
        caption={this.props.caption}
      />
    );
  }

  renderTextToSymbols() {
    return (
      <TextToSymbolsQuestionPage
        idx={this.props.idx}
        answered={this.props.answered}
        elapsed={this.props.elapsed}
        countdown={this.props.countdown}
        timerOption={this.props.timerOption}
        questions={this.props.questions}
        score={this.props.score}
        onCheckAnswer={this.props.onCheckAnswer}
        title={this.props.title}
        caption={this.props.caption}
      />
    );
  }

  renderMatchItems() {
    return (
      <MatchCards
        questions={this.props.questions}
        answered={this.props.answered}
        elapsed={this.props.elapsed}
        score={this.props.score}
        open={true}
        onFinished={this.props.onCheckAnswer}
      />
    );
  }

  render() {
    switch (this.props.type) {
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

export default QuestionPage;

