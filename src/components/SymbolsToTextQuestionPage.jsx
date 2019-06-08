import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Score from './Score.jsx'
import Timer from './Timer.jsx'
import AnswerIconGrid from './AnswerIconGrid.jsx'
import AnswerListAsText from './AnswerListAsText.jsx'
import { t } from './Quiz.jsx'

class SymbolsToTextQuestionPage extends React.Component {
  render() {
    let chr = String.fromCharCode(this.props.questions[this.props.idx].question.code);
    return (
      <div className='question-container'>
        <div className='row'>
          <div className='col-md-8'>
            <Card variant='primary'>
              <Card.Body>
                <Card.Title>
                  {t(this.props.title)}
                </Card.Title>
                {t(this.props.caption)}
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-2'>
            <Score score={this.props.score} from={this.props.idx} />
          </div>
          <div className='col-md-2'>
            <Timer elapsed={this.props.elapsed} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='question-cell'>
              <span className='cd'>{chr}</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <AnswerListAsText
            answers={this.props.questions[this.props.idx].answers}
            onClick={this.props.onCheckAnswer}
          />
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

SymbolsToTextQuestionPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  onCheckAnswer: PropTypes.func,
  answered: PropTypes.number,
  elapsed: PropTypes.number,
  idx: PropTypes.number
}

export default SymbolsToTextQuestionPage
