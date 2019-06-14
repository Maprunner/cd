import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Timer(props) {
  return (
    <Card variant='primary'>
      <Card.Header>
        {t('Time')}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {props.elapsed}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Timer;
