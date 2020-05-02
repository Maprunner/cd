import React from 'react' 
import Col from 'react-bootstrap/Col' 
import Row from 'react-bootstrap/Row' 
import Score from './Score.jsx' 
import Timer from './Timer.jsx' 
import QuizType from './QuizType.jsx' 
import Countdown from './Countdown.jsx' 
import AnswerIconGrid from './AnswerIconGrid.jsx' 
import AnswerListAsSymbols from './AnswerListAsSymbols.jsx' 
import { t } from './Quiz.jsx' 

function TextToSymbolsQuestionPage(props) {
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
          <Col className="text-center font-weight-bolder large-text">
            {t(questions[idx].question.desc)}
          </Col>
        </Row>
        <Row className='text-center py-2'>
          <Col>
            <AnswerListAsSymbols
              answers={questions[idx].answers}
              onClick={onCheckAnswer}
            />
          </Col>
        </Row>
        <Row className="py-2 answer-icon-grid">
          <AnswerIconGrid
            answers={questions.slice(0, answered)}
            questions={questions.length}
          />
        </Row>
      </>
    )
}

export default TextToSymbolsQuestionPage 