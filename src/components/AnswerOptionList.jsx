import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {t} from './Quiz.jsx';

export class AnswerOptionList extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    let answers = this.props.possibleAnswers.map(function(number, i){
      return(
        <option value={number} key={i}>{number}</option>
      );
    });

    return(
      <FormGroup
        controlId="frmAnswersPerQuestionSelect"
        className="col-md-4"
      >
        <ControlLabel>{t('Answers per question')}</ControlLabel>
        <FormControl
          onChange={this.handleChange}
          componentClass="select"
          value={this.props.setting}
        >
          {answers}
        </FormControl>
      </FormGroup>
    )
  }
}

