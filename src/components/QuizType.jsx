import React, { memo } from 'react'
import Card from 'react-bootstrap/Card'
import { t } from './Quiz.jsx'

const QuizType = memo((props) => {
  return (
  <Card variant='primary' className="my-2">
    <Card.Header className="font-weight-bold">
      {t(props.title)}
    </Card.Header>
  </Card>
)}
)

export default QuizType
