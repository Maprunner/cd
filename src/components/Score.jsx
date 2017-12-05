import React from 'react';
import {t} from './Quiz.jsx';
import {Panel} from 'react-bootstrap';

export class Score extends React.Component {
  render() {
    return (
      <Panel header={t('Score')} bsStyle='primary'>
        <p className='large-text text-center'>{this.props.score + '/' + this.props.from}</p>
      </Panel>
    )
  }
}
