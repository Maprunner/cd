import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Score from './Score.jsx'
import Timer from './Timer.jsx'
import QuizType from './QuizType.jsx';
import Countdown from './Countdown.jsx'
import AnswerIconGrid from './AnswerIconGrid.jsx'
import AnswerListAsText from './AnswerListAsText.jsx'

function SymbolsToTextQuestionPage(props) {
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
          <Col>
            <div className='question-cell'>
              <span className='cd'>{String.fromCharCode(props.questions[props.idx].question.code)}</span>
            </div>
          </Col>
        </Row>
        <Row className="py-2">
          <AnswerListAsText
            answers={props.questions[props.idx].answers}
            onClick={props.onCheckAnswer}
          />
        </Row>
        <div className="py-2 answer-icon-grid">
          <AnswerIconGrid
            answers={props.questions.slice(0, props.answered)}
            questions={props.questions.length}
          />
        </div>
      </>
    )
}

export function QuestionAsCD(props) {
  return (
    <div className='question-cell'>
      <span className='cd'>{String.fromCharCode(props.code)}</span>
    </div>
  )
}

export default SymbolsToTextQuestionPage
