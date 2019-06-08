import React from 'react';
import { t } from './Quiz.jsx';
import Card from 'react-bootstrap/Card';

function Score(props) {
  return (
    <Card variant='primary'>
      <Card.Body>
        <Card.Title>{t('Score')}</Card.Title>
        <p className='large-text text-center'>{this.props.score + '/' + this.props.from}</p>
      </Card.Body>
    </Card>
  );
}

export default Score;