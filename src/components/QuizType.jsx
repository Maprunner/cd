import React, { memo } from "react"
import Card from "react-bootstrap/Card"
import { t } from "./Utils.jsx"
import { translateTitle } from "./Utils.jsx"

const QuizType = memo((props) => {
  return (
    <Card variant="primary" className="my-2">
      <Card.Header className="font-weight-bold">
        {translateTitle(props.title)}
      </Card.Header>
      <Card.Body>
        <Card.Text>{t(props.caption)}</Card.Text>
      </Card.Body>
    </Card>
  )
})

export default QuizType
