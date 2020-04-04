import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Timer(props) {
  return (
    <Card variant='primary' className="my-2 text-center">
      <Card.Header className="font-weight-bold">
        {t('Time')}
      </Card.Header>
      <Card.Body>
        <Card.Text className="h2">
          {props.elapsed}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Timer;
