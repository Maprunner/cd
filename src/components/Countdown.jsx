import React from 'react'
import { t } from './Quiz.jsx'
import Card from 'react-bootstrap/Card'

const Countdown = (props) => {
  const {timerOption, countdown} = props
  if (timerOption === 0) {
      return null
  }
  let bg = "light"
  if (countdown < 2) {
    bg = "danger"
  } else {
    if (countdown < 4) {
      bg = "warning"
    }
  }
  return (
    <Card bg={bg} className="my-2 text-center">
      <Card.Header className="font-weight-bold">
        {t('Countdown')}
      </Card.Header>
      <Card.Body>
        <Card.Text className="h2">
          {countdown}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Countdown
