import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Timer() {
  return (
    <Card variant='primary'>
      <Card.Body>
        <Card.Title>
          header={t('Time')}
        </Card.Title>
        <p className='large-text text-center'>{this.props.elapsed}</p>
      </Card.Body>
    </Card>
  );
}

export default Timer;
