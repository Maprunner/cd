import React from 'react';
import Form from 'react-bootstrap/Form';
import { t } from './Quiz.jsx';

class AnswerOptionList extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    let answers = this.props.possibleAnswers.map(function (number, i) {
      return (
        <option value={number} key={i}>{number}</option>
      );
    });

    return (
      <Form.Group
        controlId="frmAnswersPerQuestionSelect"
        className="col-md-4"
      >
        <Form.Label>{t('Answers per question')}</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          as="select"
          value={this.props.setting}
        >
          {answers}
        </Form.Control>
      </Form.Group>
    )
  }
}

export default AnswerOptionList;