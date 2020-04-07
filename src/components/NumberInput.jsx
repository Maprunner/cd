import React from 'react';
import { t } from './Quiz.jsx';
import Form from 'react-bootstrap/Form';

class NumberInput extends React.Component {
  onNumberChange = (event) => {
    let number = event.target.value;
    this.props.onSetNumber(number);
  }
  render() {
    return (
      <Form.Group
        controlId="frmNumberInput"
        className="col-md-4"
      >
        <Form.Label className="font-weight-bold">{t('Number')}</Form.Label>
        <Form.Control
          type="text"
          value={this.props.number}
          placeholder={this.props.number}
          onChange={this.onNumberChange}
        />
      </Form.Group>
    );
  }
}

export default NumberInput;

