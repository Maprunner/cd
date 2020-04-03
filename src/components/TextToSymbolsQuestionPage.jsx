import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Score from './Score.jsx';
import Timer from './Timer.jsx';
import Countdown from './Countdown.jsx';
import AnswerIconGrid from './AnswerIconGrid.jsx';
import AnswerListAsSymbols from './AnswerListAsSymbols.jsx';
import { t } from './Quiz.jsx';

class TextToSymbolsQuestionPage extends React.Component {
  render() {
  return (
      <>
        <Row>
          <Col md={6}>
            <Card variant='primary' className="my-2">
              <Card.Header>{t(this.props.title)}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {t(this.props.caption)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Score score={this.props.score} from={this.props.idx} />
          </Col>
          <Col md={2}>
            <Timer
              elapsed={this.props.elapsed} 
            />
          </Col>
          <Col md={2}>
            <Countdown
              countdown={this.props.countdown}
              timerOption={this.props.timerOption}
            />
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="text-center font-weight-bolder large-text">
            {t(this.props.questions[this.props.idx].question.desc)}
          </Col>
        </Row>
        <Row className='text-center py-2'>
          <Col>
            <AnswerListAsSymbols
              answers={this.props.questions[this.props.idx].answers}
              onClick={this.props.onCheckAnswer}
            />
          </Col>
        </Row>
        <Row className="py-2 answer-icon-grid">
          <AnswerIconGrid
            answers={this.props.questions.slice(0, this.props.answered)}
            questions={this.props.questions.length}
          />
        </Row>
      </>
    );
  }
}

export default TextToSymbolsQuestionPage;