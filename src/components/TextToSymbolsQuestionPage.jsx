import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Score from './Score.jsx';
import Timer from './Timer.jsx';
import QuizType from './QuizType.jsx';
import Countdown from './Countdown.jsx';
import AnswerIconGrid from './AnswerIconGrid.jsx';
import AnswerListAsSymbols from './AnswerListAsSymbols.jsx';
import { t } from './Quiz.jsx';

function TextToSymbolsQuestionPage(props) {
  return (
      <>
        <Row>
          <Col md={6}>
            <QuizType
              title={props.title}
              caption={props.caption}
            />
          </Col>
          <Col md={2}>
            <Score score={props.score} from={props.idx} />
          </Col>
          <Col md={2}>
            <Timer
              elapsed={props.elapsed} 
            />
          </Col>
          <Col md={2}>
            <Countdown
              countdown={props.countdown}
              timerOption={props.timerOption}
            />
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="text-center font-weight-bolder large-text">
            {t(props.questions[props.idx].question.desc)}
          </Col>
        </Row>
        <Row className='text-center py-2'>
          <Col>
            <AnswerListAsSymbols
              answers={props.questions[props.idx].answers}
              onClick={props.onCheckAnswer}
            />
          </Col>
        </Row>
        <Row className="py-2 answer-icon-grid">
          <AnswerIconGrid
            answers={props.questions.slice(0, props.answered)}
            questions={props.questions.length}
          />
        </Row>
      </>
    )
}

export default TextToSymbolsQuestionPage;