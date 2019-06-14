import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Score from './Score.jsx'
import Timer from './Timer.jsx'
import AnswerIconGrid from './AnswerIconGrid.jsx'
import AnswerListAsText from './AnswerListAsText.jsx'
import { t } from './Quiz.jsx'

class SymbolsToTextQuestionPage extends React.Component {
  render() {
    let chr = String.fromCharCode(this.props.questions[this.props.idx].question.code);
    return (
      <>
        <Row className="py-2">
          <Col xs={6}>
            <Card variant='primary'>
              <Card.Header>
                {t(this.props.title)}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {t(this.props.caption)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Score score={this.props.score} from={this.props.idx} />
          </Col>
          <Col xs={3}>
            <Timer elapsed={this.props.elapsed} />
          </Col>
        </Row>
        <Row className="py-2">
          <Col>
            <div className='question-cell'>
              <span className='cd'>{chr}</span>
            </div>
          </Col>
        </Row>
        <Row className="py-2">
          <AnswerListAsText
            answers={this.props.questions[this.props.idx].answers}
            onClick={this.props.onCheckAnswer}
          />
        </Row>
        <div className="py-2 answer-icon-grid">
          <AnswerIconGrid
            answers={this.props.questions.slice(0, this.props.answered)}
            questions={this.props.questions.length}
          />
        </div>
      </>
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
