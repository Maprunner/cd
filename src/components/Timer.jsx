import React from 'react';
import {t} from './Quiz.jsx';
import {Panel} from 'react-bootstrap';

export class Timer extends React.Component {
  render() {
    return (
      <Panel header={t('Time')} bsStyle='primary'>
        <p className='large-text text-center'>{this.props.elapsed}</p>
      </Panel>
    )
  }
}
