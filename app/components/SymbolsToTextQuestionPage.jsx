'use strict';

import React from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import {Score, Timer} from './QuestionPage.jsx'
import {AnswerIconGrid} from './AnswerIconGrid.jsx'
import {AnswerListAsText} from './AnswerListAsText.jsx'
import {t} from './Quiz.jsx'

export class SymbolsToTextQuestionPage extends React.Component {
  render() {
    let chr = String.fromCharCode(this.props.questions[this.props.idx].question.code);
    return(
      <div>
        <div className='question-container'>
          <Card
            style={{width: 250, margin:'16px 0 16px 0'}}
          >
            <CardTitle
              title={t(this.props.title)}
              subtitle={t(this.props.caption)}
            />
          </Card>
          <Score
            score={this.props.score}
            from={this.props.idx}
          />
          <Timer elapsed={this.props.elapsed} />
        </div>
        <Card
          style={{maxWidth: 650, margin:'8px 0 16px 0'}}
        >
          <div className='question-cell'>
            <span className='cd'>{chr}</span>
          </div>
          <div>
            <AnswerListAsText
              answers={this.props.questions[this.props.idx].answers}
              onClick={this.props.onCheckAnswer}
            />
          </div>
          <AnswerIconGrid questions={this.props.questions.slice(0, this.props.answered)} />
        </Card>
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

//SymbolsToTextQuestionPage.propTypes = {
//    questions: React.PropTypes.arrayOf(React.PropTypes.object),
//    onCheckAnswer: React.PropTypes.func,
//    answered: React.PropTypes.number,
//    elapsed: React.PropTypes.number,
//    idx: React.PropTypes.number
//}
