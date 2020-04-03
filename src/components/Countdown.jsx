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
    <Card bg={bg} className="my-2">
      <Card.Header>
        {t('Countdown')}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {props.countdown}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Countdown;
