import React from 'react';
import {Panel} from 'react-bootstrap';
import {Score} from './Score.jsx'
import {Timer} from './Timer.jsx'
import {AnswerIconGrid} from './AnswerIconGrid.jsx'
import {AnswerListAsSymbols} from './AnswerListAsSymbols.jsx'
import {t} from './Quiz.jsx'

export class TextToSymbolsQuestionPage extends React.Component {
  render() {
    return(
      <div className='question-container'>
        <div className='row'>
          <div className='col-md-8'>
            <Panel header={t(this.props.title)}  bsStyle='primary'>
              {t(this.props.caption)}
            </Panel>
          </div>
          <div className='col-md-2'>
            <Score score={this.props.score} from={this.props.idx} />
          </div>
          <div className='col-md-2'>
            <Timer elapsed={this.props.elapsed} />
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-md-12'>
            <p className='large-text'>{t(this.props.questions[this.props.idx].question.desc)}</p>
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-md-12'>
            <AnswerListAsSymbols
              answers={this.props.questions[this.props.idx].answers}
              onClick={this.props.onCheckAnswer}
            />
          </div>
        </div>
        <div className='row'>
          <AnswerIconGrid 
            answers={this.props.questions.slice(0, this.props.answered)} 
            questions={this.props.questions.length}
          />
        </div>
      </div>
    );
  }
}
