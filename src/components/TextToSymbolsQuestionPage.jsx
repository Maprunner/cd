import React from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import {Score, Timer} from './QuestionPage.jsx'
import {AnswerIconGrid} from './AnswerIconGrid.jsx'
import {AnswerListAsSymbols} from './AnswerListAsSymbols.jsx'
import {t} from './Quiz.jsx'

export class TextToSymbolsQuestionPage extends React.Component {
  render() {
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
          <CardTitle
            style={{fontSize: '40px', textAlign: 'center'}}
            title={t(this.props.questions[this.props.idx].question.desc)}
          />
          <AnswerListAsSymbols
            answers={this.props.questions[this.props.idx].answers}
            onClick={this.props.onCheckAnswer}
          />
          <AnswerIconGrid questions={this.props.questions.slice(0, this.props.answered)} />
        </Card>
      </div>
    );
  }
}
