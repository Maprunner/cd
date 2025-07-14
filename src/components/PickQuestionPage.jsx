import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Score from "./Score.jsx"
import Timer from "./Timer.jsx"
import QuizType from "./QuizType.jsx"
import Countdown from "./Countdown.jsx"
import AnswerIconGrid from "./AnswerIconGrid.jsx"
import AnswerListAsSymbols from "./AnswerListAsSymbols.jsx"
import AnswerListAsText from "./AnswerListAsText.jsx"
import AnswerListAsMap from "./AnswerListAsMap.jsx"
import { mapImg } from "../data/data.js"
import { t } from "./Utils.jsx"

const PickQuestionPage = (props) => {
  const {
    quizDef,
    score,
    idx,
    countdown,
    timerOption,
    questions,
    answered,
    onCheckAnswer,
    elapsed,
  } = props

  const question = () => {
    if (quizDef.from === "cd") {
      return (
        <div className="question-cell">
          <span className="cd">
            {String.fromCharCode(questions[idx].question.code)}
          </span>
        </div>
      )
    }
    if (quizDef.from === "map") {
      const key = "c" + questions[idx].question.id
      return (
        <div className="map-container">
          <div className="map-button">
            <Image src={mapImg[key]} roundedCircle />
          </div>
        </div>
      )
    }
    return (
      <div className="text-center font-weight-bolder large-text">
        {t(questions[idx].question.desc)}
      </div>
    )
  }

  const answerList = () => {
    if (quizDef.to === "cd") {
      return (
        <AnswerListAsSymbols
          answers={questions[idx].answers}
          onClick={onCheckAnswer}
        />
      )
    }
    if (quizDef.to === "map") {
      return (
        <AnswerListAsMap
          answers={questions[idx].answers}
          onClick={onCheckAnswer}
        />
      )
    }
    return (
      <AnswerListAsText
        answers={questions[idx].answers}
        onClick={onCheckAnswer}
      />
    )
  }

  return (
    <>
      <Row>
        <Col md={6}>
          <QuizType title={quizDef.title} caption={quizDef.caption} />
        </Col>
        <Col md={2}>
          <Score score={score} from={idx} />
        </Col>
        <Col md={2}>
          <Timer elapsed={elapsed} />
        </Col>
        <Col md={2}>
          <Countdown countdown={countdown} timerOption={timerOption} />
        </Col>
      </Row>
      <Row className="py-2">
        <Col>{question()}</Col>
      </Row>
      <Row className="py-2">{answerList()}</Row>
      <div className="py-2 answer-icon-grid">
        <AnswerIconGrid
          answers={questions.slice(0, answered)}
          questions={questions.length}
        />
      </div>
    </>
  )
}

export default PickQuestionPage
