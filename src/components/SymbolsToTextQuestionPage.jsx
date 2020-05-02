import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Score from './Score.jsx'
import Timer from './Timer.jsx'
import QuizType from './QuizType.jsx'
import Countdown from './Countdown.jsx'
import AnswerIconGrid from './AnswerIconGrid.jsx'
import AnswerListAsText from './AnswerListAsText.jsx'

const SymbolsToTextQuestionPage = (props) => {
  const {title, caption, score, idx, countdown, timerOption, questions, answered, onCheckAnswer, elapsed} = props
  return (
    <>
      <Row>
        <Col md={6}>
          <QuizType
            title={title}
            caption={caption}
          />
        </Col>
        <Col md={2}>
          <Score score={score} from={idx} />
        </Col>
        <Col md={2}>
          <Timer
            elapsed={elapsed}
          />
        </Col>
        <Col md={2}>
          <Countdown
            countdown={countdown}
            timerOption={timerOption}
          />
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          <div className='question-cell'>
            <span className='cd'>{String.fromCharCode(questions[idx].question.code)}</span>
          </div>
        </Col>
      </Row>
      <Row className="py-2">
        <AnswerListAsText
          answers={questions[idx].answers}
          onClick={onCheckAnswer}
        />
      </Row>
      <div className="py-2 answer-icon-grid">
        <AnswerIconGrid
          answers={questions.slice(0, answered)}
          questions={questions.length}
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
