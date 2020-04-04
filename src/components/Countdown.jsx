import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Countdown(props) {
  if (props.timerOption === 0) {
      return null;
  }
  let bg = "light";
  if (props.countdown < 2) {
    bg = "danger";
  } else {
    if (props.countdown < 4) {
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
          {props.countdown}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Countdown;
