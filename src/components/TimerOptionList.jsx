import React from 'react';
import Form from 'react-bootstrap/Form';
import { t } from './Quiz.jsx';

class TimerOptionList extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    let timers = this.props.possibleTimers.map(function (timer, i) {
      return (
        <option value={timer} key={i}>{timer}</option>
      );
    });

    return (
      <Form.Group
        controlId="frmTimerOptionSelect"
        className="col-md-2"
      >
        <Form.Label className="font-weight-bold">{t('Time')}</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          as="select"
          value={this.props.setting}
        >
          {timers}
        </Form.Control>
      </Form.Group>
    )
  }
}

export default TimerOptionList;