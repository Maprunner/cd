import React from 'react'
import Form from 'react-bootstrap/Form'
import { t } from './Quiz.jsx'

const AnswerOptionList = (props) => {
  const {possibleAnswers, setting, onSetAnswersPerQuestion} = props
  let answers = possibleAnswers.map(function (number, i) {
      return (
        <option value={number} key={i}>{number}</option>
      )
    })

    return (
      <Form.Group
        controlId="frmAnswersPerQuestionSelect"
        className="col-md-4"
      >
        <Form.Label className="font-weight-bold">{t('Answers per question')}</Form.Label>
        <Form.Control
          onChange={(event) => onSetAnswersPerQuestion(event.target.value)}
          as="select"
          value={setting}
        >
        {answers}
        </Form.Control>
      </Form.Group>
    )
}

export default AnswerOptionList