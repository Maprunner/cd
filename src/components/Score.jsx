import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Score(props) {
  return (
    <Card variant='primary'>
      <Card.Header>{t('Score')}</Card.Header>
      <Card.Body>
        <Card.Text>
          {props.score + '/' + props.from}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Score;