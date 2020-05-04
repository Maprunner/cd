import React from 'react'
import Col from 'react-bootstrap/Col'

export const AnswerAsSymbol = (props) => {
  const {answer, onClick, code} = props
  return (
    <div className='big-cd-icon' onClick={() => onClick(answer)}>
      <span className='cd'>{String.fromCharCode(code)}</span>
    </div>
  )
}

const AnswerListAsSymbols = (props) => {
  const {answers, onClick} = props
  if (!answers) {
    return null
  }
  const formattedAnswers = answers.map(function (ans, i) {
    return (
      <AnswerAsSymbol
        key={i}
        answer={ans.desc}
        code={ans.code}
        onClick={onClick}
      />
    )
  })
  if (!formattedAnswers.length) {
    return null
  }
  return (
    <Col className="center-column">
      {formattedAnswers}
    </Col>
    )
}

export default AnswerListAsSymbols