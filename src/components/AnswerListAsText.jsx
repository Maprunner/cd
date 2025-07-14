import React from "react"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { t } from "./Utils.jsx"

export const AnswerAsText = (props) => {
  const { onClick, answer } = props
  return (
    <Col className="text-center">
      <Button
        variant="outline-primary"
        size="lg"
        onClick={() => onClick(answer)}
      >
        {t(answer)}
      </Button>
    </Col>
  )
}

const AnswerListAsText = (props) => {
  const { answers, onClick } = props
  if (!answers) {
    return null
  }
  const formattedAnswers = answers.map(function (ans, i) {
    return (
      <AnswerAsText
        key={i}
        number={i + 1}
        answer={ans.desc}
        onClick={onClick}
      />
    )
  })
  if (!formattedAnswers.length) {
    return null
  }
  return <>{formattedAnswers}</>
}

export default AnswerListAsText
