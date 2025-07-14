import React from "react"
import Form from "react-bootstrap/Form"
import { t } from "./Quiz.jsx"

const QuestionsOptionList = (props) => {
  const { max, setting, onSetNumberOfQuestions } = props
  let values = []
  for (let i = 1; i <= max; i = i + 1) {
    values.push(i)
  }

  let questions = values.map(function (number, i) {
    return (
      <option value={number} key={i}>
        {number}
      </option>
    )
  })

  return (
    <Form.Group controlId="frmNumberOfQuestionsSelect" className="col-md-2">
      <Form.Label className="font-weight-bold">{t("Questions")}</Form.Label>
      <Form.Control
        onChange={(event) => onSetNumberOfQuestions(event.target.value)}
        as="select"
        value={setting}
      >
        {questions}
      </Form.Control>
    </Form.Group>
  )
}

export default QuestionsOptionList
