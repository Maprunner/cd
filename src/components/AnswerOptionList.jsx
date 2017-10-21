import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {t} from './Quiz.jsx';

export class AnswerOptionList extends React.Component {
  handleChange = (event, index, value) => {
    this.props.onChange(value);
  }

  render() {
    let answers = this.props.possibleAnswers.map(function(number, i){
      return(
        <MenuItem value={number} primaryText={number} key={i}/>
      );
    });

    return(
      <div className="dropdown-container">
        <p>{t('Answers per question')}</p>
        <DropDownMenu
          value={this.props.setting}
          onChange={this.handleChange}
        >
          {answers}
        </DropDownMenu>
      </div>
    )
  }
}
